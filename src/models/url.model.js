import { Schema, model } from "mongoose";

const URLSchema = new Schema(
  {
    urlCode: {
      type: String,
      required: true,
    },
    longUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

export const URL = model("URL", URLSchema);
