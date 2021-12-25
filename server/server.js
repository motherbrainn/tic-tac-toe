const io = require("socket.io")(8080, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("update-board-client", (rowId, columnId) =>
    io.emit("update-board-server", rowId, columnId)
  );

  // socket.on("player-turn-taken-client", (string) =>
  //   socket.emit("player-turn-taken-server", string)
  // );
});
