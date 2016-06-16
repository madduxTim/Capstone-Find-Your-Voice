"use strict";
// FILE PAIRS WITH MAIN.HTML AND SEARCH-FACTORY.JS

app.controller("SearchCTRL", function($scope, $location, searchFactory, fireBaseFactory) { // add in keywordCallStorage
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

    $scope.saveBill = (bill) => {
        // console.log("working yet?", bill);
        fireBaseFactory.postBill(bill)
            .then(function successCallback(response){
                Materialize.toast(`${bill.title} has been saved to your bills`, 3000, "rounded");
            });
    };

});