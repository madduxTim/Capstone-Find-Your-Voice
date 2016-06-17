"use strict";

app.controller("AuthCTRL", function($scope, $rootScope, $location, firebaseURL, AuthFactory){
    let ref = new Firebase(firebaseURL);
    $scope.account = {
        email: "",
        password: ""
    };

    if($location.path() === "/logout"){
        ref.unauth();
        $rootScope.isActive = false;
    }

    $scope.register = () => {
        ref.createUser({
            email: $scope.account.email,
            password: $scope.account.password
        }, (error, userData) => {
            if(error){
                console.log(`Error creating user: ${error}`);
            } else{
                console.log(`Created user account with uid: ${userData.uid}`);
                $scope.login();
            }
        });
    };


    $scope.login = () => {
        AuthFactory
            .authenticate($scope.account)
            .then(() => {
                $rootScope.isActive = true;
                $location.path("/");
                $scope.$apply();
            });
    };
});