import { backend_url } from "../store/keyStore";

export const getLatestLocation = async (tagId, token) => {
  try {
    const res = await fetch(`${backend_url}/location/${tagId}/latest`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch latest location");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching latest location:", error);
    throw error;
  }
};

export const getLocationHistory = async (tagId, token) => {
  try {
    const res = await fetch(`${backend_url}/location/${tagId}/history`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch location history");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching location history:", error);
    throw error;
  }
};
