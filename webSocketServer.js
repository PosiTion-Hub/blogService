var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

app.get('/', function (req, res) {
  res.send('');
});

io.on('connection', function (socket) {
  socket.emit('onlineCount', socket.server.eio.clientsCount);
	// socket id   
	console.log(socket.upgradeReq)
  
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});
   
