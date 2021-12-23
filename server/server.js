const io = require("socket.io")(8080, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("update-board-client", (string) =>
    io.emit("update-board-server", string)
  );
  socket.on("player-turn-taken-client", (string) =>
    io.emit("player-turn-taken-server", string)
  );
});
