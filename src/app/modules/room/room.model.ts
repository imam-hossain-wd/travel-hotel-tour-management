import { model, Schema } from "mongoose";
import {
    IRoom,
    IRoomBed,
    IRoomCapacity,
    IRoomImage,
    IRoomPricing,
    IRoomSize,
} from "./room.interface";
import {
    BedType,
    RoomImageType,
    RoomStatus,
    RoomType,
} from "./room.enum";

/* ---------------- Room Image Schema ---------------- */

const roomImageSchema = new Schema<IRoomImage>(
    {
        url: {
            type: String,
            required: true,
        },

        publicId: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            enum: Object.values(RoomImageType),
            default: RoomImageType.OTHER,
        },

        alt: String,

        title: String,

        isPrimary: {
            type: Boolean,
            default: false,
        },

        order: {
            type: Number,
            default: 0,
        },
    },
    {
        _id: true,
    }
);

/* ---------------- Room Size Schema ---------------- */

const roomSizeSchema = new Schema<IRoomSize>(
    {
        value: {
            type: Number,
            required: true,
        },

        unit: {
            type: String,
            enum: ["sqft", "sqm"],
            required: true,
        },
    },
    {
        _id: false,
    }
);

/* ---------------- Pricing Schema ---------------- */

const pricingSchema = new Schema<IRoomPricing>(
    {
        basePrice: {
            type: Number,
            required: true,
        },

        discountPrice: Number,

        extraGuestPrice: Number,

        currency: {
            type: String,
            default: "BDT",
        },
    },
    {
        _id: false,
    }
);

/* ---------------- Capacity Schema ---------------- */

const capacitySchema = new Schema<IRoomCapacity>(
    {
        adults: {
            type: Number,
            required: true,
        },

        children: {
            type: Number,
            default: 0,
        },

        infants: {
            type: Number,
            default: 0,
        },
    },
    {
        _id: false,
    }
);

/* ---------------- Bed Schema ---------------- */

const bedSchema = new Schema<IRoomBed>(
    {
        type: {
            type: String,
            enum: Object.values(BedType),
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
        },
    },
    {
        _id: false,
    }
);

/* ---------------- Room Schema ---------------- */

const roomSchema = new Schema<IRoom>(
    {
        hotel: {
            type: Schema.Types.ObjectId,
            ref: "Hotel",
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            unique: true,
        },

        roomCode: {
            type: String,
            trim: true,
        },

        roomType: {
            type: String,
            enum: Object.values(RoomType),
            required: true,
        },

        description: String,

        images: {
            type: [roomImageSchema],
            default: [],
        },

        roomSize: roomSizeSchema,

        pricing: {
            type: pricingSchema,
            required: true,
        },

        capacity: {
            type: capacitySchema,
            required: true,
        },

        beds: {
            type: [bedSchema],
            required: true,
        },

        amenities: {
            type: [String],
            default: [],
        },

        status: {
            type: String,
            enum: Object.values(RoomStatus),
            default: RoomStatus.AVAILABLE,
        },

        totalRooms: {
            type: Number,
            required: true,
        },

        availableRooms: {
            type: Number,
            required: true,
        },

        isBreakfastIncluded: {
            type: Boolean,
            default: false,
        },

        isRefundable: {
            type: Boolean,
            default: false,
        },

        checkInTime: String,

        checkOutTime: String,

        averageRating: {
            type: Number,
            default: 0,
        },

        reviewCount: {
            type: Number,
            default: 0,
        },

        isFeatured: {
            type: Boolean,
            default: false,
        },

        isPublished: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

/* ---------------- Generate Slug ---------------- */

roomSchema.pre("save", async function (next) {

    if (this.isModified("name")) {

        const baseSlug = this.name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-");

        let slug = baseSlug;
        let counter = 1;

        while (await Room.exists({ slug })) {
            slug = `${baseSlug}-${counter++}`;
        }

        this.slug = slug;
    }

    next();
});

/* ---------------- Update Slug ---------------- */

roomSchema.pre("findOneAndUpdate", async function (next) {

    const room = this.getUpdate() as Partial<IRoom>;

    if (room.name) {

        const baseSlug = room.name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-");

        let slug = baseSlug;
        let counter = 1;

        while (await Room.exists({ slug })) {
            slug = `${baseSlug}-${counter++}`;
        }

        room.slug = slug;
    }

    this.setUpdate(room);

    next();
});

/* ---------------- Indexes ---------------- */

roomSchema.index({ hotel: 1 });

roomSchema.index({ slug: 1 });

roomSchema.index({ roomType: 1 });

roomSchema.index({ status: 1 });

roomSchema.index({
    hotel: 1,
    roomCode: 1,
}, {
    unique: true,
});

export const Room = model<IRoom>("Room", roomSchema);