import { SQLiteDatabase } from "expo-sqlite";
import {flightsdata} from "./flightsdata";
import {flighttracksdata} from "./flighttracksdata";



export async function runSeeders(db: SQLiteDatabase) {
  try{
    await db.withTransactionAsync(async () => {
    // Insert into flights
    console.log("Seeding flights");
    for (const flight of flightsdata) {
      await db.runAsync(
        `INSERT INTO flights (airline, name, flight_number, origin, destination, departure_time, arrival_time)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
        flight.airline,
        flight.name,
        flight.flight_number,
        flight.origin,
        flight.destination,
        flight.departure_time,
        flight.arrival_time,
        ]
      );
    }

    // Insert into flight_tracks
    console.log("Seeding flight tracks");
    for (const track of flighttracksdata) {
      await db.runAsync(
        `INSERT INTO flight_tracks (time, lat, long, alt, course, speed, climb_rate, flight_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
        track.time,
        track.lat,
        track.long,
        track.alt,
        track.course,
        track.speed,
        track.climb_rate,
        track.flight_id
        ]
      );  
    }
    console.log("updating meta");
    db.runAsync("UPDATE meta SET value = ? WHERE key = ?", [1, "seeded"])
    console.log("Seeding successful");
  });
  } catch (e) {
    console.error("Error seeding data:", e);
  }
}