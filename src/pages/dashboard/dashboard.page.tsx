import { Container, Typography, Paper } from "@mui/material";

export default function DashboardPage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 12 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Dashboard
        </Typography>
      </Paper>
    </Container>
  );
}
