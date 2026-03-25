"use client";

import { Button } from "@/components/ui/Button";
import { SelectField } from "@/components/ui/SelectField";
import { TextField } from "@/components/ui/TextField";
import { BookingFormValues, bookingSchema } from "@/schemas/bookingSchema";
import { CarMakeEnum, ServiceOptionsEnum } from "@/utils/enum-options";
import { mockSTOs } from "@/utils/mocked-data";
import { carMakeOptions, serviceOptions } from "@/utils/options";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

type FieldConfig = {
  name: keyof BookingFormValues;
  label: string;
  type: "text" | "select";
  options?: any;
};

const fields: FieldConfig[] = [
  {
    name: "serviceType",
    label: "Service Type",
    type: "select",
    options: serviceOptions,
  },
  {
    name: "make",
    label: "Make",
    type: "select",
    options: carMakeOptions,
  },
  { name: "customerName", label: "Name", type: "text" },
  { name: "customerLastName", label: "Last Name", type: "text" },
  { name: "customerEmail", label: "Email", type: "text" },
  { name: "customerPhone", label: "Phone", type: "text" },
];

const FormField = ({ field }: { field: FieldConfig }) => {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Typography variant="caption" fontWeight={600}>
        {field.label}
      </Typography>

      {field.type === "select" ? (
        <SelectField name={field.name} size="small" options={field.options} />
      ) : (
        <TextField
          name={field.name}
          size="small"
          placeholder={`Enter your ${field.label.toLowerCase()}`}
        />
      )}
    </Grid>
  );
};

const BookStoPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const stoId = params.id as string;

  const bookingDate = searchParams.get("bookingDate");
  const bookingTime = searchParams.get("bookingTime");

  const sto = mockSTOs.find((item) => item.id === stoId);

  const methods = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      stoId: "",
      date: "",
      time: "",
      customerName: "",
      make: "",
      serviceType: "",
      customerLastName: "",
      customerEmail: "",
      customerPhone: "",
    },
  });

  const onSubmit = (data: BookingFormValues) => {
    console.log("FORM DATA:", data);
  };

  useEffect(() => {
    const make = searchParams.get("make");
    const serviceType = searchParams.get("serviceType");

    methods.reset({
      stoId,
      date: bookingDate || "",
      time: bookingTime || "",
      make: (make as CarMakeEnum) || CarMakeEnum.Any,
      serviceType:
        (serviceType as ServiceOptionsEnum) || ServiceOptionsEnum.AllServices,
    });
  }, [searchParams, stoId, bookingDate, bookingTime, methods]);

  return (
    <Box
      boxShadow={4}
      sx={{ bgcolor: "common.white", minHeight: "100vh", pb: 8 }}
    >
      <Container maxWidth="lg" sx={{ pt: { xs: 2, md: 4 } }}>
        {/* 🔥 HEADER */}
        <Box mb={{ xs: 3, md: 4 }}>
          <Typography
            variant="h4"
            fontWeight={900}
            sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}
          >
            Complete your booking
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 1, maxWidth: 600 }}
          >
            Fill in your details to confirm the appointment. The service station
            will receive your request and contact you if needed.
          </Typography>

          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              Booking for:
            </Typography>

            <Typography variant="h6" fontWeight={700}>
              {sto?.name || "Service station"}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {bookingDate
                ? format(new Date(bookingDate), "EE, dd MMM yyyy")
                : "-"}{" "}
              {bookingTime ? `at ${bookingTime}` : ""}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={2}>
          {/* LEFT */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Reservation Info
                </Typography>

                <Typography variant="body2">
                  <b>
                    {bookingDate
                      ? format(new Date(bookingDate), "EE, dd MMM")
                      : "-"}{" "}
                    {bookingTime || ""}
                  </b>
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ mt: 2 }}>
              <CardContent>
                <CardMedia
                  component="img"
                  height="180"
                  image={sto?.photos?.[1]?.url}
                  alt={sto?.photos?.[1]?.alt}
                />

                <Typography variant="h6" mt={1}>
                  {sto?.name}
                </Typography>

                <Typography variant="body2">
                  {sto?.address?.city} {sto?.address?.street}{" "}
                  {sto?.address?.house}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* RIGHT FORM */}
          <FormProvider {...methods}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Card>
                <CardContent
                  component="form"
                  onSubmit={methods.handleSubmit(onSubmit)}
                >
                  <Grid container spacing={2}>
                    {fields.map((field) => (
                      <FormField key={field.name} field={field} />
                    ))}
                  </Grid>

                  <Box
                    mt={3}
                    display="flex"
                    justifyContent={{ xs: "stretch", md: "flex-end" }}
                  >
                    <Button
                      type="submit"
                      fullWidth
                      sx={{ maxWidth: { md: 200 } }}
                    >
                      Confirm booking
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </FormProvider>
        </Grid>
      </Container>
    </Box>
  );
};

export default BookStoPage;
