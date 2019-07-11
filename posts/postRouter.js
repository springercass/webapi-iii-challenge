const express = require("express");
const Posts = require("./postDb");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allPosts = await Posts.get();
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json({ error: "The posts could not be retrieved." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.getById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ error: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "The post could not be retrieved." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletingPost = await Posts.getById(req.params.id);
    if (!deletingPost) {
      res
        .status(404)
        .json({ error: "The post with the specified ID does not exist." });
    } else {
      await Posts.remove(req.params.id);
      res.status(200).json(deletingPost);
    }
  } catch (error) {
    res.status(500).json({ error: "The post could not be removed." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = await Posts.update(req.params.id, req.body);
    if (!post) {
      res.status(404).json({ error: "Please provide text for the post." });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json({ error: "There was an error updating the post." });
    console.log(error);
  }
});

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;
