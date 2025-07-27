import React, { createContext, useContext, useState } from 'react';

export const GeoJsonContext = createContext({
  geoJson: null as any,
  setGeoJson: (_data: any) => {},
});

export const GeoJsonProvider = ({ children }: { children: React.ReactNode }) => {
  const [geoJson, setGeoJson] = useState(null);
  return (
    <GeoJsonContext.Provider value={{ geoJson, setGeoJson }}>
      {children}
    </GeoJsonContext.Provider>
  );
};

export const useGeoJson = () => useContext(GeoJsonContext);