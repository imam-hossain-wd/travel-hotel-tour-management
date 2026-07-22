import { model, Schema } from "mongoose";
import { IGuide } from "./guide.interface";

const guideSchema = new Schema<IGuide>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    bio: {
      type: String,
    },

    experience: {
      type: Number,
      default: 0,
    },

    languages: [
      {
        type: String,
      },
    ],

    specialization: [
      {
        type: String,
      },
    ],

    licenseNumber: {
      type: String,
    },

    profilePicture: {
      type: String,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Guide = model<IGuide>("Guide", guideSchema);