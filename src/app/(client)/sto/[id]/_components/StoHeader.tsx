"use client";

import { STO } from "@/types";
import { Box, Typography, Breadcrumbs } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import NextLink from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface Props {
  sto: STO;
}

export function StoHeader({ sto }: Props) {
  const { name, averageRating, reviewCount, address, isVerified } = sto;
  const fullAddress = `${address.city}, ${address.street} ${address.house}`;

  return (
    <Box mb={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" sx={{ fontSize: "1rem" }} />}
        aria-label="breadcrumb"
        sx={{ mb: 1, "& .MuiBreadcrumbs-li": { fontSize: "0.8125rem" } }}
      >
        <NextLink href="/" passHref style={{ textDecoration: "none", color: "inherit" }}>
          Home
        </NextLink>
        <Typography color="text.primary" fontSize="0.8125rem">
          {name}
        </Typography>
      </Breadcrumbs>

      <Typography variant="h5" component="h1" fontWeight={700} mb={0.5} display="flex" alignItems="center">
        {name}
        {isVerified && (
          <VerifiedIcon color="primary" sx={{ ml: 1, fontSize: "1.25rem" }} />
        )}
      </Typography>

      <Box display="flex" alignItems="center" gap={1.5} flexWrap="wrap">
        <Box display="flex" alignItems="center" gap={0.5}>
          <StarIcon sx={{ color: "common.black", fontSize: 16 }} />
          <Typography variant="body2" fontWeight={600}>
            {averageRating}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textDecoration: "underline", cursor: "pointer", "&:hover": { color: "text.primary" } }}
          >
            {reviewCount} reviews
          </Typography>
        </Box>
        <Typography color="text.secondary" fontSize="0.75rem">•</Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ cursor: "pointer", textDecoration: "underline", "&:hover": { color: "text.primary" } }}
        >
          {fullAddress}
        </Typography>
      </Box>
    </Box>
  );
}
