'use strict';

var app = angular.module('TheatreApp', []);

app.controller('TheatrePresentCtrl', ['$scope', function($scope) {
    console.log('Threatre init!');
    $scope.theatre = { name : 'My Theatre' };
    $scope.video_list = [];
    $scope.video_list.push({ thumbnail : 'http://www.hackshanghai.com/img/logo-new.png'});
    $scope.video_list.push({ thumbnail : 'http://www.hackshanghai.com/img/logo-new.png'});
    $scope.video_list.push({ thumbnail : 'http://www.hackshanghai.com/img/logo-new.png'});
    $scope.video_list.push({ thumbnail : 'http://www.hackshanghai.com/img/logo-new.png'});
    $scope.video_list.push({ thumbnail : 'http://www.hackshanghai.com/img/logo-new.png'});

}]);
