const mongoose = require("mongoose");
const { Schema } = mongoose;

const alertSchema = new Schema({
  tagId: {
    type: String,
    required: true,
    ref: "Tag",
  },
  geofenceId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Geofence",
  },
  type: {
    type: String,
    enum: ["entry", "exit"],
    required: true,
    default: "entry",
  },
  location: {
    lat: { type: Number, required: true }, // Latitude of the breach location
    lng: { type: Number, required: true }, // Longitude of the breach location
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  notifiedTo: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Alert = mongoose.model("Alert", alertSchema);

module.exports = Alert;
