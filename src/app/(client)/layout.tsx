"use client";

import { Header } from "@/components/shared/Header";
import { Box } from "@mui/material";

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      {children}
    </Box>
  );
}
