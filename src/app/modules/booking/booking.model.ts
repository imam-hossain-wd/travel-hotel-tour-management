import { model, Schema } from "mongoose";
import { IBooking } from "./booking.interface";
import {
    BookingStatus,
    GuestType,
} from "./booking.enum";

/* ---------------- Guest Schema ---------------- */

const bookingGuestSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        age: Number,

        type: {
            type: String,
            enum: Object.values(GuestType),
            required: true,
        },
    },
    {
        _id: false,
    }
);

/* ---------------- Contact Schema ---------------- */

const bookingContactSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        country: String,

        address: String,
    },
    {
        _id: false,
    }
);

/* ---------------- Stay Schema ---------------- */

const bookingStaySchema = new Schema(
    {
        checkIn: {
            type: Date,
            required: true,
        },

        checkOut: {
            type: Date,
            required: true,
        },

        totalNights: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    {
        _id: false,
    }
);

/* ---------------- Price Schema ---------------- */

const bookingPriceSchema = new Schema(
    {
        roomPrice: {
            type: Number,
            required: true,
            min: 0,
        },

        extraGuestCharge: {
            type: Number,
            default: 0,
            min: 0,
        },

        tax: {
            type: Number,
            default: 0,
            min: 0,
        },

        serviceCharge: {
            type: Number,
            default: 0,
            min: 0,
        },

        discount: {
            type: Number,
            default: 0,
            min: 0,
        },

        total: {
            type: Number,
            required: true,
            min: 0,
        },

        currency: {
            type: String,
            default: "BDT",
        },
    },
    {
        _id: false,
    }
);

/* ---------------- Booking Schema ---------------- */

const bookingSchema = new Schema<IBooking>(
    {
        bookingId: {
            type: String,
            unique: true,
        },

        hotel: {
            type: Schema.Types.ObjectId,
            ref: "Hotel",
            required: true,
        },

        room: {
            type: Schema.Types.ObjectId,
            ref: "Room",
            required: true,
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        contact: {
            type: bookingContactSchema,
            required: true,
        },

        guests: {
            type: [bookingGuestSchema],
            required: true,
        },

        stay: {
            type: bookingStaySchema,
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        bookingStatus: {
            type: String,
            enum: Object.values(BookingStatus),
            default: BookingStatus.PENDING,
        },

        specialRequest: String,

        price: {
            type: bookingPriceSchema,
            required: true,
        },

        isRefundable: {
            type: Boolean,
            default: true,
        },

        cancellationReason: String,

        notes: String,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

/* ---------------- Booking ID Generate ---------------- */

bookingSchema.pre("save", async function (next) {

    if (!this.bookingId) {

        const totalBooking = await Booking.countDocuments();

        this.bookingId = `BK-${new Date().getFullYear()}-${String(
            totalBooking + 1
        ).padStart(6, "0")}`;
    }

    next();
});

/* ---------------- Validate Stay ---------------- */

bookingSchema.pre("validate", function (next) {

    if (this.stay.checkOut <= this.stay.checkIn) {
        return next(
            new Error("Check-out date must be after check-in date.")
        );
    }

    next();
});

/* ---------------- Indexes ---------------- */

bookingSchema.index({ bookingId: 1 });

bookingSchema.index({ hotel: 1 });

bookingSchema.index({ room: 1 });

bookingSchema.index({ user: 1 });

bookingSchema.index({ bookingStatus: 1 });

bookingSchema.index({
    "stay.checkIn": 1,
    "stay.checkOut": 1,
});

bookingSchema.index({
    "contact.phone": 1,
});

bookingSchema.index({
    "contact.email": 1,
});

export const Booking = model<IBooking>(
    "Booking",
    bookingSchema
);