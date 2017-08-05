/// <reference path="myMCustomScrollBarDemoDirective.js" />
var myMCustomScrollBarDemo = angular.module('myMCustomScrollBarDemo', ['ngMCustomScrollBar']);
myMCustomScrollBarDemo.controller('myMCustomScrollBarDemoController', ['$scope', '$compile', '$http', function ($scope, $compile, $http) {
    $scope.Items = [];
    $scope.getScrollData = function () {
        for (var i = 0; i <= Math.random() ; i++) {
            $scope.Items.push(i);
        }
        //$http.get('http://localhost:54845/api/ScrollBarDataAPI/scrollBarData').success(function (data) {
        $('#abc').addClass('customClass');
        //$scope.Items = data;
        //}).error(function (err) {
        //    console.log(err);
        //});
    }
    $scope.getScrollData();
    $scope.configScroll = { scrollButtons: { enable: false }, theme: "dark", live: "once" };
    $scope.configScroll1 = { scrollButtons: { enable: true }, theme: "dark", live: "once" };
}]);