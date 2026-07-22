import { Types } from "mongoose";


export interface IHotel {
    name: string;
    slug: string;
    description?: string;
    thumbnail?: string;
    images?: string[];
    address: string;
    division: Types.ObjectId;
    location: {
        lat: number;
        lng: number;
    };
    star: number;
    amenities?: string[];
    phone?: string;
    email?: string;
    website?: string;
    checkInTime?: string;
    checkOutTime?: string;
    isFeatured?: boolean;
    isPublished?: boolean;
}