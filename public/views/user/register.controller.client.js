(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $rootScope, UserService) {

        var vm = this;
        vm.register = register;
        vm.checkitem = false;
        vm.badPassword = false;

        function register(username, password, verifypassword,role) {
            vm.checkitem = true;
            if (username && password && verifypassword) {
                if (password === verifypassword) {

                    UserService
                        .register(username, password,role)
                        .then(
                            function(response) {
                                var user = response.data;
                                $rootScope.currentUser = user;
                                $location.url("/user/" + user._id);
                                vm.checkitem = false;
                                vm.badPassword = false;
                            },
                            function(error) {
                                vm.error = error.data;
                            }
                        );
                }
                else {
                    vm.error = "password not match";vm.badPassword = true;
                }
            }
            else {vm.error = "Enter a username and password";
            }
        }
    }

})();