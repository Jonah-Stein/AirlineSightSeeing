import axios from "axios";
import assert from "assert";
import { useTokenState } from "./tokenStore";


// assert(import.meta.env.VITE_API_BASE_URL, "VITE_API_BASE_URL is not set");

// only need to add api extension when calling.
export const skymarkApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

skymarkApi.interceptors.request.use((config) => {
  const token = useTokenState.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshing: Promise<string | null> | null = null;
skymarkApi.interceptors.response.use(r=>r,async (error)=>{
  if(error.response.status !== 401) throw error
  if (!refreshing) {
    refreshing = axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, {}, { withCredentials: true })
      .then(res => res.data.access ?? null)
      .finally(() => { refreshing = null; });
  }
  const accessToken = await refreshing;
  if (!accessToken) throw error;
  useTokenState.getState().setAccessToken(accessToken);
  error.config.headers.Authorization = `Bearer ${accessToken}`;
  return skymarkApi.request(error.config);
})