import {
  findOne,
  create,
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
} from "../models/tag.js";

import User from "../models/user";

// New tag
export async function createTag(req, res) {
  try {
    const { name, tagId } = req.body;
    const existing = await findOne({ tagId });
    if (existing) return res.status(400).json({ error: "Tag already exists" });
    const tag = await create({
      name,
      tagId,
      owner: req.user.userId,
    });

    res.status(201).json(tag);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// Tags owned or shared with the user
export async function getMyTags(req, res) {
  try {
    const userId = req.user.userId;
    const tags = await find({
      $or: [{ owner: userId }, { sharedWith: userId }],
    }).populate("owner", "name email");
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// Single tag
export async function getTagById(req, res) {
  try {
    const tag = await findById(req.params.id);
    if (!tag) return res.status(404).json({ error: "Tag not found" });
    res.json(tag);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// Update tag
export async function updateTag(req, res) {
  try {
    const updates = req.body;
    const tag = await findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!tag) return res.status(404).json({ error: "Tag not found" });
    res.json(tag);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// Delete tag
export async function deleteTag(req, res) {
  try {
    const tag = await findByIdAndDelete(req.params.id);
    if (!tag) return res.status(404).json({ error: "Tag not found" });
    res.json({ message: "Tag deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// Share tag
export async function shareTag(req, res) {
  try {
    const { userIdToShare } = req.body;
    const tag = await findById(req.params.id);
    if (!tag) return res.status(404).json({ error: "Tag not found" });
    if (!tag.sharedWith.includes(userIdToShare)) {
      tag.sharedWith.push(userIdToShare);
      await tag.save();
    }

    res.json({ message: "Tag shared", tag });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// Unshare tag
export async function unshareTag(req, res) {
  try {
    const { userIdToRemove } = req.body;
    const tag = await findById(req.params.id);
    if (!tag) return res.status(404).json({ error: "Tag not found" });
    tag.sharedWith = tag.sharedWith.filter(
      (id) => id.toString() !== userIdToRemove
    );
    await tag.save();

    res.json({ message: "User removed from shared list", tag });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
