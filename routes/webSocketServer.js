//const WebSocket = require('ws');
//
//const WebSocketServer = WebSocket.Server;
//
//
//// 实例化:
//const wss = new WebSocketServer({
//  port: 3000
//});
//
//wss.on('connection', function (ws) {
//  console.log(`[SERVER] connection()`);
//  ws.on('message', function (message) {
//      console.log(`[SERVER] Received: ${message}`);
//      setTimeout(()=>{
//      	ws.send(`ECHO: ${message}`, (err) => {
//	            if (err) {
//	                console.log(`[SERVER] error: ${err}`);
//	            }
//	        });
//      },1000)
//  })
//});


var app = require('express');
var server = require('http').Server(app());
var io = require('socket.io')(server);

//server.listen(80);

var	router = app.Router()
router.get('/', (req, res) => {
	res.render('wechat', { title: '注册' });
});




module.exports = router;
