const Tag = require("../models/tag");
const Alert = require("../models/alert");
const Geofence = require("../models/geofence");
const { sendAlertNotification } = require("../utility/notificationService");

const createAlert = async (tagId, latitude, longitude) => {
  try {
    const previousAlert = await Alert.findOne({ tagId, timestamp: -1 });
    if (!previousAlert) {
      previousAlert = { type: "entry" };
    }

    const geofence = await Geofence.findOne({ tagId, active: true });
    if (geofence) {
      let isInside = false;
      if (geofence.type === "circle") {
        isInside = geolib.isPointWithinRadius(
          { latitude, longitude },
          { latitude: geofence.center.lat, longitude: geofence.center.lng },
          geofence.radius
        );
      } else if (geofence.type === "polygon") {
        isInside = geolib.isPointInPolygon(
          { latitude, longitude },
          geofence.vertices
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

        return;
      }
    }
  } catch (error) {
    console.error("Error in Sending/Updating Alert:", error);
  }
};

module.exports = {
  createAlert,
};
