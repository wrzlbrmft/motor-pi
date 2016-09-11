var app = new Framework7({
	init: false
});

var $$ = Dom7;

var mainView = app.addView(".view-main", {
	domCache: true
});

var socket;

/**
 * on submit of the down button
 */
function onDownSubmit() {
	console.log("onDownSubmit");

	socket.emit("moveDown");
}

/**
 * on submit of the up button
 */
function onUpSubmit() {
	console.log("onUpSubmit");

	socket.emit("moveUp");
}

/**
 * init page: index
 */
app.onPageInit("index", function() {
	console.log("onPageInit: index");

	app.showPreloader("Connecting...");

	socket = io(
		"http://" + config.serverHost + ":" + config.serverPort + "/" + config.ioNamespace);

	/**
	 * on successful connect to the server
	 */
	socket.on("connect", function() {
		console.log("connect");

		// join room of ui clients
		socket.emit("join", config.ioClientUiRoom);

		// immediately emit a status request to the server, to be up-to-date
		socket.emit("statusRequest");
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
 * init page: up
 */
app.onPageInit("up", function() {
	console.log("onPageInit: up");

	$$("#downSubmit").on("click", onDownSubmit);
});

/**
 * init page: down
 */
app.onPageInit("down", function() {
	console.log("onPageInit: down");

	$$("#upSubmit").on("click", onUpSubmit);
});

app.init();
