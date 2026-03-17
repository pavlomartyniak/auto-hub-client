import { z } from "zod";

const fileSchema = z
  .instanceof(File)
  .refine((f) => f.size > 0, "File is empty")
  .refine((f) => f.size <= 5 * 1024 * 1024, "Max 5MB")
  .refine(
    (f) => ["image/jpeg", "image/png", "image/webp"].includes(f.type),
    "JPEG, PNG or WebP only",
  );

const defaultDay = (enabled: boolean) =>
  ({ enabled, from: 9, to: 18 }) as const;

const dayAvailabilitySchema = z
  .object({
    enabled: z.boolean().optional().default(false),
    from: z
      .union([z.number(), z.string()])
      .transform((v) => (typeof v === "string" ? Number(v) : v))
      .pipe(z.number().min(0).max(23))
      .optional()
      .default(9),
    to: z
      .union([z.number(), z.string()])
      .transform((v) => (typeof v === "string" ? Number(v) : v))
      .pipe(z.number().min(0).max(23))
      .optional()
      .default(18),
  })
  .refine(
    (data) => !data.enabled || data.to > data.from,
    { message: "End time must be after start time", path: ["to"] },
  );

export const availabilityBookingSchema = z.object({
  monday: dayAvailabilitySchema.optional().default(defaultDay(true)),
  tuesday: dayAvailabilitySchema.optional().default(defaultDay(true)),
  wednesday: dayAvailabilitySchema.optional().default(defaultDay(true)),
  thursday: dayAvailabilitySchema.optional().default(defaultDay(true)),
  friday: dayAvailabilitySchema.optional().default(defaultDay(true)),
  saturday: dayAvailabilitySchema.optional().default(defaultDay(false)),
  sunday: dayAvailabilitySchema.optional().default(defaultDay(false)),
});

export const defaultAvailabilityBooking = {
  monday: { enabled: true, from: 9, to: 18 },
  tuesday: { enabled: true, from: 9, to: 18 },
  wednesday: { enabled: true, from: 9, to: 18 },
  thursday: { enabled: true, from: 9, to: 18 },
  friday: { enabled: true, from: 9, to: 18 },
  saturday: { enabled: false, from: 9, to: 18 },
  sunday: { enabled: false, from: 9, to: 18 },
} satisfies z.infer<typeof availabilityBookingSchema>;

export const companyOnboardingSchema = z.object({
  basicInfo: z.object({
    name: z.string().min(2, "At least 2 characters"),
    description: z.string().min(10, "At least 10 characters"),
    city: z.string().min(2, "Required"),
    street: z.string().min(2, "Required"),
    phone: z.string().min(7, "Valid phone required"),
    email: z.string().email("Valid email required"),
  }),
  servicesPricing: z.object({
    services: z.string().array().min(1, "Select at least 1 service"),
    workPricing: z.string({ message: "Please select answer" }),
  }),
  photos: z.object({
    mainPhoto: z
      .custom<File | null>()
      .refine((f) => f instanceof File && f.size > 0, "Main photo is required"),
    otherPphotos: z.array(fileSchema),
  }),
  availabilityBooking: availabilityBookingSchema,
});

export type CompanyOnboardingFormValues = z.infer<
  typeof companyOnboardingSchema
>;
