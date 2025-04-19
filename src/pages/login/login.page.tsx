import { Box, Typography, Paper } from "@mui/material";
import { useState } from "react";
import { ButtonCustom, InputCustom } from "../../components/basics";
import BgImg from "../../assets/intro-home.png";
import { useAuth } from "../../context";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(username, password);
      navigate("/dashboard");
    } catch (err) {
      console.info(err);
      setError(`Usuário ou senha inválidos`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${BgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 4,
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(255,255,255,0.85)",
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
        >
          Área Administrativa
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <InputCustom
            label="Usuário"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
          />

          <InputCustom
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            sx={{ mt: 2 }}
          />

          {error && (
            <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
              {error}
            </Typography>
          )}

          <ButtonCustom
            type="submit"
            variantType="primary"
            sizeType="md"
            className="w-full"
            style={{ marginTop: "1.5rem" }}
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </ButtonCustom>
        </Box>
      </Paper>
    </Box>
  );
}
