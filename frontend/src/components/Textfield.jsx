import TextField from '@mui/material/TextField';

export default function CustomTextField({ label = "Default Label", variant = "outlined", onChange, type = "text", autoComplete = "off" }) {
    return (
        <TextField onChange={onChange} label={label} variant={variant} fullWidth type={type} autoComplete={autoComplete} />
    );
}