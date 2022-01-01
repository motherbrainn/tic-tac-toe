const { instrument } = require("@socket.io/admin-ui");
const utils = require("./utils");
const joinOrCreateRoom = utils.joinOrCreateRoom;

const io = require("socket.io")(8080, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  io.emit("player-connect", socket.id);
  console.log(socket.id);
  socket.on("update-board-client", (rowId, columnId, roomId) =>
    socket.to(roomId).emit("update-board-server", rowId, columnId, socket.id)
  );

  socket.on("join-room-client", () => {
    const joinedRoom = joinOrCreateRoom(io, socket);
    console.log("room joined", joinedRoom);
    //use socket.emit here to only set state for client that sent message
    socket.emit("join-room-server", joinedRoom);
  });
});

instrument(io, { auth: false });
