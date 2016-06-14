"use strict";
// FILE PAIRS WITH MAIN.HTML AND SEARCH-FACTORY.JS

app.controller("LandingSearchCTRL", function($scope, $location, searchFactory) { // add in keywordCallStorage
    $scope.queryStorage = [];

    $scope.searchCall = () => {
        searchFactory.keywordCallStorage()
            .then(function(results){
                console.log(results);
                $scope.queryStorage = results;
        });
    };

    $scope.hrefFix = (billId) => {
        Materialize.toast(billId, 3000);
        // location.replace(`http://www.capitol.tn.gov/Bills/109/Bill/${billId}.pdf`);
        // need to make this link to open states bill page 
        
    };
});