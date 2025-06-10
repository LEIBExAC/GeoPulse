const express = require("express");
const router = express.Router();
const {
  createGeofence,
  updateGeofence,
  getAllGeofencesForTag,
  getGeofenceById,
  enableGeofence,
  disableGeofence,
  deleteGeofence,
  getGeofenceAlerts,
} = require("../controller/geofenceController");
const verifyToken = require("../middlewares/verifyToken");

// POST - Create a geofence for a tag
router.post("/:tagId/create", verifyToken, createGeofence);

// PUT - Update a geofence for a tag
router.put("/:tagId/:geofenceId/update", verifyToken, updateGeofence);

// GET - Get all geofences for a tag
router.get("/:tagId", getAllGeofencesForTag);

// GET - Get a specific geofence by ID for a tag
router.get("/:tagId/:geofenceId", getGeofenceById);

// PUT - Enable a geofence for a tag
router.put("/:tagId/:geofenceId/enable", enableGeofence);

// PUT - Disable a geofence for a tag
router.put("/:tagId/:geofenceId/disable", disableGeofence);

// DELETE - Delete a geofence for a tag
router.delete("/:tagId/:geofenceId/delete", deleteGeofence);

router.get("/:tagId/alerts", getGeofenceAlerts);

module.exports = router;
