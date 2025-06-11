const Tag = require("../models/tag");
const User = require("../models/user");
const { sendAlert } = require("../config/emailSender");

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
      if (user.email) {
        userEmails.push(user.email);
      }
    }
    console.log("Valid user emails:", userEmails);
    if (userEmails.length === 0) {
      console.log("No valid user emails found for notification.");
      return;
    }

    const message = `Alert for Tag ${alert.tagId} in Geofence ${alert.geofenceId} - Type: ${alert.type}`;

    for (const email of userEmails) {
      console.log(`Sending notification to ${email}: ${message}`);
      await sendAlert(email, message);
    }

    console.log("Alert notification sent successfully to all users.");
    return;
  } catch (err) {
    console.error("Error sending alert notification:", err);
  }
};

module.exports = { sendAlertNotification };
