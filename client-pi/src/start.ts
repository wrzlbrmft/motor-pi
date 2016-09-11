import config from "./config";
import * as motor from "./motor";

import * as io from "socket.io-client";

let socket = io(
	`http://${config.serverHost}:${config.serverPort}/${config.ioNamespace}`);

// initial motor status
let status = {
	isMoving: false,	// whether the motor is moving right now
	position: "down"	// current or target position (while moving) of the motor ("up" or "down")
};

/**
 * emit a status response to the server
 */
function emitStatusResponse() {
	socket.emit("statusResponse", status);
}

/**
 * stop motor
 */
function stopMotor() {
	console.log("stop motor");
	motor.stopMotor();

	// hide "Moving..." message on all ui clients
	status.isMoving = false;
	emitStatusResponse();
}

/**
 * on successful connect to the server
 */
socket.on("connect", () => {
	console.log("connect");

	// join room of pi clients
	socket.emit("join", config.ioClientPiRoom);

	// immediately emit a status response to the server, so that all ui clients are up-to-date
	emitStatusResponse();
});

/**
 * on a status request from the server
 */
socket.on("statusRequest", () => {
	console.log("statusRequest");

	emitStatusResponse();
});

/**
 * on move up
 */
socket.on("moveUp", () => {
	console.log("moveUp");

	// new target position
	status.position = "up";

	// show "Moving..." message on all ui clients
	status.isMoving = true;
	emitStatusResponse();

	// start motor and wait for it to move the given distance (see config)
	console.log("start motor (up)");
	motor.startMotorUp();
	setTimeout(stopMotor, config.motorUpRuntime);
});

/**
 * on move down
 */
socket.on("moveDown", () => {
	console.log("moveDown");

	// new target position
	status.position = "down";

	// show "Moving..." message on all ui clients
	status.isMoving = true;
	emitStatusResponse();

	// start motor and wait for it to move the given distance (see config)
	console.log("start motor (down)");
	motor.startMotorDown();
	setTimeout(stopMotor, config.motorDownRuntime);
});

console.log("init motor");
motor.initMotor();
