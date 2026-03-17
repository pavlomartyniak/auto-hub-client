"use client";

import {
  Box,
  Typography,
  Button,
  Divider,
  Alert,
  Stack,
  Chip,
} from "@mui/material";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import { STO } from "@/types";

interface Props {
  sto: STO;
}

export function StoBookingCard({ sto }: Props) {
  const { availableSlots } = sto;

  return (
    <Box
      sx={{
        position: "sticky",
        top: 24,
        p: { xs: 2.5, md: 3 },
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        boxShadow: "0px 8px 20px -12px rgba(0,0,0,0.1)",
        bgcolor: "common.white",
      }}
    >
      <Box display="flex" alignItems="flex-end" gap={1} mb={2}>
        <Typography variant="h5" fontWeight={800}>
          Booking
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {availableSlots && availableSlots.length > 0 ? (
        <Box mb={3}>
          <Typography
            variant="subtitle2"
            fontWeight={700}
            mb={1.5}
            display="flex"
            alignItems="center"
            gap={0.5}
          >
            <ScheduleOutlinedIcon fontSize="small" sx={{ fontSize: "1rem" }} />{" "}
            Nearest Available Slots
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {availableSlots.slice(0, 4).map((slot, index) => (
              <Chip
                key={index}
                label={slot}
                color={index === 0 ? "primary" : "default"}
                variant={index === 0 ? "filled" : "outlined"}
                onClick={() => {}}
                sx={{
                  fontWeight: index === 0 ? 600 : 500,
                  fontSize: "0.75rem",
                  px: 0.5,
                  py: 1,
                  borderRadius: 2,
                  bgcolor: index === 0 ? "primary.main" : "transparent",
                  borderColor: index !== 0 ? "grey.300" : undefined,
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: index !== 0 ? "grey.900" : undefined,
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      ) : (
        <Alert
          severity="info"
          sx={{
            mb: 3,
            borderRadius: 2,
            p: 1,
            "& .MuiAlert-message": { fontSize: "0.8125rem" },
          }}
        >
          No available slots for the next 3 days. Please call to book.
        </Alert>
      )}

      <Stack spacing={2}>
        <Button
          variant="contained"
          size="medium"
          fullWidth
          startIcon={
            <EventAvailableOutlinedIcon sx={{ fontSize: "1.25rem" }} />
          }
          sx={{
            py: 1,
            fontWeight: 700,
            borderRadius: 2,
            fontSize: "0.9375rem",
            textTransform: "none",
            boxShadow: "none",
            "&:hover": { boxShadow: "none", bgcolor: "primary.dark" },
          }}
        >
          Check out all slots
        </Button>
      </Stack>

      <Typography
        variant="caption"
        color="text.secondary"
        textAlign="center"
        mt={1.5}
        display="block"
        fontWeight={500}
      >
        You won't be charged yet
      </Typography>
    </Box>
  );
}
