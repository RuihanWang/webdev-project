module.exports = function(app) {
    var model = require("./model/model.server")();
    require("./services/user.service.server.js")(app,model);
    require("./services/movie.service.server.js")(app,model);


};