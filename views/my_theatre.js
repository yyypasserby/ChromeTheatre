$(window).load(function() {
	$("#myGallery").theatre({
		/* other options here */
		selector: "img",
		effect: "3d"
	});

    var port = chrome.extension.connect({name: "backgroud"});

    port.postMessage({type: "new"});

    /*

	public enum Motions {
		Dummy, Down, Up, Left, Right, SingleTap, DoubleTap, LongPress
	}

	msg Object example: {"id":"0","dscp":"Dummy"}
    */
	port.onMessage.addListener(function(msg) {

	});
});

