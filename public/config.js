(function() {
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller:"RegisterController",
                controllerAs:"model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {

                    checkLoggedin: checkLoggedin
                }
            })
            .when("/user/:uid/friend", {
                templateUrl: "views/user/friend.view.client.html",
                controller: "FriendController",
                controllerAs: "model"
            })
            .when("/user/:uid/friend/:fid", {
                templateUrl: "views/user/friendDetail.view.client.html",
                controller: "FriendDetailController",
                controllerAs: "model"
            })
            // .when("/user/info/:uid", {
            //     templateUrl: "views/user/profile.view.client.html",
            //     controller: "ProfileController",
            //     controllerAs: "model"
            //
            // })
            .when("/user/:uid/movie", {
                templateUrl: "views/movie/search.view.client.html",
                controller: "MovieController",
                controllerAs: "model"
            })
            .when("/user/:uid/favorate", {
                templateUrl: "views/movie/favorate.view.client.html",
                controller: "FavorateController",
                controllerAs: "model"
            })
            .when("/user/:uid/favorate/:mid", {
                templateUrl: "views/movie/movieDetail.view.client.html",
                controller: "FavorateDetailController",
                controllerAs: "model"

            })
            .when("/movie/:mid", {
                templateUrl: "views/movie/movieDetail.view.client.html",
                controller: "FavorateDetailController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });


       function checkLoggedin($q, $timeout, $http, $location, $rootScope) {
            var deferred = $q.defer();
            $http.get('/api/loggedin')
                .success(
                    function(user) {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url('/');
                }
            });
            return deferred.promise;
        };

    }
})();