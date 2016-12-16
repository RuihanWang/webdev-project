

module.exports = function(app, model) {
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var users = model.UserModel;
    var FacebookStrategy = require('passport-facebook').Strategy;
    app.get("/api/user",findUser);
    app.get("/api/user/:uid",findUserById);
    app.post("/api/user",createUser);
    app.put("/api/user/:uid",updateUser);
    app.delete("/api/user/:uid",deleteUser);
    app.get("/api/login",findUserByCredentials);
    app.post  ('/api/login', passport.authenticate('wam'), login);
    app.post('/api/logout', logout);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get ('/api/loggedin', loggedin);
    app.post ('/api/register', register);
    app.put('/api/user/:uid/movie/:mid',addToFavorate);



    var facebookConfig = {
        clientID: "227197854374889",
        clientSecret: "074b94a903c8b2f1a347330de35f5001",
        callbackURL: "https://localhost:3000/auth/facebook/callback"
    }

function addToFavorate (req,res) {
    var userId = req.params.uid;
    var movie = req.body;
    users
        .findUserById(userId)
        .then(function (user) {
            return user;
        })
        .then(function(user) {
            var favorateMovie = [];
            if(user.favorateMovie == null) {
                favorateMovie.push(movie.imdbID) ;
            }else{
                favorateMovie = user.favorateMovie;
                favorateMovie.push(movie.imdbID);
                user.favorateMovie = favorateMovie;
            }
           users
               .updateUser(userId,user)
               .then(function(user){
                   res.send(user);
               });
        });

}
    function createUser(req, res) {
        var user = req.body;
        users
            .createUser(user)
            .then(function(user) {
                console.log(user);
                res.sendStatus(200).send(user);
            });

    }

    function facebookStrategy(token, refreshToken, profile, done) {
        users
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
                        return users.createUser(newGoogleUser);
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




    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use('wam',new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

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
        var userId = req.params.uid;
        users
            .findUserById(userId)
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
    function findUser(req, res) {




    }


//     function findUserById(req, res) {
//         var id = req.params.uid;
//         console.log("id" +id);
//         var user = null;
//         for(u in users) {
//
//             user = users[u];
// console.log("user" +user._id+"id"+ id );
//            console.log("isorno" + user._id == id);
//             if(user._id == id){
//                 res.send(user);
//                 console.log(user);
//                 return;
//             }
//         }
//         res.send('0');
//         return;
//
//     }






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

};