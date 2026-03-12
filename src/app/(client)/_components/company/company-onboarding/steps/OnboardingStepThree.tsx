"use client";

import { Box, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import type { CompanyOnboardingFormValues } from "@/utils/schemas/company";
import FileDropzone from "@/components/ui/FileDropzone";

export default function OnboardingStepThree() {
  const { control } = useFormContext<CompanyOnboardingFormValues>();

  return (
    <Box display="flex" flexDirection="column" height="100%" gap={4}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Upload your car service photo
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Upload your car service main photo that people could find it easy
        </Typography>
        <Controller
          name="photos.mainPhoto"
          control={control}
          render={({ field, fieldState }) => (
            <FileDropzone
              field={field}
              error={fieldState.error}
              variant="main-photo"
              height={180}
              hideDropzoneAfterUpload={true}
            />
          )}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Upload other car service photo
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Upload your car service boxes, sections or etc. that people could see
          how it looks
        </Typography>
        <Controller
          name="photos.otherPphotos"
          control={control}
          render={({ field, fieldState }) => (
            <FileDropzone
              field={field}
              error={fieldState.error}
              variant="multiple-photos"
              maxFiles={8}
            />
          )}
        />
      </Box>
    </Box>
  );
}
