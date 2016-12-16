
(function() {
    angular
        .module("WebAppMaker")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams, FlickrService,$rootScope, MovieService,WidgetService, $location) {
        var vm = this;
        vm.imdbID = null;
        // vm.currentUser = 123;
        vm.uid = $routeParams.userId;
        vm.record = null;
        vm.pid =$routeParams.pid;
        vm.reviews = [];
        vm.users = [];
        vm.wid = $routeParams.webId;
        vm.wdid = $routeParams.widgetId;
        vm.favorite = favorite;
        vm.unfavorite = unfavorite;
        vm.createWidget = createWidget;
        vm.deleteWidget = deleteWidget;
        vm.currentUser = $rootScope.currentUser;



        function init() {
            vm.imdbID = $routeParams.imdbID;


            FlickrService
                .findMovieByImdbID(vm.imdbID)
                .then(function(response) {
                    vm.movie = response.data;
                });

            MovieService
                .findMovieByImdbID(vm.imdbID)
                .then(function(response) {
                    vm.record = response.data;
                    if (vm.record) {
                        return MovieService.findUserLikes(vm.imdbID);
                    }
                })
                .then(function(response) {
                    if (response) {
                        vm.users = response.data;
                    }
                });


        }
        init();


        function createWidget(movie) {
            var newWidget = {
                widgetType: "MOVIE",
                pageId: vm.pid,
                imdbID: vm.imdbID,
                title:movie.Title,
                Poster:movie.Poster,
            };
            WidgetService
                .createWidget(vm.pid, newWidget)
                .then(
                    function(response) {
                        $location.url
                        ("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }


        function deleteWidget(movie) {
            WidgetService
                .deleteWidget(vm.wdid)
                .then(function (response) {
                    var result = response.data;
                    if (result){$location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget");
                    }else {vm.error = "Error";
                    }
                });
        }

        // implement like feature
        function favorite(movie) {
            MovieService

                .userLikesMovie(vm.currentUser._id, movie)
                .then(function() {
                    return MovieService.findMovieByImdbID(vm.imdbID);
                })
                .then(function(response) {
                    vm.record = response.data;
                    return MovieService.findUserLikes(vm.imdbID);
                })
                .then(function(response) {
                    if (response) {
                        vm.users = response.data;
                    }
                });
        }

        function unfavorite(movie) {
            MovieService
                .userUnlikesMovie(vm.currentUser._id, movie)
                .then(function() {
                    return MovieService.findMovieByImdbID(vm.imdbID);
                })
                .then(function(response) {
                    vm.record = response.data;
                    return MovieService.findUserLikes(vm.imdbID);
                })
                .then(function(response) {
                    if (response) {
                        vm.users = response.data;
                    }
                });
        }
    }
})();
