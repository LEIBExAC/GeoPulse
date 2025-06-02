const express = require("express");
const { body } = require("express-validator");
const middleware = require("../middlewares/verifyToken.js");
const {
  createTag,
  getMyTags,
  getTagById,
  updateTag,
  deleteTag,
  shareTag,
  unshareTag,
} = require("../controller/tagController.js");

const router = express.Router();
const { verifyToken, authorizeRoles } = middleware;

// Add Tag
router.post(
  "/",
  verifyToken,
  authorizeRoles("user", "admin"),
  [
    body("name").notEmpty().withMessage("Tag name is required"),
    body("tagId").notEmpty().withMessage("Tag ID is required"),
  ],
  createTag
);

router.get("/", verifyToken, getMyTags);
router.get("/:id", verifyToken, getTagById);
router.put("/:id", verifyToken, updateTag);
router.delete("/:id", verifyToken, deleteTag);

// Share/Unshare of tag
router.put("/:id/share", verifyToken, shareTag);
router.put("/:id/unshare", verifyToken, unshareTag);

module.exports = router;
