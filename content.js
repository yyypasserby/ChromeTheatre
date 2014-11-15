$(document).ready(function() {

var link = window.location.href;
var pattern = /http:\/\/\w+.youku.com\/*/;
if(pattern.test(link)) {
    youkuInterpreter();
    console.log("youku");
}
else {
    console.log("Not youku");
}

function getWholeHtml() {
    return document.body.outerHTML;
}

function youkuInterpreter() {
    var wholeYoukuPage = getWholeHtml();

    var video_list = [];
    $("div.v-link").each(function() {
        var thumb_div = $(this).prev();
        var thumb = thumb_div.children()[0];
        console.log(thumb);
        var link = $(this).children()[0]; 
        console.log(link);
        if(typeof link !== 'undefined') {
            //console.log($(this).attr("href"));
            //console.log($(this).attr("title"))
            try {
            var attrs = {};
            var href = $(link).attr("href");
            if(href === null || typeof href === 'undefined') {
                return;
            }
            attrs.href = href; 
            var title = $(link).attr("title");
            if(title === null || typeof href === 'undefined') {
                return;
            }
            attrs.title = title; 
            var thumbnail = $(thumb).attr("src");
            var length = thumbnail.length;
            var thumbnail_pic = thumbnail.substr(length - 10, length - 1);
            console.log(thumbnail_pic);
            if(thumbnail_pic === 'sprite.gif') {
                thumbnail = $(thumb).attr("_src");
                console.log(thumbnail);
            }
            if(thumbnail === null || typeof href === 'undefined') {
                return;
            }
            attrs.thumbnail = thumbnail;
            video_list.push(attrs);
            }
            catch(err) {
                return;
            }
        }
    });

    console.log(video_list);

    var string = JSON.stringify(video_list);
//    var cache = [];
//    var string = JSON.stringify(video_list, function(key, value) {
//        if (typeof value === 'object' && value !== null) {
//            if (cache.indexOf(value) !== -1) {
//                // Circular reference found, discard key
//                return;
//            }
//            // Store value in our collection
//            cache.push(value);
//        }
//        return value;
//    });
//    cache = null;
   
    //load style of iframe
    var style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.setAttribute("rel", "stylesheet");
    style.setAttribute("href", chrome.extension.getURL("views/my_theatre.css"));
    
    document.body.appendChild(style)
    //end load
    
    //load a click button
    var iframe = document.createElement("iframe");
    iframe.setAttribute("src", chrome.extension.getURL("views/my_theatre.html#" + string));
    iframe.setAttribute("class", "theatre-global-back");
    iframe.setAttribute("style", "height:100%; width:100%; border:0px; position:absolute; top:0px; left:0px; z-index:99999");
    //end load
    
//      page.appendChild(page_content);
//    document.body.appendChild(iframe);

    var port = chrome.extension.connect({name: "backgroud"});

    port.postMessage({type: "youku", data: string});
}

});
