'use strict';


// Declare app level module which depends on filters, and services
angular.module('spectral', ['spectral.controllers']).
  config(['$routeProvider', '$anchorScrollProvider', function($routeProvider, $anchorScrollProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/main.html', controller: 'MainCtrl'});
    $routeProvider.when('/:params', {templateUrl: 'partials/main.html', controller: 'MainCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});
    //$anchorScrollProvider.disableAutoScrolling();

  }])

  .value('$anchorScroll', angular.noop);
