const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  tagId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TAG', // Refers to the Tags collection
    required: true
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  },
  coordinates: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
      default: [0, 0]
    }
  },
  battery: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  speed: {
    type: Number, // Optional field, speed in km/h
    default: null
  }
});

// Enable geospatial queries
locationSchema.index({ coordinates: '2dsphere' });

// Optional: Index on timestamp for fast recent lookups
locationSchema.index({ timestamp: -1 });

const Location = mongoose.model('LOCATION', locationSchema);

module.exports = Location;
