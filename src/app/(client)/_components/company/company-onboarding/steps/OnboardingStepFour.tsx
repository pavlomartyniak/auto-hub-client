import { AvailabilityCalendar } from "@/components/shared/AvailabilityCalendar";
import { Box, Typography } from "@mui/material";

const OnboardingStepFour = () => {
  return (
    <Box display="flex" flexDirection="column" height="100%" gap={4}>
      <Box>
        <Typography variant="h6" gutterBottom>
          What is your car service scheldule?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Select days and time in which you are working
        </Typography>
        <AvailabilityCalendar />
      </Box>
    </Box>
  );
};

export default OnboardingStepFour;
