import type { Hourly } from '../types/DashboardTypes';

interface TableUIProps {
  loading: boolean;
  error: string | null;
  hourlyData?: Hourly;
}

export default function TableUI({ loading, error, hourlyData }: TableUIProps) {
  if (loading) return <p>Cargando tabla...</p>;
  if (error) return <p>Error en tabla: {error}</p>;
  if (!hourlyData) return <p>No hay datos para mostrar</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Hora</th>
          <th>Temperatura (°C)</th>
        </tr>
      </thead>
      <tbody>
        {hourlyData.time.map((time, index) => (
          <tr key={time}>
            <td>{time}</td>
            <td>{hourlyData.temperature_2m[index]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
