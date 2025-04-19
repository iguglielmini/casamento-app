import { Button, ButtonProps } from "@mui/material";
import { ReactNode } from "react";
import { styled } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";

interface ButtonCustomProps extends ButtonProps {
  variantType?: "primary" | "secondary";
  typeStyle?: "default" | "circle";
  sizeType?: "sm" | "md" | "lg";
  children: ReactNode;
  target?: string;
  rel?: string;
  href?: string;
  component?: React.ElementType;
}

const sizeMap = {
  sm: "50px",
  md: "120px",
  lg: "auto",
};

export default function ButtonCustom({
  variantType = "primary",
  typeStyle = "default",
  sizeType = "md",
  children,
  ...props
}: ButtonCustomProps) {
  const CustomBtn = styled(Button)(({ theme }: { theme: Theme }) => ({
    borderRadius: typeStyle === "circle" ? "30px" : "10px",
    minWidth: typeStyle === "circle" ? sizeMap[sizeType] : undefined,
    width: typeStyle === "circle" ? sizeMap[sizeType] : undefined,
    height: typeStyle === "circle" ? sizeMap[sizeType] : undefined,
    padding: typeStyle === "default" ? "8px 16px" : undefined,
    backgroundColor:
      variantType === "primary" ? "var(--color-marsala)" : "#fff",
    color: variantType === "primary" ? "#fff" : "#000",
    "&:hover": {
      backgroundColor:
        variantType === "primary"
          ? "var(--color-marsala)"
          : theme.palette.grey[200],
      filter: variantType === "primary" ? "brightness(1.1)" : undefined,
    },
    boxShadow: variantType === "secondary" ? theme.shadows[2] : "none",
  }));

  return <CustomBtn {...props}>{children}</CustomBtn>;
}
