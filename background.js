chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  chrome.tabs.executeScript(null, {file: "jquery.min.js"}, function() {
    chrome.tabs.executeScript(null, {file: "content.js"}); 
  });
});

function showTheatre() {
  chrome.tabs.executeScript(null, {file: "jquery.min.js"}, function() {
    chrome.tabs.executeScript(null, {file: "content.js"}); 
  });
}

console.log("background.js starts");

var client = {
	ports : {},
	broadcast : function(_type, _name, _data){
		for(var id in client.ports){
			client.ports[id].postMessage({
				type: _type,
				name: _name,
				data: _data
			});
		}
	}
}

var handler = {
	verify : function(type){
		return handler[type] && typeof(handler[type]) == 'function';
	},
	event :function(msg){

		client.broadcast('event', msg.name, msg.data);

	}
}

//setInterval(client.broadcast, 2000 , {});

chrome.extension.onConnect.addListener(function(port) {
	console.log('port name : ' + port.name);
	console.assert(port.name == "backgroud");
	port.onMessage.addListener(function(msg) {
		if(msg.type == 'new'){

			var clientId = port.portId_;

			console.log('port : a new client ' + clientId);
			port.postMessage({type:'accept', name: 'server_accept', data: {id: clientId}});

			client.ports[clientId] = port;
			console.log(client.ports);
		}
	});
	port.onDisconnect.addListener(function(){
		delete client.ports[port.portId_];
		console.log(client.ports);
	});
});

var Opt = function (ms) {
	return {
		type: "basic",
		title: "Droid Motion Event",
		message: ms,
		iconUrl: "./icon.png"
	};
}

var sendNotice = function(id, ttl, ms) {
	chrome.notifications.create(id, Opt(ms), function (id) {
	setTimeout(clear,1000*ttl,id);
});
}

var clear = function (id) {
	chrome.notifications.clear(id, function () {});
}

var getRandomId = function () {
	var time = new String(new Date().getTime());
	var rand = new String(parseInt(Math.random()*(10000)));
	return time.substring(7) + rand;
}

var ws;

function connect (uri, callback) {
	ws = new WebSocket(uri);//'ws://192.168.56.101:3139'
	ws.onopen = function() {
		console.log("[WebSocket#onopen]\n");
		sendNotice(getRandomId(),2,'WebSocket#onopen');
		server_status.connected = true;
		settings.uri = uri;
		console.log(callback());

		client.broadcast('event', 'connection_open', {});
	}
	ws.onmessage = function(e) {
		//console.log("[WebSocket#onmessage] Message: '" + e.data + "'\n");

		var msg = JSON.parse(e.data);

		if(popup.display_message != null)
			console.log(popup.display_message("[WebSocket#onmessage] Message: '" + e.data + "'\n"));
		
		if(msg.name == 'click')
			sendNotice(getRandomId(), 1, "click");

		if(handler.verify(msg.type))
			handler[msg.type](msg);
		else
			console.log("invalid : " + msg);
	}
	ws.onclose = function() {
		console.log("[WebSocket#onclose]\n");
		sendNotice(getRandomId(),2,'WebSocket#onclose');
		ws = null;
		server_status.connected = false;
		settings.url = '';

		client.broadcast('event','connection_close',{});
	}
}

function send (ms) {
	ws.send(ms);
	if(popup.display_message != null)
		console.log(popup.display_message(ms));
}

function disconnect (callback) {
	ws.close();
	console.log(callback());
}

var server_status = {
	is_connected : false
};

var settings = {
	uri : ''
};

var popup = {
	display_message : {}
};

var droid = {
	name : 'android'
};

