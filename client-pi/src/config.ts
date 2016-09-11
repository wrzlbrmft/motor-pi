// motor up speed is approx. 7 cm/sec
const motorUpCmPerSec = 7;

// motor down speed is approx. 7 cm/sec
const motorDownCmPerSec = 7;

const config = {
	serverHost: "localhost",
	serverPort: 8080,
	ioNamespace: "motor",
	ioClientPiRoom: "client-pi",

	motorGpioPinA: 23,
	motorGpioPinY: 24,
	motorGpioPinEn: 25,

	motorUpRuntime: Math.floor( 50 // cm
		/ motorUpCmPerSec * 1000),

	motorDownRuntime: Math.ceil( 50 // cm
		/ motorDownCmPerSec * 1000),

	// fake motor during development
	isMotorPresent: true
};

export default config;
