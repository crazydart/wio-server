/**
 * Created by William on 6/8/2016.
 */

var wioApp = angular.module('wioApp').config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.when('/', {
            templateUrl: '/templates/wioapp/index.html',
            controller: 'indexController'
        }).otherwise('/');
    }
]);

wioApp.controller('indexController', function indexController($scope) {
    $scope.test = "test value";
});