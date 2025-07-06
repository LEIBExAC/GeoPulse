const axios = require("axios");

/**
 * Reverse geocode latitude and longitude to a detailed address
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<object>} - Address details or fallback object
 */
const reverseGeocode = async (lat, lon) => {
  try {
    const response = await axios.get("https://nominatim.openstreetmap.org/reverse", {
      params: {
        lat: lat,
        lon: lon,
        format: "json",
        addressdetails: 1, // This enables detailed address components
      },
      headers: {
        "User-Agent": "GeoPulseApp/1.0 (contact@mohitsoni.com)"
      }
    });

    if (response.data && response.data.address) {
      const address = response.data.address;

      return {
        display_name: response.data.display_name || "Unknown location",
        street: address.road || address.street || "N/A",
        colony: address.suburb || address.neighbourhood || "N/A",
        city: address.city || address.town || address.village || "N/A",
        state: address.state || "N/A",
        country: address.country || "N/A",
        postcode: address.postcode || "N/A",
      };
    }

    return {
      display_name: "Unknown location",
      street: "N/A",
      colony: "N/A",
      city: "N/A",
      state: "N/A",
      country: "N/A",
      postcode: "N/A",
    };
  } catch (err) {
    console.error("Reverse geocoding failed:", err.message);
    return {
      display_name: "Unknown location",
      street: "N/A",
      colony: "N/A",
      city: "N/A",
      state: "N/A",
      country: "N/A",
      postcode: "N/A",
    };
  }
};

module.exports = reverseGeocode;
