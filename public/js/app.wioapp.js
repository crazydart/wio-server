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

wioApp.filter("dateFilter", function () {
    return function (item) {
        if (item != null) {
            return new Date(parseInt(item.substr(6)));
        }
        return "";
    };
});

wioApp.controller('indexController', function indexController($scope) {
    $scope.test = "test value";
});

wioApp.controller('authListController', function authListController($scope, $http) {

    $scope.username = null;
    $scope.password = null;

    $http.get("http://localhost:3000/svc/auth").then(function(response) {

        $scope.accounts = response.data;
    });

    $scope.addAccount = function() {

        $scope.accounts.push({
           id: 0,
            username: $scope.username,
            authtoken: "111",
            authdate: new Date()
        });
    }
});