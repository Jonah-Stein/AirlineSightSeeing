import { runSeeders } from "../db/seeders/seedflights";
import { createTablesSQL } from "../db/schema";
import { Stack, useRouter, useSegments } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { GeoJsonProvider } from "@/context/GeoJsonContext";

const SCHEMA_VERSION = 1;
const initializeDb = async(db:SQLiteDatabase) => {
  await createDbIfNeeded(db);
  await seedDbIfNeeded(db);
}

const createDbIfNeeded = async(db: SQLiteDatabase)=> {
  console.log("creating database");
  try{
    await db.execAsync("DROP TABLE IF EXISTS flights")
    await db.execAsync("DROP TABLE IF EXISTS images")
    await db.execAsync("DROP TABLE IF EXISTS flight_tracks")
    await db.execAsync("DROP TABLE IF EXISTS pinpoints")
    await db.execAsync("DROP TABLE IF EXISTS meta")

    console.log("Cleared db")
  } catch(e){
    console.log(e)
  }
  const [version] = await db.getAllAsync("SELECT value FROM meta WHERE key = 'schema_version'").catch(()=>[]);
  //@ts-ignore
  if(Number(version?.value) === SCHEMA_VERSION){
    console.log("db up to date");
    return;
  }

  try{
    console.log("Initializing db...");
    await db.execAsync(createTablesSQL);
    await db.runAsync("INSERT OR REPLACE INTO meta (key, value) VALUES (?, ?)", ['schema_version', SCHEMA_VERSION])
    await db.runAsync("INSERT OR REPLACE INTO meta (key, value) VALUES (?, ?)", ["seeded", 0]);
    console.log("Database schema initialized");
  } catch(e){
    console.error("Error creating tables:", e);
  }
}

const seedDbIfNeeded = async(db: SQLiteDatabase) => {
  console.log("Checking seeded data");
  const [seeded] = await db.getAllAsync("SELECT value FROM meta WHERE key = 'seeded'");
  
  //@ts-ignore
  if(Number(seeded?.value) === 1){
    console.log("Already seeded");
    return;
  }

  await runSeeders(db);
}

export default function RootLayout() {
  return(
    <SQLiteProvider databaseName="airlinetracker" onInit={initializeDb}>
    <GeoJsonProvider>
    <Stack>
      <Stack.Screen name="index" options={{
        headerTitle: "Authenticate",
        //headerShown: false,
      }}/>
      <Stack.Screen name="(tabs)" options = {{ headerShown: false }}/>
      <Stack.Screen name ="flights" options = {{headerShown: false}}/>
      <Stack.Screen name = "images" options = {{headerShown: false}}/>
    </Stack>
    </GeoJsonProvider>
    </SQLiteProvider>
  );
}
