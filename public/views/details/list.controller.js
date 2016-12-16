(function() {
    angular
        .module("WebAppMaker")
        .controller("listController", listController);

    function listController(UserService) {
        var vm = this;


        function init() {
            UserService
                .findAllUsers()
                .then(function(response) {
                    var users = response.data;
                    if (users) {
                        vm.users = users;
                    }
                });

            }
        init();

    }
})();
