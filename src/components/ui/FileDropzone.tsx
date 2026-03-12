"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  useDropzone,
  type DropzoneOptions,
  type FileRejection,
} from "react-dropzone";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  type SxProps,
  type Theme,
} from "@mui/material";
import { AddPhotoAlternate, Delete } from "@mui/icons-material";

type Variant = "main-photo" | "multiple-photos" | "compact";

interface FileDropzoneProps {
  /** Field object from react-hook-form Controller */
  field?: any; // Ideally: import { ControllerRenderProps } from "react-hook-form"
  /** Error object from react-hook-form */
  error?: { message?: string };
  /** Additional helper text below the dropzone */
  helperText?: ReactNode;
  /** Visual style / behavior variant */
  variant?: Variant;
  /** Maximum number of files (ignored for "main-photo") */
  maxFiles?: number;
  /** Max file size in bytes */
  maxSize?: number;
  /** Allowed file types */
  accept?: DropzoneOptions["accept"];
  /** Height of the preview image (used in "main-photo") */
  height?: number | string;
  /** Additional styles for the root Paper component */
  sx?: SxProps<Theme>;
  /** Whether to show image previews after upload */
  showPreview?: boolean;
  /** Hide dropzone area after files are uploaded (useful for single file or when UI should be cleaner) */
  hideDropzoneAfterUpload?: boolean;
  /** Callback after files are successfully dropped (in addition to field.onChange) */
  onFilesChange?: (files: File[]) => void;
}

export default function FileDropzone({
  field,
  error,
  helperText,
  variant = "main-photo",
  maxFiles = 10,
  maxSize = 5 * 1024 * 1024,
  accept = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "image/webp": [".webp"],
  },
  height = 140,
  sx,
  showPreview = true,
  hideDropzoneAfterUpload = false,
  onFilesChange,
}: FileDropzoneProps) {
  const [previews, setPreviews] = useState<string[]>([]);

  const isMainPhoto = variant === "main-photo";
  const isMultiple = variant === "multiple-photos" || variant === "compact";

  const currentFiles = (field?.value ?? []) as File[];
  const mainFile = isMainPhoto ? (field?.value as File | null) : null;

  // Cleanup & generate object URLs for previews
  useEffect(() => {
    if (!showPreview) return;

    let urls: string[] = [];

    if (isMainPhoto && mainFile) {
      const url = URL.createObjectURL(mainFile);
      urls = [url];
    } else if (isMultiple && currentFiles.length > 0) {
      urls = currentFiles.map((f) => URL.createObjectURL(f));
    }

    setPreviews(urls);

    return () => {
      urls.forEach(URL.revokeObjectURL);
    };
  }, [field?.value, isMainPhoto, isMultiple, showPreview]);

  // =============================================
  //  Dropzone config
  // =============================================
  const dropzoneOptions: DropzoneOptions = {
    accept,
    maxSize,
    maxFiles: isMainPhoto ? 1 : maxFiles,
    multiple: !isMainPhoto,
    onDrop: (acceptedFiles: File[]) => {
      if (isMainPhoto) {
        const file = acceptedFiles[0];
        if (file) {
          field?.onChange(file);
          onFilesChange?.([file]);
        }
      } else {
        const newFiles = [...currentFiles, ...acceptedFiles];
        field?.onChange(newFiles);
        onFilesChange?.(newFiles);
      }
    },
    onDropRejected: (rejections: FileRejection[]) => {
      console.log("Rejected files:", rejections);
      // You can show toast/notification here if needed
    },
  };

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone(dropzoneOptions);

  // =============================================
  //  Remove file logic
  // =============================================
  const removeFile = (index?: number) => {
    if (isMainPhoto) {
      field?.onChange(null);
      onFilesChange?.([]);
    } else if (typeof index === "number") {
      const next = currentFiles.filter((_, i) => i !== index);
      field?.onChange(next);
      onFilesChange?.(next);
    }
  };

  // =============================================
  //  Should we show dropzone area?
  // =============================================
  const shouldShowDropzone =
    !hideDropzoneAfterUpload ||
    (isMainPhoto && !mainFile) ||
    (!isMainPhoto && currentFiles.length < maxFiles);

  // =============================================
  //  Render preview images
  // =============================================
  const renderPreview = () => {
    if (!showPreview || previews.length === 0) return null;

    if (isMainPhoto) {
      return (
        <Box sx={{ maxWidth: 360, width: "100%" }}>
          <Box
            sx={{
              position: "relative",
              borderRadius: 1,
              overflow: "hidden",
              border: 1,
              borderColor: "divider",
            }}
          >
            <Box
              component="img"
              src={previews[0]}
              alt="Main preview"
              sx={{ width: "100%", height, objectFit: "cover" }}
            />
            <IconButton
              size="small"
              onClick={() => removeFile()}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: "rgba(0,0,0,0.65)",
                color: "white",
                "&:hover": { bgcolor: "rgba(0,0,0,0.9)" },
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      );
    }

    return (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}>
        {currentFiles.map((file, idx) => (
          <Box
            key={`${file.name}-${idx}`}
            sx={{ width: variant === "compact" ? 88 : 120 }}
          >
            <Box
              sx={{
                position: "relative",
                borderRadius: 1,
                overflow: "hidden",
                border: 1,
                borderColor: "divider",
              }}
            >
              <Box
                component="img"
                src={previews[idx]}
                alt={`Preview ${idx + 1}`}
                sx={{
                  width: "100%",
                  height: variant === "compact" ? 66 : 90,
                  objectFit: "cover",
                }}
              />
              <IconButton
                size="small"
                onClick={() => removeFile(idx)}
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  bgcolor: "rgba(0,0,0,0.6)",
                  color: "white",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.9)" },
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    );
  };

  const dropText = isDragActive
    ? "Drop files here..."
    : isMainPhoto
      ? "Drag & drop or click to upload main photo"
      : "Drag & drop or click to add more photos";

  const captionText = `JPEG, PNG, WebP • max ${maxSize / (1024 * 1024)} MB`;

  return (
    <Box>
      {renderPreview()}

      {shouldShowDropzone && (
        <Paper
          {...getRootProps()}
          variant="outlined"
          sx={{
            p: isMainPhoto ? 4 : 2.5,
            cursor: "pointer",
            borderStyle: "dashed",
            borderWidth: 2,
            borderColor: error
              ? "error.main"
              : isDragActive
                ? "primary.main"
                : "divider",
            bgcolor: isDragActive ? "action.hover" : "background.paper",
            transition: "all 0.2s",
            textAlign: "center",
            ...sx,
          }}
        >
          <input {...getInputProps()} />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              color: "text.secondary",
            }}
          >
            <AddPhotoAlternate sx={{ fontSize: isMainPhoto ? 52 : 36 }} />
            <Typography variant={isMainPhoto ? "body1" : "body2"}>
              {dropText}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {captionText}
            </Typography>
          </Box>
        </Paper>
      )}

      {(error?.message || helperText) && (
        <Typography
          variant="caption"
          color={error ? "error" : "text.secondary"}
          sx={{ mt: 0.75, display: "block" }}
        >
          {error?.message || helperText}
        </Typography>
      )}
    </Box>
  );
}
