import { model, Schema } from "mongoose";
import { ITourCategory } from "./tourCategory.interface copy";

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