import { model, Schema } from "mongoose";
import { ITravelStyle } from "./travelStyle.interface";


const travelStyleSchema = new Schema<ITravelStyle>(
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
      trim: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const TravelStyle = model<ITravelStyle>(
  "TravelStyle",
  travelStyleSchema
);