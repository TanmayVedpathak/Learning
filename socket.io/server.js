const express = require("express");
const { createServer } = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Listen to connection from client
io.on("connection", (socket) => {
  console.log("a user connected");

  // Emit a message to the client
  socket.emit("messageFromServer", "hello from server");

  socket.on("messageFromClient", (message) => {
    console.log("message from client: ", message);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
