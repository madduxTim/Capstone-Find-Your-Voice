"use strict";
// PAIRS WITH MAIN.HTML AND LANDINGSEARCHCTRL.JS

app.factory("searchFactory", function($q, $http){
    var keywordCallStorage = function() {
        var queryStorage = [];
        var searchTerms = $("#apiCall").val();      
        return $q(function(resolve, reject){
            $http.get(`http://openstates.org/api/v1//bills/?q=${searchTerms}&state=sd&apikey=a53a72668fc34fe1b9f38ede139fb2b1`)     
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
                    reject(error);
                });

        });
    }

    return {keywordCallStorage:keywordCallStorage};
});