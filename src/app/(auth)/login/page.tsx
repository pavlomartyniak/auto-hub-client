"use client";

import { Card, Stack, Typography } from "@mui/material";

export default function LoginPage() {
  return (
    <Stack alignItems="center" sx={{ py: 6 }}>
      <Card sx={{ p: 4, width: "100%", maxWidth: 420 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          Welcome back
        </Typography>
      </Card>
    </Stack>
  );
}
