"use client";

import { Box, Button } from "@mui/material";
import Image from "next/image";
import AppsIcon from "@mui/icons-material/Apps";
import { useState } from "react";
import { StoPhotoModal } from "./StoPhotoModal";

interface Props {
  photos: { id: string; url: string; alt: string; isMain: boolean }[];
}

export function StoGallery({ photos }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!photos || photos.length === 0) return null;

  const mainPhoto = photos.find((p) => p.isMain) || photos[0];
  const otherPhotos = photos.filter((p) => p.id !== mainPhoto.id).slice(0, 4);

  const borderRadiusLeft = { xs: 3, md: "12px 0 0 12px" };
  const borderRadiusRight = { xs: 3, md: "0 12px 12px 0" };

  const handleOpenPhoto = (index: number) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const mainPhotoIndex = photos.findIndex(p => p.id === mainPhoto.id) !== -1 ? photos.findIndex(p => p.id === mainPhoto.id) : 0;

  if (otherPhotos.length === 0) {
    return (
      <Box position="relative" width="100%" height={{ xs: 200, sm: 260, md: 340 }} mb={3}>
        <Box
          position="relative"
          width="100%"
          height="100%"
          sx={{ cursor: "pointer" }}
          onClick={() => handleOpenPhoto(mainPhotoIndex)}
        >
          <Image src={mainPhoto.url} alt={mainPhoto.alt} fill style={{ objectFit: "cover", borderRadius: "12px" }} unoptimized priority />
        </Box>
        <StoPhotoModal
          photos={photos}
          currentIndex={currentIndex}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onNavigate={setCurrentIndex}
        />
      </Box>
    );
  }

  return (
    <>
      <Box position="relative" mb={{ xs: 3, md: 4 }} sx={{ height: { xs: 200, sm: 260, md: 340 } }}>
        <Box display="flex" gap={1} height="100%">
          {/* Main Photo (Left) */}
          <Box
            flex={1}
            position="relative"
            height="100%"
            sx={{
              borderRadius: borderRadiusLeft,
              overflow: "hidden",
              cursor: "pointer",
              "&:hover": { opacity: 0.9, transition: "opacity 0.2s" },
            }}
            onClick={() => handleOpenPhoto(mainPhotoIndex)}
          >
            <Image src={mainPhoto.url} alt={mainPhoto.alt} fill style={{ objectFit: "cover" }} unoptimized priority />
          </Box>

          {/* Other Photos (Right) */}
          <Box
            flex={1}
            display={{ xs: "none", md: "grid" }}
            gap={1}
            height="100%"
            sx={{
              gridTemplateColumns: otherPhotos.length > 1 ? "1fr 1fr" : "1fr",
              gridTemplateRows: otherPhotos.length > 2 ? "1fr 1fr" : "1fr",
            }}
          >
            {otherPhotos.map((photo, index) => {
              let br = "0";
              if (index === 1 && otherPhotos.length >= 2) br = "0 12px 0 0";
              if (index === 3 || (index === otherPhotos.length - 1 && index !== 0)) br = "0 0 12px 0";
              if (otherPhotos.length === 1) br = "0 12px 12px 0";

              const globalIndex = photos.findIndex(p => p.id === photo.id);

              return (
                <Box
                  key={photo.id}
                  position="relative"
                  width="100%"
                  height="100%"
                  sx={{
                    borderRadius: br,
                    overflow: "hidden",
                    cursor: "pointer",
                    "&:hover": { opacity: 0.9, transition: "opacity 0.2s" },
                  }}
                  onClick={() => handleOpenPhoto(globalIndex !== -1 ? globalIndex : 0)}
                >
                  <Image src={photo.url} alt={photo.alt} fill style={{ objectFit: "cover" }} unoptimized />
                </Box>
              );
            })}
          </Box>
        </Box>
        <Button
          variant="contained"
          size="small"
          startIcon={<AppsIcon fontSize="small" sx={{ fontSize: "1rem" }} />}
          onClick={() => handleOpenPhoto(0)}
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
            bgcolor: "common.white",
            color: "common.black",
            "&:hover": { bgcolor: "grey.100" },
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.8125rem",
            borderRadius: 2,
            boxShadow: "0 2px 4px rgba(0,0,0,0.18)",
            px: 1.5,
            py: 0.5,
          }}
        >
          Show all photos
        </Button>
      </Box>

      <StoPhotoModal
        photos={photos}
        currentIndex={currentIndex}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onNavigate={setCurrentIndex}
      />
    </>
  );
}
