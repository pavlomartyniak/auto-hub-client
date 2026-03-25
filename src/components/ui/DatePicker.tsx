"use client";

import { Controller, useFormContext } from "react-hook-form";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { ComponentProps, useState } from "react";

type FormDatePickerProps = ComponentProps<typeof MuiDatePicker> & {
  name: string;
};

export function DatePicker({ name, ...props }: FormDatePickerProps) {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <MuiDatePicker
          {...props}
          disablePast
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          // RHF holds the ISO string, but MUI needs a Date object for date-fns
          value={field.value ? new Date(field.value) : null}
          onChange={(date: Date | null) => {
            // we save the ISO string into the form
            field.onChange(date ? date.toISOString() : undefined);
          }}
          slotProps={{
            ...props.slotProps,
            textField: {
              ...(props.slotProps?.textField as any),
              id: `datePicker-${name}`,
              onClick: () => setOpen(true),
              onMouseDown: (e: React.MouseEvent) => {
                e.preventDefault();
              },
              fullWidth: true,
              error: Boolean(fieldState.error),
              helperText: fieldState.error?.message ?? " ",
              sx: {
                "& .MuiInputBase-input": {
                  cursor: "pointer",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                },
              },
              inputProps: {
                ...(props.slotProps?.textField as any)?.inputProps,
                readOnly: true, // Prevents manual typing on inner input
                tabIndex: -1, // Removes element from tab sequence so it acts purely as a button
              },
            },
          }}
        />
      )}
    />
  );
}
