"use client";

import { Box, Typography } from "@mui/material";
import { TextField } from "@/components/ui/TextField";

export default function OnboardingStepOne() {
  return (
    <Box display="flex" flexDirection="column" height="100%" gap={2}>
      <Box>
        <Typography variant="h6" gutterBottom>
          What is your car service name?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Please enter your car service name (At least 2 characters)
        </Typography>
        <TextField name="basicInfo.name" label="Company Name" />
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>
          Tell users about your car service
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Please enter description of your car service (At least 10 characters)
        </Typography>
        <TextField
          name="basicInfo.description"
          label="Company Description"
          multiline
          minRows={3}
          maxRows={6}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Provide location of your car service
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Please enter city and street where your car service locate
        </Typography>
        <Box display="flex" gap={2} width="100%">
          <TextField name="basicInfo.city" label="City" />
          <TextField name="basicInfo.street" label="Street" />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Provide contact information of your car service
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Please enter phone and email that users could contact with you
        </Typography>
        <Box display="flex" gap={2} width="100%">
          <TextField name="basicInfo.phone" label="Phone" />
          <TextField name="basicInfo.email" label="Email" />
        </Box>
      </Box>
    </Box>
  );
}
