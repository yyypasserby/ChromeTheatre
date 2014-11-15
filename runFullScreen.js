$(document).ready(
    function() {
    var s = document.createElement('script');
    s.setAttribute('src', chrome.extension.getURL('fullscreenPlay.js'));
    document.body.appendChild(s);
    
    var video = document.getElementById("theatre");                                               
    if (video.canPlayType) {   // tests that we have HTML5 video support
        video.addEventListener("error", function(err) {
            errMessage(err);
        }, true);

        function setTime(tValue) {
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
            var fileURL = document.getElementById("videoFile").value;  // get input field                    
            if (fileURL != ""){
                video.src = fileURL;
                video.load();  // if HTML source element is used
                vidplay();
            } else {
                errMessage("Enter a valid video URL");  // fail silently
            }
        }
        function errMessage(msg) {
            document.getElementById("errorMsg").textContent = msg;
            setTimeout("document.getElementById('errorMsg').textContent=''", 5000);
        }
        function directions(msg) {
            if(msg == 3) {
                setTime(video, -10);
            }
            if(msg == 4) {
                setTime(10);
            }
            if(msg == 5) {
                vidplay();
            }
        }
    } 
    var port = chrome.extension.connect({name: "backgroud"});

    port.postMessage({type: "new"});

    port.onMessage.addListener(function(msg) {
        console.log(msg);
        directions(Number(msg.id));
    });
});

