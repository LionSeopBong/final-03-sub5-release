'use client';

import { useEffect, useState } from 'react';
import { latLngToGrid } from '@/lib/dfs';

export default function WeatherByLocation() {
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    const id = navigator.geolocation.watchPosition(
      async (p) => {
        const { latitude, longitude } = p.coords;
        const { nx, ny } = latLngToGrid(latitude, longitude);

        const res = await fetch(`/api/weather?nx=${nx}&ny=${ny}`);
        const data = await res.json();
        setWeather(data);
      },
      console.error,
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(id);
  }, []);

  return (
    <pre className="text-xs bg-gray-100 p-3 rounded">
      {JSON.stringify(weather, null, 2)}
    </pre>
  );
}
