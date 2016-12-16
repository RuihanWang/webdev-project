module.exports = function(app, models)  {
    // var websites = [
    //     { _id: "123", name: "Facebook", developerId: "456", description: "web app 1" },
    //     { _id: "234", name: "Tweeter", developerId: "456", description: "web app 2" },
    //     { _id: "456", name: "Gizmodo", developerId: "456", description: "web app 3" },
    //     { _id: "567", name: "Tic Tac Toe", developerId: "123", description: "web app 4" },
    //     { _id: "678", name: "Checkers", developerId: "123", description: "web app 5" },
    //     { _id: "789", name: "Chess", developerId: "234", description: "web app 6"}
    // ];
    var websiteModel = models.websiteModel;
    var userModel = models.userModel;

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);


//////////////////////////////////////////////website data update related fucntions///////////////////////////////////////
        //
        // function findWebsitesByUser(req, res) {
        //     var userId = req.params.userId;
        //     var result = [];
        //     for (var i in websites) {
        //         if (websites[i].developerId === userId) {
        //             result.push(websites[i]);
        //         }
        //     }
        //     res.send(result);
        // }
        function findAllWebsitesForUser(req, res) {

            var userId = req.params.userId;
            websiteModel
                .findAllWebsitesForUser(userId)
                .then(function(websites) {res.json(websites);}
                );}
            // function findWebsiteById(req, res) {
            //     var websiteId = req.params.websiteId;
            //     for (var i in websites) {
            //         if (websites[i]._id === websiteId) {
            //             res.send(websites[i]);
            //             return;
            //         }
            //     }
            //     res.send({});
            // }
            function findWebsiteById(req, res)
            {
                var websiteId = req.params.websiteId;
                websiteModel
                    .findWebsiteById(websiteId)
                    .then(
                        function(website) {res.json(website);}
                    );

            }

            // function updateWebsite(req, res) {
            //     var websiteId = req.params.websiteId;
            //     var website = req.body;
            //     for (var i in websites) {
            //         if (websites[i]._id === websiteId) {
            //             websites[i].name = website.name;
            //             websites[i].description = website.description;
            //             res.sendStatus(200);
            //             return;
            //         }
            //     }
            //     res.sendStatus(400);
            function updateWebsite(req, res){
                var websiteId = req.params.websiteId;
                var website = req.body;
                websiteModel
                    .updateWebsite(websiteId,website)
                    .then(
                        function(website){res.json(website);},
                        function(error){res.json({});}
                    );

            }
 //////////////////////////////////////////website setting funcitons /////////////////////////////////////////////////////////////
            // function deleteWebsite(req, res) {
            //     var websiteId = req.params.websiteId;
            //     for (var i in websites) {
            //         if (websites[i]._id === websiteId) {
            //             websites.splice(i, 1);
            //             res.sendStatus(200);
            //             return;
            //         }
            //     }
            //     res.sendStatus(400);
            // }



            function deleteWebsite(req, res){
                var websiteId = req.params.websiteId;
                websiteModel
                    .deleteWebsite(websiteId)
                    .then(
                        function(success){res.json(200);},
                        function(error){res.json(400);}
                    );
            }


    // function createWebsite(req, res) {
    //     var newWebsite = req.body;
    //     newWebsite._id = (new Date()).getTime() + "";
    //     websites.push(newWebsite);
    //     res.send(200);
    // }
    //
    function createWebsite(req, res) {
        var userId = req.params.userId;
        var website = req.body;
        websiteModel
            .createWebsite(userId, website)
            .then(
                function(website) {res.json(website);},
                function(error) {res.status(404);}
            );}
        };
