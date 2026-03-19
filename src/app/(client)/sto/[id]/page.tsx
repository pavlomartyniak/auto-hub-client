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

        <Box
          display={{ xs: "block", lg: "none" }}
          pb={{ xs: 3, md: 4 }}
          minWidth={0}
        >
          <StoBookingCard sto={sto} />
        </Box>

        <StoGallery photos={sto.photos} />

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <StoInfo sto={sto} />
            <Divider sx={{ my: 4 }} />
            <StoReviews reviews={sto.reviews} />
          </Grid>

          <Grid display={{ xs: "none", lg: "block" }} size={5}>
            <StoBookingCard sto={sto} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
