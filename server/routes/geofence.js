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

router.get("/:tagId", getAllGeofencesForTag);

router.get("/:tagId/:geofenceId", getGeofenceById);

router.put("/:tagId/:geofenceId/enable", enableGeofence);

router.put("/:tagId/:geofenceId/disable", disableGeofence);

router.delete("/:tagId/:geofenceId/delete", deleteGeofence);

router.get("/:tagId/alerts", getGeofenceAlerts);

module.exports = router;
