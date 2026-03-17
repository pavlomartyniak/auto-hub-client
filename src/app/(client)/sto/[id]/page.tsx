import { notFound } from "next/navigation";
import { mockSTOs } from "@/utils/mocked-data";
import { Box, Container, Grid } from "@mui/material";

import { StoHeader } from "./_components/StoHeader";
import { StoGallery } from "./_components/StoGallery";
import { StoInfo } from "./_components/StoInfo";
import { StoBookingCard } from "./_components/StoBookingCard";
import { StoReviews } from "./_components/StoReviews";
import { Divider } from "@mui/material";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function StoDetailsPage(props: Props) {
  const params = await props.params;
  const stoId = params.id;
  const sto = mockSTOs.find((s) => s.id === stoId || s.slug === stoId);

  if (!sto) {
    notFound();
  }

  return (
    <Box
      sx={{
        bgcolor: "common.white",
        minHeight: "100vh",
        pb: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg" sx={{ pt: { xs: 3, md: 4 } }}>
        <StoHeader sto={sto} />
        <StoGallery photos={sto.photos} />

        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={{ xs: 4, md: 8 }}
          mt={{ xs: 2, md: 1 }}
        >
          <Box
            flex={{ xs: "1 1 auto", md: "0 0 58%", lg: "0 0 58%" }}
            minWidth={0}
          >
            <StoInfo sto={sto} />
            <Divider sx={{ my: 4 }} />
            <StoReviews reviews={sto.reviews} />
          </Box>
          <Box
            flex={{ xs: "1 1 auto", md: "0 0 42%", lg: "0 0 42%" }}
            minWidth={0}
          >
            <StoBookingCard sto={sto} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
