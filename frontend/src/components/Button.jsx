import Button from '@mui/material/Button';

export default function CustomButton({variant, color, onClick, title, type="button"}) {
    return (
        <Button variant={variant} color={color} onClick={onClick} fullWidth type={type}>
            {title}
        </Button>
    );
}