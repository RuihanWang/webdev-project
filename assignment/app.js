module.exports = function(app) {

    var models = require("./models/models.server")();
    require("./services/user.service.server.js")(app, models);
    require("./services/movie.service.server.js")(app, models);


    app.get("/users/:id", function(req,res){
        var id = req.params.id;
        for(var i in users){
            if(users[i]._id === id){
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    });
};
