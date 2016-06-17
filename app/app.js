"use strict"
var app = angular.module("FindYourVoice", ["ngRoute"])
    .constant("firebaseURL", "https://find-your-voice.firebaseio.com/");

let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
  if(AuthFactory.isAuthenticated()){
    console.log("User is authenticated, resolve route promise");
    resolve();
  } else {
    console.log("User is not authenticated, reject route promise");
    reject();
  }
});

app.config(function($routeProvider){
    $routeProvider.
        when("/", {
            templateUrl: "partials/main.html",
            controller: "SearchCTRL",
            resolve: {isAuth}
        }).
        when("/main", {
            templateUrl: "partials/main.html",
            controller: "SearchCTRL",
            resolve: {isAuth}
        }).
        when("/login", {
            templateUrl: "partials/login.html",
            controller: "AuthCTRL"
        }).
        when("/logout", {
            templateUrl: "partials/login.html",
            controller: "AuthCTRL"
        }).
        otherwise("/");
});

app.run(($location) => {
    let contactsRef = new Firebase("https://contacts-app-tdm.firebaseio.com/");
    contactsRef.onAuth(authData => {
        if(!authData){
            $location.path("/login");
        }
    });
});