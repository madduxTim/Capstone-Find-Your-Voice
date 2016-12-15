let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
  if(AuthFactory.isAuthenticated()){
    Materialize.toast("Signed in. Welcome back!", 2000, "rounded");
    resolve();
  } else {
    Materialize.toast("Error logging in. Try again.", 2000, "rounded");
    reject();
  }
});

app.config(function($routeProvider){
    $routeProvider.
        when("/", {
            templateUrl: "partials/search.html",
            controller: "SearchCTRL",
            resolve: {isAuth}
        }).
        when("/search", {
            templateUrl: "partials/search.html",
            controller: "SearchCTRL",
            resolve: {isAuth}
        }).
        when("/login", {
            templateUrl: "partials/login.html",
            controller: "AuthCTRL"
        }).
        when("/logout", {
            templateUrl: "partials/login.html",
            controller: "AuthCTRL"
        }).
        otherwise("/");
});


app.run(($rootScope, $location, FIREBASE_CONFIG, AuthFactory) =>{
  firebase.initializeApp(FIREBASE_CONFIG);
    $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
        var logged = AuthFactory.isAuthenticated();
        var appTo;
        if(currRoute.originalPath){
          appTo = currRoute.originalPath.indexOf('/login') !== -1; 
        } 
        if(!appTo && !logged) {
            event.preventDefault();
            $location.path('/login');
        }
    });  
});
