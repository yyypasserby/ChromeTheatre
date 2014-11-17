chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
//  chrome.tabs.executeScript(null, {file: "jquery.min.js"}, function() {
//    chrome.tabs.executeScript(null, {file: "fullscreenPlay.js"}); 
//  });
});

function showTheatre() {
    console.log("come to showTheatre function!");
  	chrome.tabs.executeScript(null, {file: "jquery.min.js"}, function() {
    chrome.tabs.executeScript(null, {file: "content.js"}); 
  });
}

console.log("background.js starts");

var client = {
	ports : {},
	broadcast : function(_data){
        if(_data.id == "6") {
            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.remove(tab.id);
            });
        }
		for(var id in client.ports){
			client.ports[id].postMessage(_data);
		}
	}
}

var video_list_str;
chrome.extension.onConnect.addListener(function(port) {
	console.log('port name : ' + port.name);
	console.assert(port.name == "backgroud");
	port.onMessage.addListener(function(msg) {
		if(msg.type == 'new'){

			var clientId = port.sender.url;

			console.log(port);

			console.log('port : a new client id ' + clientId);
            // console.log(video_list_str);
			port.postMessage({type:'accept', data: video_list_str});

			client.ports[clientId] = port;
			console.log(client.ports);

		}

        console.log(msg);
        if(msg.type == 'video_new') {
            console.log(msg.data);
            chrome.tabs.create({
                url: msg.data
            });
        }
		if(msg.type == 'youku'){
			console.log(msg);
			chrome.tabs.create({
				url:chrome.extension.getURL("views/my_theatre.html")
			});
            //chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, { state: "fullscreen" });
            video_list_str = msg.data;
		}
	});
	port.onDisconnect.addListener(function(){
		console.log('port.onDisconnect');
		delete client.ports[port.sender.url];
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

		client.broadcast({state:'connected'});

	}
	ws.onmessage = function(e) {
		console.log("[WebSocket#onmessage] Message: '" + e.data + "'\n");

		var msg = JSON.parse(e.data);

		if(popup.display_message != null)
			console.log(popup.display_message("[WebSocket#onmessage] Message: '" + e.data + "'\n"));

		client.broadcast(msg);
	}
	ws.onclose = function() {
		console.log("[WebSocket#onclose]\n");
		sendNotice(getRandomId(),2,'WebSocket#onclose');
		ws = null;
		server_status.connected = false;
		settings.url = '';

		client.broadcast({state:'disconnected'});
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

