const Geofence = require("../models/geofence");
const Tag = require("../models/tag");
const Alert = require("../models/alert");
const {
  isSimilarGeofenceExists,
} = require("../utility/similarGeofenceValidator");

/**
 *  This file contains the controller functions for geofence operations.
 *  It includes creating, updating and managing geofences for tags.
 */

const createGeofence = async (req, res) => {
  try {
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

    // By default, geofences are inactive when created
    const geofenceData = {
      tagId: tagId,
      type: type,
      active: false,
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
  try {
    const { tagId, geofenceId } = req.params;
    const { type, center, radius, vertices } = req.body;

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
      if (!center || typeof radius !== "number" || radius <= 0) {
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

    // To check if the updated geofence is too similar to existing ones
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
  try {
    const { tagId } = req.params;

    const tag = await Tag.findOne({ tagId });
    if (!tag) {
      return res.status(404).json({
        success: false,
        message: "Tag not found",
      });
    }

    const isAdmin = req.role === "admin";
    const isOwner = tag.owner?.toString() === req.userId;
    const isShared = tag.sharedWith?.some((id) => id.toString() === req.userId);

    if (!isAdmin && !isOwner && !isShared) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const geofences = await Geofence.find({ tagId });

    return res.status(200).json({
      success: true,
      geofences: geofences,
    });
  } catch (error) {
    console.error("Error fetching geofences:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching geofences",
    });
  }
};

const getGeofenceById = async (req, res) => {
  try {
    const { tagId, geofenceId } = req.params;

    const tag = await Tag.findOne({ tagId });
    if (!tag) {
      return res.status(404).json({ success: false, message: "Tag not found" });
    }

    const isAdmin = req.role === "admin";
    const isOwner = tag.owner?.toString() === req.userId;
    const isShared = tag.sharedWith?.some((id) => id.toString() === req.userId);

    if (!isAdmin && !isOwner && !isShared) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const geofence = await Geofence.findOne({ _id: geofenceId, tagId });
    if (!geofence) {
      return res.status(404).json({
        success: false,
        message: "Specified Geofence is not found",
      });
    }

    return res.status(200).json({
      success: true,
      geofence: geofence,
    });
  } catch (error) {
    console.error("Error fetching geofence:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching geofence",
    });
  }
};

const enableGeofence = async (req, res) => {
  try {
    const { tagId, geofenceId } = req.params;

    const tag = await Tag.findOne({ tagId });
    if (!tag) {
      return res.status(404).json({ success: false, message: "Tag not found" });
    }

    const isAdmin = req.role === "admin";
    const isOwner = tag.owner?.toString() === req.userId;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const geofence = await Geofence.findOne({ _id: geofenceId, tagId });
    if (!geofence) {
      return res
        .status(404)
        .json({ success: false, message: "Geofence not found" });
    }

    if (geofence.active) {
      return res
        .status(200)
        .json({ success: true, message: "Geofence is already enabled" });
    }

    // Check if there is already an active geofence for this tag
    const existingGeofences = await Geofence.find({ tagId });
    const isAlreadyActiveGeofence = existingGeofences.some(
      (geofence) => geofence.active === true
    );

    if (isAlreadyActiveGeofence) {
      return res.status(409).json({
        success: false,
        message: "An active geofence already exists for this tag.",
      });
    }

    geofence.active = true;
    geofence.updatedAt = new Date();
    await geofence.save();

    return res.status(200).json({
      success: true,
      message: "Geofence enabled successfully",
      geofence: geofence,
    });
  } catch (err) {
    console.error("Error enabling geofence:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while enabling geofence",
    });
  }
};

const disableGeofence = async (req, res) => {
  try {
    const { tagId, geofenceId } = req.params;

    const tag = await Tag.findOne({ tagId });
    if (!tag) {
      return res.status(404).json({ success: false, message: "Tag not found" });
    }

    const isAdmin = req.role === "admin";
    const isOwner = tag.owner?.toString() === req.userId;
    if (!isAdmin && !isOwner) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const geofence = await Geofence.findOne({ _id: geofenceId, tagId });
    if (!geofence) {
      return res
        .status(404)
        .json({ success: false, message: "Geofence not found" });
    }

    if (!geofence.active) {
      return res.status(200).json({
        success: true,
        message: "Geofence is already disabled",
      });
    }

    geofence.active = false;
    geofence.updatedAt = new Date();
    await geofence.save();

    return res.status(200).json({
      success: true,
      message: "Geofence disabled successfully",
      geofence: geofence,
    });
  } catch (error) {
    console.error("Error disabling geofence:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while disabling geofence",
    });
  }
};

const deleteGeofence = async (req, res) => {
  try {
    const { tagId, geofenceId } = req.params;

    if (req.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const tag = await Tag.findOne({ tagId });
    if (!tag) {
      return res.status(404).json({ success: false, message: "Tag not found" });
    }

    const geofence = await Geofence.findOne({ _id: geofenceId, tagId });
    if (!geofence) {
      return res.status(404).json({
        success: false,
        message: "Geofence not found for this tag",
      });
    }

    await Geofence.deleteOne({ _id: geofenceId, tagId });

    return res.status(200).json({
      success: true,
      message: "Geofence deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting geofence:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting geofence",
    });
  }
};

const getGeofenceAlerts = async (req, res) => {
  try {
    const { tagId } = req.params;

    const tag = await Tag.findOne({ tagId });
    if (!tag) {
      return res.status(404).json({ success: false, message: "Tag not found" });
    }

    const isAdmin = req.role === "admin";
    const isOwner = tag.owner?.toString() === req.userId;
    const isShared = tag.sharedWith?.some((id) => id.toString() === req.userId);
    if (!isAdmin && !isOwner && !isShared) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const alerts = await Alert.find({ tagId })
      .populate("geofenceId", "type center radius vertices")
      .sort({ timestamp: -1 });

    if (alerts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No alerts found",
      });
    }

    return res.status(200).json({
      success: true,
      alerts,
    });
  } catch (error) {
    console.error("Error fetching geofence alerts:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching geofence alerts",
    });
  }
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
