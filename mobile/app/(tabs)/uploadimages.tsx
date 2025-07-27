import { flightImageAssignment } from "@/types/types";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import * as MediaLibrary from "expo-media-library"

const uploadImages = () =>{
    const db = useSQLiteContext();
    const[flightsWithoutImagesFromLibrary, setFlightsWithoutImagesFromLibrary] = useState<flightImageAssignment[]>([])
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

    useEffect(()=>{
        const loadFlights = async () => {
            const flights = (await db.getAllAsync<flightImageAssignment>("SELECT id, departure_time, arrival_time FROM flights WHERE image_library_used = ?", [0])).map((item)=>({...item, departure_time: new Date(item.departure_time).getTime(), arrival_time: new Date(item.arrival_time).getTime()}))
            setFlightsWithoutImagesFromLibrary(flights)
        }
        loadFlights()
    }, [])
    console.log("# of flights w/o images:", flightsWithoutImagesFromLibrary.length)

    
    useEffect(()=>{
        const getImagesAndMatch = async () =>{
            console.log("checking for permission")
            if (permissionResponse?.status !== 'granted') {
                await requestPermission();
            }
            console.log("getting images")
            const getImages = async ()=>{ 
                return await MediaLibrary.getAssetsAsync({
                    mediaType: MediaLibrary.MediaType.photo,
                    sortBy: [[MediaLibrary.SortBy.creationTime, false]],
                    first: 1000
                })
            }
            const images = (await getImages()).assets
            for(const flight of flightsWithoutImagesFromLibrary){
                const photosOnDate =images.filter(
                    (asset) => asset.creationTime >= flight.departure_time && asset.creationTime <= flight.arrival_time
                ) 
                for(const photo of photosOnDate){
                    const assetInfo = await MediaLibrary.getAssetInfoAsync(photo.id);
                    const exif = assetInfo.exif;
                    //@ts-ignore
                    if (!exif || !exif["{GPS}"]) continue;
                    //@ts-ignore
                    const gps = exif["{GPS}"];
                    if (gps.Latitude == null || gps.Longitude == null) continue;

                    const lat =
                    gps.LatitudeRef === "S" ? -gps.Latitude : gps.Latitude;
                    const long =
                    gps.LongitudeRef === "W" ? -gps.Longitude : gps.Longitude;
                    const alt = gps.Altitude;
                    await db.runAsync("INSERT INTO images (on_device, path, time, lat, long, alt, flight_id) VALUES (?, ?, ?, ?, ?, ?, ?)", 
                        [
                            1,
                            photo.uri,
                            new Date(photo.creationTime).toISOString(),
                            lat,
                            long,
                            alt,
                            flight.id
                        ]
                    )
                }
                
                await db.runAsync("UPDATE flights SET image_library_used = ? WHERE id = ?", [1, flight.id])
            }
        }
        getImagesAndMatch();
        console.log("finished getting images")
    }, [flightsWithoutImagesFromLibrary])

    return(
        <SafeAreaView>
            <Text>This is where you upload images</Text>
        </SafeAreaView>
    )
}
export default uploadImages