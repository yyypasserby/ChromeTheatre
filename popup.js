console.log("popup.js starts");
var i = 1;

window.onload = function(){

    if (!window.WebSocket) {
        alert("FATAL: WebSocket not natively supported. This demo will not work!");
    }

    var ui = {
    	display_message : function (logs) {
        	$('#log').text(function(){
        		return (new Date).getTime() + ' : ' + logs + '\n' + $(this).text();
        	});
        	return 'send callback';
        },
        to_connect_statue : function () {
			$("#connect").attr('disabled', 'disabled');
			$("#disconnect").removeAttr('disabled');
        	return 'open callback';
        },
        to_disconnect_statue : function (argument) {
			$("#connect").removeAttr('disabled');
			$("#disconnect").attr('disabled', 'disabled');
        	return 'disconnect callback';
        }

    }

    var bg = chrome.extension.getBackgroundPage();
        console.log("hehe");
    while(bg == null) {
        console.log("hehe");
        bg = chrome.extension.getBackgroundPage();
    }


        bg.popup.display_message = ui.display_message;

        if(bg.status.connected) {
            ui.to_connect_statue();
        }
        else {
            ui.to_disconnect_statue();
        }

        $("#connect").on("click", function(e) {
            console.log("connect btn clicked");
            bg.connect($("#uri").val(),ui.to_connect_statue);
        });
    
        $("#send").on("click", function(e) {
            console.log("send btn clicked");
            bg.send($("#message").val());
        });
    
        $("#disconnect").on("click", function(e) {
            bg.disconnect(ui.to_disconnect_statue);
        });
    
        $('#showTheatre').on("click", function(e) {
            console.log("Show theatre!");
            bg.showTheatre(); 
        });

}
