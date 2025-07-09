import Alert from '@mui/material/Alert';

export interface AlertConfig {
  description: string;
  variant?: 'outlined' | 'filled' | 'standard';
  severity?: 'error' | 'warning' | 'info' | 'success';
}

export default function AlertUI(config: AlertConfig) {
  return (
    <Alert
      variant={config.variant ?? 'outlined'}
      severity={config.severity ?? 'success'}
    >
      {config.description}
    </Alert>
  );
}
