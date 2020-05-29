var serverSystem = server.registerSystem(0, 0);
var tickIndex;
var rainIsOn;
var pollArray;

// Setup which events to listen for
serverSystem.initialize = function () {
	tickIndex = 0;
	rainIsOn = false;
	serverSystem.listenForEvent("minecraft:weather_changed", eventData => rainOn(eventData));

	pollArray = [ [1, 4, -8], [-21, 4, 1] ];
}

serverSystem.update = function() {
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