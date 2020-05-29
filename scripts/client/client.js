var clientSystem = client.registerSystem(0, 0);

// Setup which events to listen for
clientSystem.initialize = function () {
	const eventDataDefaults = {narf: false}
	clientSystem.registerEventData("mymod3:pinky", eventDataDefaults);
}

clientSystem.update = function() {
	
}
