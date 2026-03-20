import { z } from "zod";

export const homeFilterSchema = z.object({
  location: z.string().optional(),
  date: z.string().datetime().optional(), // We'll store ISO date strings now
  make: z.string().optional(),
});

export type HomeFilterValues = z.infer<typeof homeFilterSchema>;
