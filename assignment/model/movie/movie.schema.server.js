module.exports = function() {
    var mongoose = require("mongoose");
    var movieSchema  = mongoose.Schema({

        imdbID: String,
        title: String,
        Poster: String,
        likes: [String],
        userLikes: [
        {userId: String}
    ]
    }, {collection: 'movie'});




    return  movieSchema;
};

