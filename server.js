const express = require('express');
const path = require('path');
const http = require('http');
const PORT = process.env.PORT || 9000;
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// handle a socket connection request from web client

const connections = [null, null, null, null]

io.on('connection', socket => {
  let playerIndex = -1;

  const findAvailablePlayer = () => {
    for (const i in connections) {
      if (connections[i] === null) {
        playerIndex = i;
        connections[i] = {id: i}
        break
      }
    }
  }

  // Tell the connection client what player number they are
  const emitPlayerNumber = () => {
    socket.emit('player-number', playerIndex)
    console.log(`Player ${playerIndex} has connected`);
    // ignore player 5 
    if (playerIndex === -1) return
  }

  findAvailablePlayer()
  emitPlayerNumber()
})