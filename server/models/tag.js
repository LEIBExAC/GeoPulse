const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  tagId: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "USER",
    required: true,
  },
  sharedWith: [
    {
      type: Schema.Types.ObjectId,
      ref: "USER",
    },
  ],
  battery: {
    type: Number,
    default: 100,
  },
  status: {
    type: String,
    enum: ["online", "offline", "lost"],
    default: "offline",
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
  },
  lastSeen: {
    type: Date,
  },
  ringStatus: {
    type: Boolean,
    default: false,
  },
  lostMode: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

tagSchema.index({ location: "2dsphere" });

module.exports = model("Tag", tagSchema);
