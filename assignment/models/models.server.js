module.exports = function()
{
    var models={
        userModel:require("./user/user.model.server")(),
        movieModel: require("./movie/movie.model.server.js")()


    }
    return models;
};
