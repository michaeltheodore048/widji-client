var widjiApp = angular.module('widjiApp', [
    'ngRoute',
    'appControllers'
]);

widjiApp.config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
        when('/', {
          'templateUrl': 'partials/display.html',
          'controller': 'DisplayController' //capital awal dan belakang
        }).
        when('/404', {
          'templateUrl': 'partials/404.html',
          'controller': '404Controller' //capital awal dan belakang
        }).
        otherwise({
            'redirectTo': '/404'
        });
    }]);
