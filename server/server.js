const { instrument } = require("@socket.io/admin-ui");
const utils = require("./utils");
const joinOrCreateRoom = utils.joinOrCreateRoom;
const getRandomIntInclusive = utils.getRandomIntInclusive;
const http = require("http");
const express = require("express");
const path = require("path");
const prodConsts = require("../client/src/prodConsts");
const dashboardPassword = prodConsts.dashboardPassword;
const dashboardUsername = prodConsts.dashboardUsername;

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 8080;
const env = process.env.NODE_ENV;

//This will create a middleware
//When you navigate to the root page it will use the built react-app
app.use(express.static(path.resolve(__dirname, "../client/build")));

const io = require("socket.io")(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://admin.socket.io",
      "http://tic-tac-toe-vs.herokuapp.com",
    ],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("update-board-client", (rowId, columnId, roomId) => {
    socket.to(roomId).emit("update-board-server", rowId, columnId, socket.id);
  });

  socket.on("join-room-client", () => {
    const joinedRoom = joinOrCreateRoom(io, socket);

    const roomSize = io.sockets.adapter.rooms.get(joinedRoom).size;
    const players = Array.from(io.sockets.adapter.rooms.get(joinedRoom));
    //if there is only one player in the room no active turn will be set
    const activeTurn = roomSize > 1 ? players[getRandomIntInclusive(0, 1)] : "";

    //use socket.emit here to only set state for client that sent message

    //emit to self only
    socket.emit("join-room-server", joinedRoom, players, activeTurn);

    //emit to room to update player that is already waiting in room
    socket.to(joinedRoom).emit("room-joined-server", players, activeTurn);
  });

  socket.on("player-turn-taken-client", (roomId, nextTurn) =>
    socket.to(roomId).emit("player-turn-taken-server", roomId, nextTurn)
  );

  socket.on("leave-room-client", (roomId) => {
    socket.leave(roomId);
  });
});

//if enviornment is prod use auth
env === "production"
  ? instrument(io, {
      auth: {
        type: "basic",
        username: dashboardUsername,
        password: dashboardPassword,
      },
    })
  : instrument(io, {
      auth: false,
    });

server.listen(PORT, () => console.log(`Server is connected to port ${PORT}`));
