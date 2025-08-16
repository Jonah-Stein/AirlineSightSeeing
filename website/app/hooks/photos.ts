import { useMutation, useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getMyPhotos, updatePhoto } from "api/photos";
import { queryClient } from "api/query-client";
import type { UpdatePhoto, SimplePhoto } from "api/types/photos";

type MyPhotosOptions<T = SimplePhoto[]> =
  Omit<UseQueryOptions<SimplePhoto[], Error>, "queryKey" | "queryFn">;
export function useGetMyPhotos(options?: MyPhotosOptions) {
    return useQuery({
        queryKey: ["photos"],
        queryFn: getMyPhotos,
        ...options
    })
}

export function useUpdatePhoto(photoId: string, updateData: UpdatePhoto) {
    const mutation = useMutation({
        mutationFn: () => updatePhoto(photoId, updateData),
        onSuccess: () => {
            // TODO:Invalidate the pins queries assocaited with the photo
            queryClient.invalidateQueries({ queryKey: ["photos"] })
        }
    })
    return mutation
}