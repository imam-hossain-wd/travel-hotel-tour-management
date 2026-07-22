import { z } from "zod";

const imageSchema = z.object({
    url: z.string(),
    publicId: z.string(),
    type: z.string(),
    alt: z.string().optional(),
    title: z.string().optional(),
    isPrimary: z.boolean().optional(),
    order: z.number().optional(),
});

export const createRoomZodSchema = z.object({

    hotel: z.string(),

    name: z.string(),

    roomNumber: z.string().optional(),

    roomType: z.string(),

    description: z.string().optional(),

    roomSize: z.object({
        value: z.number(),
        unit: z.enum(["sqft", "sqm"]),
    }).optional(),

    pricing: z.object({
        basePrice: z.number(),
        discountPrice: z.number().optional(),
        extraGuestPrice: z.number().optional(),
    }),

    capacity: z.object({
        adults: z.number(),
        children: z.number().optional(),
        infants: z.number().optional(),
    }),

    beds: z.array(
        z.object({
            type: z.string(),
            quantity: z.number(),
        })
    ),

    amenities: z.array(z.string()).optional(),

    status: z.string(),

    totalRooms: z.number(),

    availableRooms: z.number(),

    isBreakfastIncluded: z.boolean().optional(),

    isRefundable: z.boolean().optional(),

    checkInTime: z.string().optional(),

    checkOutTime: z.string().optional(),

    isFeatured: z.boolean().optional(),

    isPublished: z.boolean().optional(),

    images: z.array(imageSchema).optional(),
});

export const updateRoomZodSchema =
    createRoomZodSchema
        .partial()
        .extend({
            deleteImages: z.array(z.string()).optional(),
        });