// import { Types } from "mongoose";



// export interface IHotelImage {

//     _id?: Types.ObjectId;
//     url: string;
//     publicId: string;
//     alt?: string;
//     title?: string;
//     isPrimary?: boolean;
//     order?: number;
// }


// export interface IHotel {
//     name: string;
//     slug: string;
//     description?: string;
//     thumbnail?: string;
//     images?: string[];
//     address: string;
//     division: Types.ObjectId;
//     location: {
//         lat: number;
//         lng: number;
//     };
//     star: number;
//     amenities?: string[];
//     phone?: string;
//     email?: string;
//     website?: string;
//     checkInTime?: string;
//     checkOutTime?: string;
//     isFeatured?: boolean;
//     isPublished?: boolean;
// }

import { Types } from "mongoose";

/* ---------------- Hotel Image Type ---------------- */

export enum HotelImageType {
    THUMBNAIL = "THUMBNAIL",
    COVER = "COVER",
    LOBBY = "LOBBY",
    ROOM = "ROOM",
    RESTAURANT = "RESTAURANT",
    POOL = "POOL",
    GYM = "GYM",
    VIEW = "VIEW",
    FACILITY = "FACILITY",
    OTHER = "OTHER",
}

/* ---------------- Hotel Image ---------------- */

export interface IHotelImage {
    _id?: Types.ObjectId;

    // Cloudinary secure url
    url: string;

    // Cloudinary public_id
    publicId: string;

    // Image category
    type: HotelImageType;

    // SEO & Accessibility
    alt?: string;

    // Admin panel / Gallery title
    title?: string;

    // Cover / Thumbnail Image
    isPrimary?: boolean;
    // Gallery display order
    order?: number;
}

/* ---------------- Hotel ---------------- */

export interface IHotel {
    name: string;
    slug: string;
    description?: string;
    images: IHotelImage[];
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
    createdAt?: Date;
    updatedAt?: Date;
}


// {
//   "images": [
//     {
//       "url": "https://res.cloudinary.com/.../cover.jpg",
//       "publicId": "hotel/cover123",
//       "type": "COVER",
//       "title": "Hotel Front View",
//       "alt": "Sea Pearl Hotel Front View",
//       "isPrimary": true,
//       "order": 1
//     },
//     {
//       "url": "https://res.cloudinary.com/.../lobby.jpg",
//       "publicId": "hotel/lobby123",
//       "type": "LOBBY",
//       "title": "Main Lobby",
//       "order": 2
//     },
//     {
//       "url": "https://res.cloudinary.com/.../room.jpg",
//       "publicId": "hotel/room123",
//       "type": "ROOM",
//       "title": "Deluxe Room",
//       "order": 3
//     }
//   ]
// }