import type { Hourly } from '../types/DashboardTypes';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

interface ChartUIProps {
  loading: boolean;
  error: string | null;
  hourlyData?: Hourly;
}

export default function ChartUI({ loading, error, hourlyData }: ChartUIProps) {
  if (loading) return <p>Cargando gráfico...</p>;
  if (error) return <p>Error en gráfico: {error}</p>;
  if (!hourlyData) return <p>No hay datos para mostrar</p>;

  const data = hourlyData.time.map((time, index) => ({
    time,
    temperature: hourlyData.temperature_2m[index],
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}
