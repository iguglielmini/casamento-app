"use client";

import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { SaveToCalendarButtons } from "../saveToCalendarButtons";

interface IntroWeddingDateProps {
  id?: string;
  weddingDate: string;
  backgroundImage: string;
}

const calculateCountdown = (date: string) => {
  const difference = +new Date(date) - +new Date();
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

export default function WeddingDate({
  weddingDate,
  id,
  backgroundImage,
}: IntroWeddingDateProps) {
  const [timeLeft, setTimeLeft] = useState(calculateCountdown(weddingDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateCountdown(weddingDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <Box
      component="section"
      id={id}
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        textAlign: "center",
        px: 2,
        py: 20,
        width: "100%",
        color: "#fff",
        backgroundColor: "rgba(110, 20, 20, 0.3)", // fallback para marsala opaco
        backdropFilter: "blur(6px)",
      }}
    >
      <Typography
        variant="h1"
        mb={2}
        fontWeight="bold"
        sx={{ fontFamily: "Mrs Saint Delafield" }}
      >
        Falta
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: { xs: 2, md: 6 },
          fontWeight: "bold",
          mb: 2,
        }}
      >
        {[
          { label: "Dias", value: timeLeft.days },
          { label: "HORAS", value: timeLeft.hours },
          { label: "MINUTOS", value: timeLeft.minutes },
          { label: "SEGUNDOS", value: timeLeft.seconds },
        ].map((item) => (
          <Box key={item.label} textAlign="center">
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{
                fontSize: {
                  xs: "2.5rem",
                  md: "4rem",
                  fontFamily: "Geist Mono",
                },
              }}
            >
              {String(item.value).padStart(2, "0")}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: {
                  xs: "0.75rem",
                  md: "1rem",
                  fontFamily: "Geist Mono",
                },
              }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>

      <Typography variant="h1" mb={4} sx={{ fontFamily: "Mrs Saint Delafield" }}>
        Até nos casarmos
      </Typography>

      <SaveToCalendarButtons />
    </Box>
  );
}
