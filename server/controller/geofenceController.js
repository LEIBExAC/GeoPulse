const Geofence = require("../models/geofence");
const Tag = require("../models/tag");
const {
  isSimilarGeofenceExists,
} = require("../utility/similarGeofenceValidator");

/**
 *  This file contains the controller functions for geofence operations.
 *  It includes creating, updating and managing geofences for tags.
 */

const createGeofence = async (req, res) => {
  const { tagId } = req.params;
  console.log("Creating geofence for tagId:", tagId);

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
    if (!Array.isArray(vertices) || vertices.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Polygonal geofence requires at least 3 vertices",
      });
    }

    geofenceData.vertices = vertices;
  }

  try {
    const geofence = new Geofence(geofenceData);
    await geofence.save();

    console.log("Geofence created successfully:", geofence);

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
    if (req.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Access denied (admin only)" });
    }

    const tag = await Tag.findOne({ tagId });
    if (!tag) {
      return res.status(404).json({ success: false, message: "Tag not found" });
    }

    const currentGeofence = await Geofence.findOne({ _id: geofenceId, tagId });
    if (!currentGeofence) {
      return res.status(404).json({
        success: false,
        message: "Geofence not found for this tag",
      });
    }

    if (!["circular", "polygonal"].includes(type)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid geofence type" });
    }

    if (type === "circular") {
      if (!center || typeof radius !== "number") {
        return res.status(400).json({
          success: false,
          message: "Circular geofence requires center and radius",
        });
      }
    }

    if (type === "polygonal") {
      if (!Array.isArray(vertices) || vertices.length < 3) {
        return res.status(400).json({
          success: false,
          message: "Polygonal geofence requires at least 3 vertices",
        });
      }
    }

    const allGeofences = await Geofence.find({ tagId });

    const isTooSimilar = isSimilarGeofenceExists(
      allGeofences,
      {
        type,
        center,
        radius,
        vertices,
      },
      currentGeofence._id
    );

    if (isTooSimilar) {
      return res.status(409).json({
        success: false,
        message: "Updated geofence is too similar or overlaps an existing one.",
      });
    }

    currentGeofence.type = type;
    currentGeofence.updatedAt = new Date();

    if (type === "circular") {
      currentGeofence.center = center;
      currentGeofence.radius = radius;
      currentGeofence.vertices = [];
    }

    if (type === "polygonal") {
      currentGeofence.center = undefined;
      currentGeofence.radius = undefined;
      currentGeofence.vertices = vertices;
    }

    await currentGeofence.save();

    return res.status(200).json({
      success: true,
      message: "Geofence updated successfully",
      geofence: currentGeofence,
    });
  } catch (error) {
    console.error("Error updating geofence:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating geofence",
    });
  }
};

const getAllGeofencesForTag = async (req, res) => {
  res.status(200).json({ message: "GET all geofences for this tagId" });
};

const getGeofenceById = async (req, res) => {
  res
    .status(200)
    .json({ message: "GET a specific geofence by geofenceId for this tagId" });
};

const enableGeofence = async (req, res) => {
  res.status(200).json({ message: "PUT enable geofence by geofenceId" });
};

const disableGeofence = async (req, res) => {
  res.status(200).json({ message: "PUT disable geofence by geofenceId" });
};

const deleteGeofence = async (req, res) => {
  res.status(200).json({ message: "DELETE geofence by geofenceId" });
};

const getGeofenceAlerts = async (req, res) => {
  res.status(200).json({ message: "GET geofence alerts for tagId" });
};

module.exports = {
  createGeofence,
  updateGeofence,
  getAllGeofencesForTag,
  getGeofenceById,
  enableGeofence,
  disableGeofence,
  deleteGeofence,
  getGeofenceAlerts,
};
