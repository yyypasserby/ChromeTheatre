var isForeground = false;

$(window).bind("blur", function() {
  isForeground = false;
});

$(window).bind("focus", function() {
  isForeground = true;
});

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

    /*

	public enum Motions {
		Dummy, Down, Up, Left, Right, SingleTap, DoubleTap, LongPress
	}

	msg Object example: {"id":"0","dscp":"Dummy"}
    */
    function directions(msg) {
        if(msg == 3) {
            $('#myGallery').theatre('next');
        }
        if(msg == 4) {
            $('#myGallery').theatre('prev');
        }
    }

	port.onMessage.addListener(function(msg) {
		if(!isForeground)return;
		console.log(msg);
        var direction = JSON.parse(msg);
        directions(Number(msg.id));
	});

    $("#next-button").on("click",function() {
        directions(4);
    });
});
