(function() {
    angular
        .module("WebAppMaker")
        .controller("AdminController", adminController);

    function adminController(UserService) {
        var vm = this;

        var selectedUserId = null;
        var selectedUserUsername = null;
        var selectedUserRole = null;

        vm.type = '';
        vm.showDscendUsername = true;
        vm.showDscendRole = true;
        vm.username = "username";
        vm.role = "role";
        vm.message = null;
        vm.users = null;
        vm.currentUser = null;

        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;
        vm.sortAscend = sortAscend;
        vm.sortDescend = sortDescend;

        function init() {
            UserService
                .checkLoggedin()
                .then(function(response) {
                    var userTemp = response.data;
                    if (userTemp) {
                        vm.currentUser = userTemp;
                        return UserService.findAllUsers();
                    }
                })
                .then(function(response) {
                    var users = response.data;
                    if (users) {
                        vm.users = users;
                    }
                });
        }
        init();

        function addUser(user) {
            UserService
                .createUserFromAdmin(user)
                .then(function(response) {
                    var user = response.data;
                    if (user) {
                        return UserService.findAllUsers();
                    }
                })
                .then(function(response) {
                    var users = response.data;
                    if (users) {
                        vm.users = users;
                        vm.user = {};
                    }
                });
        }

        function updateUser(user) {
            UserService
                .updateUser(selectedUserId, user)
                .then(function(response) {
                    var userTemp = response.data;
                    if (userTemp) {
                        return UserService.findAllUsers();
                    }
                })
                .then(function(response) {
                    var users = response.data;
                    if (users) {
                        vm.users = users;
                        vm.user = {};
                    }
                });
        }

        function deleteUser(user) {
            var index = null;
            for (var u in vm.users) {
                if (vm.users[u].username == user.username) {
                    index = u;
                }
            }
            selectedUserId = vm.users[index]._id;
            selectedUserRole = vm.users[index].role;
            if (selectedUserRole == "admin") {
                vm.message = "enable delete Admin";
                return ;
            }
            UserService
                .deleteUser(selectedUserId)
                .then(function() {
                    return UserService.findAllUsers();
                })
                .then(function(response) {
                    var users = response.data;
                    if (users) {
                        vm.users = users;
                    }
                });
        }

        function selectUser(user) {
            var index = null;
            for (var u in vm.users) {
                if (vm.users[u].username == user.username) {
                    index = u;
                }
            }
            selectedUserId = vm.users[index]._id;
            selectedUserUsername = vm.users[index].username;
            UserService
                .findUserByUsername(selectedUserUsername)
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = {
                            _id: user._id,
                            username: user.username,
                            password: user.password,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            role: user.role
                        }
                    }
                });
        }

        function sortAscend(type) {
            vm.type = type;
            if (type == "username") {
                vm.showDscendUsername = true;
            } else if (type == "role") {
                vm.showDscendRole = true;
            }
        }

        function sortDescend(type) {
            vm.type = "-" + type;
            if (type == "username") {
                vm.showDscendUsername = false;
            } else if (type == "role") {
                vm.showDscendRole = false;
            }
        }
    }
})();
