import { useState } from "react";
import { Text, View, StyleSheet, KeyboardAvoidingView, TextInput, Button, ActivityIndicator } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import * as SQLite from 'expo-sqlite';

export default function Index() {
  const router = useRouter();
  return(
    <View><Text>Testing text</Text>
    <Button title = 'Bypass Sign in' onPress = {()=> router.replace("/(tabs)/home")}/>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: '#fff'
  }
})
