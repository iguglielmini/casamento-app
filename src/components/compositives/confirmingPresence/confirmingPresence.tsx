import React from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  Link as MuiLink,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { formatPhone } from "../../../utils";
import { ButtonCustom, InputCustom, ModalCustom } from "../../basics";
import { SaveToCalendarButtons } from "../saveToCalendarButtons";

import FloresRetas from "../../../assets/flores-retas.png";

export default function ConfirmingPresence() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [hasCompanion, setHasCompanion] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    surname: false,
    phone: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({
      name: !name,
      surname: !surname,
      phone: !phone,
    });

    if (!name || !surname || !phone) return;

    setLoading(true);
    setMessage("");

    try {
      // Simular requisição
      await new Promise((res) => setTimeout(res, 1000));
      setMessage("Presença confirmada com sucesso!");
      setName("");
      setSurname("");
      setPhone("");
    } catch {
      setMessage("Erro ao confirmar presença. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        px: 3,
        py: 6,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        component="img"
        src={FloresRetas}
        alt="flores"
        sx={{ width: "100%", maxWidth: 320, mb: 2 }}
      />

      <Typography variant="h3" gutterBottom>
        Estamos ansiosos para comemorar com você!
      </Typography>

      <Typography variant="h6" sx={{ maxWidth: 600 }} mb={4}>
        A sua presença já é um presente enorme. Se você desejar nos enviar algo
        mais, nossa lista de presentes está no{" "}
        <MuiLink
          href="https://www.ferreiracosta.com/lista-de-casamento/presentes/italoedaniely2"
          target="_blank"
          underline="hover"
          color="warning.main"
        >
          Ferreira Costa
        </MuiLink>
        .
      </Typography>

      <ButtonCustom
        onClick={() => setModalOpen(true)}
        variantType="primary"
        typeStyle="circle"
        sizeType="lg"
      >
        <Typography variant="h5">Confirme sua presença</Typography>
      </ButtonCustom>

      <ModalCustom
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirme sua presença"
      >
        <form onSubmit={handleSubmit}>
          <InputCustom
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            error={errors.name}
            disabled={loading}
          />

          <InputCustom
            label="Sobrenome"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
            error={errors.surname}
            disabled={loading}
            sx={{ mt: 2 }}
          />

          <InputCustom
            label="Telefone"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            required
            error={errors.phone}
            disabled={loading}
            sx={{ mt: 2 }}
          />

          <Box display="flex" alignItems="center" sx={{ mt: 3 }}>
            <FormControl sx={{ mt: 3, mb: 4 }} component="fieldset">
              <FormLabel
                component="legend"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  width: "100%",
                  mb: 1,
                }}
              >
                Vai levar acompanhante?
              </FormLabel>
              <RadioGroup
                row
                aria-label="acompanhante"
                name="has-companion"
                value={hasCompanion ? "yes" : "no"}
                onChange={(e) => setHasCompanion(e.target.value === "yes")}
                sx={{ justifyContent: "center", gap: 4 }}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio disabled={loading} />}
                  label="Sim"
                />
                <FormControlLabel
                  value="no"
                  control={<Radio disabled={loading} />}
                  label="Não"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <ButtonCustom
            type="submit"
            variantType="primary"
            sizeType="md"
            disabled={loading}
            className="w-full mt-4"
          >
            {loading ? "Enviando..." : "Confirmar presença"}
          </ButtonCustom>

          {message && (
            <Typography
              sx={{
                mt: 2,
                textAlign: "center",
                animation: "fadeIn 0.5s",
                color: "gray",
              }}
            >
              {message}
            </Typography>
          )}
        </form>
      </ModalCustom>

      <Box sx={{ mt: 6 }}>
        <SaveToCalendarButtons />
      </Box>
    </Box>
  );
}
