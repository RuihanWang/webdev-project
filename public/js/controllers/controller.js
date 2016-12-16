function LoginController($routeParams,UserService, $location, MovieService) {
    var vm = this;
    vm.Login = Login;
    function Login(username, password) {
        var user = {
            username:username,
            password:password
        };
        var pro = UserService.login(user);
        pro
            .then(function(user){
                vm.user = user.data;
                console.log(user.data);
                if(user === '0') {
                    vm.error = "No such user";
                } else {
                    $location.url("/user/" + vm.user._id);
                }
            });
    }
}

function RegisterController( $routeParams,UserService, $location) {
    var vm = this;
    vm.register = register;
    function register(username, password, firstname, lastname) {
        var user = {username: username, password: password, firstName: firstname, lastName: lastname};
        console.log("guo1");

        UserService
            .createUser(user)
            .then(function (user) {
                console.log(user);
                $location.url("/user/" + user._id);
            });
    }
    function RegisterSuccess(user) {
        $location.url("/user/" + user._id);
    }
    function RegisterError() {
        vm.error="RegisterFail";

    }
}