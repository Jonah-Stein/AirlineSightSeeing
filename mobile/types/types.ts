export type flight = {
    id: number;
    name: string;
    flight_number: string;
    airline: string;
    origin: string;
    destination: string;
    departure_time: Date;
    arrival_time: Date;
}

export type flightRow = {
    id: number;
    name: string;
    flight_number: string;
    airline: string;
    origin: string;
    destination: string;
    departure_time: string;
    arrival_time: string;
}

export type coordinate= {
    lat: number;
    long: number;
}

export type flightImageAssignment = {
    id: number;
    departure_time: number;
    arrival_time: number;
}

export type imageForPath = {
    id: number;
    path: string;
    lat: number;
    long: number;
}

export type GeoJson = {
    type: "FeatureCollection";
    features: (PointFeature | LineFeature)[];
};

export type PointFeature = {
    type: "Feature";
    geometry: {
        type: "Point";
        coordinates: coordinate;
    };
    properties: {
        [key: string]: any;
    };
}
  
export type LineFeature = {
type: "Feature";
geometry: {
    type: "LineString";
    coordinates: coordinate[];
};
properties: {
    [key: string]: any;
};
};
