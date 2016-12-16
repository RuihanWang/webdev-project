(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController ($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.webId = $routeParams.webId;

//page initial setting , getting page of particular ID
        function init() {
            PageService
                .findPageByWebsiteId(vm.webId)
                .then(function (response) {
                    vm.pages = angular.copy(response.data);
                });
        }
        init();
    }
    
})();





