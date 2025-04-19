import { Box, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ButtonCustom } from "../../basics";

interface IntroPageProps {
  backgroundImage: string;
  title?: string;
  subtitle?: string;
}

export default function IntroPage({
  backgroundImage,
  title = "Ítalo",
  subtitle = "SAVE THE DATE",
}: IntroPageProps) {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("our-history");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      component="section"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "#fff",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <Box>
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: "4rem", md: "6rem" }, fontWeight: "bold" }}
        >
          {title}
        </Typography>
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: "4rem", md: "6rem" }, fontWeight: "bold" }}
        >
          &
        </Typography>
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: "4rem", md: "6rem" }, fontWeight: "bold" }}
        >
          Daniely
        </Typography>

        <Typography
          variant="h6"
          sx={{ mt: 2, fontSize: { xs: "1rem", md: "1.25rem" }, p: 2 }}
        >
          {subtitle}
        </Typography>

        <Box
          sx={{
            animation: "bounce 2s infinite",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ButtonCustom
            typeStyle="circle"
            sizeType="lg"
            variantType="primary"
            onClick={scrollToNextSection}
          >
            <ExpandMoreIcon />
          </ButtonCustom>
        </Box>
      </Box>
    </Box>
  );
}
