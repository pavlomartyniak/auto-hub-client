"use client";

import * as React from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";

export interface SelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps extends Omit<
  SelectProps<string>,
  "value" | "onChange"
> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  width?: number | string;
  error?: boolean;
  helperText?: string;
}

export function CustomSelect({
  label,
  value,
  onChange,
  options,
  width = "100%",
  error,
  helperText,
  ...selectProps
}: CustomSelectProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <Box width={width}>
      <FormControl fullWidth error={error}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          label={label}
          onChange={handleChange}
          {...selectProps}
        >
          {options.map((option, idx) => (
            <MenuItem key={`${option.value}-${idx}`} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Box>
  );
}
