export const profileSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().optional(),
  address: z.object({
    street: z.string().min(5, "Enter a valid address"),
    city: z.string().min(1, "Select a city"),
    state: z.string().min(1, "Select a state"),
    country: z.string().min(1, "Select a country"),
  }),
  fullName: z.string().min(2, "Full name is required").optional(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .optional(),
});

export type ProfileFormSchema = z.infer<typeof profileSchema>;
import { z } from "zod";

// Zod schema for form validation
export const learnerFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  birthMonth: z.string().min(1, "Birth month is required"),
  birthYear: z.string().min(1, "Birth year is required"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
  grade: z.string().optional(),
  interests: z.array(z.string()).optional(),
});

export type LearnerFormData = z.infer<typeof learnerFormSchema>;

export const timeSlotSchema = z.object({
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
});

export const dayAvailabilitySchema = z.object({
  dayOfWeek: z.number().min(0).max(6),
  slots: z.array(timeSlotSchema),
  isAvailable: z.boolean(),
});

export const bankDetailsSchema = z.object({
  bankName: z.string().min(1, "Bank name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  accountName: z.string().min(1, "Account name is required"),
});

export const pricingSchema = z.object({
  ratePerSession: z.number().min(1, "Rate per session must be greater than 0"),
});

// Step 1: Select Days
export const selectDaysSchema = z.object({
  daySelection: z.enum(["everyday", "weekdays", "weekend", "custom"]),
  customDays: z.array(z.number().min(0).max(6)).optional(),
});

// Step 2: Select Times
export const selectTimesSchema = z.object({
  availabilities: z.array(dayAvailabilitySchema),
  timezone: z.string().min(1, "Please select a timezone."),
});

// Step 3: Payment Details
export const paymentDetailsSchema = z.object({
  ratePerSession: z.number().min(1, "Rate per session must be greater than 0"),
  bankDetails: bankDetailsSchema,
});

// Complete form schema
export const completeAvailabilitySchema = z.object({
  availabilities: z.array(dayAvailabilitySchema),
  bankDetails: bankDetailsSchema,
  pricing: pricingSchema,
});

export type SelectDaysFormData = z.infer<typeof selectDaysSchema>;
export type SelectTimesFormData = z.infer<typeof selectTimesSchema>;
export type PaymentDetailsFormData = z.infer<typeof paymentDetailsSchema>;
export type CompleteAvailabilityFormData = z.infer<
  typeof completeAvailabilitySchema
>;
