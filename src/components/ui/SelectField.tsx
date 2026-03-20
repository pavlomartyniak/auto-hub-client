"use client";

import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  type SelectProps,
} from "@mui/material";

export interface SelectOption {
  label: string;
  value: string;
}

type SelectFieldProps = Omit<SelectProps<string>, "name"> & {
  name: string;
  options: SelectOption[];
};

export function SelectField({ name, options, ...props }: SelectFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl fullWidth error={Boolean(fieldState.error)}>
          <Select
            {...field}
            {...props}
            displayEmpty
          >
            {options.map((option, idx) => (
              <MenuItem key={`${option.value}-${idx}`} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{fieldState.error?.message ?? " "}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
