"use client";

import { AppBar, Toolbar, Typography } from "@mui/material";

export function Header() {
  return (
    <AppBar position="sticky" elevation={0} color="primary">
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          AutoHub
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
