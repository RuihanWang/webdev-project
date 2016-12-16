(function() {
    angular
        .module("WebAppMaker")
        .factory("MovieService", movieService);

    function movieService($http) {
        var api = {
            userLikesMovie: userLikesMovie,
            findUserLikes: findUserLikes,
            findMovieByImdbID: findMovieByImdbID,
            userUnlikesMovie: userUnlikesMovie,
            searchMovie:searchMovie
        };

        return api;

        function findUserLikes(imdbID) {
            return $http.get("/api/project/movie/" + imdbID + "/user");
        }

        function userLikesMovie(userId, movie) {
            return $http.post("/api/project/user/" + userId + "/movie/" + movie.imdbID, movie);
        }

        function findMovieByImdbID(imdbID) {
            return $http.get("/api/project/movie/" + imdbID);
        }

        function userUnlikesMovie(userId, movie) {
            return $http.delete("/api/project/user/" + userId + "/movie/" + movie.imdbID);
        }



        function searchMovie(movieName) {
              var url = "/api/search?title=" +movieName;
            return $http.get(url);

}

    }



})();