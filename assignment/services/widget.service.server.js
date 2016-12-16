module.exports = function (app,models) {
    var widgetModel = models.widgetModel;
    app.post("/api/page/:pageId/widget",createWidget);
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);

    function findAllWidgetsForPage(req,res) {
        var id = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(id)
            .then(
                function(widget){res.json(widget);},
                function(error){res.json({});}
            );
    }


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

    function deleteWidget(req,res) {
        var id = req.params.widgetId;
        widgetModel
            .deleteWidget(id)
            .then(
                function(widget){res.json(200);}, function(error){res.json(400);});}

    function createWidget(req,res){
        var id = req.params.pageId;
        var newWidget = req.body;
        widgetModel
            .createWidget(id,newWidget)
            .then(function(widget){res.json(widget._id);}, function(error){res.json({});});}
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
};

