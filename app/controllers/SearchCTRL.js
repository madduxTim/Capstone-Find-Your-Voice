"use strict";
// FILE PAIRS WITH MAIN.HTML AND SEARCH-FACTORY.JS

app.controller("SearchCTRL", function($scope, $location, searchFactory, fireBaseFactory) {
    $scope.queryStorage = [];
    $scope.singleBillStorage = [];
    $scope.savedBillsArray = [];
    $scope.dupeCheck = [];

    fireBaseFactory.retrieveSavedBills().then(function(recalledBills){
        $scope.savedBillsArray = recalledBills;
        console.log($scope.savedBillsArray);
        });

    $scope.clearButton = () => {
        $(".search-cards").remove();
    }

    $scope.searchCall = () => {
        searchFactory.keywordCallStorage()
            .then(function(results){
                $scope.queryStorage = results;
        });
    };

    $scope.singleBillAPI = (bill) => {
        searchFactory.billDetailAPI(bill)
            .then(function(results){
                $scope.singleBillStorage = results;
        });
    };

    $scope.saveBill = (bill) => {
        let notes = $("#notes-field").val();
        let duplicate = false;
        for (let i = 0; i < $scope.savedBillsArray.length; i++){
            if (bill.bill_id === $scope.savedBillsArray[i].billNumber){
                duplicate = true;
            };
        };
        if (duplicate === false) {
            fireBaseFactory.postBillToFB(bill, notes).then(function successCallback(response){
                fireBaseFactory.retrieveSavedBills().then(function(remainingBills){
                    $scope.savedBillsArray = remainingBills;
                    Materialize.toast(`${bill.bill_id} has been saved`, 3000, "rounded");
                });
            });
        } else {
            Materialize.toast(`${bill.bill_id} is already in your list of Saved Bills`, 3000, "rounded red")
        };
    };

    $scope.update = () => {
        console.log("update is working with ng-blur");
    };

    $scope.removeBill = (billID, billNumber, event) => {
        fireBaseFactory.deleteBillFromFB(billID).then(function(response){
            fireBaseFactory.retrieveSavedBills().then(function(remainingBills){
                $scope.savedBillsArray = remainingBills;
                Materialize.toast(`${billNumber} has been deleted!`, 3000, "rounded");
            });
        });
    };
});