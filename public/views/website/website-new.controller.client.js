(function (){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController ($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.createWebsite = createWebsite;
        vm.checkitem = false;


        function createWebsite(name, description) {
            vm.checkitem = true;
            if (name != null) {
                var id = (new Date).getTime();

                var newWebsite = {
                    name: name,
                    developerId: vm.userId,
                    description: description
                };

                WebsiteService
                    .createWebsite(vm.userId, newWebsite)
                    .then(
                        function(response) {$location.url("/user/" + vm.userId + "/website");
                            vm.checkitem = false;
                        },
                        function(error) {vm.error = "please complete input";}
                    )
            }
            else {vm.error = "please complete input";}
        }

    };

})();