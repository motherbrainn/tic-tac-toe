const activeRooms = (io) => {
  // Convert map into 2D list:
  // ==> [['4ziBKG9XFS06NdtVAAAH', Set(1)], ['room1', Set(2)], ...]
  const arr = Array.from(io.sockets.adapter.rooms);
  // Filter rooms whose name exist in set:
  // ==> [['room1', Set(2)], ['room2', Set(2)]]
  const filtered = arr.filter((room) => !room[1].has(room[0]));
  // Return only the room name:
  // ==> ['room1', 'room2']
  const res = filtered.map((i) => i[0]);
  return res;
};

/**
 *
 * @param {*} io
 * @param {*} socket
 * @returns roomId of joined room
 */
const joinOrCreateRoom = (io, socket) => {
  const roomsWaitingForMatch = activeRooms(io).filter(
    (e) => io.sockets.adapter.rooms.get(e).size === 1
  );
  if (roomsWaitingForMatch.length < 1) {
    const newRoomId = Math.random().toString().substring(2);
    console.log("no rooms to join, creating new room: ", newRoomId);
    socket.join(newRoomId);
    return newRoomId;
  }
  //join first room waiting for match
  console.log("joining room..: ", roomsWaitingForMatch);
  socket.join(roomsWaitingForMatch[0]);
  return roomsWaitingForMatch[0];
};

module.exports = { joinOrCreateRoom };
