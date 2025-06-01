const express = require("express");
const router = express.Router();
const { verifyToken, authorizeRoles } = require("../middlewares/verifyToken");
const tagController = require("../controller/tagController");
const { body } = require("express-validator");

// Add Tag
router.post(
  "/",
  verifyToken,
  authorizeRoles("user", "admin"),
  [
    body("name").notEmpty().withMessage("Tag name is required"),
    body("tagId").notEmpty().withMessage("Tag ID is required"),
  ],
  tagController.createTag
);

router.get("/", verifyToken, tagController.getMyTags);
router.get("/:id", verifyToken, tagController.getTagById);
router.put("/:id", verifyToken, tagController.updateTag);
router.delete("/:id", verifyToken, tagController.deleteTag);

// Share/Unshare of tag
router.put("/:id/share", verifyToken, tagController.shareTag);
router.put("/:id/unshare", verifyToken, tagController.unshareTag);

module.exports = router;
