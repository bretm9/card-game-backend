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
  console.log('New WS Connection');
})