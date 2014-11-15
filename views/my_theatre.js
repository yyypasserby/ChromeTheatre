$(window).load(function() {
	$("#myGallery").theatre({
		/* other options here */
		selector: "img",
		effect: "3d"
	});

    var port = chrome.extension.connect({name: "backgroud"});

    port.postMessage({type: "new"});

	port.onMessage.addListener(function(msg) {

		if(handler.verify(msg.type))
			handler[msg.type](msg);
		else
			console.log("invalid : " + msg);
	});
});

