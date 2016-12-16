var q = require("q");

module.exports = function() {
    // load movie schema from movie model
    var mongoose = require("mongoose");
    var MovieSchema = require("./movie.schema.server.js")(mongoose);

    // create movie from schema
    var MovieModel  = mongoose.model("Movie", MovieSchema);

    var api = {
        findMovieByImdbID: findMovieByImdbID,
        findMoviesByImdbIDs: findMoviesByImdbIDs,
        createMovie: createMovie,
        userLikesMovie: userLikesMovie,
        userUnlikesMovie: userUnlikesMovie
    };
    return api;

    function userLikesMovie (userId, movie) {
        var deferred = q.defer();

        MovieModel
            .findOne(
                {imdbID: movie.imdbID},
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    }
                    if (doc) {
                        if (doc.likes.indexOf(userId) < 0) {
                            doc.likes.push(userId);
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
                    } else {
                        movie = new MovieModel({
                            imdbID: movie.imdbID,
                            title: movie.Title,
                            poster: movie.Poster,
                            likes: []
                        });
                        movie.likes.push(userId);
                        movie.save(
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
            );

        return deferred.promise;
    }

    function findMoviesByImdbIDs (imdbIDs) {
        // var deferred = q.defer();
        //
        // MovieModel.find(
        //     {imdbID: {$in: imdbIDs}},
        //     function (err, movies) {
        //         if (err) {
        //             deferred.reject(err);
        //         } else {
        //             deferred.resolve(movies);
        //         }
        //     }
        // );
        //
        // return deferred.promise;
        return MovieModel.find({imdbID: {$in: imdbIDs}});
    }

    function createMovie(movie) {
        var deferred = q.defer();

        MovieModel
            .create(
                movie,
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

    function findMovieByImdbID(imdbID) {
        var deferred = q.defer();

        MovieModel
            .findOne(
                {imdbID: imdbID},
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

    function userUnlikesMovie(userId, imdbID) {
        var deferred = q.defer();

        MovieModel
            .findOne(
                {imdbID: imdbID},
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    }
                    if (doc) {
                        var index = doc.likes.indexOf(userId);
                        if (index > -1) {
                            doc.likes.splice(index, 1);
                            // save the change
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
                    } else {
                        // do nothing here
                    }
                }
            );

        return deferred.promise;
    }


};