"use client";

import { AppBar, Toolbar } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";

export function Header() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: "common.white", color: "black" }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <NextLink href="/" passHref>
          <Image src="/logo.png" alt="Company Logo" width={150} height={50} />
        </NextLink>
      </Toolbar>
    </AppBar>
  );
}
