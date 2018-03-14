const config = {
	serverHost: "localhost",
	serverPort: 8080,
	ioNamespace: "motor",
	ioRoomPi: "pi",

	motorDistanceCm: 50, // cm
	motorDistanceCmPerSec: 7, // cm

	motorGpioPinA: 23,
	motorGpioPinY: 24,
	motorGpioPinEn: 25,

	// fake motor during development
	isMotorConnected: false
};

export default config;
