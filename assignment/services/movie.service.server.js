
module.exports = function(app, model) {
    var movies = model.MovieModel;
    var omdb = require('omdb');



    app.get("/api/movie/:mid",findMovieById);//req mid:imdbId
    app.post("/api/movie", createMovie);//req movie
    app.delete("/api/movie/:mid",deleteMovie);//req mid:imdbId
    app.put("/api/user/:uid/movie/:mid",updateMovie);//req uid:userId mid:movieId. mainly update userLikes;
    app.get("/api/search",searchMovie);//query title
    function searchMovie(req,res) {
    var title =  req.query.title;
        omdb.search(title, function(err, movies) {
            if(err) {
                return console.error(err);
            }

            if(movies.length < 1) {
                return console.log('No movies were found!');
            }
            console.log(movies);
            res.send(movies);
    });
    }

    function createMovie(req, res) {
        var movie = req.body;

        movies
            .createMovie(movie)
            .then(
                function(movie) {
                    res.send(movie);
                },
                function(error){
                    res.send(error);
                }
            );

    }

    function findMovieById(req,res) {
        var movieId = req.params.mid;
        movies
            .findOne(movieId)
            .then(function(movie) {
                res.send(movie);
            })


    }


    function updateMovie(req, res) {
        var userId = req.params.uid;
        var movieId = req.params.mid;
        movies
            .findMovieById(movieId)
            .then(function(movie) {
                var mov = movie;
                var favorateUser = [];
                if(move.userLikes == null) {
                    favorateUser.push(userId) ;
                }else{
                    favorateUser = mov.userLikes;
                    favorateUser.push(userId);
                    mov.userLikes = favorateUser;
                }
                movies
                    .movieLiked(userId,movieId)
                    .then(function(movie){
                        res.send(movie);
                    });

            })



    }



    function deleteMovie(req,res) {
        var movieId = req.params.mid;
        movies
            .delete()



    }
};