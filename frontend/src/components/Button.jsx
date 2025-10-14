import Button from '@mui/material/Button';

export default function CustomButton({variant, color, onClick, title, type="button", disabled=false, loading=false}) {
    return (
        <Button 
            variant={variant} 
            disabled={disabled} 
            color={color} 
            onClick={onClick} 
            fullWidth 
            type={type}
            loading={loading}
        >
            {title}
        </Button>
    );
}