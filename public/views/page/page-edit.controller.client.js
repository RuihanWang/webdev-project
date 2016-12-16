(function() {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController ($location, $routeParams, PageService) {
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        vm.checkitem = false;
        vm.userId = $routeParams.userId;
        vm.webId = $routeParams.webId;
        vm.pageId = $routeParams.pid;
        // function init() {
        //     PageService
        //         .findPageById(pageId)
        //         .then(function (response) {
        //             vm.page = angular.copy(response.data);
        //         });
        // }
        // init();

        function init() {
            PageService
                .findPageById(vm.pageId)
                .then(
                    function(response) {
                        vm.page = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    });
        }
        init();

        function updatePage() {
            vm.checkitem = true;
            if (vm.page.name && vm.page.name != ""){
            PageService
                .updatePage(vm.pageId, vm.page)
                .then(
                    function(response) {
                        $location.url("/user/"+ vm.userId + "/website/" + vm.webId + "/page");
                        vm.checkitem = false;
                    }, function(error) {
                        vm.error = error.data;
                    }
                )
        }else{ vm.error = "Namme required"}}


        function deletePage() {
            PageService
                .deletePage(vm.pageId)
                .then(
                    function(response) {
                        $location.url("/user/"+ vm.userId + "/website/" + vm.webId + "/page");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )}}
})();

