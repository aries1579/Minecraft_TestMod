var serverSystem = server.registerSystem(0, 0);
var tickIndex;
var rainIsOn;
var pollArray;

// Setup which events to listen for
serverSystem.initialize = function () {
	// Register any events you will send to the client
	// system.registerEventData(...)

	// Register any components you will attach to game objects
	// system.registerComponent(...)

	// Set up any events you wish to listen to
	serverSystem.listenForEvent("mymod3:pinky", eventData => receivePinkyMessage(eventData));


	// Enable full logging, useful for seeing errors, you will probably want to disable this for
	// release versions of your scripts.
	// Generally speaking it's not recommended to use broadcastEvent in initialize, but for configuring logging it's fine.
	const scriptLoggerConfig = serverSystem.createEventData("minecraft:script_logger_config");
	scriptLoggerConfig.data.log_errors = true;
	scriptLoggerConfig.data.log_information = true;
	scriptLoggerConfig.data.log_warnings = true;
	serverSystem.broadcastEvent("minecraft:script_logger_config", scriptLoggerConfig);

	tickIndex = 0;
	rainIsOn = false;
	serverSystem.listenForEvent("minecraft:weather_changed", eventData => rainOn(eventData));

	pollArray = [ [1, 4, -8], [-21, 4, 1] ];
}

// per-tick updates
serverSystem.update = function() {
	// Any logic that needs to happen every tick on the server.
	tickIndex++;

	if(tickIndex==100){
		consoleLog("Wellcome to my world!");
	}
	else{
		var coin = getRandomInt(5000);
		
		if(coin>4950){
			consoleLog("coin has "+coin);
			let eventData = this.createEventData("minecraft:execute_command");
			eventData.data.command = "/toggledownfall";
			serverSystem.broadcastEvent("minecraft:execute_command", eventData);
		}
		
		///fill ~-3 ~-3 ~-3 ~3 ~-1 ~3 water
	}
}

function receivePinkyMessage(parameters) {
	if (parameters.data.narf) {
		//set up chat event data object
		consoleLog("Hello world");
	}
}

function rainOn(param){
	consoleLog("I am alive!");
	if(param.data.raining == true){
		if(rainIsOn==false){
			consoleLog("It is raining now!");
		}
		rainIsOn=true;
	}else{
		if(rainIsOn==true){
			consoleLog("Raining has stopped.");
		}
		rainIsOn=false;
	}
}

function consoleLog(text){
	let chatEventData = serverSystem.createEventData("minecraft:display_chat_event");
	chatEventData.data.message = text;
	serverSystem.broadcastEvent("minecraft:display_chat_event", chatEventData);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}