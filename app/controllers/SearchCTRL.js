"use strict";
// FILE PAIRS WITH MAIN.HTML AND SEARCH-FACTORY.JS

app.controller("SearchCTRL", function($scope, $location, searchFactory, fireBaseFactory) { // add in keywordCallStorage
    $scope.queryStorage = [];
    $scope.singleBillStorage = [];
    $scope.savedBillsArray = [];

    fireBaseFactory.retrieveSavedBills().then(function(recalledBills){
        $scope.savedBillsArray = recalledBills;
        console.log(recalledBills);
        console.log($scope.savedBillsArray);
    });

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
        fireBaseFactory.postBill(bill)
            .then(function successCallback(response){
                Materialize.toast(`${bill.bill_id} has been saved to your bills`, 3000, "rounded");
            });
    };

    $scope.removeBill = (billID) => {
        Materialize.toast(`${billID} has been deleted!`, 3000, "rounded red");
        fireBaseFactory.retrieveSavedBills().then(function(recalledBills){
            $scope.savedBillsArray = recalledBills;
            console.log(recalledBills);
            console.log($scope.savedBillsArray);
        })
    }

});