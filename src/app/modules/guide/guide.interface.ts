
import { Types } from "mongoose";

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

