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
    
    console.log(window.location.hash);
    var temp = window.location.hash;
    var video_list_str = temp.substr(1, temp.length - 1);
    var video_list = JSON.parse(video_list_str);
    console.log(video_list);

    $scope.theatre = { name : 'My Theatre' };
    $scope.video_list = [];
    $scope.video_list.push({ thumbnail : 'http://www.hackshanghai.com/img/logo-new.png'});
    $scope.video_list.push({ thumbnail : 'http://www.hackshanghai.com/img/logo-new.png'});
    $scope.video_list.push({ thumbnail : 'http://www.hackshanghai.com/img/logo-new.png'});
    $scope.video_list.push({ thumbnail : 'http://www.hackshanghai.com/img/logo-new.png'});
    $scope.video_list.push({ thumbnail : 'http://www.hackshanghai.com/img/logo-new.png'});

}]);
