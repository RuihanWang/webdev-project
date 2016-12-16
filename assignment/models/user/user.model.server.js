

var q = require("q");

module.exports = function() {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("User", UserSchema);
    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUser: findUserByUser,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUsersByIds: findUsersByIds,
        userLikesMovie: userLikesMovie,
        likeMovie: likeMovie,
        undoLikeMovie: undoLikeMovie,
        followUser: followUser,
        unfollowUser: unfollowUser,
        following: following,
        findAllUsers: findAllUsers,
        removeFollowing: removeFollowing,
        createUserFromAdmin: createUserFromAdmin

    };
    return api;


    function likeMovie(userId, movie) {
        return User.update({_id: userId}, {$addToSet: {likes: movie.imdbID}});
    }


    function undoLikeMovie(userId, movieId) {
        return User.update({_id: userId}, {$pullAll: {likes: [movieId]}});
    }

    function userLikesMovie(userId, movie) {
        var deferred = q.defer();
        User
            .findById(
                userId,
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        // check if there are no duplicate imdbID
                        if (doc.likes.indexOf(movie.imdbID) < 0) {
                            // add movie id to user likes
                            doc.likes.push(movie.imdbID);
                            // save docs
                            doc.save(
                                function (err, doc) {
                                    if (err) {
                                        deferred.reject(err);
                                    } else {
                                        deferred.resolve(doc);
                                    }
                                }
                            );
                        }
                    }
                }
            );

        return deferred.promise;
    }



    function findUsersByIds (userIds) {
        return User.find({_id: {$in: userIds}});
    }



    function createUser(user) {
        //creat a new user
        return User.create(user);
    }
    function deleteUser(userId) {
        //delete the particular user
        return User.remove({_id: userId});
    }

    function findUserById(userId) {

        return User.findById(userId);
    }
    
    function findUserByUser(username, password) {

        return User.findOne({username: username, password: password});
    }
    
    function findUserByUsername(username) {
        return User.findOne({username: username});
    }
    
    function updateUser(userId, nuser) {

        return User.update({_id: userId},
            {$set :
                {
                    firstName: nuser.firstName, lastName: nuser.lastName, email: nuser.email
                }
            })
    }

    function createUserFromAdmin(user) {
        var deferred = q.defer();

        User
            .create(
                user,
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            );

        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();

        User
            .find(
                {},
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            );

        return deferred.promise;
    }

    function followUser(userId, followedUsername) {
        var deferred = q.defer();

        UserModel
            .findById(
                {_id: userId},
                function (err, doc) {
                    if (err) {
                        deferred.reject(err)
                    } else {
                        if (doc.follows.indexOf(followedUsername) < 0) {
                            doc.follows.push(followedUsername);
                            doc.save(
                                function(err, doc) {
                                    if (err) {
                                        deferred.reject(err);
                                    } else {
                                        deferred.resolve(doc);
                                    }
                                }
                            );
                        }
                    }
                }
            );

        return deferred.promise;
    }

    function following(userId, followedUsername) {
        return User.update({_id: userId}, {$addToSet: {follows: followedUsername}});
    }



    function removeFollowing(userId, unfollowedUsername) {
        return User.update({_id: userId}, {$pullAll: {follows: [unfollowedUsername]}});
    }


    function unfollowUser(userId, unfollowedUsername) {
        var deferred = q.defer();

        UserModel
            .findById(
                userId,
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        var index = doc.follows.indexOf(unfollowedUsername);
                        // found the user that we want to unfollow
                        if (index > -1) {
                            // remove from the array
                            doc.follows.splice(index, 1);
                            // save doc
                            doc.save(
                                function(err, doc) {
                                    if (err) {
                                        deferred.reject(err);
                                    } else {
                                        deferred.resolve(doc);
                                    }
                                }
                            );
                        }
                    }
                }
            );

        return deferred.promise;
    }

};