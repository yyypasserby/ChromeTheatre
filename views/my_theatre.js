var isForeground = false;

$(window).bind("blur", function() {
  isForeground = false;
});

$(window).bind("focus", function() {
  isForeground = true;
});

$(window).load(function() {
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
            Reveal.right();
        }
        if(msg == 4) {
            var video = $(".present").children();
            var href = video[0].href;
            console.log(href);
            port.postMessage({type: "video_new", data: href});
            Reveal.left();
        }
        if(msg == 5) {
            console.log(cur);
            var href = cur.attr("href");
        }
    }

	port.onMessage.addListener(function(msg) {
		if(!isForeground)return;
		console.log(msg);
        if(msg.type == "accept") {
            console.log(msg.data);
            var element  = angular.element($("#myTheatre"));
            var controller = element.controller();
            var scope = element.scope();
         //as this happends outside of angular you probably have to notify angular of the change by wrapping your function call in $apply
            scope.$apply(function(){
                scope.updateVideoList(msg.data);
            });
        }
        else {
            directions(Number(msg.id));
        }
	});

    $("#next-button").on("click",function() {
        directions(4);
    });

    // Full list of configuration options available here:
    // https://github.com/hakimel/reveal.js#configuration
    Reveal.initialize({
        controls: false,
        progress: false,
        history: true,
        center: true,

        theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
        transition: Reveal.getQueryHash().transition || 'default', // default/cube/page/concave/zoom/linear/fade/none

        // Parallax scrolling
        // parallaxBackgroundImage: 'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg',
        // parallaxBackgroundSize: '2100px 900px',

        // Optional libraries used to extend on reveal.js
        dependencies: [
            { src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
                { src: 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
                { src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
                { src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
                { src: 'plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
                { src: 'plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
            ]
        });
});
