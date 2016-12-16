


(function() {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($routeParams,$rootScope, FlickrService,UserService, $location) {
        var vm = this;

        vm.title = null;
        vm.search = search;
        vm.message = null;
        vm.uid = $routeParams.userId;
        vm.wid = $routeParams.webId;
        vm.wwid = $routeParams.widgetId;
        vm.pid = $routeParams.pid;
        vm.currentUser = $rootScope.currentUser;


        function init() {
            vm.title = $routeParams.title;
        }
        init();

        if (vm.title) {
            FlickrService
                .searchMovieByTitle(vm.title)
                .then(function(response) {
                    vm.data = response.data;
                });
        }

        function search(movie) {
            if (typeof movie !== "undefined" && movie.title != "") {
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid +"/flickr/" + movie.title);
            } else {
                vm.message = "Please enter the correct title for searching!";
            }
        }
    }
})();
