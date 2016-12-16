
module.exports = function(app, model) {
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var users = model.UserModel;
    var passport         = require('passport');
    var FacebookStrategy = require('passport-facebook').Strategy;
    app.post("/api/user", createUser);
    app.get("/api/user/:uid",findUserById);
    app.put("/api/user/:uid",updateUser);
    app.get("/api/login",findUserByCredentials);
    app.post  ('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get ('/api/loggedin', loggedin);
    app.post ('/api/register', register);
    app.get("/api/user", getUsers);
    app.get("/api/movie/alluser", findAllUsers);
    app.get("/auth/google", passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/#/user',
            failureRedirect: '/#/login'
        }));
    app.post("/api/movie/admin/create", createUserFromAdmin);

    app.delete("/api/user/:uid", authorized, deleteUser);
    app.post("/api/movie/user/:userId/follow/:username", followUser);
    app.delete("/api/movie/user/:userId/unfollow/:username", unfollowUser);
    app.get("/api/ppage/:userId", ppage);





    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use('local',new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));



    var facebookConfig = {
        clientID     : "227197854374889",
        clientSecret : "074b94a903c8b2f1a347330de35f5001",
        callbackURL  : "http://localhost:3000/auth/facebook/callback"
    };


    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }




    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }
    function login(req, res) {
        var user = req.user;
        res.json(user);
    }
    function serializeUser(user, done) {
        done(null, user);
    }
    function register (req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                }
            );
    }




    function localStrategy(username, password, done) {
        users
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user.username === username && user.password === password) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }


    function deserializeUser(user, done) {
        users
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function findUserById(req, res) {
        users
            .findUserById(req.params.uid)
            .then(function (user) {

                res.send(user);
            },
            function(error) {
                res.sendStatus(400).send(error);
            });
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
            users
                .findUserByCredentials(username, password)
                .then(function(user) {
                    if(user) {
                        res.send(user);
                    }else {
                        res.send('0');
                    }
                },
                        function(error){
                        res.sendStatus(400).send(error);
                        })
    }
    function findUserByUsername(req, res) {
     var username = req.params.username;
        users
            .findUserByUsername(username)
            .then(function(user) {
                    if(user){
                        res.sendStatus(400).send("Already exist");

                    }else {
                        res.send('0');
                    }


            },
            function(error) {
                        res.send(error);
            })
    }






    function deleteUser(req, res) {

        var userId = req.params.uid;
        users
            .deleteUser(userId)
            .then(function(status) {res.sendStatus(200);},
                function(error) {res.status(404);}
            );



    }
    function updateUser(req, res) {
        var userId = req.params.uid;
        var user = req.body;
users
    .updateUser(userId, user)
    .then(
        function (user) {
            res.send(user);
        },
        function (error) {
            res.send(error);
        }
    )

    }


    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        userModel
            .findUserByUsername(username)
            .then(function(user) {if(user) {res.status(400).send("Username already exists");}
                else {req.body.password = bcrypt.hashSync(password);
                    return userModel
                        .createUser(req.body);}},
                function(error) {
                    res.status(400).send(error);
                }
            )
            .then(
                function(user) {
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(error) {
                    res.status(400).send(error);
                }
            )
    }


    function createUser(req, res) {
        var newUser = req.body;
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user) {
                    if(!user) {
                        userModel
                            .createUser(newUser)
                            .then(
                                function(user) {res.json(user);},
                                function(error) {res.status(400);});}
                    else {res.status(400);}},
                function(error) {res.status(400).send(error);}
            )
    }





    function findAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(
                function(users) {
                    res.json(users);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
    function getUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findUserByCredentials(username, password, req, res);
        }
        else if (username) {
            findUserByUsername(username, req, res);
        }
        else {
            res.status(403).send("error");
        }
    }

    function findUserByCredentials(username, password, req, res) {
        req.session.username = username;
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user) {
                        res.json(user);
                    } else {res.status(403).send("error");}
                },
                function(error) {
                    res.status(403).send("error");
                }
            );
    }




    function followUser(req, res) {
        var userId = req.params.userId;
        var followedUsername = req.params.username;
        userModel
            .following(userId, followedUsername)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function unfollowUser(req, res) {
        var userId = req.params.userId;
        var unfollowedUsername = req.params.username;
        userModel
            .removeFollowing(userId, unfollowedUsername)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }


    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        }
        else {next();}}

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user) {done(null, user);},
                function(err) {done(err, null);});}



    function createUserFromAdmin(req, res) {
        // var user = req.body;
        var password = req.body.password;
        req.body.password = bcrypt.hashSync(password);
        userModel
            .createUserFromAdmin(req.body)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(function (googleUser) {
                if (googleUser) {
                    return done(null, googleUser);
                } else {
                    googleUser = {
                        "username": profile.displayName.replace(/ /g, ''),
                        "google" : {
                            "id": profile.id,
                            "token": token,
                        }
                    };
                    userModel
                        .createUser(googleUser)
                        .then(function (user) {
                            done(null, user);
                        });
                }
            });
    }

    function ppage(req, res) {
        var userId = req.params.userId;
        var user = null;

        userModel
            .findUserById(userId)
            .then(
                function(doc) {
                    user = doc;
                    return movieModel.findMoviesByImdbIDs(user.likes);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(movies) {
                    user.userlikes = movies;
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if (user) {
                        return done(null, user);
                    }
                    else {var newUser = {username: profile.displayName.replace(/ /g, '').toLowerCase(),
                        facebook: {id: profile.id, token: token, displayName: profile.displayName
                        }
                    };
                        userModel
                            .createUser(newUser)
                            .then(function(user) {return done(null, user);
                                }
                            )
                    }
                }
            );

    }

};






module.exports = function(app, models) {
    var userModel = models.userModel;
    var movieModel = models.movieModel;
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var bcrypt = require("bcrypt-nodejs");

    var facebookConfig = {

        clientID     : "227197854374889",
        clientSecret : "074b94a903c8b2f1a347330de35f5001",
        callbackURL  : "https://localhost:3000/auth/facebook/callback"

    };
    app.get("/api/user", getUsers);
    app.post("/api/login", passport.authenticate('wam'), login);
    app.get("/api/movie/alluser", findAllUsers);
    app.get("/auth/google", passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/#/user',
            failureRedirect: '/#/login'
        }));
    app.post("/api/register", register);
    app.post("/api/movie/admin/create", createUserFromAdmin);
    app.post('/api/logout', logout);
    app.get ('/api/loggedin', loggedin);
    app.post("/api/user", createUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", authorized, deleteUser);
    app.post("/api/movie/user/:userId/follow/:username", followUser);
    app.delete("/api/movie/user/:userId/unfollow/:username", unfollowUser);
    app.get("/api/ppage/:userId", ppage);


    passport.use('wam', new LocalStrategy(localStrategy));
    // passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);





};