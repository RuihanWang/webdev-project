module.exports = function() {
    var  mongoose = require("mongoose");
    mongoose.connect('mongodb://localhost/webdev');

    var UserModel = require("./user/user.model.server")();
    var MovieModel = require("./movie/movie.model.server")();




    var model = {
        UserModel :UserModel,
        MovieModel:MovieModel

    };

    return model;
};