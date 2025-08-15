import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getMyProfile } from "api/profile";

export function getQueryKeys(profileName?: string){
    if(profileName){
        return ["profiles", profileName]
    }
    return ["my-profile"]
}

export function useMyProfile() {
    const query = useQuery({
        queryKey: getQueryKeys(),
        queryFn:getMyProfile,
        placeholderData: keepPreviousData
    })
    return query
}