var app = new Framework7({
	init: false
});

var $$ = Dom7;

var mainView = app.addView(".view-main", {
	domCache: true
});

var socket;

/**
 * on click of the down button
 */
function onDownButton() {
	console.log("onDownButton");

	socket.emit("moveDown");
}

/**
 * on click of the up button
 */
function onUpButton() {
	console.log("onUpButton");

	socket.emit("moveUp");
}

/**
 * init index page
 */
app.onPageInit("index", function() {
	console.log("init index page");

	app.showPreloader("Connecting...");

	socket = io("http://" + config.serverHost + ":" + config.serverPort + "/" + config.ioNamespace);

	/**
	 * on successful connect to the server
	 */
	socket.on("connect", function() {
		console.log("connect");

		// join room of ui clients
		socket.emit("join", { room: config.ioRoomUi });

		// immediately emit a status request to the server, to be up-to-date
		socket.emit("statusRequest");
	});

	/**
	 * on disconnect from the server
	 */
	socket.on("disconnect", function() {
		console.log("disconnect");

		app.showPreloader("Connecting...");
	});

	/**
	 * on receiving a status response from the server
	 */
	socket.on("statusResponse", function(data) {
		console.log("statusResponse:", data);

		if (data.isMoving) {
			app.showPreloader("Moving...");
		}
		else {
			app.hidePreloader();

			switch (data.position) {
				case "up":
					mainView.router.load({
						pageName: "up",
						animatePages: false
					});
					break;

				case "down":
					mainView.router.load({
						pageName: "down",
						animatePages: false
					});
					break;
			}
		}
	});
});

/**
 * init up page
 */
app.onPageInit("up", function() {
	console.log("init up page");

	$$("#downSubmit").on("click", onDownButton);
});

/**
 * init down page
 */
app.onPageInit("down", function() {
	console.log("init down page");

	$$("#upSubmit").on("click", onUpButton);
});

app.init();
