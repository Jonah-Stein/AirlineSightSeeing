
export interface Flight {
    id: string;
    flight_number: string;
    operating_airline: string | null;
    origin: string;
    destination: string;
    departure_time: string;
    arrival_time: string;
    flightradar_id: string | null;
    name: string;
}