import z from "zod";
import { Types } from "mongoose";

const objectIdSchema = z
  .string()
  .refine((value) => Types.ObjectId.isValid(value), {
    message: "Invalid ObjectId",
  });

export const createGuideZodSchema = z.object({
  user: objectIdSchema,

  bio: z
    .string({
      invalid_type_error: "Bio must be a string",
    })
    .max(1000, {
      message: "Bio cannot exceed 1000 characters.",
    })
    .optional(),

  experience: z
    .number({
      invalid_type_error: "Experience must be a number",
    })
    .min(0, {
      message: "Experience cannot be negative.",
    })
    .max(50, {
      message: "Experience cannot exceed 50 years.",
    })
    .optional(),

  languages: z
    .array(
      z.string().min(1, {
        message: "Language cannot be empty.",
      })
    )
    .optional(),

  specialization: z
    .array(
      z.string().min(1, {
        message: "Specialization cannot be empty.",
      })
    )
    .optional(),

  licenseNumber: z
    .string({
      invalid_type_error: "License number must be a string",
    })
    .max(100)
    .optional(),

  profilePicture: z
    .string({
      invalid_type_error: "Profile picture must be a string",
    })
    .url({
      message: "Profile picture must be a valid URL.",
    })
    .optional(),

  isAvailable: z
    .boolean({
      invalid_type_error: "isAvailable must be true or false",
    })
    .optional(),
});

export const updateGuideZodSchema = createGuideZodSchema.partial();