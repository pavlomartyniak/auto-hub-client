"use client";

import {
  Box,
  Button as MuiButton,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { findOptionLabel } from "@/utils/helpers/findOptionLabel";
import { serviceOptions, workPricingOptions } from "@/utils/options";
import { CompanyOnboardingFormValues } from "@/schemas/company";

const days = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
] as const;

const formatHour = (h: number) => `${String(h).padStart(2, "0")}:00`;

function ImagePreview({ file, size = 88 }: { file: File; size?: number }) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!file || !file.type.startsWith("image/")) {
      setSrc(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  if (!src) return null;

  return (
    <Box
      component="img"
      src={src}
      alt={file.name}
      sx={{
        width: size,
        height: size,
        borderRadius: 1.5,
        objectFit: "cover",
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    />
  );
}

function ReviewRow({ label, value }: { label: string; value?: string }) {
  return (
    <>
      <Grid size={4}>
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>
      </Grid>
      <Grid size={8}>
        <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
          {value && value.trim().length > 0 ? value : "—"}
        </Typography>
      </Grid>
    </>
  );
}

function SectionHeader({
  title,
  onEdit,
}: {
  title: string;
  onEdit?: () => void;
}) {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography variant="subtitle1" fontWeight={700} gutterBottom>
        {title}
      </Typography>
      {onEdit ? (
        <MuiButton
          type="button"
          size="small"
          variant="text"
          onClick={onEdit}
          sx={{ alignSelf: "flex-start" }}
        >
          Edit
        </MuiButton>
      ) : null}
    </Box>
  );
}

export default function OnboardingStepFive({
  onEditStep,
}: {
  onEditStep?: (step: number) => void;
}) {
  const { getValues } = useFormContext<CompanyOnboardingFormValues>();
  const values = getValues();

  const { basicInfo, servicesPricing, photos, availabilityBooking } = values;

  const services = servicesPricing?.services ?? [];
  const workPricing =
    servicesPricing?.workPricing != null && servicesPricing.workPricing !== ""
      ? findOptionLabel(workPricingOptions, servicesPricing.workPricing)
      : "—";

  const mainPhoto = photos?.mainPhoto ?? null;
  const otherPhotos = photos?.otherPphotos ?? [];

  return (
    <Box display="flex" flexDirection="column" height="100%" gap={4}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Review & Publish
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Please double-check your details before submitting.
        </Typography>
      </Box>

      <Box>
        <SectionHeader
          title="Basic company info"
          onEdit={onEditStep ? () => onEditStep(0) : undefined}
        />
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={1.5}>
          <ReviewRow label="Company name" value={basicInfo?.name} />
          <ReviewRow label="Description" value={basicInfo?.description} />
          <ReviewRow label="City" value={basicInfo?.city} />
          <ReviewRow label="Street" value={basicInfo?.street} />
          <ReviewRow label="Phone" value={basicInfo?.phone} />
          <ReviewRow label="Email" value={basicInfo?.email} />
        </Grid>
      </Box>

      <Box>
        <SectionHeader
          title="Services & pricing"
          onEdit={onEditStep ? () => onEditStep(1) : undefined}
        />
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={1.5}>
          <Grid size={4}>
            <Typography variant="subtitle2" color="text.secondary">
              Services
            </Typography>
          </Grid>
          <Grid size={8}>
            {services.length ? (
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {services.map((s) => (
                  <Chip
                    key={s}
                    size="small"
                    label={findOptionLabel(serviceOptions, s)}
                    variant="outlined"
                  />
                ))}
              </Stack>
            ) : (
              <Typography variant="body2">—</Typography>
            )}
          </Grid>

          <ReviewRow label="Work pricing" value={workPricing} />
        </Grid>
      </Box>

      <Box>
        <SectionHeader
          title="Photos"
          onEdit={onEditStep ? () => onEditStep(2) : undefined}
        />
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={1.5}>
          <Grid size={4}>
            <Typography variant="subtitle2" color="text.secondary">
              Main photo
            </Typography>
          </Grid>
          <Grid size={8}>
            {mainPhoto ? (
              <Stack
                direction="row"
                alignItems="center"
                gap={2}
                flexWrap="wrap"
              >
                <ImagePreview file={mainPhoto} size={112} />
              </Stack>
            ) : (
              <Typography variant="body2">Not uploaded</Typography>
            )}
          </Grid>
          <Grid size={4}>
            <Typography variant="subtitle2" color="text.secondary">
              Other photos
            </Typography>
          </Grid>
          <Grid size={8}>
            {otherPhotos.length ? (
              <Stack gap={1.25}>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {otherPhotos.map((f, idx) => (
                    <ImagePreview key={`${f.name}-${f.size}-${idx}`} file={f} />
                  ))}
                </Stack>
              </Stack>
            ) : (
              <Typography variant="body2">—</Typography>
            )}
          </Grid>
        </Grid>
      </Box>

      <Box>
        <SectionHeader
          title="Availability & booking"
          onEdit={onEditStep ? () => onEditStep(3) : undefined}
        />
        <Divider sx={{ mb: 2 }} />
        <Stack gap={1}>
          {days.map((d) => {
            const day = availabilityBooking?.[d.key];
            const enabled = Boolean(day?.enabled);
            const from = typeof day?.from === "number" ? day.from : 9;
            const to = typeof day?.to === "number" ? day.to : 18;

            return (
              <Box
                key={d.key}
                display="flex"
                justifyContent="space-between"
                gap={2}
              >
                <Typography variant="body2" fontWeight={600}>
                  {d.label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {enabled ? `${formatHour(from)} – ${formatHour(to)}` : "Off"}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
