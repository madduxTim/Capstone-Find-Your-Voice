"use strict";

app.controller("AuthCTRL", function($scope, $rootScope, $location, AuthFactory){

    $scope.account = {
        email: "",
        password: ""
    };

    if($location.path() === "/logout"){
        AuthFactory.logout();
        $rootScope.isActive = false;
        $location.url("/login");
    }

    $scope.register = () => {
        AuthFactory.registerWithEmail($scope.account).then(function(){
            $scope.login();
        });
    };

    $scope.login = () => {
        AuthFactory.authenticate($scope.account)
            .then(() => {
                $rootScope.isActive = true;
                $location.path("/");
            })
    };
});