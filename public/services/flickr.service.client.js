
(function() {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService($http) {
        var service = {
            searchMovieByTitle: searchMovieByTitle,
            findMovieByImdbID: findMovieByImdbID
        };
        return service;

        function findMovieByImdbID(imdbID) {
            return $http.get("http://www.omdbapi.com/?i=" + imdbID + "&plot=full");
        }

        function searchMovieByTitle(title) {
            return $http.get("http://www.omdbapi.com/?s=" + title);
        }
    }
})();
