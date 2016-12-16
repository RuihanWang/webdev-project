(function() {
    angular
        .module("WebAppMaker")
        .controller("MovieController", MovieController)
        .controller("FavorateController", FavorateController)
        .controller("FavorateDetailController", FavorateDetailController);



    function FavorateDetailController(MovieService, $location, UserService,$routeParams) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.mid = $routeParams.mid;
        MovieService
            .findMovieById(vm.mid)
            .success(function(res) {
                vm.movie = res;
            });

        MovieService
            .findFavorateUser(vm.mid)
            .success(function(res){
                vm.users = res;
            });


    }


    function FavorateController(MovieService, $location,UserService,$routeParams) {
        var vm = this;
        vm.uid = $routeParams.uid;
        UserService
            .getFavorateForUser(vm.uid)
            .success(function (res) {
                vm.favorateMovies = res;
            })
    }



    function MovieController(MovieService, $location, UserService,$routeParams) {

        var vm = this;
        vm.uid = $routeParams.uid;
        vm.searchMovie = searchMovie;
        vm.addToFavorate = addToFavorate;
        vm.movieDetail = movieDetail;

        function searchMovie(title) {
            MovieService.searchMovie(title).success(function(res) {
                    vm.movies = res;
                }
            );

        }

        function addToFavorate(movieId) {
            var userId = vm.uid;
            UserService.addToFavorate(userId, movieId);
            MovieService.favorate(userId, movieId);
        }
        function movieDetail (movieId) {
            $location.url("/user/" + vm.uid +"/movie/" +movieId);



        }

    }

})();