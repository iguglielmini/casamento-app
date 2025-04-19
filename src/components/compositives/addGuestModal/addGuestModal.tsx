/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Box, MenuItem, Typography, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { ModalCustom, InputCustom, ButtonCustom } from "../../basics";
import { formatPhone } from "../../../utils";

interface AddGuestModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (guest: GuestFormData) => Promise<void>;
}

export interface GuestFormData {
  name: string;
  surname: string;
  phone: string;
  invitedBy: "Noivo" | "Noiva" | "Ambos";
  type: "Amigos" | "Padrinhos" | "Familiar";
  hasCompanion: boolean;
}

export default function AddGuestModal({ open, onClose, onSubmit }: AddGuestModalProps) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [invitedBy, setInvitedBy] = useState<"Noivo" | "Noiva" | "Ambos">("Ambos");
  const [type, setType] = useState<"Amigos" | "Padrinhos" | "Familiar">("Amigos");
  const [hasCompanion, setHasCompanion] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ name, surname, phone, invitedBy, type, hasCompanion });
      onClose();
      setName("");
      setSurname("");
      setPhone("");
      setInvitedBy("Ambos");
      setType("Amigos");
      setHasCompanion(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalCustom open={open} onClose={onClose} title="Adicionar Convidado">
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Novo Convidado
        </Typography>

        <InputCustom
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          required
        />

        <InputCustom
          label="Sobrenome"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          disabled={loading}
          required
          sx={{ mt: 2 }}
        />

        <InputCustom
          label="Telefone"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          disabled={loading}
          required
          sx={{ mt: 2 }}
        />

        <InputCustom
          select
          label="Convidado por"
          value={invitedBy}
          onChange={(e) => setInvitedBy(e.target.value as any)}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          <MenuItem value="Noivo">Noivo</MenuItem>
          <MenuItem value="Noiva">Noiva</MenuItem>
          <MenuItem value="Ambos">Ambos</MenuItem>
        </InputCustom>

        <InputCustom
          select
          label="Tipo de convidado"
          value={type}
          onChange={(e) => setType(e.target.value as any)}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          <MenuItem value="Amigos">Amigos</MenuItem>
          <MenuItem value="Padrinhos">Padrinhos</MenuItem>
          <MenuItem value="Familiar">Familiar</MenuItem>
        </InputCustom>

        <Box mt={3}>
          <Typography fontWeight="bold" mb={1}>Acompanhante:</Typography>
          <RadioGroup
            row
            value={hasCompanion ? "sim" : "nao"}
            onChange={(e) => setHasCompanion(e.target.value === "sim")}
          >
            <FormControlLabel
              value="sim"
              control={<Radio disabled={loading} />}
              label="Sim"
            />
            <FormControlLabel
              value="nao"
              control={<Radio disabled={loading} />}
              label="Não"
            />
          </RadioGroup>
        </Box>

        <ButtonCustom
          type="submit"
          variantType="primary"
          sizeType="md"
          disabled={loading}
          className="w-full mt-4"
        >
          {loading ? "Adicionando..." : "Salvar Convidado"}
        </ButtonCustom>
      </form>
    </ModalCustom>
  );
}
