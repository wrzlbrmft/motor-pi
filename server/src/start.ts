import config from "./config";

import * as http from "http";
import * as io from "socket.io";

let server = http.createServer();
let _io = io(server).of(config.ioNamespace);

/**
 * on a new connection from a client
 */
_io.on("connection", (socket) => {
	console.log("connection");

	/**
	 * on a join message from a client (clients can make the server joining them into a room)
	 */
	socket.on("join", (data) => {
		console.log("join:", data);

		socket.join(data);
	});

	/**
	 * on a status request from a ui client
	 */
	socket.on("statusRequest", () => {
		console.log("statusRequest");

		// forward the status request to all pi clients (should be only one)
		_io.in(config.ioClientPiRoom).emit("statusRequest");
	});

	/**
	 * on a status response from a pi client (should be only one)
	 */
	socket.on("statusResponse", (data) => {
		console.log("statusResponse:", data);

		// forward the status response to all ui clients
		_io.in(config.ioClientUiRoom).emit("statusResponse", data);
	});

	/**
	 * on move up
	 */
	socket.on("moveUp", () => {
		console.log("moveUp");

		// forward the command to all pi clients (should be only one)
		_io.in(config.ioClientPiRoom).emit("moveUp");
	});

	// on move down
	socket.on("moveDown", () => {
		console.log("moveDown");

		// forward the command to all pi clients (should be only one)
		_io.in(config.ioClientPiRoom).emit("moveDown");
	});
});

server.listen(config.serverPort);

console.log(`server listening on port ${config.serverPort}...`);
