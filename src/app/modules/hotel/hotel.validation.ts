import { z } from "zod";

const locationSchema = z.object({
    lat: z.number({
        required_error: "Latitude is required",
        invalid_type_error: "Latitude must be a number",
    }),
    lng: z.number({
        required_error: "Longitude is required",
        invalid_type_error: "Longitude must be a number",
    }),
});

export const createHotelZodSchema = z.object({
    name: z
        .string({
            required_error: "Hotel name is required",
            invalid_type_error: "Hotel name must be a string",
        })
        .min(2)
        .max(100),

    description: z.string().optional(),

    address: z
        .string({
            required_error: "Address is required",
        })
        .min(5)
        .max(300),

    division: z.string({
        required_error: "Division is required",
    }),

    location: locationSchema,

    star: z
        .number({
            required_error: "Star rating is required",
        })
        .min(1)
        .max(5),

    amenities: z.array(z.string()).optional(),

    phone: z.string().optional(),

    email: z
        .string()
        .email("Invalid email address")
        .optional(),

    website: z
        .string()
        .url("Invalid website url")
        .optional(),

    checkInTime: z.string().optional(),

    checkOutTime: z.string().optional(),

    isFeatured: z.boolean().optional(),

    isPublished: z.boolean().optional(),
});

export const updateHotelZodSchema = z.object({
    name: z.string().min(2).max(100).optional(),

    description: z.string().optional(),

    address: z.string().min(5).max(300).optional(),

    division: z.string().optional(),

    location: locationSchema.optional(),

    star: z
        .number()
        .min(1)
        .max(5)
        .optional(),

    amenities: z.array(z.string()).optional(),

    phone: z.string().optional(),

    email: z
        .string()
        .email("Invalid email address")
        .optional(),

    website: z
        .string()
        .url("Invalid website url")
        .optional(),

    checkInTime: z.string().optional(),

    checkOutTime: z.string().optional(),

    isFeatured: z.boolean().optional(),

    isPublished: z.boolean().optional(),

    deleteImages: z.array(z.string()).optional(),
});