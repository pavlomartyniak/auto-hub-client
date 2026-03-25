"use client";

import { Routes } from "@/utils/routes";
import {
  Button,
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Grid,
} from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useCallback } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
];

export default function StoBookingCalendarModal({ isOpen, onClose }: Props) {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const stoId = params.id;

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // ✅ derived state
  const isBookDisabled = useMemo(() => {
    return !selectedDate || !selectedTime;
  }, [selectedDate, selectedTime]);

  // ✅ handlers (stable references)
  const handleSelectTime = useCallback((time: string) => {
    setSelectedTime(time);
  }, []);

  const handleBook = useCallback(() => {
    if (!selectedDate || !selectedTime) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set("bookingDate", selectedDate.toISOString());
    params.set("bookingTime", selectedTime);

    router.push(
      `${Routes.STO_BOOK_PAGE.replace(":id", stoId as string)}?${params.toString()}`,
    );

    onClose();
  }, [selectedDate, selectedTime, searchParams, stoId, onClose]);

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent
        sx={{
          display: "flex",
          gap: 3,
          alignItems: "flex-start",
        }}
      >
        {/* 📅 Calendar */}
        <StaticDatePicker
          disablePast
          value={selectedDate}
          onChange={setSelectedDate}
          slotProps={{ actionBar: { actions: [] } }}
        />

        {/* ⏰ Time selection */}
        <Box
          display="flex"
          flexDirection="column"
          gap={3}
          minWidth={220}
          mt={2}
        >
          {/* Selected */}
          <Box>
            <Typography variant="caption" color="text.secondary">
              SELECTED TIME
            </Typography>
            <Typography variant="h4">{selectedTime ?? "-- --"}</Typography>
          </Box>

          {/* Slots */}
          <Grid
            container
            spacing={2}
            maxHeight={260}
            maxWidth={{ xs: "unset", xl: 300 }}
            overflow="auto"
            p={2}
            sx={{
              boxShadow: 2,
              borderRadius: 2,
            }}
          >
            {TIME_SLOTS.map((slot) => {
              const isSelected = selectedTime === slot;

              return (
                <Grid size={6} key={slot}>
                  <Chip
                    disabled={!selectedDate}
                    label={slot}
                    onClick={() => handleSelectTime(slot)}
                    color={isSelected ? "primary" : "default"}
                    variant={isSelected ? "filled" : "outlined"}
                    sx={{
                      width: "100%",
                      borderRadius: 2,
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="contained"
          onClick={handleBook}
          disabled={isBookDisabled}
        >
          Book
        </Button>
      </DialogActions>
    </Dialog>
  );
}
