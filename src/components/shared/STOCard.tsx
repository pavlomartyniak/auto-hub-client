"use client";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import BuildCircleOutlinedIcon from "@mui/icons-material/BuildCircleOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import { STO } from "@/types/sto";
import { useRouter, useSearchParams } from "next/navigation";
import { Routes } from "@/utils/routes";

// Sub-component: Image Section with Overlays
const STOCardImage = ({
  imageUrl,
  imageAlt,
  rating,
}: {
  imageUrl?: string;
  imageAlt: string;
  rating: number;
}) => {
  return (
    <Box sx={{ position: "relative" }}>
      <CardMedia
        component="img"
        height="200"
        image={
          imageUrl || "https://placehold.co/600x400/eeeeee/999999?text=No+Photo"
        }
        alt={imageAlt}
        sx={{
          objectFit: "cover",
        }}
      />
      {/* Rating Badge */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          backgroundColor: "background.paper",
          borderRadius: 8,
          px: 1,
          py: 0.5,
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        }}
      >
        <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1 }}>
          {rating.toFixed(1)}
        </Typography>
        <StarIcon sx={{ color: "warning.main", fontSize: 16 }} />
      </Box>
    </Box>
  );
};

// Sub-component: Main Title and Info
const STOCardInfo = ({ name, address }: { name: string; address: string }) => {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography variant="subtitle1" fontWeight={600} noWrap sx={{ mb: 0.5 }}>
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary" noWrap>
        {address}
      </Typography>
    </Box>
  );
};

// Sub-component: Availability Slots
const STOCardAvailability = ({ slots }: { slots: string[] }) => {
  if (!slots || slots.length === 0) return null;

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        mb: 2,
        mt: 1,
        overflowX: "auto",
        pb: 0.5, // Add tiny padding for scrollbar visibility if needed
        "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar for cleaner look
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      {slots.map((slot, index) => (
        <Chip
          key={index}
          label={slot}
          variant="outlined"
          size="small"
          sx={{
            borderRadius: 4,
            fontWeight: 500,
            borderColor: "divider",
            flexShrink: 0, // Ensure chips don't shrink inside a flex container
          }}
        />
      ))}
    </Box>
  );
};

// Sub-component: Footer summary (Stats and Price)
const STOCardFooter = ({
  servicesCount,
  brandsCount,
  minPrice,
}: {
  servicesCount: number;
  brandsCount: number;
  minPrice: number;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Services Stat */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <BuildCircleOutlinedIcon
            sx={{ fontSize: 18, color: "text.secondary" }}
          />
          <Typography variant="body2" color="text.secondary">
            {servicesCount}
          </Typography>
        </Box>

        {/* Brands Stat */}
        {brandsCount > 0 && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <DirectionsCarOutlinedIcon
              sx={{ fontSize: 18, color: "text.secondary" }}
            />
            <Typography variant="body2" color="text.secondary">
              {brandsCount}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Pricing */}
      <Box>
        <Typography variant="subtitle2" fontWeight={700}>
          {minPrice > 0 ? `від ₴${minPrice}` : "За запитом"}
        </Typography>
      </Box>
    </Box>
  );
};

// Main Export Component
interface STOCardProps {
  sto: STO;
}

export const STOCard = ({ sto }: STOCardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigateToDetailsPage = () => {
    const params = searchParams.toString();
    router.push(
      `${Routes.STO_DETAILS_PAGE}/${sto.id}${params ? `?${params}` : ""}`,
    );
  };

  const mainPhoto = sto.photos?.find((p) => p.isMain) || sto.photos?.[0];
  const addressString = `${sto.address.city}, ${sto.address.street} ${sto.address.house}`;
  const totalServices = sto.services?.length || 0;
  const totalBrands = sto.brands?.length || 0;
  // If undefined array, fallback to empty to avoid render errors
  const availableSlots = sto.availableSlots || [];

  const minPrice =
    sto.services?.reduce((min, current) => {
      if (min === 0) return current.priceFrom;
      return Math.min(min, current.priceFrom);
    }, 0) || 0;

  return (
    <Card
      onClick={navigateToDetailsPage}
      elevation={0}
      sx={{
        borderRadius: 1,
        border: "1px solid",
        borderColor: "divider",
        cursor: "pointer",
        transition: "box-shadow 0.2s ease-in-out",
        "&:hover": {
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.08)",
        },
      }}
    >
      <STOCardImage
        imageUrl={mainPhoto?.url}
        imageAlt={mainPhoto?.alt || sto.name}
        rating={sto.averageRating}
      />

      <CardContent sx={{ p: 2, pb: "16px !important" }}>
        <STOCardInfo name={sto.name} address={addressString} />

        {/* Render Availability if there are slots mapped */}
        <STOCardAvailability slots={availableSlots} />

        <STOCardFooter
          servicesCount={totalServices}
          brandsCount={totalBrands}
          minPrice={minPrice}
        />
      </CardContent>
    </Card>
  );
};

export default STOCard;
