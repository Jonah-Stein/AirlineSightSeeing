import { skymarkApi } from "./axios";

export async function getMyProfile() {
  const {data} = await skymarkApi.get("/profiles");

  // Need to get profile picture
  return data
}

