$(window).load(function() {
	$("#myGallery").theatre({
		/* other options here */
		selector: "img",
		effect: "3d",
        autoplay: false,
        paging: "#myPaging"
	});

    var port = chrome.extension.connect({name: "backgroud"});

    port.postMessage({type: "new"});

	port.onMessage.addListener(function(msg) {
	});
});

