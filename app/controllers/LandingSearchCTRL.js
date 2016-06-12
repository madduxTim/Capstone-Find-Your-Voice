"use strict";
// FILE PAIRS WITH MAIN.HTML AND SEARCH-FACTORY.JS

app.controller("LandingSearchCTRL", function($scope, searchFactory) { // add in keywordCallStorage
    $scope.queryStorage = [];

    $scope.searchCall = () => {
        searchFactory.keywordCallStorage()
            .then(function(results){
                console.log(results);
                $scope.queryStorage = results;
        });
    };
});