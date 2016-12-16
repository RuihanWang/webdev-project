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


        function login(username, password) {
            var url = "/api/login";
            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user);
        }

        function register(username, password,role) {
            var user = {
                username: username,
                password: password,
                role: role
            };
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

        // function createUser(username, password) {
        //     var newUser = {
        //         // _id: (new Date()).getTime() + "",
        //         username: username,
        //         password: password
        //     };
        //
        //     // users.push(newUser);
        //     // return newUser;
        //     return $http.post("/api/user", newUser);
        // }
        function createUserFromAdmin(user) {
            return $http.post("/api/movie/admin/create", user);
        }

        function createUser(username, password) {
            var url = "/api/user";
            var newUser = {
                username: username,
                password: password
            };
            return $http.post(url, newUser);
        }

        function findUserById(id) {
            // for(var i in users){
            //     if(users[i]._id === id){
            //         return users[i];
            //     }
            // }
            // return null;
            var url = "/api/user/" + id;
            return $http.get(url);
        }
        
        function findUserByUsername(username) {
            // for(var i in users){
            //     if(users[i].username === username){
            //         return users[i];
            //     }
            // }
            // return null;
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }


        function findUserByUser(username, password) {
            // for (var i in users) {
            //     if (users[i].username === username && users[i].password === password) {
            //         return users[i];
            //     }
            // }
            // return null;
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }

        function updateUser(userId, newUser) {
            // for (var i in users) {
            //     if (users[i]._id === userId) {
            //         users[i].firstName = newUser.firstName;
            //         users[i].lastName = newUser.lastName;
            //         return true;
            //     }
            // }
            // return false;
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
            // for (var i in users) {
            //     if (users[i]._id === userId) {
            //         users.splice(i, 1);
            //         return true;
            //     }
            var url = "/api/user/" + userId;
            return $http.delete(url);
            }

        }
    }
)();

