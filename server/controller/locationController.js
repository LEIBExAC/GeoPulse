const Location = require("../models/location");
const Tag = require("../models/tag");

/**
 * @desc Location updation endpoint, retrival endpoint.
 */

// Function to update the location of a tag
/**
     * I'm assuming the data is sent in the request body as JSON. And if not then modify the code accordingly.
     * Update app.js to use `express.urlencoded({ extended: true })` middleware
     * Example: If data is sent urlencoded, 
     *     const lat = parseFloat(latitude);
     *     const lng = parseFloat(longitude);
     *     const batt = parseInt(battery, 10);
     *     const spd = speed !== undefined ? parseFloat(speed) : null;

     *     if (isNaN(lat) || isNaN(lng) || isNaN(batt)) {
     *        return res.status(400).json({ error: 'Invalid latitude, longitude, or battery' });
     *     }  
    */
const updateLocation = async (req, res) => {
  try {
    const { tagId, latitude, longitude, battery, speed } = req.body;

    if (!tagId || latitude == null || longitude == null || battery == null) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (
      longitude < -180 ||
      longitude > 180 ||
      latitude < -90 ||
      latitude > 90
    ) {
      return res.status(400).json({ error: "Invalid latitude or longitude" });
    }

    const tag = await Tag.findOne({ tagId });
    if (!tag || !tag.isActive) {
      return res.status(404).json({ error: "Invalid or inactive tagId" });
    }

    timestamp = new Date();

    const location = new Location({
      tagId,
      timestamp,
      coordinates: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      battery,
      speed: speed || null,
    });

    // Update the tag's last seen location and battery status
    await Tag.findOneAndUpdate(
      { tagId },
      {
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        battery,
        lastSeen: timestamp,
      }
    );

    await location.save();

    // TODO: Optionally check geofencing logic here

    return res.status(201).json({ success: true, data: location });
  } catch (err) {
    console.error("Error in updateLocation:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// To get the latest location of a tag
const getLatestLocation = async (req, res) => {
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

    // Fetch latest loc from the snapshot in Tag
    const latestLocation = {
      coordinates: tag.location?.coordinates || [0, 0],
      battery: tag.battery,
      timestamp: tag.lastSeen,
      status: tag.status,
      speed: null,
      source: "tag", // Indicating this is from the tag snapshot
    };

    // Check if fallback is needed
    // If the tag's location is not set or is at default coordinates (0,0) or lastSeen is not set
    const isFallbackNeeded =
      !tag.location?.coordinates ||
      (tag.location.coordinates[0] === 0 &&
        tag.location.coordinates[1] === 0) ||
      !tag.lastSeen;

    if (isFallbackNeeded) {
      const latestRecord = await Location.findOne({ tagId }).sort({
        timestamp: -1,
      });

      if (latestRecord) {
        latestLocation = {
          coordinates: latestRecord.coordinates?.coordinates,
          battery: latestRecord.battery,
          timestamp: latestRecord.timestamp,
          speed: latestRecord.speed,
          source: "location",
        };
      } else {
        return res
          .status(404)
          .json({ success: false, message: "No location data found" });
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        tagId: tag.tagId,
        name: tag.name,
        latestLocation,
        ringStatus: tag.ringStatus,
        lostMode: tag.lostMode,
        status: tag.status,
      },
    });
  } catch (error) {
    console.error("Error in getLatestLocation:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getLocationHistory = async (req, res) => {
  try {
    const { tagId } = req.params;
    const { from, to } = req.query;

    // Parsing the date range from query parameters and if not provided, default to last 7 days
    const fromDate = from
      ? new Date(from)
      : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const toDate = to ? new Date(to) : new Date();

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

    const locations = await Location.find({
      tagId,
      timestamp: { $gte: fromDate, $lte: toDate },
    }).sort({ timestamp: 1 });

    return res.status(200).json({
      success: true,
      count: locations.length,
      data: locations.map((loc) => ({
        coordinates: loc.coordinates.coordinates,
        timestamp: loc.timestamp,
        battery: loc.battery,
        speed: loc.speed,
      })),
    });
  } catch (err) {
    console.error("Error in getLocationHistory:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getActiveTagsLatestLocations = async (req, res) => {
  try {
    if (req.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const tags = await Tag.find({ activationStatus: true })
      .select("tagId name location battery lastSeen status lostMode ringStatus")
      .lean();

    const tagSummaries = tags.map((tag) => ({
      tagId: tag.tagId,
      name: tag.name,
      coordinates: tag.location?.coordinates || [0, 0],
      battery: tag.battery,
      lastSeen: tag.lastSeen,
      status: tag.status,
      lostMode: tag.lostMode,
      ringStatus: tag.ringStatus,
    }));

    return res
      .status(200)
      .json({ success: true, count: tagSummaries.length, data: tagSummaries });
  } catch (err) {
    console.error("Error in getActiveTagsLatestLocations:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  updateLocation,
  getLatestLocation,
  getLocationHistory,
  getActiveTagsLatestLocations,
};
