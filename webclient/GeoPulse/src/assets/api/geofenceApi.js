import { backend_url } from "../store/keyStore";

export const fetchGeofencesByTag = async (tagId, token) => {
  try {
    const res = await fetch(`${backend_url}/geofence/${tagId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch geofences");
    }

    const data = await res.json();

    return data.geofences;
  } catch (error) {
    throw error;
  }
};

export const createGeofenceAPI = async (tagId, payload) => {
  try {
    const res = await fetch(`${backend_url}/geofence/${tagId}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    return await res.json();
  } catch (error) {
    console.error("Create Geofence Error:", error);
    return { success: false };
  }
};

export const getGeofenceByIdAPI = async (tagId, geofenceId) => {
  try {
    const res = await fetch(`${backend_url}/geofence/${tagId}/${geofenceId}`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

export const updateGeofenceAPI = async (tagId, geofenceId, payload) => {
  try {
    const res = await fetch(
      `${backend_url}/geofence/${tagId}/${geofenceId}/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      }
    );
    return await res.json();
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

export const getGeofenceAlertsAPI = async (tagId) => {
  try {
    const res = await fetch(`${backend_url}/geofence/${tagId}/alerts`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch alerts:", err);
    return { success: false, message: "Error fetching alerts" };
  }
};

export const enableGeofence = async (tagId, geofenceId, token) => {
  try {
    const res = await fetch(
      `${backend_url}/geofence/${tagId}/${geofenceId}/enable`,
      {
        method: "PUT",
        credentials: "include",
      }
    );

    if (!res.ok) {
      if (res.status === 409) {
        throw new Error("Only one geofence can be active at a time for a tag.");
      }

      let errData;
      try {
        errData = await res.json();
      } catch (_) {
        errData = {};
      }

      throw new Error(errData.message || "Enable failed");
    }
    return await res.json();
  } catch (error) {
    console.error("Enable Geofence Error:", error);
    return {
      success: false,
      message: error.message || "Failed to enable geofence",
    };
  }
};

export const disableGeofence = async (tagId, geofenceId, token) => {
  try {
    const res = await fetch(
      `${backend_url}/geofence/${tagId}/${geofenceId}/disable`,
      {
        method: "PUT",
        credentials: "include",
      }
    );
    if (!res.ok) throw new Error(data.message || "Disable failed");
    return await res.json();
  } catch (error) {
    console.error("Disable Geofence Error:", error);
    return { success: false, message: "Failed to disable geofence" };
  }
};

export const deleteGeofence = async (tagId, geofenceId) => {
  try {
    const res = await fetch(
      `${backend_url}/geofence/${tagId}/${geofenceId}/delete`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    return await res.json();
  } catch (err) {
    console.error("Delete Geofence Error:", err);
    return { success: false };
  }
};
