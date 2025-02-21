const { Schema, model, Types } = require("mongoose");

const adSchema = new Schema({
  headline: {
    type: String,
    required: [true, "Headline is required"],
    minLength: [4, "Headline must be at least 4 characters long"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    minLength: [8, "Location must be at least 8 characters long"],
  },
  companyName: {
    type: String,
    required: [true, "Company name is required"],
    minLength: [3, "Company Name must be at least 3 characters"],
  },
  companyDescription: {
    type: String,
    required: [true, "Company description is required"],
    maxLength: [
      40,
      "Company description should be a maximumof 40 characters long",
    ],
  },
  author: { type: Types.ObjectId, ref: "User" },
  ussersApplied: [{ type: Types.ObjectId, ref: "User" }],
});

const Ad = model("Ad", adSchema);
module.exports = Ad;
