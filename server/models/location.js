const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  tagPrimaryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TAG", // Refers to the Tags collection
    required: true,
  },
  tagId: {
    type: String,
    required: true,
    ref: "TAG",
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
  coordinates: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
      default: [0, 0],
    },
  },
  battery: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  speed: {
    type: Number, // Optional field, speed in km/h
    default: null,
  },
});

locationSchema.index({ coordinates: "2dsphere" });

locationSchema.index({ timestamp: -1 });

const Location = mongoose.model("LOCATION", locationSchema);

module.exports = Location;
