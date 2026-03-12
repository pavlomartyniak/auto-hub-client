import { StepItem } from "@/utils/onboarding-steps";
import {
  Box,
  Stepper,
  Step,
  useMediaQuery,
  useTheme,
  StepButton,
} from "@mui/material";

interface ResponsiveStepperProps {
  steps: StepItem[];
  activeStep?: number;
  maxReachableStep?: number;
  onChangeActiveStep: (step: number) => void;
}

export function ResponsiveStepper({
  steps,
  activeStep = 0,
  maxReachableStep,
  onChangeActiveStep,
}: ResponsiveStepperProps) {
  const canReach = (idx: number) =>
    maxReachableStep === undefined || idx <= maxReachableStep;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const orientation = isMobile ? "horizontal" : "vertical";

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: isMobile ? "auto" : "visible",
      }}
    >
      <Stepper
        nonLinear
        activeStep={activeStep}
        orientation={orientation}
        sx={{
          flexWrap: isMobile ? "nowrap" : "wrap",
          minWidth: isMobile ? "max-content" : "100%",
        }}
      >
        {steps.map((step, idx) => (
          <Step
            completed={idx < activeStep}
            key={`${step.label}-${idx}`}
            sx={{
              flex: isMobile ? "0 0 auto" : "1 1 auto",
            }}
          >
            <StepButton
              disabled={!canReach(idx)}
              onClick={() => canReach(idx) && onChangeActiveStep(idx)}
              sx={{
                "& .MuiStepLabel-label": {
                  whiteSpace: isMobile ? "nowrap" : "normal",
                },
              }}
            >
              {step.label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
