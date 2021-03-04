import express from "express";
import cors from "cors";
import http from "http";
import db from "./config/db";
import userJoin from "./utils/users";
import formatMessage from "./utils/message";
import path from "path";

interface Join {
  id: string;
  username: string;
  room: string;
}

interface SendChat {
  room: string;
  username: string;
  newChat: string;
}

const socketio = require("socket.io");
const app = express();
const PORT = process.env.PORT || 4000;
const server = http.createServer(app);
const botName = "Chat Bot";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static("client/build"));

const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

app.get("/getchat/:room", (req, res) => {
  const room = req.params.room;
  db.query(`SELECT * FROM chat WHERE room = ?`, room, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

io.on("connection", (socket: any) => {
  socket.on("joinRoom", (msg: Join) => {
    const user: Join = userJoin(socket.id, msg.username, msg.room);
    socket.join(user.room);
    socket.emit(
      "message",
      formatMessage(botName, `Welcome to the room ${user.room}`)
    );
    socket.broadcast.emit(
      "message",
      formatMessage(botName, `${user.username} has joined the room`)
    );
  });
  socket.on("sendChat", (msg: SendChat) => {
    const data = formatMessage(msg.username, msg.newChat);
    io.emit("message", data);
    db.query(
      "INSERT INTO chat (room, username, text, time) VALUES (?,?,?,?)",
      [msg.room, data.username, data.text, data.time],
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  });
});

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
