"use client";

import { Box, Typography, Avatar, Rating } from "@mui/material";
import { formatDistanceToNow, parseISO } from "date-fns";
import { STO } from "@/types/sto";

interface Props {
  reviews: STO["reviews"];
}

export function StoReviews({ reviews }: Props) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <Box mt={2} mb={4}>
      <Typography variant="h6" fontWeight={700} mb={3}>
        Reviews ({reviews.length})
      </Typography>

      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        flexWrap="wrap"
        gap={4}
      >
        {reviews.map((review) => {
          // Calculate human readable date time relative
          let formattedDate = "";
          try {
            formattedDate = formatDistanceToNow(parseISO(review.createdAt), {
              addSuffix: true,
            });
          } catch (e) {
            formattedDate = new Date(review.createdAt).toLocaleDateString();
          }

          return (
            <Box
              key={review.id}
              flex={{ xs: "1 1 100%", md: "0 0 calc(50% - 16px)" }}
              minWidth={0}
            >
              <Box display="flex" alignItems="center" gap={1.5} mb={1.5}>
                <Avatar
                  sx={{
                    bgcolor: "grey.200",
                    color: "grey.700",
                    width: 40,
                    height: 40,
                    fontSize: "1rem",
                    fontWeight: 600,
                  }}
                >
                  {review.author.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {review.author}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="caption" color="text.secondary">
                      {formattedDate}
                    </Typography>
                    {review.carModel && (
                      <>
                        <Typography variant="caption" color="text.secondary">
                          •
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {review.carModel}
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
              </Box>

              <Rating
                value={review.rating}
                readOnly
                size="small"
                sx={{ mb: 1, color: "common.black" }}
              />

              <Typography variant="body2" lineHeight={1.6} color="text.primary">
                {review.text}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
