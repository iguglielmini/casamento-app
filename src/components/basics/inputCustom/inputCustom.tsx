import { TextField, TextFieldProps } from '@mui/material';

export default function InputCustom(props: TextFieldProps) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      {...props}
    />
  );
}
