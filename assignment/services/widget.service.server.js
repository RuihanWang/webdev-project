module.exports = function (app,models) {
    var widgetModel = models.widgetModel;
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    // var upload = multer ({ dest: __dirname+'/project/uploads' });
    app.post("/api/page/:pageId/widget",createWidget);
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.post("/api/upload",upload.single('myFile'),uploadImage);
    ///////////////////////////////////injection////////////////////////////////////////
    // function findMovieByImdbID(req, res) {
    //     var imdbID = req.params.imdbID;
    //
    //     movieModel
    //         .findMovieByImdbID(imdbID)
    //         .then(
    //             function(movie) {
    //                 res.json(movie);
    //             },
    //             function(err) {
    //                 res.status(400).send(err);
    //             }
    //         )
    // }

    //
    // function findUserLikes (req, res) {
    //     var imdbID = req.params.imdbID;
    //     var movie = null;
    //
    //     movieModel
    //         .findMovieByImdbID(imdbID)
    //         .then(
    //             function(doc) {
    //                 movie = doc;
    //                 if (movie) {
    //                     return userModel.findUsersByIds(movie.likes);
    //                 } else {
    //                     res.json([]);
    //                 }
    //             },
    //             function(err) {
    //                 res.status(400).send(err);
    //             }
    //         )
    //         .then(
    //             function(users) {
    //                 res.json(users);
    //             },
    //             function(err) {
    //                 res.status(400).send(err);
    //             }
    //         );
    // }



    // function userUnlikesMovie(req, res) {
    //     var userId = req.params.userId;
    //     var imdbID = req.params.imdbID;
    //
    //     movieModel
    //         .userUnlikesMovie(userId, imdbID)
    //         .then(
    //             function(doc) {
    //                 return userModel.userUnlikesMovie(userId, imdbID);
    //             },
    //             function(err) {
    //                 res.status(400).send(err);
    //             }
    //         )
    //         .then(
    //             function(doc) {
    //                 res.json(200);
    //             },
    //             function(err) {
    //                 res.status(400).send(err);
    //             }
    //         );
    // }


    // (function() {
    //     angular
    //         .module("MovieHubApp")
    //         .factory("MovieService", movieService);d
    //
    //     function movieService($http) {
    //         var service = {
    //             userLikesMovie: userLikesMovie,
    //             findUserLikes: findUserLikes,
    //             findMovieByImdbID: findMovieByImdbID,
    //             userUnlikesMovie: userUnlikesMovie
    //         };
    //
    //         return service;
    //
    //         function findUserLikes(imdbID) {
    //             return $http.get("/api/project/movie/" + imdbID + "/user");
    //         }
    //
    //         function userLikesMovie(userId, movie) {
    //             return $http.post("/api/project/user/" + userId + "/movie/" + movie.imdbID, movie);
    //         }
    //
    //         function findMovieByImdbID(imdbID) {
    //             return $http.get("/api/project/movie/" + imdbID);
    //         }
    //
    //         function userUnlikesMovie(userId, movie) {
    //             return $http.delete("/api/project/user/" + userId + "/movie/" + movie.imdbID);
    //         }
    //     }
    // })();
    //






/////////////////////////////////////////////////widget information retrival functions////////////////////////////////////////

    // function findAllWidgetsForPage(req, res) {
    //     var pageId = req.params.pageId;
    //     var result = [];
    //     for(var i in widgets) {
    //         if(widgets[i].pageId === pageId) {
    //             result.push(widgets[i]);
    //         }
    //     }
    //     res.json(result);
    // }
    //

    function findAllWidgetsForPage(req,res) {
        var id = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(id)
            .then(
                function(widget){res.json(widget);},
                function(error){res.json({});}
            );
    }

    // function findWidgetById(req, res) {
    //     var widgetId = req.params.widgetId;
    //     for(var i in widgets) {
    //         if(widgets[i]._id === widgetId) {
    //             res.send(widgets[i]);
    //             return;
    //         }
    //     }
    //     res.send({});
    // }
    //

    function findWidgetById(req,res) {
        var id = req.params.widgetId;
        widgetModel
            .findWidgetById(id)
            .then(
                function(widget){res.json(widget);}, function(error){res.json({});}
            );}
    function updateWidget(req,res) {
        var id = req.params.widgetId;
        var widget = req.body;
        widgetModel
            .updateWidget(id,widget)
            .then(
                function(widget){res.json(widget);}, function(error){res.json({});}
            );}
 /////////////////////////////////////////////////////widget setting functions/////////////////////////////////////////////////////
    // function deleteWidget(req, res) {
    //     var widgetId = req.params.widgetId;
    //     for(var i in widgets) {
    //         if (widgets[i]._id === widgetId) {
    //             widgets.splice(i, 1);
    //             res.send(200);
    //             return;
    //         }
    //     }
    //     res.send(400);
    // }
    function deleteWidget(req,res) {
        var id = req.params.widgetId;
        widgetModel
            .deleteWidget(id)
            .then(
                function(widget){res.json(200);}, function(error){res.json(400);});}

    // function createWidget(req, res) {
    //     var newWidget = req.body;
    //     newWidget._id = (new Date()).getTime() + "";
    //     widgets.push(newWidget);
    //     res.status(200).send(newWidget._id);
    // }
    //

    function createWidget(req,res){
        var id = req.params.pageId;
        var newWidget = req.body;
        widgetModel
            .createWidget(id,newWidget)
            .then(function(widget){res.json(widget._id);}, function(error){res.json({});});}
//////////////////////////////////////UPLOAD//UPLOAD//UPLOAD//UPLOAD////UPLOAD///UPLOAD///UPLOAD///UPLOAD/////////////////////////////////////////
    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;var websiteId = req.body.websiteId;var pageId = req.body.pageId;
        var userId   = req.body.userId;var width = req.body.width; var myFile = req.file;
        if(myFile) {
            var originalname = myFile.originalname;var filename = myFile.filename;var path = myFile.path;
            var destination = myFile.destination;var size = myFile.size;var mimetype = myFile.mimetype;
            widgetModel
                .findWidgetById(widgetId)
                .then(function(widget) {widget.url = "/uploads/" + filename;
                        return widgetModel
                            .updateWidget(widgetId, widget)},
                    function(error) {res.status(404).send(error);}
                ).then(
                function(widget) {res.redirect("/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);},
                function(error) {res.status(404).send("Unable to update widget with ID " + widgetId);})
        }else{ res.redirect("/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
            return;}}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
};

