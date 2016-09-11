import config from "./config";

import * as http from "http";
import * as io from "socket.io";

let server = http.createServer();
let _io = io(server).of(config.ioNamespace);

_io.on("connection", (socket) => {
	console.log("connection");

	socket.on("join", (data) => {
		console.log("join:", data);

		socket.join(data);
	});

	socket.on("statusRequest", () => {
		console.log("statusRequest");

		_io.in(config.ioClientPiRoom).emit("statusRequest");
	});

	socket.on("statusResponse", (data) => {
		console.log("statusResponse:", data);

		_io.in(config.ioClientUiRoom).emit("statusResponse", data);
	});

	socket.on("moveUp", () => {
		console.log("moveUp");

		_io.in(config.ioClientPiRoom).emit("moveUp");
	});

	socket.on("moveDown", () => {
		console.log("moveDown");

		_io.in(config.ioClientPiRoom).emit("moveDown");
	});
});

server.listen(config.serverPort);

console.log(`server listening on port ${config.serverPort}...`);
