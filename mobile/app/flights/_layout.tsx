import { Stack } from "expo-router";
import { GeoJsonProvider } from "@/context/GeoJsonContext";
// export default function FlightLayouts(){
//     return(
//         <GeoJsonProvider>
//             <Stack>
//                 <Stack.Screen name ="[flightId]" options ={{headerShown: false}}/>
//                 <Stack.Screen name = "map"/>
//             </Stack>
//         </GeoJsonProvider>

//     )
// }

export default function FlightLayouts(){
    return(
            <Stack>
                <Stack.Screen name ="[flightId]" options ={{headerShown: false}}/>
                <Stack.Screen name = "map"/>
            </Stack>

    )
}