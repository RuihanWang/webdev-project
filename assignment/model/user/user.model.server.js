module.exports = function() {
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();

    var UserModel = mongoose.model("UserModel", UserSchema);
    var api = {
        createUser:createUser,
        findUserById:findUserById,
        findUserByUsername:findUserByUsername,
        findUserByCredentials:findUserByCredentials,
        updateUser:updateUser,
        deleteUser:deleteUser,
        findUserByFacebookId: findUserByFacebookId,
        findFavorateForUser:findFavorateForUser




    };
    return api;
    function createUser(user) {
       return  UserModel.create(user);

    }




    function findFavorateForUser(userId) {
        this
            .findUserById(userId).then(function(res) {
            return(res.favorateMovie);
        })
    }

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUserByUsername(username) {
        return UserModel.findOne({username:username});
    }

    function findUserByCredentials(username, password) {
        return UserModel.findOne({username:username,password:password});

    }
    function updateUser(userId, user) {
        return UserModel.update({_id: userId},
            {
                $set: {
                    password:user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone:user.phone,
                    favorateMovie: user.favorateMovie,

                }
            })
    }

    function deleteUser(userId) {
        return UserModel.remove({_id: userId});
    }

};



//
// createUser(user)
// findUserById(userId)
// findUserByUsername(username)
// findUserByCreadentials(username, password)
// updateUser(userId, user)
// deleteUser(userId)
