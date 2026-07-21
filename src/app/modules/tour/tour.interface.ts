// import { Types } from "mongoose";

// export interface ITourType {
//     name: string;
// }

// // {
// //    "name":"Adventure",
// //    "slug":"adventure",
// //    "icon":"mountain",
// //    "description":"Adventure and trekking tours"
// // }
// // tour type : -
// // ----------------
// // Adventure
// // Beach
// // Hill
// // Island
// // Wildlife
// // Religious
// // Heritage
// // Camping
// // Cruise
// // ---------------------

// export interface ITourDuration {
//     name: string;
// }


// export interface ITour {
//     title: string;
//     slug: string;
//     description?: string;
//     images?: string[];
//     location?: string;
//     costFrom?: number;
//     startDate?: Date
//     departureLocation?: string;
//     arrivalLocation?: string;
//     endDate?: Date;
//     included?: string[];
//     excluded?: string[]
//     amenities?: string[];
//     tourPlan?: string[];
//     maxGuest?: number;
//     minAge?: number;
//     division: Types.ObjectId
//     tourType: Types.ObjectId
//     deleteImages?: string[]
// }

// //tour category 

// export interface ITourCategory {
//     name: string;
//     slug: string;
//     icon?: string;
//     description?: string;
// }

// // {
// //     "name": "Adventure",
// //     "slug": "adventure"
// // }

// // Adventure
// // Beach
// // Hill
// // Island
// // Wildlife
// // Religious
// // Heritage
// // Camping
// // Cruise

// // travel style 
// export interface ITravelStyle {
//     name: string;
//     slug: string;
//     description?: string;
// }
// // {
// //     "name": "Solo",
// //     "slug": "solo"
// // }
// // {
// //     "name": "Family",
// //     "slug": "family"
// // }
// // {
// //     "name": "Couple",
// //     "slug": "couple"
// // }
// // {
// //     "name": "Group",
// //     "slug": "group"
// // }
// // {
// //     "name": "Corporate",
// //     "slug": "corporate"
// // }


// export enum TourDifficulty {
//     EASY = "Easy",
//     MODERATE = "Moderate",
//     HARD = "Hard",
//     EXTREME = "Extreme",
// }

// // difficulty: TourDifficulty;


// // {
// //     "name": "Easy",
// //     "slug": "easy"
// // }

// // {
// //     "name": "Moderate",
// //     "slug": "moderate"
// // }

// // {
// //     "name": "Hard",
// //     "slug": "hard"
// // }
// // {
// //     "name": "Extreme",
// //     "slug": "extreme"
// // }

// // duration: {
// //     days: number;
// //     nights: number;
// // }

// // duration: {
// //     days: 3,
// //     nights: 2
// // }

import { Types } from "mongoose";
import { TourDifficulty, TourStatus } from "./tour.enum";


export interface ITourCategory {
    name: string;
    slug: string;
    icon?: string;
    description?: string;
}

export interface ITourDuration {
    days: number;
    nights: number;
}

// Tour Capacity
export interface ITourCapacity {
    maxGuest: number;
    minGuest?: number;
    minAge?: number;
}
// Tour Itinerary
export interface ITourItinerary {
    day: number;
    title: string;
    description: string;

    activities?: string[];
    meals?: string[];
    accommodation?: string;
}

export interface IGuide {
    user: Types.ObjectId;
    bio?: string;
    experience?: number;
    languages?: string[];
    specialization?: string[];
    licenseNumber?: string;
    profilePicture?: string;
    isAvailable?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ITour {
    title: string;
    slug: string;
    shortDescription?: string;
    description?: string;
    thumbnail?: string;
    images?: string[];
    deleteImages?: string[];
    location: string;
    tourCategory: Types.ObjectId;
    travelStyle: Types.ObjectId;
    difficulty: TourDifficulty;
    TourStatus:TourStatus,
    duration: ITourDuration;
    startDate?: Date;
    endDate?: Date;
    pricing: number;
    capacity: ITourCapacity;
    included?: string[];
    excluded?: string[];
    amenities?: string[];
    highlights?: string[];
    itinerary?: ITourItinerary[];
    // guide?: Types.ObjectId;
    // policy?: ITourPolicy;
    isFeatured?: boolean;
    isPublished?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}