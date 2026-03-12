"use client";

import {
  Box,
  Grid,
  Switch,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const days = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
];

const hours = Array.from({ length: 24 }, (_, i) => i);

export function AvailabilityCalendar() {
  const { control, watch } = useFormContext();

  const availabilityBooking = watch("availabilityBooking");

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {days.map((day) => {
        const enabled = availabilityBooking?.[day.key]?.enabled;

        return (
          <Grid container alignItems="center" spacing={2} key={day.key}>
            <Grid size={3}>
              <Typography fontWeight={600}>{day.label}</Typography>
            </Grid>

            <Grid size={2}>
              <Controller
                name={`availabilityBooking.${day.key}.enabled`}
                control={control}
                render={({ field }) => (
                  <Switch {...field} checked={field.value ?? false} />
                )}
              />
            </Grid>

            <Grid size={3}>
              <Controller
                name={`availabilityBooking.${day.key}.from`}
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth disabled={!enabled}>
                    <Select {...field} value={field.value ?? 9} size="small">
                      {hours.map((h) => (
                        <MenuItem key={h} value={h}>
                          {String(h).padStart(2, "0")}:00
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid size={1}>
              <Typography align="center">–</Typography>
            </Grid>

            <Grid size={3}>
              <Controller
                name={`availabilityBooking.${day.key}.to`}
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth disabled={!enabled}>
                    <Select {...field} value={field.value ?? 18} size="small">
                      {hours.map((h) => (
                        <MenuItem key={h} value={h}>
                          {String(h).padStart(2, "0")}:00
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        );
      })}
    </Box>
  );
}
