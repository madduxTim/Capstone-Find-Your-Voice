"use strict";
// PAIRS WITH MAIN.HTML AND LANDINGSEARCHCTRL.JS

app.factory("searchFactory", function($q, $http, $document){
    var keywordCallStorage = function() {
        var queryStorage = [];
        var searchTerms = $document.find("#apiCall").val();
        var stateSelectValue = $document.find("#stateSelectDropdown").val();      
        return $q(function(resolve, reject){
            $http.get(`http://openstates.org/api/v1/bills/?&state=${stateSelectValue}&q=${searchTerms}&apikey=a53a72668fc34fe1b9f38ede139fb2b1`)     
                .success(function(queryData){
                    var preKeyData = queryData;
                    Object.keys(preKeyData).forEach(function(key){
                        preKeyData[key].id=key;
                        queryStorage.push(preKeyData[key]);
                    });
                    if (queryStorage.length !== 0) {
                    resolve(queryStorage);
                    } else {
                        Materialize.toast("No bills found. Search again.", 3000, "rounded")
                    }
                })
                .error(function(error){
                    Materialize.toast(`${error}`, 3000, "rounded red");
                    reject(error);
                });

        });
    }

    // ENABLES FUNCTIONALITY OF MATERIALIZE DROP DOWN SELECTS
    $(document).ready(function() {
        $('select').material_select();
    });
    return {keywordCallStorage:keywordCallStorage};
});