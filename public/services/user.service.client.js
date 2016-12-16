
(function() {
        angular
            .module("WebAppMaker")
            .factory("UserService", UserService);


        function UserService($http) {

            var api = {
                login: login,
                register: register,
                logout: logout,
                checkLoggedin: checkLoggedin,
                createUser: createUser,
                findUserById: findUserById,
                createUserFromAdmin: createUserFromAdmin,
                findUserByUsername: findUserByUsername,
                findUserByUser: findUserByUser,
                updateUser: updateUser,
                deleteUser: deleteUser,
                followUser: followUser,
                unfollowUser: unfollowUser,
                findAllUsers: findAllUsers,
                ppage:ppage,
            };

            return api;


            function ppage(uid) {
                return $http.get("/api/ppage/" + uid);
            }


            function login(user) {
                return $http.post("/api/login", user);
            }
            function register(user) {

                return $http.post("/api/register", user);
            }

            function findAllUsers() {
                return $http.get("/api/movie/alluser");
            }

            function logout() {
                return $http.post('/api/logout');
            }

            function checkLoggedin() {
                return $http.get("/api/loggedin");
            }


            function createUserFromAdmin(user) {
                return $http.post("/api/movie/admin/create", user);
            }

            function createUser(user) {
                var url = "/api/user";

                return $http.post(url, user);
            }

            function findUserById(id) {
                var url = "/api/user/" + id;
                return $http.get(url);
            }

            function findUserByUsername(username) {
                var url = "/api/user?username=" + username;
                return $http.get(url);
            }


            function findUserByUser(username, password) {
                var url = "/api/user?username=" + username + "&password=" + password;
                return $http.get(url);
            }

            function updateUser(userId, newUser) {
                var url = "/api/user/" + userId;
                return $http.put(url, newUser);
            }

            function followUser(userId, username) {
                return $http.post("/api/movie/user/" + userId + "/follow/" + username);
            }

            function unfollowUser(userId, username) {
                return $http.delete("/api/movie/user/" + userId + "/unfollow/" + username);
            }
            function deleteUser(userId) {
                var url = "/api/user/" + userId;
                return $http.delete(url);
            }

        }
    }
)();