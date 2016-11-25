"use strict"
let app = angular.module("FindYourVoice", ["ngRoute", "ui.materialize"])
    .constant("firebaseURL", "https://find-your-voice.firebaseio.com/");

    // $(document).ready(function(){
    //   $('.parallax').parallax();
    // });

let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
  if(AuthFactory.isAuthenticated()){
    Materialize.toast("Signed in. Welcome back!", 2000, "rounded");
    resolve();
  } else {
    Materialize.toast("Error logging in. Try again.", 2000, "rounded");
    reject();
  }
});

app.config(function($routeProvider){
    $routeProvider.
        when("/", {
            templateUrl: "partials/search.html",
            controller: "SearchCTRL",
            resolve: {isAuth}
        }).
        when("/search", {
            templateUrl: "partials/search.html",
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