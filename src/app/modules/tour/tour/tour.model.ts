import { model, Schema } from "mongoose";
import {
  ITour,
  ITourCapacity,
  ITourDuration,
  ITourItinerary,
} from "./tour.interface";
import { TourDifficulty, TourStatus } from "./tour.enum";


const durationSchema = new Schema<ITourDuration>(
  {
    days: {
      type: Number,
      required: true,
      min: 1,
    },
    nights: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  }
);

const capacitySchema = new Schema<ITourCapacity>(
  {
    maxGuest: {
      type: Number,
      required: true,
      min: 1,
    },
    minGuest: {
      type: Number,
      default: 1,
    },
    minAge: Number,
  },
  {
    _id: false,
  }
);

const itinerarySchema = new Schema<ITourItinerary>(
  {
    day: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    activities: [String],

    meals: [String],

    accommodation: String,
  },
  {
    _id: false,
  }
);

const tourSchema = new Schema<ITour>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    shortDescription: String,

    description: String,

    // thumbnail: String,

    images: {
      type: [String],
      default: [],
    },

    location: {
      type: String,
      required: true,
    },

    travelStyle: {
      type: Schema.Types.ObjectId,
      ref: "TravelStyle",
      required: true,
    },

    difficulty: {
      type: String,
      enum: Object.values(TourDifficulty),
      default: TourDifficulty.EASY,
    },

    guide: {
      type: Schema.Types.ObjectId,
      ref: "Guide",
      required: true,
    },
    tourCategory: {
      type: Schema.Types.ObjectId,
      ref: "Tour",
      required: true,
    },

    tourStatus: {
      type: String,
      enum: Object.values(TourStatus),
      default: TourStatus.UPCOMING,
    },

    duration: durationSchema,

    startDate: Date,

    endDate: Date,

    pricing: {
      type: Number,
      required: true,
      min: 0,
    },

    capacity: capacitySchema,

    included: {
      type: [String],
      default: [],
    },

    excluded: {
      type: [String],
      default: [],
    },

    amenities: {
      type: [String],
      default: [],
    },

    highlights: {
      type: [String],
      default: [],
    },

    itinerary: {
      type: [itinerarySchema],
      default: [],
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

export const Tour = model<ITour>("Tour", tourSchema)