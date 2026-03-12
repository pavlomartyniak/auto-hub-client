import { z } from "zod";

export const bookingSchema = z.object({
  stoId: z.string().min(1, "STO is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  customerName: z.string().min(2, "Name is required"),
  phone: z.string().min(7, "Phone is required"),
  note: z.string().optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
