import { model, Schema } from "mongoose";
import { IHotel } from "./hotel.interface";

const locationSchema = new Schema(
  {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const hotelSchema = new Schema<IHotel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    description: String,

    thumbnail: String,

    images: {
      type: [String],
      default: [],
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    division: {
      type: Schema.Types.ObjectId,
      ref: "Division",
      required: true,
    },

    location: {
      type: locationSchema,
      required: true,
    },

    star: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    amenities: {
      type: [String],
      default: [],
    },

    phone: String,

    email: String,

    website: String,

    checkInTime: String,

    checkOutTime: String,

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

/* ---------------- Slug Generate ---------------- */

hotelSchema.pre("save", async function (next) {
  if (this.isModified("name")) {
    const baseSlug = this.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    let slug = baseSlug;
    let counter = 1;

    while (await Hotel.exists({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    this.slug = slug;
  }

  next();
});

/* ---------------- Update Slug ---------------- */

hotelSchema.pre("findOneAndUpdate", async function (next) {
  const hotel = this.getUpdate() as Partial<IHotel>;

  if (hotel.name) {
    const baseSlug = hotel.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    let slug = baseSlug;
    let counter = 1;

    while (await Hotel.exists({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    hotel.slug = slug;
  }

  this.setUpdate(hotel);

  next();
});

export const Hotel = model<IHotel>("Hotel", hotelSchema);