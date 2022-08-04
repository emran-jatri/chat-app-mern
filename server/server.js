const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require('path')

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
let roomList = {}

io.on("connection", (socket) => {
	console.log('socket is connected on server side: ', socket.id);

	// socket.emit("receive_message", chatData)

	socket.on('join_room', (data) => {
		console.log('Joined Member: ', data);

		if (data.room in roomList) {
			roomList[data.room] = [...new Set([...roomList[data.room], data.username])]
		}
		else {
			roomList[data.room] = [data.username]
		}

		socket.join(data.room)
		io.to(data.room).emit("receive_message", chatData, roomList)
	})

	socket.on('send_message', (data) => {
		chatData.push(data)
		socket.to(data.room).emit("receive_message", chatData, roomList)
	})


	socket.on("disconnect", (reason) => {
		console.log('socket is disconnected, reason: ', reason)
	});
});

// console.log('------------------> ', __dirname);

if(process.env.NODE_ENV=='production'){

	app.get('/',(req,res)=>{
			app.use(express.static("../client/build"))
			res.sendFile(path.resolve('../client/build/index.html'))
	})
}

const port = process.env.PORT || 3000
httpServer.listen(port, () => {
	console.log(`Server is connected to http://localhost:${port}`)
});