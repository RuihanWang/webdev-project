module.exports = function() {
    var mongoose = require("mongoose");
    var userSchema  = mongoose.Schema({

        username: {type:String, return: true},
        password: {type:String, return: true},
        firstName: String,
        lastName: String,
        email:String,
        phone:String,
        dateCreated:{type:Date, default: Date.now() },
        friend:[String],

        favorateMovie:[{type:String}],
        userType:{type: String, enum:['ADMIN','USER'],default:'USER'}


        }, {collection: "user"});
    return  userSchema;
};





