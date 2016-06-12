"use strict"
var app = angular.module("FindYourVoice", ["ngRoute"])
    .constant("firebaseURL", "https://find-your-voice.firebaseio.com/");

app.config(function($routeProvider){
    $routeProvider.
        when("/", {
            templateUrl: "partials/main.html",
            controller: "LandingSearchCTRL"
        }).
        when("/main", {
            templateUrl: "partials/main.html",
            controller: "LandingSearchCTRL"
        }).
        when("/login", {
            templateUrl: "partials/login.html",
            controller: "AuthCTRL"
        }).
        otherwise("/");
});


  // $(document).ready(function(){
  //   $('.collapsible').collapsible({
  //     accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  //   });
  // });