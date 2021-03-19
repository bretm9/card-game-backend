const express = require('express');
const path = require('path');
const http = require('http');
const PORT = process.env.PORT || 9000;
const app = express();
const server = http.createServer(app);
const socketio = require('socket.io')
const io = socketio(server, {
  cors: {
    origin: "*",
  }
});

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// handle a socket connection request from web client

const connections = [null, null, null, null]

io.on('connection', socket => {
  
  // Send player number to client
  socket.on('join', (callback) => {
    callback(+playerIndex + 1)
  });
  

  // Calculate player number
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

  // log the connected players
  const emitPlayerNumber = () => {
    socket.emit('player-number', playerIndex)
    console.log(`Player ${playerIndex} has connected`);
    // ignore player 5 
    if (playerIndex === -1) return
  }

  findAvailablePlayer()
  emitPlayerNumber()
})