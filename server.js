const express = "express";

const server = express();

server.use(json());

const port = 5000;
server.listen(port, () => {
  console.log(`API running on ${port}`);
});

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {}

module.exports = server;
