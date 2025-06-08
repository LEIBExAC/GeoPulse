  const mongoose = require("mongoose");
  const { Schema } = mongoose;

  const geofenceSchema = new Schema({
    tagId: {
      type: String,
      required: true,
      ref: "Tag",
      index: true,
    },
    type: {
      type: String,
      enum: ["circular", "polygonal"],
      required: true,
    },
    center: {
      // Circular geofence
      lat: {
        type: Number,
        required: function () {
          return this.type === "circular";
        },
      },
      lng: {
        type: Number,
        required: function () {
          return this.type === "circular";
        },
      },
    },
    radius: {
      type: Number,
      required: function () {
        return this.type === "circular";
      },
    },
    vertices: [
      // Polygonal geofence
      {
        lat: {
          type: Number,
          required: function () {
            return this.type === "polygonal";
          },
        },
        lng: {
          type: Number,
          required: function () {
            return this.type === "polygonal";
          },
        },
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });

  const Geofence = mongoose.model("Geofence", geofenceSchema);

  module.exports = Geofence;
