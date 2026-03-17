"use client";

import { Box, Dialog, IconButton, Typography, Fade } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";
import { useEffect, useCallback } from "react";

interface Photo {
  id: string;
  url: string;
  alt: string;
}

interface Props {
  photos: Photo[];
  currentIndex: number;
  open: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function StoPhotoModal({
  photos,
  currentIndex,
  open,
  onClose,
  onNavigate,
}: Props) {
  const currentPhoto = photos[currentIndex];

  const goNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      onNavigate(currentIndex + 1);
    }
  }, [currentIndex, photos.length, onNavigate]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  }, [currentIndex, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, goNext, goPrev, onClose]);

  if (!open || !currentPhoto) return null;

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Fade}
      PaperProps={{
        sx: {
          bgcolor: "common.black",
          color: "common.white",
        },
      }}
    >
      <Box
        position="relative"
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
      >
        {/* Header */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={3}
        >
          <Typography variant="body1" fontWeight={500} sx={{ opacity: 0.8 }}>
            {currentIndex + 1} / {photos.length}
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{ color: "common.white" }}
            size="large"
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Box>

        {/* Content */}
        <Box
          flex={1}
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={{ xs: 2, md: 8 }}
          pb={4}
        >
          {currentIndex > 0 && (
            <IconButton
              onClick={goPrev}
              sx={{
                position: "absolute",
                left: { xs: 8, md: 32 },
                color: "common.white",
                bgcolor: "rgba(255, 255, 255, 0.1)",
                "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                zIndex: 10,
              }}
              size="large"
            >
              <ArrowBackIosNewIcon fontSize="inherit" />
            </IconButton>
          )}

          <Box position="relative" width="100%" height="100%">
            <Image
              src={currentPhoto.url}
              alt={currentPhoto.alt}
              fill
              style={{ objectFit: "contain" }}
              unoptimized
            />
          </Box>

          {currentIndex < photos.length - 1 && (
            <IconButton
              onClick={goNext}
              sx={{
                position: "absolute",
                right: { xs: 8, md: 32 },
                color: "common.white",
                bgcolor: "rgba(255, 255, 255, 0.1)",
                "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                zIndex: 10,
              }}
              size="large"
            >
              <ArrowForwardIosIcon fontSize="inherit" />
            </IconButton>
          )}
        </Box>
      </Box>
    </Dialog>
  );
}
