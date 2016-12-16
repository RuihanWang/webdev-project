(function() {
    angular
        .module("WebAppMaker")
        .controller("OthersController", othersController);

    function othersController($routeParams, UserService) {
        var vm = this;

        vm.message = null;
        vm.error = null;
        vm.username = $routeParams.username;
        vm.follow = follow;
        vm.unfollow = unfollow;


        function init() {
            username = $routeParams.username;
            UserService
                .findUserByUsername(username)
                .then(function(response) {
                    vm.user = response.data;
                    return UserService.checkLoggedin();
                })
                    .then(function(response) {
                        var user1 = response.data;
                        if (user1) {
                            vm.currentUser = user1;
                        }
                    })
        }
        init();


        function follow(user) {
            UserService
                .followUser(vm.currentUser._id, user.username)
                .then(function() {
                    return UserService.findUserByUsername(user.username);
                })
                .then(function(response) {
                    vm.user = response.data;
                    vm.message = "Followed successfully";

                })
        }

        function unfollow(user) {
            UserService
                .unfollowUser(vm.currentUser._id, user.username)
                .then(function() {
                    return UserService.findUserByUsername(user.username);
                })
                .then(function(response) {
                    vm.user = response.data;
                    vm.message = "Unfollowed successfully";

                })

        }
    }
})();
