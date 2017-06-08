var http = require('http');
var fs = require('fs');

function handleGet(req, res) {
	let url = req.url === '/' ? "./public/index.html" : "./public" + req.url;
	let type = req.headers.accept.split(",");
	//console.log(url);
	fs.readFile(url, (error, data) => {
		if(!error) {
			res.writeHead(200, {'Content-Type':type[0]});
			res.write(data);
			res.end();
		}
		else {
			res.writeHead(404, {'Content-Type':'text/plain'});
			res.end();
		}
	})
};

var server = http.createServer((req, res) => {
	if (req.method.toLowerCase() === 'get') {
		handleGet(req, res);	
	}
}).listen(8888);

var io = require('socket.io').listen(server);

io.on('connection', (socket) => {
	socket.join('Chatting');
	console.log("hello");
	socket.to('Chatting').emit('hello',"aaa");
	socket.on('add message', (data) => {
		console.log("add");
		socket.broadcast.emit('add message', data);
		socket.to('Chatting').emit('add message', data);
	})

	socket.on('disconnect', () => {
		console.log('left');
	});
	
});

