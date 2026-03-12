"use client";

import { Stack, Typography } from "@mui/material";

export default function RegisterPage() {
  return (
    <Stack spacing={2} sx={{ py: 6 }}>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        Register
      </Typography>
      <Typography color="text.secondary">
        Registration form will be added here.
      </Typography>
    </Stack>
  );
}
