import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface DataFetcherProps {
  latitude: number;
  longitude: number;
  cacheMinutes?: number; // tiempo configurable (por defecto 10 minutos)
}

interface DataFetcherOutput {
  data: OpenMeteoResponse | null;
  loading: boolean;
  error: string | null;
}

const CACHE_PREFIX = 'weather_cache';

function getCacheKey(lat: number, lon: number) {
  return `${CACHE_PREFIX}_${lat.toFixed(4)}_${lon.toFixed(4)}`;
}

export default function DataFetcher({
  latitude,
  longitude,
  cacheMinutes = 10,
}: DataFetcherProps): DataFetcherOutput {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!latitude || !longitude) return;

    const cacheKey = getCacheKey(latitude, longitude);
    const cacheExpiry = cacheMinutes * 60 * 1000;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const cached = localStorage.getItem(cacheKey);

        if (cached) {
          const parsed = JSON.parse(cached);
          const isFresh = Date.now() - parsed.timestamp < cacheExpiry;

          if (isFresh) {
            setData(parsed.data);
            setLoading(false);
            return;
          }
        }

        // Si no hay datos o están caducados, hacer fetch
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m&current=relative_humidity_2m,apparent_temperature,rain,wind_speed_10m,temperature_2m&timezone=America%2FChicago`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }

        const result: OpenMeteoResponse = await response.json();
        setData(result);

        // Guardar en caché
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ timestamp: Date.now(), data: result })
        );
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);

          // Intentar usar los datos en caché aunque estén vencidos
          const cached = localStorage.getItem(cacheKey);
          if (cached) {
            const parsed = JSON.parse(cached);
            setData(parsed.data);
          }
        } else {
          setError('Ocurrió un error desconocido al obtener los datos.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [latitude, longitude, cacheMinutes]);

  return { data, loading, error };
}