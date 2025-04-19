import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { ImageCustom, Section } from "../../basics";

import FloresRetas from "../../../assets/flores-retas.png";

interface CardLocationProps {
  imageUrl: string;
  locationName: string;
  date: string;
  mapsEmbedUrl: string;
}

export default function Location({
  imageUrl,
  locationName,
  date,
  mapsEmbedUrl,
}: CardLocationProps) {
  return (
    <Section variant="rose">
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
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
      <Typography variant="h1" gutterBottom textAlign="center">
        Cerimônia
      </Typography>
      <Box>
        <Card
          sx={{
            maxWidth: 1024,
            mx: "auto",
            my: 4,
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: 6,
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
          >
            <CardMedia
              component="img"
              sx={{ width: { md: 240 }, height: 180 }}
              image={imageUrl}
              alt={locationName}
            />
            <CardContent
              sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}
            >
              <Typography
                variant="h1"
                sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
              >
                {locationName}
              </Typography>
              <Typography
                sx={{
                  mt: 1,
                  fontFamily: `'Outfit', sans-serif`,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                {date}
              </Typography>
            </CardContent>
          </Box>

          <Box sx={{ width: "100%", height: 300 }}>
            <iframe
              title="mapa-localizacao"
              src={mapsEmbedUrl}
              style={{ border: 0, width: "100%", height: "100%" }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Box>
        </Card>
      </Box>
    </Section>
  );
}
