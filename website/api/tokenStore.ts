import { create } from "zustand";

type TokenState = {
    accessToken: string | null;
    setAccessToken: (accessToken: string|null) => void;
}

export const useTokenState = create<TokenState>((set)=>({
    accessToken: null,
    setAccessToken: (accessToken: string|null) => set({ accessToken }),
}))
