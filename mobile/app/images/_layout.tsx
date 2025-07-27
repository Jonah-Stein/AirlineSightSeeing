import { Stack } from "expo-router";

const imageLayout = () =>{
    return(
        <Stack>
            <Stack.Screen name="[imageId]" options = {{headerShown: false}}/>
        </Stack>
    )
}

export default imageLayout;