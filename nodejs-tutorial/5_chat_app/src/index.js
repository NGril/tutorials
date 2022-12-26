const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");
const {
  generateMessage,
  generateLocationMessage,
} = require("./utils/messages");
const {
  getUser,
  getUsersInRoom,
  addUser,
  removeUser,
} = require("./utils/users");

// initializing express server
const app = express();
// express usually does this behind the scenes, we are doing it explicitly so we can setup socket.io
const server = http.createServer(app);
const io = socketio(server);

// setting up server port
const port = process.env.PORT || 3000;
// defining a path to the public directory
const publicDirectoryPath = path.join(__dirname, "../public");

// telling the server to serve statis assets from the public directory
app.use(express.static(publicDirectoryPath));

// setting up on connection WS event handler
io.on("connection", (socket) => {
  // this shows up on the backemd
  console.log("New WebSocket connection");

  // reacting on room join event
  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });

    if (error) {
      return callback(error);
    }

    // specific server-side socket.io method for joining a 'chat room'
    socket.join(user.room);

    // we emit this event to the client that just connected only
    socket.emit("message", generateMessage("Admin", "Welcome"));

    // we emit this event to all clients in the room except for the one that just connected
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        generateMessage("Admin", `${user.username} has joined!`)
      );

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  // reacting on events from the frontend and emitting back a new event (with event acknowledgement)
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed");
    }

    io.to(user.room).emit("message", generateMessage(user.username, message));
    callback();
  });

  // reacting to location share
  socket.on("sendLocation", (coords, ackCallback) => {
    const user = getUser(socket.id);

    const url = `https://www.google.com/maps?q=${coords?.latitude},${coords?.longitude}`;
    io.to(user.room).emit(
      "locationMessage",
      generateLocationMessage(user.username, url)
    );
    ackCallback();
  });

  // reacting to a disconnect from the client, here we don't need to use broadcast since the current client already disconnected
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage("Admin", `${user.username} has left`)
      );

      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

// starting the server and listening on the configured port
server.listen(port, () => {
  console.log(`Server is up on port ${port}...`);
});
