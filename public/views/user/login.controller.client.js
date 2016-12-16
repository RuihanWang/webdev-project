(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);


    function LoginController ($location,UserService){

    var vm = this;
        vm.checkitem = false;
    
    
    vm.login = function(username,password) {
       vm.checkitem = true;
        if (username != null) {
        UserService
                .login(username, password)
                .then(function (response) {
                    var user = response.data;
                    console.log(user);
                    if (user._id) {
                        $location.url("/user/" + user._id);
                        vm.checkitem = false;
                    } else {
                        vm.error = "Please try again";
                    }
                }, function (response) {
                    vm.error = response.data;
                });
        }else {vm.error = "name required"}
    }}

})();