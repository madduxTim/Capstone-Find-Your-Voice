"use strict";
app.factory("fireBaseFactory", function($q, $http, FIREBASE_CONFIG, AuthFactory){

    let postBillToFB = (bill, notes) => {
        let user = AuthFactory.getUser();
        return $q(function(resolve, reject){
            $http
                .post(`${FIREBASE_CONFIG.databaseURL}/`+"saved-bills.json",
                // .post(firebaseURL+"saved-bills.json",
                    JSON.stringify({
                        uid: user.uid,
                        title: bill.title,
                        billNumber: bill.bill_id,
                        openStatesID: bill.id,
                        session: bill.session,
                        sponsors: bill.sponsors[0].name,
                        billPage: bill.sources[0].url,
                        billText: bill.versions[0].url,
                        notes: notes
                    }))
                .success(function(firebaseObj){
                    resolve(firebaseObj);
                })
                .error(function(error){
                    reject(error);
                });
        });
    };

    let updateNotes = (bill, notes) => {
        // console.log(bill, notes);
        let user = AuthFactory.getUser();
        return $q(function(resolve, reject){
            $http
                // .patch(firebaseURL+"saved-bills/"+bill+".json",
                .patch(`${FIREBASE_CONFIG.databaseURL}/`+"saved-bills/"+bill+".json",
                    JSON.stringify({
                        notes: notes
                    }))
                .success(function(firebaseObj){
                    resolve(firebaseObj);
                })
                .error(function(error){
                    reject(error);
                });
        });
    };

    let retrieveSavedBills = () => {
        let keysArray = [];
        let user = AuthFactory.getUser();
        return $q(function(resolve, reject){
            $http
                .get(`${FIREBASE_CONFIG.databaseURL}/saved-bills.json?orderBy="uid"&equalTo="${user.uid}"`)
                // .get(`${firebaseURL}saved-bills.json?orderBy="uid"&equalTo="${user.uid}"`)
                .success(function(savedBillObj){
                    let preKeyBills = savedBillObj;
                    Object.keys(preKeyBills).forEach(function(key){
                        preKeyBills[key].id=key;
                        keysArray.push(preKeyBills[key]);
                    });
                    resolve(keysArray);
                })
                .error(function(error){
                    reject(error);
                });
        });
    };

    let deleteBillFromFB = (billToKill) => {
        return $q(function(resolve, reject){
            $http
                // .delete(firebaseURL+`saved-bills/${billToKill}.json`)
                .delete(`${FIREBASE_CONFIG.databaseURL}/saved-bills/${billToKill}.json`)
                .success(function(returnsFromFB){
                    resolve(returnsFromFB);
                })
                .error(function(error){
                    reject(error);
                });
        });
    };

    return {
        postBillToFB:postBillToFB, 
        retrieveSavedBills:retrieveSavedBills, 
        deleteBillFromFB:deleteBillFromFB,
        updateNotes:updateNotes
    };

});