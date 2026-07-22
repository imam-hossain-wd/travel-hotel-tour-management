import { z } from "zod";
import { TourDifficulty, TourStatus } from "./tour.enum";

const durationSchema = z.object({
    days: z
        .number()
        .min(1, "Days must be at least 1"),

    nights: z
        .number()
        .min(0, "Nights cannot be negative"),
});

const capacitySchema = z.object({
    maxGuest: z
        .number()
        .min(1, "Maximum guest must be at least 1"),

    minGuest: z
        .number()
        .min(1)
        .optional(),

    minAge: z
        .number()
        .min(0)
        .optional(),
});

const itinerarySchema = z.object({
    day: z.number().min(1),

    title: z
        .string()
        .min(1, "Title is required"),

    description: z
        .string()
        .min(1, "Description is required"),

    activities: z.array(z.string()).optional(),

    meals: z.array(z.string()).optional(),

    accommodation: z.string().optional(),
});

export const createTourZodSchema = z.object({
    title: z
        .string()
        .min(3)
        .max(150),

    shortDescription: z
        .string()
        .max(300)
        .optional(),

    description: z
        .string()
        .optional(),

    location: z.string(),

    tourCategory: z.string(),

    travelStyle: z.string(),

    guide: z.string(),

    difficulty: z.enum(Object.values(TourDifficulty) as [string]),

    tourStatus: z.enum(Object.values(TourStatus) as [string]),

    duration: durationSchema,

    startDate: z.string().datetime().optional(),

    endDate: z.string().datetime().optional(),

    pricing: z
        .number()
        .min(0),

    capacity: capacitySchema,

    included: z.array(z.string()).optional(),

    excluded: z.array(z.string()).optional(),

    amenities: z.array(z.string()).optional(),

    highlights: z.array(z.string()).optional(),

    itinerary: z.array(itinerarySchema).optional(),

    isFeatured: z.boolean().optional(),

    isPublished: z.boolean().optional(),
});

export const updateTourZodSchema = createTourZodSchema
    .partial()
    .extend({
        deleteImages: z.array(z.string()).optional(),
    });