export const createTablesSQL = `
CREATE TABLE IF NOT EXISTS flights(
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT,
    flight_number TEXT,
    airline TEXT,
    origin TEXT,
    destination TEXT,
    departure_time DATETIME,
    arrival_time DATETIME,
    image_library_used BOOLEAN DEFAULT 0
);

CREATE TABLE IF NOT EXISTS images(
    id INTEGER PRIMARY KEY NOT NULL,
    on_device BOOLEAN,
    path TEXT,
    time DATETIME,
    lat REAL,
    long REAL,
    alt REAL,
    flight_id INTEGER REFERENCES flights(id)
);

CREATE TABLE IF NOT EXISTS flight_tracks(
    id INTEGER PRIMARY KEY NOT NULL,
    time DATETIME,
    lat REAL,
    long REAL,
    alt REAL,
    course REAL,
    speed REAL,
    climb_rate INTEGER,
    flight_id INTEGER REFERENCES flights(id)
);

CREATE TABLE IF NOT EXISTS pinpoints(
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT, 
    description TEXT,
    lat REAL,
    long REAL,
    x INTEGER,
    y INTEGER,
    image_id INTEGER REFERENCES images(id)
);

CREATE TABLE IF NOT EXISTS meta(
    key TEXT PRIMARY KEY,
    value TEXT
);
`