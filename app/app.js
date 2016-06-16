"use strict"
var app = angular.module("FindYourVoice", ["ngRoute"])
    .constant("firebaseURL", "https://find-your-voice.firebaseio.com/");

app.config(function($routeProvider){
    $routeProvider.
        when("/", {
            templateUrl: "partials/main.html",
            controller: "SearchCTRL"
        }).
        when("/main", {
            templateUrl: "partials/main.html",
            controller: "SearchCTRL"
        }).
        when("/login", {
            templateUrl: "partials/login.html",
            controller: "AuthCTRL"
        }).
        otherwise("/");
});