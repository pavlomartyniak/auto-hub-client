"use client";

import * as React from "react";
import {
  Box,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  useTheme,
  SelectProps,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const defaultMenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

export interface MultiSelectOption {
  label: string;
  value: string;
}

interface MultiSelectProps extends Omit<
  SelectProps<string[]>,
  "value" | "onChange" | "multiple"
> {
  name: string;
  label: string;
  options: MultiSelectOption[];
  placeholder?: string;
}

export function MultiSelect({
  name,
  label,
  options,
  placeholder,
  ...selectProps
}: MultiSelectProps) {
  const { control } = useFormContext();
  const theme = useTheme();

  const getStyles = (val: string, selected: string[], theme: Theme) => ({
    fontWeight: selected.includes(val)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const value = field.value ?? [];

        const handleChange = (event: SelectChangeEvent<string[]>) => {
          const {
            target: { value },
          } = event;

          field.onChange(typeof value === "string" ? value.split(",") : value);
        };

        return (
          <FormControl error={!!fieldState.error} fullWidth>
            <InputLabel>{label}</InputLabel>

            <Select
              {...selectProps}
              multiple
              value={value}
              onChange={handleChange}
              input={<OutlinedInput label={label} />}
              renderValue={(selected: string[]) =>
                selected.length === 0 && placeholder ? (
                  <span style={{ opacity: 0.6 }}>{placeholder}</span>
                ) : (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((val: string) => {
                      const option = options.find((o) => o.value === val);

                      return (
                        <Chip
                          key={val}
                          label={option?.label ?? val}
                          onDelete={() => {
                            const newValue = value.filter(
                              (v: string) => v !== val,
                            );
                            field.onChange(newValue);
                          }}
                          onMouseDown={(event) => event.stopPropagation()}
                        />
                      );
                    })}
                  </Box>
                )
              }
              MenuProps={defaultMenuProps}
            >
              {options.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={getStyles(option.value, value, theme)}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>

            {fieldState.error && (
              <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
}
