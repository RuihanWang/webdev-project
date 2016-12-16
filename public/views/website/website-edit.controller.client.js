(function (){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController ($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        vm.userId = $routeParams.userId;
        vm.wid = $routeParams.webId;
        vm.checkitem = false;
        function init() {
            WebsiteService
                .findWebsiteById(vm.wid)
                .then(
                    function(response) {
                        vm.website = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    });
        }
        init();

        function updateWebsite() {
            vm.checkitem = true;
            if (vm.website.name && vm.website.name != ""){
                WebsiteService
                .updateWebsite(vm.wid, vm.website)
                .then(
                    function(res) {$location.url("/user/"+ vm.userId + "/website"); vm.checkitem = false;
                    },
                    function(error) {vm.error = "sorry please try again"}
                )
        }else {vm.error ="Name required";}}

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.wid)
                .then(function(res) {$location.url("/user/"+ vm.userId + "/website");},
                      function(error) {vm.error = "sorry please try again"})
        }

    }


})();