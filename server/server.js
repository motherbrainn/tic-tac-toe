const { instrument } = require("@socket.io/admin-ui");
const utils = require("./utils");
const joinOrCreateRoom = utils.joinOrCreateRoom;
const getRandomIntInclusive = utils.getRandomIntInclusive;

const io = require("socket.io")(8080, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  io.emit("player-connect", socket.id);
  console.log(socket.id);
  socket.on("update-board-client", (rowId, columnId, roomId) => {
    socket.to(roomId).emit("update-board-server", rowId, columnId, socket.id);
  });

  socket.on("join-room-client", () => {
    const joinedRoom = joinOrCreateRoom(io, socket);
    console.log("room joined", joinedRoom);

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

instrument(io, { auth: false });
