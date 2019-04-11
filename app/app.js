
const express = require('express');
const app = express()
    .use(express.static('./src/css'))
    .use(express.static('./src/images'))
    .use(express.static('./src/js'))

const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 4000;

let gamerTags = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
    io.emit('chat message', 'user has disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});


io.on('connection', function(socket){

socket.on('set user', function(naam){
  socket.name = naam;
  gamerTags.push(socket.name);
  console.log(gamerTags)
  io.emit('set user', gamerTags);
})

  socket.on('chat message', function(msg){
    if (msg.includes("creeper")){
    console.log('creeper is gonna blow up the chat!');
  io.emit('creeps', msg);
    io.emit('chat message', msg);
    }else {
      io.emit('chat message', msg);
      console.log('Lucky, no creeper in msg')
    }

  });
});

io.on('disconnect', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(4000, () => console.log(`Example app listening on port ${port}!`))
