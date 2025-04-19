import { Box, Typography } from "@mui/material";
import { ImageCustom, Section } from "../../basics";

import ElaImg from "../../../assets/foto3.jpg";
import EleImg from "../../../assets/foto4.jpg";
import NosImg from "../../../assets/foto2.jpg";

export default function OurHistory() {
  return (
    <Section>
      <Typography variant="h1" gutterBottom textAlign="center">
        História
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ maxWidth: "320px" }} mt={2}>
          <ImageCustom src={ElaImg} alt="Casal" backgroundSize="cover" />
          <Typography
            variant="h4"
            mt={2}
            textAlign="center"
            sx={{ fontFamily: "Mrs Saint Delafield" }}
          >
            Daniely História
          </Typography>
          <Typography variant="body1" mt={2} textAlign="center">
            Daniely Santos cresceu na cidade de Parelhas, no Rio Grande do
            Norte. Com o passar do tempo, formou-se em Contabilidade pela UFPB e
            atualmente atua na área pública. É apaixonada por aventuras e
            viagens, sempre em busca de novos lugares e experiências.
          </Typography>
        </Box>
        <Box sx={{ maxWidth: "320px" }} mt={2}>
          <ImageCustom src={EleImg} alt="Casal" backgroundSize="cover" />
          <Typography
            variant="h4"
            mt={2}
            textAlign="center"
            sx={{ fontFamily: "Mrs Saint Delafield" }}
          >
            Ítalo História
          </Typography>
          <Typography variant="body1" mt={2} textAlign="center">
            Ítalo é formado em Ciência da Computação. Passou parte da infância
            com os pais em Manaus e outra parte com os avós em João Pessoa.
            Hoje, atua como Engenheiro de Software, unindo criatividade e
            tecnologia no seu dia a dia.
          </Typography>
        </Box>
        <Box sx={{ maxWidth: "320px" }} mt={2}>
          <ImageCustom src={NosImg} alt="Casal" backgroundSize="cover" />
          <Typography
            variant="h4"
            mt={2}
            textAlign="center"
            sx={{ fontFamily: "Mrs Saint Delafield" }}
          >
            Nosso relacionamento
          </Typography>
          <Typography variant="body1" mt={2} textAlign="center">
            Nós nos conhecemos há muito tempo, entre conversas e reclamações
            divertidas no Instagram. Após um breve afastamento, aqui estamos,
            mais próximos do que nunca, prontos para o grande dia do nosso
            casamento!
          </Typography>
        </Box>
      </Box>
    </Section>
  );
}
