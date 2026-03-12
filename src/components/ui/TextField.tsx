"use client";

import { Controller, useFormContext } from "react-hook-form";
import { TextField as MuiTextField, type TextFieldProps } from "@mui/material";

type FormTextFieldProps = TextFieldProps & {
  name: string;
};

export function TextField({ name, ...props }: FormTextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      // DRY: one RHF-aware input for all forms
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <MuiTextField
          {...field}
          {...props}
          fullWidth
          error={Boolean(fieldState.error)}
          helperText={fieldState.error?.message ?? " "}
        />
      )}
    />
  );
}
