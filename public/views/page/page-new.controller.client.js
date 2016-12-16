(function(){
    angular
        .module("WebAppMaker")
        .controller("NewPageController",NewPageController);

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams.userId;
        vm.wid = $routeParams.webId;
        vm.checkitem = false;
        vm.createPage = createPage;

        function createPage(name, title) {
            vm.checkitem = true;
            if (name != null) {
                var newPage = {name: name, websiteId: vm.wid, title: title};
                PageService
                    .createPage(vm.wid, newPage)
                    .then(
                        function(response) {$location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");                            vm.checkitem = false;
                        },
                        function(error) {vm.error =  "please try again";})
            }
            else {vm.error = "please enter the name";}
        }
    };

})();