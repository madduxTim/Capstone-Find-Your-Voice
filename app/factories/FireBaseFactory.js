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

    return {postBill:postBill};

});