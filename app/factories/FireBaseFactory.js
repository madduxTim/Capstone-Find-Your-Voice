app.factory("fireBaseFactory", function($q, $http, firebaseURL){

    var postBill = (bill) => {
        return $q(function(resolve, reject){
            $http
                .post(firebaseURL + "saved-bills.json",
                    JSON.stringify({
                        title: bill.title
                        // bill_id: bill_id
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