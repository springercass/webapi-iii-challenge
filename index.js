// code away!
const express = require("express");

const server = express();

server.use(express.json());

const port = 5000;
server.listen(port, () => {
  console.log(`API running on ${port}`);
});

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
