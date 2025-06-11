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
router.get("/:tagId", verifyToken, getAllGeofencesForTag);

router.get("/:tagId/alerts", verifyToken, getGeofenceAlerts);

// GET - Get a specific geofence by ID for a tag
router.get("/:tagId/:geofenceId", verifyToken, getGeofenceById);

// PUT - Enable a geofence for a tag
router.put("/:tagId/:geofenceId/enable", verifyToken, enableGeofence);

// PUT - Disable a geofence for a tag
router.put("/:tagId/:geofenceId/disable", verifyToken, disableGeofence);

// DELETE - Delete a geofence for a tag
router.delete("/:tagId/:geofenceId/delete", verifyToken, deleteGeofence);

module.exports = router;
