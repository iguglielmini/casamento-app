import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ImageCustom, Section } from "../../basics";

import FloresRetas from "../../../assets/flores-retas.png";

const faqItems = [
  {
    question: "Como posso chegar ao local?",
    answer:
      "O local é acessível por ônibus e carro. Você pode encontrar o endereço ao procurar por Vinttage Eventos em qualquer mapa.",
  },
  {
    question: "Quais são as regras de vestuário?",
    answer:
      "Lembre-se: branco somente para a noiva! O traje sugerido é elegante. A cerimônia e a recepção serão realizadas em ambiente climatizado.",
  },
  {
    question: "Posso convidar alguém?",
    answer:
      "Lembre-se: convidado não convida! Seu convite é pessoal, único e intransferível.",
  },
];

export default function Faq() {
  return (
    <Section variant="white">
      <Box
        sx={{
          maxWidth: 800,
          mx: "auto",
          py: { xs: 6, md: 10 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ImageCustom
            src={FloresRetas}
            alt="Flores"
            backgroundSize="contain"
            height="150px"
            width="320px"
            boxShadow={0}
          />
        </Box>
        <Typography
          variant="h1"
          textAlign="center"
          sx={{ fontSize: { xs: "3rem", md: "5rem" }, mb: 4 }}
        >
          Você deve estar se perguntando...
        </Typography>

        {faqItems.map((item, index) => (
          <Accordion key={index} disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                variant="h1"
                sx={{ fontSize: { xs: "1.5rem", md: "2.5rem" } }}
              >
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Section>
  );
}
