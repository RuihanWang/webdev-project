
module.exports = function(app, model) {
    var movies = model.MovieModel;
    var omdb = require('omdb');


    app.get("/api/user/:uid/movie", findMovieForUser);
    app.get("/api/user/:uid/movie/:wid",findMovieById);
    app.post("/api/user/:uid/movie", createMovie);
    app.delete("/api/user/:uid/movie/:wid",deleteMovie);
    app.put("/api/user/:uid/movie/:wid",updateMovie);
    app.get("/api/search",searchMovie);
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
                function(website) {
                    res.send(website);
                },
                function(error){
                    res.send(error);
                }
            );

    }

    function findMovieForUser(req, res) {

        var userId = req.params.uId;
        movies


    }
    function findMovieById(req,res) {
        movies


    }


    function updateMovie(req, res) {
        var userId = req.params.uid;
        var website = req.body;
        movies



    }



    function deleteMovie(req,res) {
        var websiteId = req.params.wId;
        movies



    }
};