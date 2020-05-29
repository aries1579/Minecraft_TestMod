var serverSystem = server.registerSystem(0, 0);
var tickIndex;
var rainIsOn;
var pollArray;

// Setup which events to listen for
serverSystem.initialize = function () {
	tickIndex = 0;
	rainIsOn = false;
	pollArray = [ [1, 4, -8], [-21, 4, 1] ];
	consoleLog("I am alive1!");
	this.listenForEvent("minecraft:weather_changed", function(eventData) {
		consoleLog("I am alive!");
		if(eventData.data.raining == true){
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
	});

	this.listenForEvent("minecraft:block_interacted_with", function(eventData) {
	    var pos = JSON.stringify(eventData.data.block_position);
		consoleLog("Interacted with "+pos);

		if(eventData.data.block_position.x==-11 && eventData.data.block_position.z==-15){
			consoleLog("sunrise");
			let eventData = this.createEventData("minecraft:execute_command");
			eventData.data.command = "/time set sunrise";
			serverSystem.broadcastEvent("minecraft:execute_command", eventData);
		}
	});

	
}

serverSystem.update = function() {
	tickIndex++;

	if(tickIndex==100){
		consoleLog("Wellcome to my world!");
	}
	else{
		var coin = getRandomInt(5000);
		
		if(coin>4960){
			consoleLog("coin has "+coin);
			let eventData = this.createEventData("minecraft:execute_command");
			eventData.data.command = "/toggledownfall";
			serverSystem.broadcastEvent("minecraft:execute_command", eventData);
		}
		
		///fill ~-3 ~-3 ~-3 ~3 ~-1 ~3 water
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