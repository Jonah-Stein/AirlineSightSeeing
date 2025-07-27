import { useLocalSearchParams, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { View, Image, SafeAreaView, Text, StyleSheet, Dimensions} from "react-native"
import { imageForPath} from "../../types/types"
import { useSQLiteContext } from "expo-sqlite"
import Mapbox from "@rnmapbox/maps"
import { useGeoJson } from "../../context/GeoJsonContext"

const imagePage = () =>{
    const imageId = Number(useLocalSearchParams().imageId)
    console.log("imageId:", imageId)
    // const flightId = Number(useLocalSearchParams().flightId)
    const router = useRouter()
    const db = useSQLiteContext()


    const [image, setImage] = useState<any>(null);
    useEffect(()=>{
        const loadImage = async () => {
            const targetImage= await db.getFirstAsync<imageForPath>("SELECT id, path, lat, long FROM images WHERE id = ?",[imageId])
            setImage(targetImage);
        }
        loadImage()
    }, [imageId])


    const flightPath = useGeoJson().geoJson
    console.log(flightPath)
    if(!image){
      return(<SafeAreaView><Text>Loading....</Text></SafeAreaView>)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: image?.path }} style={styles.image} />
            </View>
            <View style={styles.mapContainer}>
              <Mapbox.MapView styleURL = "mapbox://styles/mapbox/satellite-v9" style={styles.map}>
              <Mapbox.Camera
                  centerCoordinate={[image?.long, image?.lat]}
                  zoomLevel={10}
                />
                <Mapbox.ShapeSource id="flightPath" shape={flightPath}>
                  <Mapbox.LineLayer
                    id="flightLine"
                    filter = {["==",["geometry-type"], "LineString"]}
                    style={{
                      lineColor: '#ff0000',
                      lineWidth: 4,
                      lineJoin: 'round',
                      lineCap: 'round'
                    }}
                  />
                  <Mapbox.SymbolLayer
                    id="flightArrows"
                    style={{
                      symbolPlacement: 'line',              // Repeats arrows along path
                      symbolSpacing: 80,                    // Distance between arrows
                      iconImage: 'arrow-icon',              // Custom or built-in icon
                      iconSize: 2,
                      iconAllowOverlap: true,
                      iconIgnorePlacement: true,
                      iconRotationAlignment: 'map',         // Rotate with map
                      iconKeepUpright: false,               // Allows full rotation
                    }}
                  />
                  <Mapbox.CircleLayer
                    id="photoPoints"
                    filter ={["==", ["get", "id"], imageId]}
                    style={{
                      circleRadius: 12,
                      circleColor: '#007AFF',
                      circleStrokeWidth: 1,
                      circleStrokeColor: '#fff'
                    }}
                  />

                </Mapbox.ShapeSource>
              </Mapbox.MapView>
          </View>
        </SafeAreaView>
    )
}
export default imagePage

const styles = StyleSheet.create({
    container: {
      flex: 1, // fills SafeAreaView
      flexDirection: 'column', // default; top-to-bottom
    },
    imageContainer: {
      flex: 1, // top half of the screen
      backgroundColor: '#f9f9f9',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: Dimensions.get('window').width - 10,
      height: '100%',
      resizeMode: 'cover',
    },
    mapContainer: {
      flex: 1, // bottom half of the screen
    },
    map: {
      flex: 1, // stretches to fill mapContainer
    },
  });
  