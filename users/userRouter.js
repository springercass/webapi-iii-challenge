const express = require("express");
const Users = require("./userDb");
const Posts = require("../posts/postDb");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ error: "Please provide a user name." });
  } else {
    try {
      const newUser = await Users.insert({ name });
      res.status(200).json(newUser);
    } catch (error) {
      res
        .status(500)
        .json({ error: "There was an error while adding a new user." });
    }
  }
});

router.post("/:id/posts", async (req, res) => {
  const postInfo = { ...req.body, user_id: req.params.id };

  if (!postInfo) {
    res.status(400).json({ error: "Please provide text for this post." });
  } else {
    try {
      const post = await Posts.insert(postInfo);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({
        error: "There was an error while adding a new post."
      });
    }
  }
});

router.get("/", async (req, res) => {
  try {
    const allUsers = await Users.get();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: "The users could not be retrieved." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await Users.getById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ error: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "The user could not be retrieved." });
  }
});

router.get("/:id/posts", async (req, res) => {
  try {
    const posts = await Users.getUserPosts(req.params.id);
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "The posts for this user could not be retrieved." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletingUser = await Users.getById(req.params.id);
    if (!deletingUser) {
      res
        .status(404)
        .json({ error: "The user with the specified ID does not exist." });
    } else {
      await Users.remove(req.params.id);
      res.status(200).json(deletingUser);
    }
  } catch (error) {
    res.status(500).json({ error: "The user could not be removed." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await Users.update(req.params.id, req.body);
    console.log(user);
    if (!user) {
      res.status(404).json({ error: "Please provide a name for the user." });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: "There was an error updating the user." });
    console.log(error);
  }
});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
