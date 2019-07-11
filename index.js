// code away!
const express = require("express");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();

server.use(express.json());
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

const port = 5000;
server.listen(port, () => {
  console.log(`API running on ${port}`);
});

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
