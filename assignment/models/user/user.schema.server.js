module.exports = function() {
    var mongoose = require("mongoose");
    var MovieSchema = require("../movie/movie.schema.server.js")(mongoose);


    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        movielike: String,
        dateCreate: {type: Date, default: Date.now()},
        dateUpdated: Date,
        google: {
            id:     String,
            token:  String,

        },
        role: {type:String, enum:["ADMIN","USER"], default:"USER"},

        follows: [String],
        likes: [String],
        userlikes: [MovieSchema],
    }, {collection: "user"});

    return UserSchema;
};