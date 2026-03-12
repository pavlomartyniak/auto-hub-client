"use client";

import { Box, Typography } from "@mui/material";

export function Footer() {
  return (
    <Box component="footer" sx={{ py: 4, textAlign: "center" }}>
      <Typography variant="body2" color="text.secondary">
        AutoHub © 2026. All rights reserved.
      </Typography>
    </Box>
  );
}
