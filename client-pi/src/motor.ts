import config from "./config";

import { Gpio } from "onoff";

let gpioPinA;
let gpioPinY;
let gpioPinEn;

/**
 * initialize motor
 */
export function initMotor() {
	if (config.isMotorConnected) {
		gpioPinA = new Gpio(config.motorGpioPinA, "out");
		gpioPinY = new Gpio(config.motorGpioPinY, "out");
		gpioPinEn = new Gpio(config.motorGpioPinEn, "out");
	}
}

/**
 * start motor clockwise (up)
 */
export function startMotorUp() {
	if (config.isMotorConnected) {
		gpioPinA.writeSync(1);
		gpioPinY.writeSync(0);
		gpioPinEn.writeSync(1);
	}
}

/**
 * start motor counterclockwise (down)
 */
export function startMotorDown() {
	if (config.isMotorConnected) {
		gpioPinA.writeSync(0);
		gpioPinY.writeSync(1);
		gpioPinEn.writeSync(1);
	}
}

/**
 * stop motor
 */
export function stopMotor() {
	if (config.isMotorConnected) {
		gpioPinEn.writeSync(0);
	}
}
