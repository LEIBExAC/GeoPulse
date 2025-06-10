const Tag = require("../models/tag");
const User = require("../models/user");
const sendAlert = require("../config/mailconfig");

const sendAlertNotification = async (alert) => {
  try {
    const usersToNotify = await Tag.findOne({ tagId: alert.tagId }).populate(
      "owner sharedWith"
    );
    if (!usersToNotify) {
      console.log("No users found for tag:", alert.tagId);
      return;
    }

    const users = [usersToNotify.owner, ...usersToNotify.sharedWith];

    const userEmails = [];
    for (const user of users) {
      const userEmail = await User.findById(user);
      if (userEmail) {
        userEmails.push(userEmail.email);
      }
    }

    const message = `Alert for Tag ${alert.tagId} in Geofence ${alert.geofenceId} - Type: ${alert.type}`;

    for (const user of userEmails) {
      console.log(`Sending notification to ${user.email}: ${message}`);
      await sendAlert(user, message);
    }

    console.log("Alert notification sent successfully to all users.");
    return;
  } catch (err) {
    console.error("Error sending alert notification:", err);
  }
};

module.exports = sendAlertNotification;
