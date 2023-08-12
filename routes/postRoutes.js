const express = require("express");

const postController = require("../controllers/postController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

//localhost:3000/:id
router
  .route("/")
  .get(postController.getAllPosts)
  .post(postController.createPost);

router
  .route("/:id")
  .get(protect, postController.getOnePost)
  .patch(protect, postController.updatePost)
  .delete(protect, postController.deletePost);

module.exports = router;