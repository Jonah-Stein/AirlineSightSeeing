import { coordinate, imageForPath, GeoJson, PointFeature } from "../types/types";

export function createGeoJsonWithCoords(coordinates: coordinate[]){
    return {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              name: "Flight Path",
            },
            geometry: {
              type: "LineString",
              coordinates: coordinates,
            },
          },
        ]
    } as GeoJson
}

export function generateImageGeoJsonFeature(image: imageForPath){
    return {
        type: "Feature",
        properties: {
            name: "image",
            id: image.id,
            uri: image.path
        },
        geometry: {
            type: "Point",
            coordinates: [image.long, image.lat] as unknown as coordinate
        }
    } as PointFeature
}