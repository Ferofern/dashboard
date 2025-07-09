import Grid from '@mui/material/Grid';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';

function App() {
  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">

      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }}>
        <HeaderUI />
      </Grid>

      {/* Alertas */}
      <Grid
        size={{ xs: 12 }}
        container
        justifyContent="right"
        alignItems="center"
      >
        <AlertUI description="No se preveen lluvias" />
      </Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}>Elemento: Selector</Grid>

      {/* Indicadores */}
      <Grid size={{ xs: 12, md: 9 }}>Elemento: Indicadores</Grid>

      {/* Gráfico */}
      <Grid sx={{ display: { xs: 'none', md: 'block' } }}>
        Elemento: Gráfico
      </Grid>

      {/* Tabla */}
      <Grid sx={{ display: { xs: 'none', md: 'block' } }}>
        Elemento: Tabla
      </Grid>

    </Grid>
  );
}

export default App;
