// /src/assets/api/locationApi.js
import { backend_url } from "../store/keyStore";

export const fetchTagLocationHistory = async (tagId, from, to) => {
  try {
    let url = `${backend_url}/location/${tagId}/history`;

    const queryParams = new URLSearchParams();
    if (from) queryParams.append("from", from);
    if (to) queryParams.append("to", to);

    if (queryParams.toString()) {
      url += `?${queryParams.toString()}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success && Array.isArray(data.data)) {
      return {
        success: true,
        data: data.data,
      };
    } else {
      return {
        success: false,
        message: data.message || "Invalid response",
        data: [],
      };
    }
  } catch (err) {
    console.error("Error fetching tag location history:", err);
    return {
      success: false,
      message: err.message,
      data: [],
    };
  }
};
