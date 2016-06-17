app.factory("fireBaseFactory", function($q, $http, firebaseURL, AuthFactory){

    var postBill = (bill) => {
        let user = AuthFactory.getUser();
        return $q(function(resolve, reject){
            $http
                .post(firebaseURL + "saved-bills.json",
                    JSON.stringify({
                        uid: user.uid,
                        title: bill.title,
                        billNumber: bill.bill_id,
                        openStatesID: bill.id,
                        session: bill.session,
                        sponsors: bill.sponsors[0].name,
                        billPage: bill.sources[0].url,
                        billText: bill.versions[0].url
                    }))
                .success(function(firebaseObj) {
                    resolve(firebaseObj);
                })
                .error(function(error){
                    reject(error);
                });
        });
    };

    var retrieveSavedBills = () => {
        let savedBillsArray = [];
        let user = AuthFactory.getUser();
        return $q(function(resolve, reject){
            $http
                .get(firebaseURL + "saved-bills.json")
                .success(function(savedBillObj){
                    var preKeyBills = savedBillObj;
                    Object.keys(preKeyBills).forEach(function(key){
                        preKeyBills[key].id=key;
                        savedBillsArray.push(preKeyBills[key]);
                    });
                    resolve(savedBillsArray);
                })
                .error(function(error){
                    reject(error);
                });
        });
        console.log(savedBillsArray);
    }



    // var removeBill = (billId) => {
    //     return q$(function(resolve, reject){
    //         $http
    //             .delete(firebaseURL+`saved-bills/${billId}.json`)
    //             .success(function(objectFromFirebase){
    //                 resolve(objectFromFirebase);
    //             })
    //             .error(function(error){
    //                 reject(error);
    //             });
    //     });
    // };

    return {postBill:postBill, retrieveSavedBills:retrieveSavedBills};

});