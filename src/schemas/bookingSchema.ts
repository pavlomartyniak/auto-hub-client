import { z } from "zod";

export const bookingSchema = z.object({
  stoId: z.string(),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  make: z.string().min(1, "Make is required"),
  serviceType: z.string().min(1, "Service type is required"),
  customerName: z.string().min(2, "Name is required"),
  customerLastName: z.string().min(2, "Last Name is required"),
  customerEmail: z.email(),
  customerPhone: z.string().min(7, "Phone is required"),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
