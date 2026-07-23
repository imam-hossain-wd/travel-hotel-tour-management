import { Types } from "mongoose";
import {
    BookingStatus,
    GuestType,
} from "./booking.enum";

/* ---------------- Guest ---------------- */

export interface IBookingGuest {
    name: string;
    age?: number;
    type: GuestType;
}

/* ---------------- Contact ---------------- */

export interface IBookingContact {

    fullName: string;
    email: string;
    phone: string;
    country?: string;
    address?: string;
}

/* ---------------- Stay ---------------- */

export interface IBookingStay {
    checkIn: Date;
    checkOut: Date;
    totalNights: number;
}

/* ---------------- Price ---------------- */

export interface IBookingPrice {

    roomPrice: number;
    extraGuestCharge?: number;
    tax?: number;
    serviceCharge?: number;
    discount?: number;
    total: number;
    currency: string;
}

/* ---------------- Booking ---------------- */

export interface IBooking {

    bookingId: string;
    hotel: Types.ObjectId;
    room: Types.ObjectId;
    user?: Types.ObjectId;
    contact: IBookingContact;
    guests: IBookingGuest[];
    stay: IBookingStay;
    quantity: number;
    bookingStatus: BookingStatus;
    specialRequest?: string;
    price: IBookingPrice;
    isRefundable: boolean;
    cancellationReason?: string;
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
}