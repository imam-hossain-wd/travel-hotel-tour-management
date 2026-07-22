import { Types } from "mongoose";
import { HotelAmenity, HotelImageType, HotelStar } from "./hotel.enum";

/* ---------------- Hotel Image Type ---------------- */


/* ---------------- Hotel Image ---------------- */

export interface IHotelImage {
    _id?: Types.ObjectId;
    url: string;
    publicId: string;
    type: HotelImageType;
    alt?: string;
    title?: string;
    isPrimary?: boolean;
    order?: number;
}

/* ---------------- Hotel ---------------- */

export interface IHotelImage {
    _id?: Types.ObjectId;

    url: string;

    publicId: string;

    type: HotelImageType;

    alt?: string;

    title?: string;

    isPrimary?: boolean;

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
        type: "Point";
        coordinates: [number, number]; // [longitude, latitude]
    };
    star: HotelStar;
    amenities?: HotelAmenity;
    checkInTime?: string;
    checkOutTime?: string;
    averageRating?: number;
    reviewCount?: number;
    lowestPrice?: number;
    isFeatured?: boolean;
    isPublished?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}


// export interface IHotel {
//     name: string;
//     slug: string;
//     description?: string;
//     images: IHotelImage[];
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
//     createdAt?: Date;
//     updatedAt?: Date;
// }


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