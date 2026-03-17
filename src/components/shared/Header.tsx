"use client";

import { AppBar, Container } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";

export function Header() {
  return (
    <AppBar
      position="sticky"
      elevation={4}
      sx={{ bgcolor: "common.white", color: "black" }}
    >
      <Container sx={{ py: 1 }}>
        <NextLink href="/" passHref>
          <Image src="/logo.png" alt="Company Logo" width={150} height={50} />
        </NextLink>
      </Container>
    </AppBar>
  );
}
