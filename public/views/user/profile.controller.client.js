(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $rootScope, $routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;vm.unRegister = unRegister;vm.logout = logout;

        var uid = $routeParams["userId"];

        function init() {
            if(!uid && $rootScope.currentUser) {
                UserService
                    .ppage($rootScope.currentUser._id)
                    .then(function (res) {
                        vm.user = res.data
            })}
            else {
                UserService
                    .ppage(uid)
                    .then(function (res) {
                        vm.user = res.data
                    })
            }
        }
        init();

        function logout() {
            $rootScope.currentUser = null;

            UserService
                .logout()
                .then(
                    function(response) {
                        $location.url("/login");
                    }, function(error) {
                        $location.url("/login");
                    }
                )
        }

        function updateUser() {
            UserService
                .updateUser(vm.user._id, vm.user)
                .then(
                    function(res) {
                        vm.success = "Sychronized the information";
                    }, function(error) {vm.error = "Please try again. ";}
                )
        }

        function unRegister() {
            UserService
                .deleteUser(vm.user._id)
                .then(
                    function(response) {$location.url("/login");},
                    function(error) {vm.error = error.data;}
                )
        }
    }

})();