import {useQuery} from "@tanstack/react-query"
import {getMyPins} from "api/pins"

export function useGetMyPins() {
    const {data} = useQuery({
        queryKey: ["pins"],
        queryFn: getMyPins,
    })

    return data?.pins
}