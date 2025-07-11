import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface DataFetcherProps {
  latitude: number;
  longitude: number;
}

interface DataFetcherOutput {
  data: OpenMeteoResponse | null;
  loading: boolean;
  error: string | null;
}

export default function DataFetcher({ latitude, longitude }: DataFetcherProps): DataFetcherOutput {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!latitude || !longitude) return;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m&current=relative_humidity_2m,apparent_temperature,rain,wind_speed_10m,temperature_2m&timezone=America%2FChicago`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }

        const result: OpenMeteoResponse = await response.json();
        setData(result);
      } catch (err: any) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ocurrió un error desconocido al obtener los datos.');
        }
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    setError(null);
    fetchData();

  }, [latitude, longitude]);

  return { data, loading, error };
}
