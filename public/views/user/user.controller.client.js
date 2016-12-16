
(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)
        .controller("FriendController",FriendController)
        .controller("FriendDetailController",FriendDetailController);







    function FriendController ($routeParams,UserService, $location) {

        var vm = this;
        vm.uid = $routeParams.uid;
        UserService
            .getFriends(vm.uid)
            .success(function(res) {
                vm.friends = res;
            })

    }









    function FriendDetailController ($routeParams,UserService, $location) {
        var vm = this;
        vm.uid =  $routeParams.uid;
        UserService
            .findUserById(vm.uid)
            .success(function(res) {
                vm.friend = res;
            })


    }









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
                                console.log(vm.user);
                                $location.url("/user/" + vm.user._id);
                            }
                        });

             function noUser() {
                  console.log("error at login")
                }


            }
        }

    function RegisterController( $routeParams,UserService, $location) {
        var vm = this;
        console.log("jdc")
        vm.register = register;
        function register(username,password,firstname, lastname) {
            var user = {username: username, password: password, firstName: firstname, lastName: lastname};


            UserService
                .createUser(user)
                .then(function(user) {
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









            function ProfileController(UserService,$routeParams,$location,$rootScope) {

                var vm = this;
                vm.UpdateUser = UpdateUser;
                vm.toSearch = toSearch;
                vm.logout = logout;
                vm.uid = $routeParams.uid;


                function init() {
                    if(!vm.uid && $rootScope.currentUser) {
                     $location.url("/user/"+ $rootScope.currentUser._id);
}


                    else {
                        UserService.findUserById(vm.uid)
                            .success(function(res) {
                                vm.user = res;
                            });
                    //     UserService
                    //         .findFavorateForUser(vm.uid)
                    //         .then(function (res) {
                    //             vm.favorateMovie = res;
                    //         })
                    }
                }
                init();


                // vm.pro = UserService.findUserById(vm.uid);
                //
                // vm.pro
                //     .success(function(user) {
                //         vm.user = user;
                //         console.log(vm.user);
                //     })
                //     .error(function() {
                //         console.log("profile erroe")
                //     })
                function logout() {
                    UserService
                        .logout()
                        .then(
                            function(response) {
                                $rootScope.currentUser = null;
                                $location.url("/");
                            })
                }
                function toSearch() {
                    $location.url("/user/" +vm.uid +"/movie");
                }

                function UpdateUser(username, password, firstname,lastname) {
                    var UserId = $routeParams.uid;

                    var use = { username: username, password: password, firstName:firstname,lastName:lastname};
console.log(use);

                    var promise = UserService.updateUser(UserId, use);
                   promise
                       .success(function(user) {
                           console.log(user);
                       })
                       .error(function() {
                           console.log("error update");
                       })

                }


            }



})();
