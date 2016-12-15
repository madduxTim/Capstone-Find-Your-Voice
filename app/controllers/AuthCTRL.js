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
        // console.log("you clicked register");
        AuthFactory.registerWithEmail($scope.account).then(function(){
            $scope.login();
        });
    };

    // $scope.register = () => {
    //     ref.createUser({
    //         email: $scope.account.email,
    //         password: $scope.account.password
    //     }, (error, userData) => {
    //         if(error){
    //             Materialize.toast(`Error creating user: ${error}`, 3000, "rounded");
    //         } else{
    //             Materialize.toast(`Created user account with uid: ${userData.uid}`, 3000, "rounded");
    //             $scope.login();
    //         }
    //     });
    // };

    $scope.login = () => {
        // console.log("you clicked login");
        AuthFactory.authenticate($scope.account)
            .then(() => {
                $rootScope.isActive = true;
                $location.path("/");
            })
    };

    // $scope.login = () => {
    //     AuthFactory
    //         .authenticate($scope.account)
    //         .then(() => {
    //             $rootScope.isActive = true;
    //             $location.path("/");
    //             $scope.$apply();
    //         });
    // };
});