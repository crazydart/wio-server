/**
 * Created by William on 6/8/2016.
 */

var wioApp = angular.module('wioApp').config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.when('/', {
            templateUrl: '/templates/wioapp/index.html',
            controller: 'indexController',
            activetab: 'index'
        }).when('/auth', {
            templateUrl: '/templates/wioapp/authList.html',
            controller: 'authListController',
            activetab: 'auth'
        }).otherwise('/');
    }
]);

wioApp.controller('indexController', function indexController($scope) {
    $scope.test = "test value";
});

wioApp.controller('authListController', function authListController($scope, $http) {

    $http.get("http://localhost:3000/svc/auth").then(function(response) {

        $scope.accounts = response.data;
    });
});