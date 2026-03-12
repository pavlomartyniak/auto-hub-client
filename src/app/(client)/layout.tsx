"use client";

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Box, Container } from "@mui/material";

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Container sx={{ flex: 1, py: 4, display: "flex" }}>{children}</Container>
    </Box>
  );
}
