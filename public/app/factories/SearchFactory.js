"use strict";
// PAIRS WITH MAIN.HTML AND SearchCTRL.JS

// THIS IS THE FIRST API CALL BASED ON KEYWORDS 
app.factory("searchFactory", function($q, $http, $document){

    // FIRST, ALL BILLS API CALL BASED ON KEYWORDS 
    let keywordCallStorage = function() {
        let keywordCallArray = [];
        let searchTerms = $document.find("#allBillsAPICall").val();
        return $q(function(resolve, reject){
            $http.get(`http://openstates.org/api/v1//bills/?q=${searchTerms}&state=tn&search_window=session%3A109&apikey=a53a72668fc34fe1b9f38ede139fb2b1`)     
                .success(function(queryData){
                    let preKeyData = queryData;
                    Object.keys(preKeyData).forEach(function(key){
                        preKeyData[key].id=key;
                        keywordCallArray.push(preKeyData[key]);
                    });
                    if (keywordCallArray.length !== 0) {
                    resolve(keywordCallArray);
                    } else {
                        Materialize.toast("No bills found. Search again.", 3000, "rounded");
                    }
                })
                .error(function(error){
                    Materialize.toast(`${error}`, 3000, "rounded red");
                    reject(error);
                });

        });
    };

    // INDIVIDUAL BILLS ARE PASSED IN TO SECOND API CALL FOR BILL DETAIL
    let billDetailAPI = function(bill) {
        let singleBillStorage = [];
        return $q(function(resolve, reject){
            $http.get(`http://openstates.org/api/v1/bills/tn/109/${bill}/?apikey=a53a72668fc34fe1b9f38ede139fb2b1`)     
                .success(function(queryData){
                    resolve(queryData);
                })
                .error(function(error){
                    reject(error);
                });
        });
    };

    return {
        keywordCallStorage:keywordCallStorage, 
        billDetailAPI:billDetailAPI
    };
});