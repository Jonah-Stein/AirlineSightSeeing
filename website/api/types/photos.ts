import type { Experience } from "./experiences";
import type { Pin } from "./pins";

export interface UpdatePhoto {
    experience_id?: string;
    pin_id?: string;
    lat?: number;
    lon?: number
}

export interface SimplePhoto {
    id: string;
    imageUrl: string;
}

export interface PhotoDetails {
    id: string;
    name: string | null;
    lat: number | null;
    lon: number | null;
    datetime: string | null;
    meta_lat: number | null;
    meta_lon: number | null;
    user: string;
    experience: Experience | null;
    pin: Pin | null;
    imageUrl: string;
}
