$(document).ready(
    function() {
        var s = document.createElement('script');
        s.setAttribute('src', chrome.extension.getURL('fullscreenPlay.js'));
        document.body.appendChild(s);
    }
);

