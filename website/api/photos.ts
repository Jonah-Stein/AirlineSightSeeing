import {skymarkApi} from "api/axios";
import { type SimplePhoto, type UpdatePhoto } from "api/types/photos"

export const getMyPhotos = async () => {
  const { data } = await skymarkApi.get("/photos");
  return data;
};

export const updatePhoto = async (photoId: string, updatePhoto: UpdatePhoto): Promise<SimplePhoto[]> => {
  const { data } = await skymarkApi.patch(`/photos/${photoId}`, updatePhoto);
  return data;
};