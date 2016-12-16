module.exports = function(app, models) {
    var movieModel = models.movieModel;
    var userModel = models.userModel;
    var omdb = require('omdb');


    app.post("/api/project/user/:userId/movie/:imdbID", userLikesMovie);
    app.get("/api/project/movie/:imdbID/user", findUserLikes);
    app.get("/api/project/movie/:imdbID", findMovieByImdbID);
    app.delete("/api/project/user/:userId/movie/:imdbID", userUnlikesMovie);
    app.get("/api/search",searchMovie);


    function searchMovie(req,res) {
        var imdb = req.query.imdbID;
        var title = req.query.title;
        var sea;
        if(title) sea = title;
        if(imdb) sea = imdb;
        omdb.search(sea, function(err, movies) {
            if(err) {
                res.send(err);
            }

            if(movies.length < 1) {
                res.send ('No movies were found!');
            }
            console.log(movies)
            res.send(movies);

            });

        }


    function findMovieByImdbID(req, res) {
        var imdbID = req.params.imdbID;

        movieModel
            .findMovieByImdbID(imdbID)
            .then(
                function(movie) {
                    res.json(movie);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    }


    function findUserLikes (req, res) {
        var imdbID = req.params.imdbID;
        var movie = null;

        movieModel
            .findMovieByImdbID(imdbID)
            .then(
                function(doc) {
                    movie = doc;
                    if (movie) {
                        return userModel.findUsersByIds(movie.likes);
                    } else {
                        res.json([]);
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(users) {
                    res.json(users);
                },
                function(err) {
                    res.status(401).send(err);
                }
            );
    }



    function userLikesMovie(req, res) {
        var movieOmdb  = req.body;
        var userId = req.params.userId;
        movieModel
            .userLikesMovie(userId, movieOmdb)
            .then(
                function(movie) {
                    return userModel.likeMovie(userId, movie)
                },
                function(err) {
                    res.status(401).send(err);
                }
            )
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(405).send(err);
                }
            );
    }

    function userUnlikesMovie(req, res) {
        var userId = req.params.userId;
        var imdbID = req.params.imdbID;

        movieModel
            .userUnlikesMovie(userId, imdbID)
            .then(
                function(doc) {
                    return userModel.undoLikeMovie(userId, imdbID);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(doc) {
                    res.json(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

};