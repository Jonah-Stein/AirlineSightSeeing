import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import {getAuth} from '@react-native-firebase/auth'
import { Link, useFocusEffect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { flight, flightRow } from "../../types/types";

const Home = () => {
  const db = useSQLiteContext();
  const router = useRouter();

  const [flights, setFlights] = useState<flight[]>([]);
  const loadFlights = async () => {
    const rows = await db.getAllAsync<flightRow>("SELECT * FROM flights ORDER BY departure_time DESC")
    const parsedFlights = rows.map((row) => ({
      ...row,
      departure_time: new Date(row.departure_time),
      arrival_time: new Date(row.arrival_time)
    }))
    setFlights(parsedFlights);
  }
  useFocusEffect(
    useCallback(() => {
      loadFlights(); // Fetch data when the screen is focused
    }, [])
  );

  const flightItem = (f: flight)=>(
    <TouchableOpacity onPress = {()=>router.push({pathname: "/flights/[flightId]", params:{flightId: f.id}})} style = {styles.input}>
      <Text>Hello {f.name}</Text>
    </TouchableOpacity>
  )

  const renderItem = ({ item }: { item: flight }) => {
    return flightItem(item);
  };
  
  
  return (
    <SafeAreaView>
      <View>
        <FlatList data={flights} renderItem = {renderItem}></FlatList>
      </View>
    </SafeAreaView>
  );
}
export default Home;

const styles = StyleSheet.create({
  item: {
    flex: 1,
  },
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#555500'
  }
})
