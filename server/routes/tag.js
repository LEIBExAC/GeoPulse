const express = require("express");
const verifyToken = require("../middlewares/verifyToken")
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
            return res.status(403).json({ message: "Only admin can create a new tag" });
        }

        const existingTag = await TAG.findOne({ tagId });
        if (existingTag) {
            return res.status(400).json({ message: "Tag with this ID already exists" });
        }

        const activationCode = Math.floor(10000000 + Math.random() * 90000000).toString();

        const tag = new TAG({
            activationCode,
            manufacturingDate: Date.now(),
            tagId
        });

        await tag.save();

        return res.status(200).json({ message: "Tag created successfully", tag });
    } catch (error) {
        console.error("Tag registration error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post('/tag/activate', verifyToken, async (req, res) => {
  const { tagId, activationCode } = req.body;

  try {
    if (!activationCode || !tagId) {
      return res.status(400).json({ error: 'Tag ID and Activation Code are required.' });
    }

    const tag = await TAG.findOne({ tagId });

    if (!tag) {
      return res.status(404).json({ error: 'Tag not found with provided tag ID.' });
    }

    if (tag.owner) {
      return res.status(400).json({ error: 'This tag is already activated.' });
    }

    if (tag.activationCode !== activationCode) {
      return res.status(400).json({ error: 'Invalid activation code.' });
    }

    // Activate and assign tag
    tag.owner = req.userId; // set by verifyToken middleware
    tag.activationDate = new Date();
    tag.activationStatus = true;
    tag.activationCode = undefined; // prevent reuse

    await tag.save();

    return res.status(200).json({ message: 'Tag activated successfully.', tag });

  } catch (err) {
    console.error('Tag activation error:', err.message);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});


module.exports = router;