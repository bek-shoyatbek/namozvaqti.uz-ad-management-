import { Schema, model } from "mongoose";

const clicksViewsSchema = new Schema({
  date: { type: Date, required: true },
  clicks: [String],
  views: [String],
});

const adSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    dailyClicksViews: [clicksViewsSchema],
    monthlyClicksViews: [clicksViewsSchema],
    location: {
      type: String,
      enum: ["header", "popup"],
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Ad", adSchema);
