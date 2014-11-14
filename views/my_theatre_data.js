'use strict';

var app = angular.module('TheatreApp', []);

app.controller('TheatrePresentCtrl', ['$scope', function($scope) {
    console.log('Threatre init!');
    $scope.theatre = { name : 'My Theatre' };
    $scope.video_list = [];
    $scope.video_list.push({ thumbnail : '../imgs/1.jpg'});
    $scope.video_list.push({ thumbnail : '../imgs/2.jpg'});
    $scope.video_list.push({ thumbnail : '../imgs/3.jpg'});
    $scope.video_list.push({ thumbnail : '../imgs/4.jpg'});
    $scope.video_list.push({ thumbnail : '../imgs/5.jpg'});
}]);
