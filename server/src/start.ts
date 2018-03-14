import config from "./config";

import * as http from "http";
import * as io from "socket.io";

let server = http.createServer();
let ioServer = io(server).of(config.ioNamespace);

/**
 * on a new connection from a client
 */
ioServer.on("connection", (socket) => {
	console.log("connection:", socket.id);

	/**
	 * on a disconnect of a client
	 */
	socket.on("disconnect", () => {
		console.log("disconnect:", socket.id);
	});

	/**
	 * on a join message from a client
	 */
	socket.on("join", (message) => {
		console.log("join:", message);

		socket.join(message.room);
	});

	/**
	 * on a status request from a ui client
	 */
	socket.on("statusRequest", () => {
		console.log("statusRequest");

		// forward the status request to all pi clients
		ioServer.in(config.ioRoomPi).emit("statusRequest");
	});

	/**
	 * on a status response from a pi client
	 */
	socket.on("statusResponse", (message) => {
		console.log("statusResponse:", message);

		// forward the status response to all ui clients
		ioServer.in(config.ioRoomUi).emit("statusResponse", message);
	});

	/**
	 * on move up
	 */
	socket.on("moveUp", () => {
		console.log("moveUp");

		// forward the command to all pi clients
		ioServer.in(config.ioRoomPi).emit("moveUp");
	});

	/**
	 * on move down
	 */
	socket.on("moveDown", () => {
		console.log("moveDown");

		// forward the command to all pi clients
		ioServer.in(config.ioRoomPi).emit("moveDown");
	});
});

server.listen(config.serverPort);

console.log(`server listening on port ${config.serverPort}...`);
