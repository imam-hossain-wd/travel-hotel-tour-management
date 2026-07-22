// import { model, Schema } from "mongoose";
// import { ITour, ITourType } from "./tour.interface";

// const tourTypeSchema = new Schema<ITourType>({
//     name: { type: String, required: true, unique: true }
// }, {
//     timestamps: true
// })

// export const TourType = model<ITourType>("TourType", tourTypeSchema)

// const tourSchema = new Schema<ITour>({
//     title: { type: String, required: true },
//     slug: { type: String, unique: true },
//     description: { type: String },
//     images: { type: [String], default: [] },
//     location: { type: String },
//     costFrom: { type: Number },
//     startDate: { type: Date },
//     endDate: { type: Date },
//     departureLocation: { type: String },
//     arrivalLocation: { type: String },
//     included: { type: [String], default: [] },
//     excluded: { type: [String], default: [] },
//     amenities: { type: [String], default: [] },
//     tourPlan: { type: [String], default: [] },
//     maxGuest: { type: Number },
//     minAge: { type: Number },
//     division: {
//         type: Schema.Types.ObjectId,
//         ref: "Division",
//         required: true
//     },
//     tourType: {
//         type: Schema.Types.ObjectId,
//         ref: "TourType",
//         required: true
//     }
// }, {
//     timestamps: true
// })

// tourSchema.pre("save", async function (next) {

//     if (this.isModified("title")) {
//         const baseSlug = this.title.toLowerCase().split(" ").join("-")
//         let slug = `${baseSlug}`

//         let counter = 0;
//         while (await Tour.exists({ slug })) {
//             slug = `${slug}-${counter++}` // dhaka-division-2
//         }

//         this.slug = slug;
//     }
//     next()
// })

// tourSchema.pre("findOneAndUpdate", async function (next) {
//     const tour = this.getUpdate() as Partial<ITour>

//     if (tour.title) {
//         const baseSlug = tour.title.toLowerCase().split(" ").join("-")
//         let slug = `${baseSlug}`


//         let counter = 0;
//         while (await Tour.exists({ slug })) {
//             slug = `${slug}-${counter++}` // dhaka-division-2
//         }

//         tour.slug = slug
//     }

//     this.setUpdate(tour)

//     next()
// })

// export const Tour = model<ITour>("Tour", tourSchema)

import { model, Schema } from "mongoose";
import {
  ITour,
  ITourCapacity,
  ITourCategory,
  ITourDuration,
  ITourItinerary,
} from "./tour.interface";
import { TourDifficulty, TourStatus } from "./tour.enum";

/* ---------------- Tour Category ---------------- */

const tourCategorySchema = new Schema<ITourCategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    icon: String,
    description: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const TourCategory = model<ITourCategory>(
  "TourCategory",
  tourCategorySchema
);

/* ---------------- Tour ---------------- */

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

    thumbnail: String,

    images: {
      type: [String],
      default: [],
    },

    location: {
      type: String,
      required: true,
    },

    tourCategory: {
      type: Schema.Types.ObjectId,
      ref: "TourCategory",
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