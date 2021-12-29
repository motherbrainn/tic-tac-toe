const { instrument } = require("@socket.io/admin-ui");

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
});

instrument(io, { auth: false });
