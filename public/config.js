(function() {
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl : "views/common/home.html",
                controller: "HomeController",
                controllerAs: "ctrl"
            })
            .when("/userProfile", {
                templateUrl: "views/user/userProfile.html",
                controller: "UserProfileController",
                controllerAs: "ctrl"
            })
            .when("/searchMovie", {
                templateUrl: "views/movie/searchMovie.html",
                controller: "SearchMovieController",
                controllerAs: "ctrl"
            })
            .when("/myMovie", {
                templateUrl: "views/movie/myMovie.html",
                controller: "myMovieController",
                controllerAs: "ctrl"
            })
            .when("/myFriend", {
                templateUrl: "views/friend/myFriend.html",
                controller: "myFriendController",
                controllerAs: "ctrl"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.html",
                controller: "adminController",
                controllerAs: "ctrl"
            })
            .otherwise("/", {
                templateUrl : "views/common/home.html",
                controller: "HomeController",
                controllerAs: "ctrl"
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