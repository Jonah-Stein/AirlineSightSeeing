import type {Flight} from "./flights"

export interface Experience {
    id: string;
    name: string;
    description: string | null;
    flight: Flight | null;
    user: string;
}