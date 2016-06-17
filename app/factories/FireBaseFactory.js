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
        let makesADiff = [];
        let user = AuthFactory.getUser();
        // console.log(user.uid);
        return $q(function(resolve, reject){
            $http
                // .get(`${firebaseURL}saved-bills.json?orderBy="uid"&equalTo="${user.uid}"`)
                .get(`${firebaseURL}saved-bills.json`) // THIS WORKS, BUT NOT LINE ABOVE
                .success(function(savedBillObj){
                    var preKeyBills = savedBillObj;
                    Object.keys(preKeyBills).forEach(function(key){
                        preKeyBills[key].id=key;
                        makesADiff.push(preKeyBills[key]);
                    });
                    resolve(makesADiff);
                })
                .error(function(error){
                    reject(error);
                });
        });
        console.log(makesADiff);
    }

    var deleteBillFromFB = (billToKill) => {
        // return console.log(billToKill);
        return q$(function(resolve, reject){
            $http
                // .delete(firebaseURL+`saved-bills/${billToKill}.json`)
                .delete("https://find-your-voice.firebaseio.com/saved-bills/-KKVIbwsVo0CB4Txs4gT")
                .success(function(returnsFromFB){
                    resolve(returnsFromFB);
                })
                .error(function(error){
                    reject(error);
                });
        });
    };

    return {postBill:postBill, 
            retrieveSavedBills:retrieveSavedBills, 
            deleteBillFromFB:deleteBillFromFB};

});