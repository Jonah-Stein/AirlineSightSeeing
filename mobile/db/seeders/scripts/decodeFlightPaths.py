import re
from datetime import datetime, timedelta
import os
import json

print(os.listdir("."))

# Open the file with correct path
# Paste the text into the specified file
file = open("./db/seeders/scripts/flighttracktext.txt")

# Base date assumption (since the flight was on 4/17/2025 EDT -> UTC+4)
# Change this time
base_date = datetime(2025, 4, 14)

# Regex pattern to match each line of tracking data
pattern = re.compile(r"\w{3} (\d{2}:\d{2}:\d{2} [AP]M)\s+([\d.-]+)\s+([\d.-]+)\s+[↘↗↑←→↖↙↓]*\s*(\d{1,3})°\s+(\d+)\s+(\d+)\s+([\d,]+)(?:\s+([\d,]+))?")

seed_data = []
for line in file:
    match = pattern.match(line)
    if match:
        time_str, lat, lon, course, kts, mph, alt, climb_rate = match.groups()
        
        # Parse time and convert to UTC
        time_obj = datetime.strptime(time_str, "%I:%M:%S %p")
        full_time = base_date.replace(hour=time_obj.hour, minute=time_obj.minute, second=time_obj.second)
        full_time_utc = full_time + timedelta(hours=4)  # Convert from EDT to UTC

        seed_data.append({
            "time": full_time_utc.isoformat() + "Z",
            "lat": float(lat),
            "long": float(lon),
            "alt": int(alt.replace(",", "")),
            "course": float(course),
            "speed": int(mph),  # use mph instead of knots for your schema
            "climb_rate": int(climb_rate.replace(",", "")) if climb_rate else 0,
            "flight_id": 6
        })

file.close()

# Save to a JS file
# Change the name of the file
output_path = "./db/seeders/flight_tracks.js"
with open(output_path, "w+") as f:
    # f.write("const flightTracks = ")
    # json.dump(seed_data, f, indent=2)
    # f.write(";")
    #  f.write("const flightTracks = [\n")
    for entry in seed_data:
        # Manually format each entry
        line = (
            f"{{time: \"{entry['time']}\", "
            f"lat: {entry['lat']}, "
            f"long: {entry['long']}, "
            f"alt: {entry['alt']}, "
            f"course: {entry['course']}, "
            f"speed: {entry['speed']}, "
            f"climb_rate: {entry['climb_rate']}, "
            f"flight_id: {entry['flight_id']}}},\n"
        )
        f.write(line)
    f.write("];\n")

print(f"Data successfully written to {output_path}")