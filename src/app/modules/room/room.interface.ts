import { Types } from "mongoose";
import {
    BedType,
    RoomAmenity,
    RoomImageType,
    RoomStatus,
    RoomType,
} from "./room.enum";

/* ---------------- Room Image ---------------- */

export interface IRoomImage {
    _id?: Types.ObjectId;
    url: string;
    publicId: string;
    type: RoomImageType;
    alt?: string;
    title?: string;
    isPrimary?: boolean;
    order?: number;
}

/* ---------------- Room Size ---------------- */

export interface IRoomSize {
    value: number;
    unit: "sqft" | "sqm";
}

/* ---------------- Pricing ---------------- */

export interface IRoomPricing {
    basePrice: number;
    discountPrice?: number;
    extraGuestPrice?: number;
    currency: string;
}

/* ---------------- Capacity ---------------- */

export interface IRoomCapacity {
    adults: number;
    children?: number;
    infants?: number;
}

/* ---------------- Beds ---------------- */

export interface IRoomBed {
    type: BedType;
    quantity: number;
}

/* ---------------- Room ---------------- */

export interface IRoom {
    hotel: Types.ObjectId;
    name: string;
    slug: string;
    roomCode?: string;
    roomType: RoomType;
    description?: string;
    images: IRoomImage[];
    roomSize?: IRoomSize;
    pricing: IRoomPricing;
    capacity: IRoomCapacity;
    beds: IRoomBed[];
    amenities?: RoomAmenity;
    status: RoomStatus;
    totalRooms: number;
    availableRooms: number;
    isBreakfastIncluded?: boolean;
    isRefundable?: boolean;
    checkInTime?: string;
    checkOutTime?: string;
    averageRating?: number;
    reviewCount?: number;
    isFeatured?: boolean;
    isPublished?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}