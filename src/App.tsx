import { useState } from 'react';
import Grid from '@mui/material/Grid';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcher from './functions/DataFetcher';
import ChartUI from './components/ChartUI';
import TableUI from './components/TableUI';

import { askCohere } from './functions/CohereAssistant';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const cities = [
  { name: 'Machala', latitude: -3.2586, longitude: -79.9605 },
  { name: 'Guayaquil', latitude: -2.1962, longitude: -79.8862 },
  { name: 'Quito', latitude: -0.2298, longitude: -78.525 },
];

function App() {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [question, setQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);

  const dataFetcherOutput = DataFetcher({
    latitude: selectedCity.latitude,
    longitude: selectedCity.longitude,
  });

  const handleCityChange = (cityName: string) => {
    const city = cities.find((c) => c.name === cityName);
    if (city) setSelectedCity(city);
  };

  const handleAskAssistant = async () => {
    if (!dataFetcherOutput.data) return;

    setLoadingAI(true);
    const weatherData = {
      ciudad: selectedCity.name,
      temperatura:
        dataFetcherOutput.data.current.temperature_2m +
        ' ' +
        dataFetcherOutput.data.current_units.temperature_2m,
      humedad:
        dataFetcherOutput.data.current.relative_humidity_2m +
        ' ' +
        dataFetcherOutput.data.current_units.relative_humidity_2m,
      viento:
        dataFetcherOutput.data.current.wind_speed_10m +
        ' ' +
        dataFetcherOutput.data.current_units.wind_speed_10m,
    };

    const result = await askCohere(question, weatherData);
    setAiResponse(result.answer || result.error || '');
    setLoadingAI(false);
  };

  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">
      {/* Encabezado */}
      <Grid item xs={12} md={12}>
        <HeaderUI />
      </Grid>

      {/* Alertas */}
      <Grid item xs={12} container justifyContent="right" alignItems="center">
        <AlertUI description="No se preveen lluvias" />
      </Grid>

      {/* Selector */}
      <Grid item xs={12} md={3}>
        <SelectorUI
          cities={cities}
          selectedCity={selectedCity.name}
          onCityChange={handleCityChange}
        />
      </Grid>

      {/* Indicadores */}
      <Grid container item xs={12} md={9}>
        {dataFetcherOutput.loading && <p>Cargando datos...</p>}
        {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
        {dataFetcherOutput.data && (
          <>
            <Grid item xs={12} md={3}>
              <IndicatorUI
                title="Temperatura (2m)"
                description={
                  dataFetcherOutput.data.current.temperature_2m +
                  ' ' +
                  dataFetcherOutput.data.current_units.temperature_2m
                }
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <IndicatorUI
                title="Temperatura aparente"
                description={
                  dataFetcherOutput.data.current.apparent_temperature +
                  ' ' +
                  dataFetcherOutput.data.current_units.apparent_temperature
                }
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <IndicatorUI
                title="Velocidad del viento"
                description={
                  dataFetcherOutput.data.current.wind_speed_10m +
                  ' ' +
                  dataFetcherOutput.data.current_units.wind_speed_10m
                }
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <IndicatorUI
                title="Humedad relativa"
                description={
                  dataFetcherOutput.data.current.relative_humidity_2m +
                  ' ' +
                  dataFetcherOutput.data.current_units.relative_humidity_2m
                }
              />
            </Grid>
          </>
        )}
      </Grid>

      {/* Asistente Cohere */}
      {dataFetcherOutput.data && (
        <Grid item xs={12} md={12} sx={{ mt: 4 }}>
          <Typography variant="h6">¿Tienes una pregunta sobre el clima?</Typography>
          <TextField
            fullWidth
            label="Pregunta al asistente"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            multiline
            maxRows={4}
            sx={{ mt: 2, mb: 1 }}
          />
          <Button variant="contained" onClick={handleAskAssistant} disabled={loadingAI}>
            {loadingAI ? 'Consultando...' : 'Consultar'}
          </Button>
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Respuesta del asistente:</strong> {aiResponse}
          </Typography>
        </Grid>
      )}

      {/* Gráfico */}
      <Grid item xs={6} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
        <ChartUI
          loading={dataFetcherOutput.loading}
          error={dataFetcherOutput.error}
          hourlyData={dataFetcherOutput.data?.hourly}
        />
      </Grid>

      {/* Tabla */}
      <Grid item xs={6} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
        <TableUI
          loading={dataFetcherOutput.loading}
          error={dataFetcherOutput.error}
          hourlyData={dataFetcherOutput.data?.hourly}
        />
      </Grid>
    </Grid>
  );
}

export default App;
