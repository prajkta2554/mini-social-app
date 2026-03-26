const express = require("express");
const router = express.Router();

const {
  createPost,
  getPosts,
  likePost,
  commentPost,
} = require("../controllers/postController");

const auth = require("../middleware/authMiddleware");

router.post("/", auth, createPost);
router.get("/", getPosts);

// ✅ updated routes
router.put("/:id/like", auth, likePost);
router.post("/:id/comment", auth, commentPost);

module.exports = router;