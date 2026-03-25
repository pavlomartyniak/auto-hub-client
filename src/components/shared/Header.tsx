"use client";

import { Filter } from "@/app/(client)/_components/home/Filter";
import { Routes } from "@/utils/routes";
import { AppBar, Box, Container, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const isOnboarding = pathname === Routes.STO_ONBOARDING;
  const isHome = pathname === Routes.HOME;

  // ✅ FIX: правильна перевірка динамічного роута
  const isBookingPage = /^\/sto\/[^/]+\/book$/.test(pathname);

  const navigateHome = () => {
    router.push(Routes.HOME);
  };

  return (
    <AppBar position="static" elevation={0}>
      {/* TOP BAR */}
      <Box sx={{ bgcolor: "common.white" }} boxShadow={4}>
        <Container sx={{ py: 2 }}>
          <Typography
            width="fit-content"
            variant="h4"
            fontWeight={900}
            color="common.black"
            onClick={navigateHome}
            sx={{ cursor: "pointer" }}
          >
            AutoHub
          </Typography>
        </Container>
      </Box>

      {/* CONTENT BELOW HEADER */}
      {!isOnboarding && !isBookingPage && (
        <Box bgcolor="background.default">
          <Container
            sx={{
              py: { xs: 3, md: 4 },
              display: "flex",
              flexDirection: "column",
              gap: { xs: 3, md: 4 },
            }}
          >
            {/* HOME HERO */}
            {isHome && (
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography
                  variant="h3"
                  fontWeight={900}
                  color="primary.main"
                  sx={{
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  }}
                >
                  Book a car service online—it's quick and easy
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight={700}
                  color="primary.main"
                  sx={{
                    fontSize: { xs: "1.125rem", sm: "1.25rem", md: "1.5rem" },
                  }}
                >
                  Compare offers from nearby auto repair shops: prices, reviews,
                  photos of work, and available appointments.
                </Typography>
              </Box>
            )}

            <Filter />
          </Container>
        </Box>
      )}
    </AppBar>
  );
}
