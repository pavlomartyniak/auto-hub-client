import { STO } from "@/types";
import { Box, Typography, Divider, Chip, Stack } from "@mui/material";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import BuildCircleOutlinedIcon from "@mui/icons-material/BuildCircleOutlined";

interface Props {
  sto: STO;
}

export function StoInfo({ sto }: Props) {
  return (
    <Box pr={{ xs: 0, lg: 4 }}>
      {/* Description section */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight={700} mb={1.5}>
          About the STO
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ opacity: 0.85, lineHeight: 1.6, fontSize: "0.9375rem" }}>
          {sto.description}
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Brands section */}
      {sto.brands && sto.brands.length > 0 && (
        <Box mb={4}>
          <Typography variant="subtitle1" fontWeight={700} mb={2} display="flex" alignItems="center" gap={1}>
            <DirectionsCarOutlinedIcon fontSize="small" /> Supported Brands
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {sto.brands.map((brand) => (
              <Chip key={brand} label={brand} variant="outlined" sx={{ borderRadius: 2, px: 0.5, py: 2, fontWeight: 500, bgcolor: "grey.50", fontSize: "0.8125rem" }} />
            ))}
          </Box>
        </Box>
      )}

      {(sto.brands && sto.brands.length > 0) && <Divider sx={{ mb: 4 }} />}

      {/* Services section */}
      <Box mb={4}>
        <Typography variant="subtitle1" fontWeight={700} mb={2} display="flex" alignItems="center" gap={1}>
          <BuildCircleOutlinedIcon fontSize="small" /> Services & Pricing
        </Typography>
        <Stack spacing={0}>
          {sto.services.map((service, idx) => (
            <Box
              key={service.id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              py={1.5}
              borderTop={idx !== 0 ? "1px solid" : "none"}
              borderColor="divider"
            >
              <Box pr={2}>
                <Typography variant="body2" fontWeight={600} mb={0.25}>
                  {service.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Duration: {service.durationMinutes} min
                </Typography>
              </Box>
              <Box flexShrink={0}>
                <Typography variant="subtitle2" fontWeight={700} textAlign="right">
                  from ₴{service.priceFrom}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Working Hours */}
      <Box mb={4}>
        <Typography variant="subtitle1" fontWeight={700} mb={2} display="flex" alignItems="center" gap={1}>
          <AccessTimeOutlinedIcon fontSize="small" /> Working Hours
        </Typography>
        <Stack spacing={1.5}>
          {Object.entries(sto.workingHours).map(([days, hours]) => (
            <Box key={days} display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                {days === "Everyday" ? "Every day" : days}
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {hours}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
