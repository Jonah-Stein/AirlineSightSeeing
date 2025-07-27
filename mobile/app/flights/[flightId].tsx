import { SafeAreaView, View, Text, Button, FlatList, Image, Dimensions} from "react-native"
import { flight, flightRow, coordinate, imageForPath } from "../../types/types"
import { Link, useLocalSearchParams, useRouter } from "expo-router"
import { useSQLiteContext } from "expo-sqlite"
import { useEffect, useState } from "react"
import { createGeoJsonWithCoords, generateImageGeoJsonFeature } from "../../utils/utils"
import { useGeoJson } from "../../context/GeoJsonContext"

const flightPage = () =>{
    const router = useRouter();
    const flightId = Number(useLocalSearchParams().flightId)
    const db = useSQLiteContext();
    const {setGeoJson} = useGeoJson()
    const [flight, setFlight] = useState<any>(null);
    useEffect(()=>{
        const loadFlight = async () => {
            const flight =  await db.getFirstAsync<flightRow>("SELECT * FROM flights WHERE id = ?", [flightId]) 
            setFlight(flight)
        }
        loadFlight()
    }, [flightId])

    const [imageUris, setImageUris] = useState<imageForPath[]>([]);

    useEffect(()=>{
        const loadImages = async () => {
            const images = await db.getAllAsync<imageForPath>("SELECT id, path, lat, long FROM images WHERE flight_id = ?", [flightId])
            console.log("number of images for flight path:", images.length)
            setImageUris(images)
        }
        loadImages()
    }, [flightId])

    const renderImage = ({item}: {item: imageForPath}) =>(
        <Link href ={{pathname: "/images/[imageId]", params: {imageId: item.id}}} >
            <Image
                source={{uri:item.path}}
                style={{
                    width: Dimensions.get('window').width / 2 - 16,
                    height: 150,
                    margin: 8,
                    borderRadius: 8,
                    backgroundColor: '#ccc'
                }}
                resizeMode="cover"
            />
        </Link>
    )

    useEffect(()=>{
        const createPath = async()=>{
            const trackingPoints = (await db.getAllAsync<coordinate>("SELECT lat, long FROM flight_tracks WHERE flight_id = ?", [flightId])).map((coord)=>{return [coord.long, coord.lat] as unknown as coordinate})
            const geoJson = createGeoJsonWithCoords(trackingPoints)
            for(const image of imageUris){
                const feature = generateImageGeoJsonFeature(image)
                geoJson.features.push(feature);
            }
            setGeoJson(geoJson)
        }
        createPath()
    }, [flightId, imageUris])
    return(
        <SafeAreaView style={{flex: 1}}>
            {/* <View style={{flex: 1}}> */}
                <View>
                    <Text>Name: {flight?.name}</Text> 
                    <Text>Airline: {flight?.airline}</Text>
                    <Text>Departure Time: {flight?.departure_time}</Text>
                    <Text>Origin: {flight?.origin}</Text>
                    <Text>Destination: {flight?.destination}</Text>
                    <Button title="See route" onPress ={()=>router.push({pathname:"/flights/map"})}/>
                    <Button title = "Go back" onPress ={() => router.push({pathname:"/home"})}></Button>
                </View>
                <View style={{flex: 1}}>
                    <Text>Image Grid:</Text>
                    <FlatList
                        data={imageUris}
                        keyExtractor= {(item)=> item.id.toString()}
                        renderItem = {renderImage}
                        numColumns={2}
                        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 8 }}
                    />
                </View>
            {/* </View> */}
       </SafeAreaView>
    )


}

export default flightPage;