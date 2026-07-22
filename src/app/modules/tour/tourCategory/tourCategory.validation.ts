import z from "zod";

export const createTourCategoryZodSchema = z.object({
    name: z
        .string({
            invalid_type_error: "Name must be a string",
        })
        .min(2, {
            message: "Name must be at least 2 characters long.",
        })
        .max(100, {
            message: "Name cannot exceed 100 characters.",
        }),

    slug: z
        .string({
            invalid_type_error: "Slug must be a string",
        })
        .min(2, {
            message: "Slug must be at least 2 characters long.",
        })
        .max(120, {
            message: "Slug cannot exceed 120 characters.",
        })
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
            message:
                "Slug must contain only lowercase letters, numbers and hyphens.",
        }),

    icon: z
        .string({
            invalid_type_error: "Icon must be a string",
        })
        .max(100, {
            message: "Icon cannot exceed 100 characters.",
        })
        .optional(),

    description: z
        .string({
            invalid_type_error: "Description must be a string",
        })
        .max(500, {
            message: "Description cannot exceed 500 characters.",
        })
        .optional(),
});

export const updateTourCategoryZodSchema =
    createTourCategoryZodSchema.partial();