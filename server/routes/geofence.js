const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  createGeofence,
  updateGeofence,
} = require("../controller/geofenceController");

// POST - Create a geofence for a tag
router.post("/:tagId/create", verifyToken, createGeofence);

// PUT - Update a geofence for a tag
router.put("/:tagId/update", verifyToken, updateGeofence);
