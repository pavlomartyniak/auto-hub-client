"use client";

import { Button } from "@/components/ui/Button";
import { ResponsiveStepper } from "@/components/ui/ResponsiveStepper";
import { theme } from "@/lib/theme";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import {
  companyOnboardingSchema,
  defaultAvailabilityBooking,
  type CompanyOnboardingFormValues,
} from "@/utils/schemas/company";
import OnboardingStepOne from "../_components/company/company-onboarding/steps/OnboardingStepOne";
import OnboardingStepTwo from "../_components/company/company-onboarding/steps/OnboardingStepTwo";
import OnboardingStepThree from "../_components/company/company-onboarding/steps/OnboardingStepThree";
import { onboardingSteps } from "@/utils/onboarding-steps";
import OnboardingStepFour from "../_components/company/company-onboarding/steps/OnboardingStepFour";
import OnboardingStepFive from "../_components/company/company-onboarding/steps/OnboardingStepFive";

const stepFieldsMap: Record<number, (keyof CompanyOnboardingFormValues)[]> = {
  0: ["basicInfo"],
  1: ["servicesPricing"],
  2: ["photos"],
  3: ["availabilityBooking"],
};

export default function StoOnboardingPage() {
  const form = useForm<CompanyOnboardingFormValues>({
    resolver: zodResolver(
      companyOnboardingSchema,
    ) as Resolver<CompanyOnboardingFormValues>,
    mode: "onTouched",
    shouldFocusError: true,
    defaultValues: {
      basicInfo: {
        name: "Next STO Service | Detailng Studio",
        description:
          "Щодня наша мережа автосервісних центрів обслуговує понад 500 автомобілів, а це більше ніж 15 000 на місяць.Наші клієнти, які отримують послуги з ремонту чи обслуговування авто, раз за разом переконуються, що фахівці УКРАВТО.СЕРВІС суворо дотримуються усіх технологічних вимог і стандартів світових виробників.",
        city: "Lviv",
        street: "Sichovykh Striltsiv 37",
        phone: "+380994407123",
        email: "next.sto@gmail.com",
      },
      servicesPricing: {
        services: [],
      },
      photos: { mainPhoto: null, otherPphotos: [] },
      availabilityBooking: defaultAvailabilityBooking,
    },
  });

  const {
    formState: { errors },
  } = form;
  void errors;

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeStep, setActiveStep] = useState(0);

  const onChangeActiveStep = (step: number) => {
    setActiveStep(step);
  };

  const handleNext = async () => {
    const fields = stepFieldsMap[activeStep];
    const valid = fields?.length
      ? await form.trigger(fields, { shouldFocus: true })
      : true;
    if (!valid) return;
    if (activeStep < onboardingSteps.length - 1) {
      setActiveStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((s) => Math.max(0, s - 1));
  };

  const onSubmit = (values: CompanyOnboardingFormValues) => {
    console.log(values);
  };

  const renderActiveStep = () => {
    switch (activeStep) {
      case 0:
        return <OnboardingStepOne />;
      case 1:
        return <OnboardingStepTwo />;
      case 2:
        return <OnboardingStepThree />;
      case 3:
        return <OnboardingStepFour />;
      case 4:
        return <OnboardingStepFive onEditStep={onChangeActiveStep} />;
      default:
        return null;
    }
  };

  const isLastStep = activeStep === onboardingSteps.length - 1;

  return (
    <FormProvider {...form}>
      <Container sx={{ p: 4 }}>
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          gap={isMobile ? 2 : 4}
        >
          {isMobile ? (
            <Box overflow="scroll">
              <ResponsiveStepper
                steps={onboardingSteps}
                activeStep={activeStep}
                maxReachableStep={activeStep}
                onChangeActiveStep={onChangeActiveStep}
              />
            </Box>
          ) : null}

          <Card
            sx={{ flex: 1, height: "100%" }}
            component="form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Grid container sx={{ height: "100%" }}>
              {!isMobile && (
                <Grid size={4} sx={{ height: "100%" }} py={2}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    borderRight="1px solid"
                    borderColor="grey.50"
                    sx={{ height: "100%" }}
                    px={4}
                    py={2}
                    gap={2}
                  >
                    <Typography variant="h6">
                      {onboardingSteps[activeStep].label}
                    </Typography>
                    <Divider />
                    <ResponsiveStepper
                      steps={onboardingSteps}
                      activeStep={activeStep}
                      maxReachableStep={activeStep}
                      onChangeActiveStep={onChangeActiveStep}
                    />
                  </Box>
                </Grid>
              )}

              <Grid
                overflow="auto"
                size={isMobile ? 12 : 8}
                sx={{ height: "100%" }}
                p={2}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    height: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>{renderActiveStep()}</Box>

                  <Box display="flex" gap={2} alignSelf="end">
                    <Button
                      type="button"
                      variant="outlined"
                      sx={{ width: "fit-content" }}
                      onClick={handleBack}
                      disabled={activeStep === 0}
                    >
                      Back
                    </Button>
                    {isLastStep ? (
                      <Button type="submit" sx={{ width: "fit-content" }}>
                        Submit
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        sx={{ width: "fit-content" }}
                        onClick={handleNext}
                      >
                        Next Step
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Container>
    </FormProvider>
  );
}
