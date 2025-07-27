import { View, Text, Button, StyleSheet, Dimensions, SafeAreaView } from "react-native"
import Mapbox from '@rnmapbox/maps'
import Config from 'react-native-config'
import flightpath from '../../flightpathwtimestamps.json'
import type { Feature } from 'geojson';
import { useGeoJson } from "../../context/GeoJsonContext";

// const flightPath = flightpath as Feature;

const MapboxAccessToken = Config.MAPBOX_ACCESS_TOKEN || null;
Mapbox.setAccessToken(MapboxAccessToken);
const defaultCoord = [32.16, -90]



const Page = () => {
  const flightPath = useGeoJson().geoJson
  //const user = getAuth().currentUser;
  const centerCoordinate = flightPath.features[0].geometry.coordinates[0]?.slice(0, 2) || defaultCoord 
  return (
    <SafeAreaView>
        <View style={styles.container}>
          <Mapbox.MapView style={{ flex: 1 }}>
            <Mapbox.Camera
              centerCoordinate={centerCoordinate}
              zoomLevel={2}
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
              <Mapbox.CircleLayer
                id="photoPoints"
                filter ={["==", ["geometry-type"], "Point"]}
       
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
  );
}
export default Page;

const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      height: height,
      width: width,
    },
    map: {
      flex: 1
    }
});