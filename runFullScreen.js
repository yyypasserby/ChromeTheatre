$(document).ready(
    function() {
    var s = document.createElement('script');
    s.setAttribute('src', chrome.extension.getURL('fullscreenPlay.js'));
    document.body.appendChild(s);
    var isForeground = true;

    $(window).bind("blur", function() {
        isForeground = false;
        console.log('blur:isForeground',isForeground);

    });

    $(window).bind("focus", function() {
        isForeground = true;
        console.log('focus:isForeground',isForeground);

    });

    function setTime(tValue) {
        var video = document.getElementById("theatre");                                               
        try {
            if (tValue == 0) {
                video.currentTime = tValue;
            }
            else {
                video.currentTime += tValue;
            }

        } catch (err) {
            errMessage("Video content might not be loaded");
        }
    }
    function vidplay() {
        var video = document.getElementById("theatre");  
        if (video.src == "") {
            getVideo();
        }
        if (video.paused) {
            video.play();
        } else { 
            video.pause();
        }                                        
    }
    //  load video file from input field
    function getVideo() {
        if (fileURL != ""){
            video.load();  // if HTML source element is used
            vidplay();
        } else {
            errMessage("Enter a valid video URL");  // fail silently
        }
    }
    function directions(msg) {
        if(msg == 3) {
            setTime(-10);
        }
        if(msg == 4) {
            setTime(10);
        }
        if(msg == 5) {
            vidplay();
        }
    }
    var port = chrome.extension.connect({name: "backgroud"});

    port.postMessage({type: "new"});

    port.onMessage.addListener(function(msg) {
        if(isForeground) {
            console.log(msg);
            directions(Number(msg.id));
        }
    });

    }
);

