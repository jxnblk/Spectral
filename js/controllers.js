'use strict';

/* Controllers */

angular.module('cooler.controllers', [])

  .controller('ListCtrl', ['$scope', function($scope){
    $scope.listIsEditable = false;
    $scope.toggleListIsEditable = function(){
      $scope.listIsEditable = !$scope.listIsEditable;
    };
  }])

  .controller('MainCtrl', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location) {

    $scope.colors = [];

    if($routeParams.params){
      var paramColors = $routeParams.params.split('&');
      for (var i = 0; i < paramColors.length; i++){
        var nameValue = paramColors[i].split('=');
        var color = {
          "classname": nameValue[0],
          "hexValue": nameValue[1]
        };
        $scope.colors.push(color);
      };
    } else {
      var newColor = {};
      $scope.colors.push(newColor);
    };

    $scope.storeParams = function(){
      var colors = []
      for (var i = 0; i < $scope.colors.length; i++){
        if ($scope.colors[i].classname != null) {
          var colorString = $scope.colors[i].classname + '=' + $scope.colors[i].hexValue;
          colors.push(colorString);  
        };
      };
      var params = colors.join('&');
      $location.path(params);
    };

    $scope.addColor = function() {
      $scope.listIsEditable = false;
      $scope.storeParams();
      var newColor = {};
      $scope.colors.push(newColor);
    };

    $scope.removeColor = function(i) {
      $scope.colors.splice(i,1);
      $scope.storeParams();
    };

    $scope.moveColorUp = function(i) {
      var colorToMove = $scope.colors[i];
      $scope.colors.splice(i,1);
      $scope.colors.splice(i-1,0,colorToMove);
      $scope.storeParams();
    };

    $scope.moveColorDown = function(i) {
      var colorToMove = $scope.colors[i];
      $scope.colors.splice(i,1);
      $scope.colors.splice(i+1,0,colorToMove);
      $scope.storeParams();
    };

    $scope.tileWidth = 100 / $scope.colors.length;

  }])

  .controller('ShareCtrl', ['$scope', '$location', '$window', function($scope, $location, $window) {
    $scope.tweet = function(){
      //var link = $location.absUrl();
      var url = 'https://twitter.com/intent/tweet?text=Check out my cooler colors: &url=' + $location.absUrl();
      $window.open(url);
    };
  }])

;
  