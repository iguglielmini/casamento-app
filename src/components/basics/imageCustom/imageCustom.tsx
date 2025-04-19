import { Box } from "@mui/material";
import { CSSProperties } from "react";

interface ImageCustomProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  backgroundSize?: CSSProperties["backgroundSize"];
  borderRadius?: number | string;
  boxShadow?: number;
}

export default function ImageCustom({
  src,
  alt = "",
  width = 300,
  height = 468,
  backgroundSize = "cover",
  borderRadius = 2,
  boxShadow = 3,
}: ImageCustomProps) {
  return (
    <Box
      role="img"
      aria-label={alt}
      sx={{
        width,
        height,
        backgroundImage: `url(${src})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize,
        borderRadius,
        boxShadow: `${boxShadow}`,
      }}
    />
  );
}
