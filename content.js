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
    console.log(wholeYoukuPage);

    var video_list = [];
    $("a[target=video]").each(function() {
        var title = $(this).attr("title");
    
        if(typeof title !== 'undefined') {
            console.log(title);
            console.log($(this));
            console.log($(this).attr("target"))
            video_list.push({title : $(this).attr("href")});
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
    
    //page.appendChild(page_content);
    //document.body.appendChild(iframe);

    var port = chrome.extension.connect({name: "backgroud"});

    port.postMessage({type: "youku", data: string});
}


});
