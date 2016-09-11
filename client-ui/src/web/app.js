var app = new Framework7({
	init: false
});

var $$ = Dom7;

var mainView = app.addView(".view-main", {
	domCache: true
});

var socket;

function onDownSubmit() {
	console.log("onDownSubmit");

	socket.emit("moveDown");
}

function onUpSubmit() {
	console.log("onUpSubmit");

	socket.emit("moveUp");
}

app.onPageInit("index", function() {
	app.showPreloader("Connecting...");

	socket = io(
		"http://" + config.serverHost + ":" + config.serverPort + "/" + config.ioNamespace);

	socket.on("connect", function() {
		console.log("connect");

		socket.emit("join", config.ioClientUiRoom);

		socket.emit("statusRequest");
	});

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

app.onPageInit("up", function() {
	console.log("onPageInit: up");

	$$("#downSubmit").on("click", onDownSubmit);
});

app.onPageInit("down", function() {
	console.log("onPageInit: down");

	$$("#upSubmit").on("click", onUpSubmit);
});

app.init();
