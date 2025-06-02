const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  tagId: {
    type: String,
    unique: true, // Unique identifier from device (e.g., MAC)
  },
  name: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'USER',
  },
  sharedWith: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'USER',
  }],
  battery: {
    type: Number,
    min: 0,
    max: 100,
    default: 100,
  },
  status: {
    type: String,
    enum: ['online', 'offline', 'lost'],
    default: 'offline',
  },
  lastSeen: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
      default: [0, 0],
    },
  },
  ringStatus: {
    type: Boolean,
    default: false,
  },
  lostMode: {
    type: Boolean,
    default: false,
  },
  activationDate: {
    type: Date,
  },
  manufacturingDate:{
    type:String,
  },
  activationStatus:{
    type:Boolean,
  },
  activationCode:{
    type:String,
  }
});

// 2dsphere index for geolocation queries
tagSchema.index({ location: '2dsphere' });

// Index for lastSeen to help with cleanup/alerts
tagSchema.index({ lastSeen: 1 });

// Index for owner
tagSchema.index({ owner: 1 });

module.exports = mongoose.model('TAG', tagSchema);
