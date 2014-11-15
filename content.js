var link = window.location.href;
var pattern = /http:\/\/\w+.youku.com\/*/
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

    //load style of iframe
    var style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.setAttribute("rel", "stylesheet");
    style.setAttribute("href", chrome.extension.getURL("views/my_theatre.css"));
    
    document.body.appendChild(style)
    //end load
    
    //load a click button
    var iframe = document.createElement("iframe");
    iframe.setAttribute("src", chrome.extension.getURL("views/my_theatre.html"));
    iframe.setAttribute("class", "theatre-global-back");
    iframe.setAttribute("style", "height:100%; width:100%; border:0px; position:absolute; top:0px; left:0px; z-index:99999");
    //end load
    
    //page.appendChild(page_content);
    document.body.appendChild(iframe);
}
