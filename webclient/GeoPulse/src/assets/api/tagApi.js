import axios from "axios";
import { backend_url } from "../store/keyStore";

export const createTag = async (tagData) => {
  const res = await axios.post(`${backend_url}/tag/register`, tagData, {
    withCredentials: true,
  });
  return res.data;
};

export const activateTag = async (tagData) => {
  const res = await fetch(`${backend_url}/tag/activate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(tagData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Activation failed");
  return data;
};

export const getUserTags = async (userId) => {
  const res = await fetch(`${backend_url}/tags/owned/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch user tags");
  }

  return data;
};

export const getAllTags = async (userId, isAdmin) => {
  let res;
  if (isAdmin) {
    res = await fetch(`${backend_url}/tags`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  } else {
    res = await fetch(`${backend_url}/tags/owned/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch all tags");
  }

  return data;
};

export const fetchTagById = async (tagId) => {
  const res = await fetch(`${backend_url}/tag/${tagId}`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch tag");
  }

  return await res.json();
};
