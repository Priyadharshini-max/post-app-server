const express = require("express");
const router = express.Router();
const postService = require("../services/posts.service")

// READ
router.get("/", async (req, res) => {
  const posts = await postService.getPosts();
  res.send(posts);
});

router.get("/:id", async (req, res) => {
  const posts = await postService.getPost(req.params.id);
  res.send(posts);
});

// CREATE
router.post("/", async (req, res) => {
  // req.body => Body data
  const post = await postService.createPost(req.body);
  res.send(post);
});

// UPDATE
router.put("/:id", async (req, res) => {
  // req.params => URL Parameters
  const post = await postService.updatePost(req.params.id,req.body);
  res.send(post);
});

// DELETE
router.delete("/:id", async (req, res) => {
  // req.params => URL Parameters
  const post = await postService.deletePost(req.params.id);
  res.send(post);
});

module.exports = router;
