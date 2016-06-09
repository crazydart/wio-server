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

    $scope.refreshAccounts = function() {

        $http.get("/svc/auth").then(function (response) {

            $scope.accounts = response.data;
        });
    }

    $scope.addAccount = function () {

        $scope.addAccountError = null;
        $scope.addAccountSuccess = null;;

        var data = {

            username: $scope.username,
            password: $scope.password
        };

        $http.post('/svc/auth', data)
            .success(function (data, status, headers, config) {

                $scope.addAccountSuccess = "Account Added";

                $scope.username = null;
                $scope.password = null;

                $scope.refreshAccounts();
            })
            .error(function (data, status, header, config) {

                $scope.addAccountError = "Error adding account!";
            });
    }

    $scope.refreshAccounts();
});