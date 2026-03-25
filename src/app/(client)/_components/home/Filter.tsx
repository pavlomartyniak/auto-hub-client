"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";

import {
  homeFilterSchema,
  type HomeFilterValues,
} from "@/schemas/homeFilterSchema";
import { TextField } from "@/components/ui/TextField";
import { DatePicker } from "@/components/ui/DatePicker";
import { SelectField } from "@/components/ui/SelectField";
import { carMakeOptions, serviceOptions } from "@/utils/options";
import { CarMakeEnum, ServiceOptionsEnum } from "@/utils/enum-options";
import { useRouter, useSearchParams } from "next/navigation";

export function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const methods = useForm<HomeFilterValues>({
    resolver: zodResolver(homeFilterSchema),
    defaultValues: {
      location: "",
      date: undefined,
      make: CarMakeEnum.Any,
      serviceType: ServiceOptionsEnum.AllServices,
    },
  });

  useEffect(() => {
    const location = searchParams.get("location");
    const date = searchParams.get("date");
    const make = searchParams.get("make");
    const serviceType = searchParams.get("serviceType");

    methods.reset({
      location: location || "",
      date: date ? date : undefined,
      make: (make as CarMakeEnum) || CarMakeEnum.Any,
      serviceType:
        (serviceType as ServiceOptionsEnum) || ServiceOptionsEnum.AllServices,
    });
  }, [searchParams]);

  const onSubmit = (data: HomeFilterValues) => {
    const params = new URLSearchParams();

    console.log("data", data);

    if (data.location) params.set("location", data.location);
    if (data.date) params.set("date", data.date);
    if (data.make && data.make !== CarMakeEnum.Any)
      params.set("make", data.make);
    if (
      data.serviceType &&
      data.serviceType !== ServiceOptionsEnum.AllServices
    ) {
      params.set("serviceType", data.serviceType);
    }

    router.push(`/?${params.toString()}`);

    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  // The inner form inputs that we will reuse in both Desktop and Mobile views
  const filterFormContent = (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems={{ xs: "stretch", md: "center" }}
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
      <Box sx={{ flex: 1.5, px: { xs: 0, md: 2 }, width: "100%" }}>
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          Location
        </Typography>
        <TextField
          size="small"
          name="location"
          placeholder="e.g. Kyiv, Ukraine"
        />
      </Box>

      {/* Date */}
      <Box sx={{ flex: 1, px: { xs: 0, md: 2 }, width: "100%" }}>
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
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
      <Box sx={{ flex: 1, px: { xs: 0, md: 2 }, width: "100%" }}>
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          Make
        </Typography>
        <SelectField name="make" size="small" options={carMakeOptions} />
      </Box>

      {/* Service Type */}
      <Box sx={{ flex: 1, px: { xs: 0, md: 2 }, width: "100%" }}>
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          Service Type
        </Typography>
        <SelectField name="serviceType" size="small" options={serviceOptions} />
      </Box>

      {/* Search Button */}
      <Box
        sx={{
          px: { xs: 0, md: 1 },
          py: { xs: 0, md: 0 },
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
            py: { xs: 1.5, md: 1 },
          }}
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Box>
    </Stack>
  );

  return (
    <FormProvider {...methods}>
      {isMobile ? (
        <Box sx={{ width: "100%" }}>
          <Button
            variant="outlined"
            size="large"
            startIcon={<FilterListIcon />}
            onClick={() => setDrawerOpen(true)}
            sx={{
              width: "100%",
              borderRadius: "12px",
              justifyContent: "center",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
              backgroundColor: "background.paper",
            }}
          >
            Filters
          </Button>

          <Drawer
            anchor="bottom"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{
              sx: {
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                px: 2,
                pt: 2,
                pb: 4,
                maxHeight: "90vh",
              },
            }}
          >
            <Box
              component="form"
              onSubmit={methods.handleSubmit(onSubmit)}
              sx={{ width: "100%" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" fontWeight={700}>
                  Filters
                </Typography>
                <IconButton onClick={() => setDrawerOpen(false)} size="small">
                  <CloseIcon />
                </IconButton>
              </Box>

              <Divider sx={{ mb: 3, mx: -2 }} />
              {filterFormContent}
            </Box>
          </Drawer>
        </Box>
      ) : (
        // DESKTOP VIEW: Inline Paper Strip
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
          {filterFormContent}
        </Paper>
      )}
    </FormProvider>
  );
}
