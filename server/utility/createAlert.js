const Tag = require("../models/tag");
const Alert = require("../models/alert");
const Geofence = require("../models/geofence");
const { sendAlertNotification } = require("../utility/notificationService");
const geolib = require("geolib");

const createAlert = async (tagId, latitude, longitude) => {
  try {
    let previousAlert = await Alert.find({ tagId })
      .sort({ timestamp: -1 })
      .limit(1);
    previousAlert = previousAlert.length > 0 ? previousAlert[0] : null;
    if (!previousAlert) {
      previousAlert = { type: "entry" };
    }

    const geofence = await Geofence.findOne({ tagId, active: true });

    if (geofence) {
      if (
        previousAlert &&
        previousAlert.geofenceId.toString() !== geofence._id.toString()
      ) {
        console.log(
          "Previous alert is for a different geofence, Reseting previousAlert to entry"
        );
        previousAlert = { type: "entry" }; // Reset previous alert to entry if it was for a different geofence
      }
      let isInside = false;
      if (geofence.type === "circular") {
        isInside = geolib.isPointWithinRadius(
          { latitude: latitude, longitude: longitude },
          { latitude: geofence.center.lat, longitude: geofence.center.lng },
          geofence.radius
        );
      } else if (geofence.type === "polygonal") {
        isInside = geolib.isPointInPolygon(
          { latitude, longitude },
          geofence.vertices.map((vertex) => ({
            latitude: vertex.lat,
            longitude: vertex.lng,
          }))
        );
      }

      // If the tag is inside the geofence and there was a previous alert, we can skip creating a new alert
      if (!isInside && previousAlert.type === "entry") {
        const alert = new Alert({
          tagId,
          geofenceId: geofence._id,
          type: "exit",
          location: { lat: latitude, lng: longitude },
          timestamp,
        });

        await alert.save();

        await sendAlertNotification(alert);
      } else if (isInside && previousAlert.type === "exit") {
        const alert = new Alert({
          tagId,
          geofenceId: geofence._id,
          type: "entry",
          location: { lat: latitude, lng: longitude },
          timestamp,
        });

        await alert.save();

        await sendAlertNotification(alert);
      }
    }

    return;
  } catch (error) {
    console.error("Error in Sending/Updating Alert:", error);
  }
};

module.exports = {
  createAlert,
};
