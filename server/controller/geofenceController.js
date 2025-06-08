const Geofence = require("../models/geofence");
const Tag = require("../models/tag");
const {
  isSimilarGeofenceExists,
} = require("../utility/similarGeofenceValidator");

/**
 * This file contains the controller functions for geofence operations.
 *       It includes creating, updating and managing geofences for tags.
 */

const createGeofence = async (req, res) => {
  const { tagId } = req.params;
  const { type, center, radius, vertices } = req.body;

  const tag = await Tag.findOne({ tagId });

  if (!tag) {
    return res.status(404).json({ success: false, message: "Tag not found" });
  }

  const isAdmin = req.role === "admin";

  if (!isAdmin) {
    return res.status(403).json({ success: false, message: "Access denied" });
  }

  // Check if geofence already exists for the tag and if exists then they are not similar
  const existingGeofences = await Geofence.find({ tagId });

  if (existingGeofences.length > 0) {
    const similarGeofence = isSimilarGeofenceExists(existingGeofences, {
      type,
      center,
      radius,
      vertices,
    });
    if (similarGeofence) {
      return res.status(409).json({
        success: false,
        message: "A similar geofence already exists for this tag.",
      });
    }
  }

  if (!["circular", "polygonal"].includes(type)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid geofence type" });
  }

  if (type === "circular" && (!center || !radius)) {
    return res.status(400).json({
      success: false,
      message: "Center and radius are required for circular geofence",
    });
  }

  if (type === "polygonal" && !vertices?.length) {
    return res.status(400).json({
      success: false,
      message: "Vertices are required for polygonal geofence",
    });
  }

  const geofenceData = {
    tagId: tagId,
    type: type,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  if (type === "circular") {
    geofenceData.center = center;
    geofenceData.radius = radius;
  }

  if (type === "polygonal") {
    geofenceData.vertices = vertices;
  }

  try {
    const geofence = new Geofence(geofenceData);
    await geofence.save();

    return res.status(201).json({
      success: true,
      message: "Geofence created successfully",
      geofence: geofence,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to create geofence" });
  }
};

const updateGeofence = async (req, res) => {
  const { tagId } = req.params;
  const { type, center, radius, vertices } = req.body;

  try {
    const tag = await Tag.findOne({ tagId });

    if (!tag) {
      return res.status(404).json({ success: false, message: "Tag not found" });
    }

    if (req.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const geofence = await Geofence.findOne({ tagId });

    if (!geofence) {
      return res
        .status(404)
        .json({ success: false, message: "Geofence not found" });
    }

    if (type && !["circular", "polygonal"].includes(type)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid geofence type" });
    }

    if (type === "circular" && (!center || !radius)) {
      return res.status(400).json({
        success: false,
        message: "Center and radius are required for circular geofence",
      });
    }

    if (type === "polygonal" && !vertices?.length) {
      return res.status(400).json({
        success: false,
        message: "Vertices are required for polygonal geofence",
      });
    }

    if (type) geofence.type = type;
    if (type === "circular") {
      if (center) geofence.center = center;
      if (radius) geofence.radius = radius;
    }
    if (type === "polygonal" && vertices?.length) {
      geofence.vertices = vertices;
    }

    geofence.updatedAt = new Date();
    await geofence.save();

    return res.status(200).json({
      success: true,
      message: "Geofence updated successfully",
      geofence,
    });
  } catch (error) {
    console.error("Error updating geofence:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update geofence" });
  }
};

module.exports = { createGeofence, updateGeofence };
