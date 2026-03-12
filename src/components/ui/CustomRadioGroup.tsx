"use client";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  FormHelperText,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export interface RadioOption {
  label: string;
  value: string;
}

interface CustomRadioGroupProps extends Omit<
  RadioGroupProps,
  "value" | "onChange"
> {
  name: string;
  label?: string;
  options: RadioOption[];
  row?: boolean;
}

export function CustomRadioGroup({
  name,
  label,
  options,
  row = false,
  ...radioGroupProps
}: CustomRadioGroupProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl error={!!fieldState.error}>
          {label && <FormLabel>{label}</FormLabel>}

          <RadioGroup
            {...radioGroupProps}
            {...field}
            value={field.value ?? ""}
            onChange={(e) => field.onChange(e.target.value)}
            row={row}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>

          {fieldState.error && (
            <FormHelperText>{fieldState.error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
