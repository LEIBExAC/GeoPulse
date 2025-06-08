const geolib = require("geolib");

/**
 * @desc Function to check if a similar geofence already exists.
 */

const isSimilarGeofenceExists = (
  existingGeofences,
  newGeofence,
  currentGeofenceId
) => {
  const { type, center, radius, vertices } = newGeofence;

  for (const existing of existingGeofences) {
    if (currentGeofenceId && existing._id.toString() === currentGeofenceId)
      continue; // Skip current

    if (existing.type !== type) continue;

    // If the geofence type is the same, we can check for similarity
    if (type === "circular" && existing.type === "circular") {
      const centerDistance = geolib.getDistance(center, existing.center);
      const radiusDiff = Math.abs(radius - (existing.radius || 0));

      // Thresholds - I'm setting these to prevent very close geofences.
      if (centerDistance < 20 && radiusDiff < 10) {
        return true;
      }
    } else if (type === "polygonal" && existing.type === "polygonal") {
      if (!existing.vertices?.length || !vertices?.length) continue;

      // For now using very basic check for polygonal geofences.
      // Ideally, we would check if the vertices are similar or overlapping.( Later I'll implement a more robust check)
      if (!vertices || !existing.vertices) {
        return res.status(400).json({
          success: false,
          message: "Vertices are required for polygonal geofence",
        });
      }

      const newCentroid = geolib.getCenter(vertices);
      const existingCentroid = geolib.getCenter(existing.vertices);

      const centroidDistance = geolib.getDistance(
        newCentroid,
        existingCentroid
      );

      if (centroidDistance < 20) {
        return true;
      }
    }
  }

  return false;
};

module.exports = { isSimilarGeofenceExists };
