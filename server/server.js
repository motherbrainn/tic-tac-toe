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
  socket.on("update-board-client", (rowId, columnId) =>
    io.emit("update-board-server", rowId, columnId, socket.id)
  );

  socket.on("join-room-client", () => {
    //socket.join("new-room");
    joinOrCreateRoom(io, socket);
  });
});

instrument(io, { auth: false });
