const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const {path} = require('path');
// const {appendChat} = require('chat.js');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'chat.html'));
});


app.use(express.static('styles'));
app.use(express.static('assets'));
app.use(express.static('js'));

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });

    socket.on('username', (msg) => {
      io.emit('username', msg);
    });
  });


server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

