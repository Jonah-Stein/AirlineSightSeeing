export interface GetPinsResponse {
    pins: Pin[]
}

export interface Pin {
    id: string;
    lat: number;
    lon: number;
    name: string;
    description: string | null
}