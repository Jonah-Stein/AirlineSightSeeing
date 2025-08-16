import {skymarkApi} from "./axios"
import type { GetPinsResponse } from "./types/pins"

export const getMyPins = async (): Promise<GetPinsResponse> => {
    const {data} = await skymarkApi.get("/pins")
    return data
}