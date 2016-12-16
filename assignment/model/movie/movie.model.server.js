module.exports = function() {
    var mongoose = require("mongoose");
    var MovieSchema = require("./movie.schema.server")();

    var movieModel = mongoose.model("movieModel", MovieSchema);



    //     imdbID: String,
    //     title: String,
    //     Poster: String,
    //     likes: [String],
    //     userLikes: [
    //     {userId: String}
    var api = {
        createMovie:createMovie,
        findMovieById:findMovieById,
        findMovieByName:findMovieByName,//get all the movies on the same name;
        movieLiked:movieLiked,
        findMovieByIMDBId:findMovieByIMDBId,





    };
    return api;



    function createMovie(movie){
       return  movieModel.create(movie);
    }

    function findMovieById (movieId) {
        return movieModel.findOne({_id:movieId});
    }

    function findMovieByName (movieName) {
        return movieModel.find({title:movieName});
    }

    //update the movie liked by
    function movieLiked(userId, movieId) {
        var movie = null;
        var users = null;
        this
            .findMovieByIMDBId(movieId)
            .then(function(res) {
                movie = res;
            });
        if(movie.userLikes == null) {
            users = [];
            users.push(userId);
        } else{
            users.push(userId);
        }
        return movieModel.update({_id:movie._id},{


            $set:{
                userLikes:users,
            }
            })
    }


    function findMovieByIMDBId (IMDBId) {
        return movieMOdel.find({imdbID:IMDBId});
    }
};


