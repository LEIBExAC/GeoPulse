/**
 * This file is not used but I'm leaving it here, if in case it is required in future.
 */

const Tag = require("../models/tag.js");

// New tag
async function createTag(req, res) {
  console.log("createTag function called");
  try {
    const { name, tagId } = req.body;
    const existing = await Tag.findOne({ tagId });
    if (existing) return res.status(400).json({ error: "Tag already exists" });

    const tag = await Tag.create({
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
async function getMyTags(req, res) {
  try {
    const userId = req.user.userId;
    console.log("getMyTags function called for userId:", userId);
    const tags = await Tag.find({
      $or: [{ owner: userId }, { sharedWith: userId }],
    }).populate("owner", "name email");

    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// Single tag
async function getTagById(req, res) {
  console.log("getTagById function called");
  try {
    const tag = await Tag.findOne({tagId: req.params.id});
    if (!tag) return res.status(404).json({ error: "Tag not found" });
    res.json(tag);
  } catch (err) {
    console.error("Error in getTagById:", err);
    res.status(500).json({ error: "Server error" });
  }
}

// Update tag
async function updateTag(req, res) {
  try {
    const updates = req.body;
    const tag = await Tag.findOneAndUpdate({tagId: req.params.id}, updates, {
      new: true,
    });
    if (!tag) return res.status(404).json({ error: "Tag not found" });
    res.json(tag);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// Delete tag
async function deleteTag(req, res) {
  try {
    const tag = await Tag.findOneAndDelete({tagId: req.params.id});
    if (!tag) return res.status(404).json({ error: "Tag not found" });
    res.json({ message: "Tag deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// Share tag
async function shareTag(req, res) {
  try {
    const { userIdToShare } = req.body;
    const tag = await Tag.findOne({tagId: req.params.id});
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
async function unshareTag(req, res) {
  try {
    const { userIdToRemove } = req.body;
    if (!userIdToRemove) {
      return res.status(400).json({ error: "User ID to remove is required" });
    }
    const tag = await Tag.findOne({tagId: req.params.id});
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

module.exports = {
  createTag,
  getMyTags,
  getTagById,
  updateTag,
  deleteTag,
  shareTag,
  unshareTag,
};
// This code defines the tag controller for managing tags in a Node.js application.
