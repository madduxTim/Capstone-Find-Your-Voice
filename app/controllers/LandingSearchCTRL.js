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
        // Need to perform a foreach on billId to get the output right
        // AND THEN re-route the user to right place on 
        // http://www.capitol.tn.gov/Bills/109/Bill/SB0324.pdf  (zum bispiel)
        Materialize.toast(billId, 3000);
        location.replace(`http://www.capitol.tn.gov/Bills/109/Bill/${billId}.pdf`);
        // Materialize.toast(billId.length, 3000, "blue");
        
    };
});