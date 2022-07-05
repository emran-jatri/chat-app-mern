const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors())

const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:3002",
		methods: ["GET", "POST"],
  }
});

let chatData = []

io.on("connection", (socket) => {
	console.log('socket is connected on server side: ', socket.id);

	socket.emit("receive_message", chatData)

	socket.on('join_room', (data) => {
		console.log('room event: ', data);
		socket.join(data.room)
	})

	socket.on('send_message', (data) => {
		chatData.push(data)
		socket.to(data.room).emit("receive_message", chatData)
	})


	socket.on("disconnect", (reason) => {
		console.log('socket is disconnected, reason: ', reason)
	});
});

const port = 3001
httpServer.listen(port, () => {
	console.log(`Server is connected to http://localhost:${port}`)
});