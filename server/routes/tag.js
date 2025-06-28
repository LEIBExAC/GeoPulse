const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const USER = require("../models/user");
const TAG = require("../models/tag");

const router = express.Router();

//tag registration by admin
router.post("/tag/register", verifyToken, async (req, res) => {
  try {
    const { tagId } = req.body;

    if (!tagId) {
      return res.status(400).json({ message: "Tag ID is required" });
    }

    const user = await USER.findById(req.userId);
    if (!user || user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admin can create a new tag" });
    }

    const existingTag = await TAG.findOne({ tagId });
    if (existingTag) {
      return res
        .status(400)
        .json({ message: "Tag with this ID already exists" });
    }

    const activationCode = Math.floor(
      10000000 + Math.random() * 90000000
    ).toString();

    const tag = new TAG({
      activationCode,
      manufacturingDate: Date.now(),
      tagId,
    });

    await tag.save();

    return res.status(200).json({ message: "Tag created successfully", tag });
  } catch (error) {
    console.error("Tag registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/tag/activate", verifyToken, async (req, res) => {
  const { tagId, activationCode } = req.body;

  try {
    if (!activationCode || !tagId) {
      return res
        .status(400)
        .json({ error: "Tag ID and Activation Code are required." });
    }

    const tag = await TAG.findOne({ tagId });

    if (!tag) {
      return res
        .status(404)
        .json({ error: "Tag not found with provided tag ID." });
    }

    if (tag.owner) {
      return res.status(400).json({ error: "This tag is already activated." });
    }

    if (tag.activationCode !== activationCode) {
      return res.status(400).json({ error: "Invalid activation code." });
    }

    // Activate and assign tag
    tag.owner = req.userId; // set by verifyToken middleware
    tag.activationDate = new Date();
    tag.activationStatus = true;
    tag.activationCode = undefined; // prevent reuse

    await tag.save();

    return res
      .status(200)
      .json({ message: "Tag activated successfully.", tag });
  } catch (err) {
    console.error("Tag activation error:", err.message);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// Fetching all tags for admin or owned by user(adding for owner just in case - not actually needed and used)
router.get("/tags", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const isAdmin = req.role === "admin";

    let tags;
    if (isAdmin) {
      tags = await TAG.find().populate("owner", "name email");
    } else {
      tags = await TAG.find({ owner: userId }).populate("owner", "name email");
    }

    return res.status(200).json(tags);
  } catch (err) {
    console.error("Error fetching tags:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

router.get("/tags/owned/:id", verifyToken, async (req, res) => {
  const userId = req.params.id;

  try {
    // Authorization check
    if (req.userId != userId && req.role !== "admin") {
      return res.status(403).json({
        message: "You don't have permission to access other owner tags.",
      });
    }

    // Fetch all tags belonging to this user
    const tags = await TAG.find({ owner: userId }).populate(
      "owner",
      "name email"
    );

    return res.status(200).json(tags);
  } catch (err) {
    console.error("Error fetching tags:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

router.get("/tags/shared-with-me", verifyToken, async (req, res) => {
  try {
    const userId = req.userId; //commin form middleware verify token

    const sharedTags = await TAG.find({ sharedWith: userId })
      .populate("owner", "name email")
      .populate("sharedWith", "name email");

    res.status(200).json(sharedTags);
  } catch (err) {
    console.error("Error fetching shared tags:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.get("/tag/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const tag = await TAG.findById(id)
      .populate("owner", "name email")
      .populate("sharedWith", "name email");

    if (!tag) {
      return res.status(404).json({ message: "Tag not found." });
    }

    const userId = req.userId.toString();
    const isOwner = tag.owner?._id.toString() === userId;
    const isShared = tag.sharedWith.some(
      (user) => user._id.toString() === userId
    );
    const isAdmin = req.role === "admin";

    if (!isOwner && !isShared && !isAdmin) {
      return res
        .status(403)
        .json({ message: "You don't have permission to view this tag." });
    }

    return res.status(200).json(tag);
  } catch (error) {
    console.error("Error fetching tag:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

router.delete("/tag/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const tag = await TAG.findById(id);

    if (!tag) {
      return res.status(404).json({ error: "Tag not found." });
    }

    // Check if the user is the owner or admin
    const isOwner = tag.owner?.toString() === req.userId;
    const isAdmin = req.role === "admin";

    if (!isOwner && !isAdmin) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this tag." });
    }

    await TAG.findByIdAndDelete(id);
    return res.status(200).json({ message: "Tag deleted successfully." });
  } catch (err) {
    console.error("Error deleting tag:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

router.put("/tag/:id", verifyToken, async (req, res) => {
  try {
    const updates = req.body;
    const id = req.params.id;

    const tag = await TAG.findById(id);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    // Authorization: only owner or admin can update
    const isOwner = tag.owner?.toString() === req.userId;
    const isAdmin = req.role === "admin";
    if (!isOwner && !isAdmin) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this tag" });
    }

    const updatedTag = await TAG.findByIdAndUpdate(id, updates, { new: true });

    res.json({ message: "Tag updated successfully", tag: updatedTag });
  } catch (error) {
    console.error("Error updating tag:", error);
    res.status(500).json({ message: "Server error updating tag" });
  }
});

router.put("/tag/:id/share", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const { userId } = req.body;

    if (!userId) return res.status(400).json({ message: "userId is required" });

    const tag = await TAG.findById(id);
    if (!tag) return res.status(404).json({ message: "Tag not found" });

    // Owner check
    if (tag.owner.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Only tag owner can share this tag" });
    }

    // Add to sharedWith
    const updatedTag = await TAG.findByIdAndUpdate(
      id,
      { $addToSet: { sharedWith: userId } },
      { new: true }
    );

    res.json({ message: "Tag shared successfully", tag: updatedTag });
  } catch (error) {
    console.error("Share error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/tag/:id/unshare", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const { userId } = req.body;

    if (!userId) return res.status(400).json({ message: "userId is required" });

    const tag = await TAG.findById(id);
    if (!tag) return res.status(404).json({ message: "Tag not found" });

    // Owner check
    if (tag.owner.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Only tag owner can unshare this tag" });
    }

    const updatedTag = await TAG.findByIdAndUpdate(
      id,
      { $pull: { sharedWith: userId } },
      { new: true }
    );

    res.json({ message: "Tag unshared successfully", tag: updatedTag });
  } catch (error) {
    console.error("Unshare error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
