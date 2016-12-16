(function(){
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider

            .when("/flickr", {
                templateUrl: "views/widget/widget-flickr-search.view.client.html",
                controller: "FlickrImageSearchController",
                controllerAs: "model",
                resolve: {
                    check: check
                }

            })
            .when("/user/:userId/website/:webId/page/:pid/flickr/:title", {
                templateUrl: "views/widget/widget-flickr-search.view.client.html",
                controller: "FlickrImageSearchController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }

            })

            .when("/flickr/:title", {
                templateUrl: "views/widget/widget-flickr-search.view.client.html",
                controller: "FlickrImageSearchController",
                controllerAs: "model",
                resolve: {
                    check: check
                }
            })

            .when("/user/:userId/website/:webId/page/:pid/details/:imdbID", {
                templateUrl: "views/details/details.view.html",
                controller: "DetailsController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .when("/details/:imdbID", {
                templateUrl: "views/details/details.view.html",
                controller: "DetailsController",
                controllerAs: "model",
                resolve: {
                    check: check
                }
            })

            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }

            })

            .when("/user/:userId/website/:webId/page/:pid/widget/:widgetId/details/:imdbID", {
                templateUrl: "views/details/details.view.html",
                controller: "DetailsController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            // .when("/", {
            //     templateUrl: "views/index/index.view.client.html",
            //     controller: "IndexController",
            //      controllerAs: "model"
            // })

            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })

            .when("/user", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/:userid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .when("/user/:username/review", {
                templateUrl: "views/user/others.view.html",
                controller: "OthersController",
                controllerAs: "model",
                // resolve: {
                //     loggedin: checkLoggedin
                // }
            })
  
            .when("/user/:userId/website", {
                templateUrl: "views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })


            .when("/list", {
                templateUrl: "views/details/list.view.html",
                controller: "listController",
                controllerAs: "model"
            })

            .when("/user/:userId/website/new", {
                templateUrl: "views/website/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:webId", {
                templateUrl: "views/website/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:webId/page", {
                templateUrl: "views/page/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:webId/page/new", {
                templateUrl: "views/page/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:webId/page/:pid", {
                templateUrl: "views/page/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:webId/page/:pid/widget", {
                templateUrl: "views/widget/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:webId/page/:pid/widget/new", {
                templateUrl: "views/widget/widget-chooser.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "model"
            })
            
            .when("/user/:userId/website/:webId/page/:pid/flickr",{
                templateUrl: "views/widget/widget-flickr-search.view.client.html",
                controller : "FlickrImageSearchController",
                controllerAs : "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .when("/user/:userId/website/:webId/page/:pid/widget/:widgetId", {
                templateUrl: "views/widget/widget-edit.view.client.html",
                controller: "EditWidgetController",
                controllerAs: "model",
                
            })
            .otherwise({
                redirectTo: "/login"
            });}

        function checkLoggedin(UserService, $q, $location, $rootScope) {
            var deferred = $q.defer();
            UserService
                .checkLoggedin()
                .then(
                    function (response) {
                        var user = response.data;
                        if (user == '0') {
                            deferred.reject();
                            $rootScope.currentUser = null;
                            $location.url("/login");
                        }
                        else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function (error) {
                        deferred.reject();
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                );

            return deferred.promise;
        }



        function check (UserService, $q, $location, $rootScope) {
            var deferred = $q.defer();
            UserService
                .checkLoggedin()
                .then(
                    function (response) {
                        var user = response.data;
                        if (user == '0') {
                            $rootScope.currentUser = null;
                            deferred.resolve();


                        }
                        else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function (error) {
                        $rootScope.currentUser = null;
                        deferred.resolve();


                    }
                );

            return deferred.promise;
        }




    }

)();