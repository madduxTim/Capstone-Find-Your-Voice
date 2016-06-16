"use strict";
// FILE PAIRS WITH MAIN.HTML AND SEARCH-FACTORY.JS

app.controller("LandingSearchCTRL", function($scope, $location, searchFactory) { // add in keywordCallStorage
    $scope.queryStorage = [];
    $scope.singleBillStorage = [];

    $scope.searchCall = () => {
        searchFactory.keywordCallStorage()
            .then(function(results){
                console.log(results);
                $scope.queryStorage = results;
        });
    };

    $scope.singleBillAPI = (bill) => {
        searchFactory.billDetailAPI(bill)
            .then(function(results){
                $scope.singleBillStorage = results;
                console.log($scope.singleBillStorage);
        });
    };

});