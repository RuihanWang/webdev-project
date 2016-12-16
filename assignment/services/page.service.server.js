module.exports = function(app, models) {
    var pageModel = models.pageModel;
    var websiteModel = models.websiteModel;
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);
/////////////////////////////////////////////////////////////////////PAGE SETTING FUCTIONS///////////////////////////////
    function createPage(req, res) {
        var id = req.params.websiteId;
        var newPage = req.body;
        pageModel
            .createPage(id,newPage)
            .then(
                function(page){res.json(page);},
                function(error){res.json({});}
            );}

    // function deletePage(req, res) {
    //     var pageId = req.params.pageId;
    //     pageModel
    //         .deletePage(pageId)
    //         .then(
    //             function(success){
    //                 res.json(200);
    //             },
    //             function(error){
    //                 res.json(400);
    //             }
    //         );
    //
    // }
/////////////////////////////////////////////////////////////PAGE UPDATE///////////////////////////////////////////////////////////

    // function findAllPagesForWebsite(req, res) {
    //     var websiteId = req.params.websiteId;
    //     var resultSet = [];
    //     for (var i in pages) {
    //         if (pages[i].websiteId === websiteId) {
    //             resultSet.push(pages[i]);
    //         }
    //     }
    //     res.send(resultSet);
    // }
    function findAllPagesForWebsite(req, res) {
        var id = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(id)
            .then(
                function(pages){
                    res.json(pages);
                },
                function(error){
                    res.json({});
                }
            );
    }
    //
    //
    // function findPageById(req, res) {
    //     var pageId = req.params.pageId;
    //     for(var i in pages) {
    //         if(pages[i]._id === pageId) {
    //             res.json(pages[i]);
    //             return;
    //         }
    //     }
    //     res.status(400);
    // }
    function findPageById(req,res) {
        var pageId = req.params.pageId;

        pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.json({});
                }
            );
    }
    // function updatePage(req,res){
    //     var pageId=req.params._id;
    //     var page =req.body;
    //     for(var i in pages) {
    //         if(pages[i]._id === pageId){
    //             pages[i].name = page.name;
    //             pages[i].title = page.title;
    //             res.send(200);
    //             return
    //         }
    //     }
    //     res.send(400);
    function updatePage(req,res){
        var pageId = req.params.pageId;
        var page = req.body;
        pageModel
            .updatePage(pageId,page)
            .then(
                function(page){res.json(page);},
                function(error){res.json({});});}


    function deletePage(req, res) {
        // var pageId=req.params.pageId;
        var pageId = req.params.pageId;
        pageModel
            .deletePage(pageId)
            .then(
                function(success){res.json(200);},
                function(error){res.json(400);}
            );

    }


};