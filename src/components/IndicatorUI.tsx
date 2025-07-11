import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface IndicatorUIProps {
    title?: string;
    description?: string;
}

export default function IndicatorUI(props: IndicatorUIProps) {
    return (
        <Card>
            <CardContent sx={{ height: '100%' }}>
                {props.title && (
                    <Typography variant="h5" component="div">
                        {props.title}
                    </Typography>
                )}
                {props.description && (
                    <Typography variant="body2" color="text.secondary">
                        {props.description}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}
