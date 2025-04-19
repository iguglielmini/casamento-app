import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  variant?: 'white' | 'rose';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | false;
  py?: number;
  px?: number;
}

export default function Section({
  children,
  variant = 'white',
  maxWidth = 'lg',
  py = 6,
  px = 2,
}: SectionProps) {
  const backgroundColor =
    variant === 'rose' ? 'var(--color-rose-light)' : '#ffffff';

  return (
    <Box sx={{ backgroundColor, py, px }}>
      <Container maxWidth={maxWidth}>{children}</Container>
    </Box>
  );
}
