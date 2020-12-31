const express = require("express");
const path = require("path");

//socket.io
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const connectDB = require("./config/db");

const app = express();

//socket.io
const server = http.createServer(app);
const io = socketio(server);

// Connect Database
connectDB();

// init Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Difine Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/match", require("./routes/api/match"));

io.on("connect", (socket) => {
  socket.on("join", ({ userJoined, room }, callback) => {
    const { error, userAdd } = addUser({ id: socket.id, userJoined, room });
    // console.log('users: ',getUsersInRoom(user.room))
    // console.log('room: ',room)
    // console.log('users in room: ',addUser({ id: socket.id, userJoined, room }))

    if (error) return callback(error);

    socket.join(userAdd.room);

    socket.emit("message", {
      user: "admin",
      text: `Welcome ${userAdd.name}, i hope you find a friend. You have 5 min to chat.`,
    });
    // socket.broadcast
    //   .to(userAdd.room)
    //   .emit("message", { user: "admin", text: `${userAdd.name} has joined!` });

    io.to(userAdd.room).emit("roomData", {
      room: userAdd.room,
      users: getUsersInRoom(userAdd.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("typing", (message, callback) => {
    const user = getUser(socket.id);
    console.log(message);
    if (message.value !== "") {
      socket.broadcast.to(user.room).emit("isTyping", {
        id: user.profile._id,
        user: user.name,
      });
    } else {
      socket.broadcast.to(user.room).emit("isTyping", {
        id: user.profile._id,
        user: user.name,
        text: "",
      });
    }

    // callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
