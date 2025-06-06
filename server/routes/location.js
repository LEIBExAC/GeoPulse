const express = require("express");
const router = express.Router();
const {
  updateLocation,
  getLatestLocation,
  getLocationHistory,
  getActiveTagsLatestLocations,
} = require("../controller/locationController");
const verifyToken = require("../middlewares/verifyToken");

// POST - Update location
router.post("/update-loc", updateLocation);

// GET - Get latest location of a tag
router.get("/:tagId/latest", verifyToken, getLatestLocation);

// GET - Get location history of a tag
router.get("/:tagId/history", verifyToken, getLocationHistory);

// GET - Get latest locations of all active tags
router.get("/active-tags", verifyToken, getActiveTagsLatestLocations);

module.exports = router;
