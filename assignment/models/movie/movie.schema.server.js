module.exports = function() {
    var mongoose = require("mongoose");

    var MovieSchema = mongoose.Schema(
        {
            imdbID: String,
            title: String,
            Poster: String,
            likes: [String],
            userLikes: [
                {username: String}
            ]
        }, {collection: 'assignment.movie'});

    return MovieSchema;
};
