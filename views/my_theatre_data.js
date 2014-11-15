'use strict';

var app = angular.module('TheatreApp', []);

app.controller('TheatrePresentCtrl', ['$scope', function($scope) {
    console.log('Threatre init!');

//    parent.$("a").each(function() {
//        var title = $(this).attr("title");
//    
//        if(typeof title !== 'undefined') {
//            console.log(title);
//            console.log($(this));
//            chrome.storage.sync.set({title : $(this) }, function() {
//                console.log('video_list saved');
//            });
//        }
//    });

//    chrome.storage.sync.get(null, function(items) {
//         var allKeys = Object.keys(items);
//         console.log(items);
//         console.log(allKeys);
//    });
    
    //var temp = window.location.hash;
    //var video_list_str = temp.substr(1, temp.length - 1);
    //var video_list = JSON.parse(video_list_str);

    //var length = video_list.length;
    //video_list.splice(10, length - 10);
    //console.log(video_list);

    $scope.theatre = { name : 'My Theatre' };
    $scope.video_list = [];
    $scope.updateVideoList = function(data) {
        var videos = JSON.parse(data);
        var length = videos.length;

        videos.splice(20, length - 20);
        $scope.video_list = videos;
        console.log(data);
    };

}]);
