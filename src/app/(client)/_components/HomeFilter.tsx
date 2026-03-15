"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import {
  homeFilterSchema,
  type HomeFilterValues,
} from "@/schemas/homeFilterSchema";
import { TextField } from "@/components/ui/TextField";
import { DatePicker } from "@/components/ui/DatePicker";

export function HomeFilter() {
  const methods = useForm<HomeFilterValues>({
    resolver: zodResolver(homeFilterSchema),
    defaultValues: {
      location: "",
      date: undefined,
      make: "",
      model: "",
    },
  });

  const onSubmit = (data: HomeFilterValues) => {
    // This logs the formatted data for verification
    console.log("Filter Data:", data);
  };

  return (
    <FormProvider {...methods}>
      <Paper
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        elevation={4}
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1,
          width: "100%",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: { xs: "none", md: "block" } }}
            />
          }
          sx={{ width: "100%" }}
        >
          {/* Location */}
          <Box sx={{ flex: 1.5, px: 2, width: "100%" }}>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={600}
            >
              Location
            </Typography>
            <TextField
              size="small"
              name="location"
              placeholder="e.g. Kyiv, Ukraine"
            />
          </Box>

          {/* Date */}
          <Box sx={{ flex: 1, px: 2, width: "100%" }}>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={600}
            >
              Repair Date
            </Typography>
            <DatePicker
              name="date"
              format="MMM d, yyyy"
              slotProps={{
                textField: {
                  size: "small",
                },
              }}
            />
          </Box>

          {/* Make */}
          <Box sx={{ flex: 1, px: 2, width: "100%" }}>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={600}
            >
              Make
            </Typography>
            <TextField name="make" placeholder="e.g. BMW" size="small" />
          </Box>

          {/* Model */}
          <Box sx={{ flex: 1, px: 2, width: "100%" }}>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={600}
            >
              Model
            </Typography>
            <TextField name="model" placeholder="e.g. X5" size="small" />
          </Box>

          {/* Search Button */}
          <Box
            sx={{
              px: 1,
              py: { xs: 1, md: 0 },
              width: { xs: "100%", md: "auto" },
            }}
          >
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              sx={{
                borderRadius: "50px",
                minWidth: { xs: "100%", md: "auto" },
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
              }}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Box>
        </Stack>
      </Paper>
    </FormProvider>
  );
}
