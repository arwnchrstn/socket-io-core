require('dotenv').config();

const express = require('express');
const app = express();
const { createServer } = require('http');
const httpServer = createServer(app);
const { Server } = require('socket.io');
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(
	cors({
		origin: process.env.APP_URL
	})
);

const io = new Server(httpServer, {
	cors: {
		origin: process.env.APP_URL,
		credentials: false
	},
	transports: ['websocket']
});

io.on('connection', (socket) => {
	console.log('Client connected: ' + socket.id);

	socket.on('send', (message) => {
		socket.broadcast.emit('receive', message);
	});
});

app.get('/test', (req, res) => {
	res.send('Working...');
});

httpServer.listen(port, () => {
	console.log(`Running on port ${port}`);
});
