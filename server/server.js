const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors())

const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
  }
});

io.on("connection", (socket) => {
	console.log('socket is connected on server side: ', socket.id);

	socket.on('join_room', (data) => {
		console.log('room event: ', data);
		socket.join(+data.room)
	})

	socket.on('send_message', (data) => {
		socket.to(+data.room).emit("receive_message", data)
	})


	socket.on("disconnect", (reason) => {
		console.log('socket is disconnected, reason: ', reason)
	});
});

const port = 3001
httpServer.listen(port, () => {
	console.log(`Server is connected to http://localhost:${port}`)
});