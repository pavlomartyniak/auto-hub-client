"use client";

import { Box, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { serviceOptions, workPricingOptions } from "@/utils/options";
import { CustomRadioGroup } from "@/components/ui/CustomRadioGroup";
import { MultiSelect } from "@/components/ui/MultiSelect";

export default function OnboardingStepTwo() {
  const { control } = useFormContext();

  return (
    <Box display="flex" flexDirection="column" height="100%" gap={4}>
      <Box>
        <Typography variant="h6" gutterBottom>
          What services does your car service provide?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Select all applicable services (you may select more than one)
        </Typography>

        <Controller
          name="servicesPricing.services"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <MultiSelect
                name="servicesPricing.services"
                label="Select Services"
                options={serviceOptions}
                placeholder="Choose services"
              />
            );
          }}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          How do you usually price your work?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Select one of this option that how price your work
        </Typography>

        <CustomRadioGroup
          name="servicesPricing.workPricing"
          options={workPricingOptions}
        />
      </Box>
    </Box>
  );
}
