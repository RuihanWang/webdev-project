(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    // var pages = [
    //     { _id: "321", name: "Post 1", websiteId: "456", title: "title for Post 1" },
    //     { _id: "432", name: "Post 2", websiteId: "456", title: "title for Post 2" },
    //     { _id: "543", name: "Post 3", websiteId: "456", title: "title for Post 3"}
    // ];

    function PageService($http) {

        var api = {

            findPageByWebsiteId : findPageByWebsiteId,
            findPageById : findPageById,
            updatePage : updatePage,
            deletePage : deletePage,
            createPage : createPage,

        };
        return api;


        function findPageById(pageId) {
            return $http.get("/api/page/" + pageId);
        }


        function updatePage(pageId, page) {
            // for (var i in pages) {
            //     if (pages[i]._id === pageId) {
            //         pages[i].name = page.name;
            //         pages[i].title = page.title;
            //         return true;
            //     }
            // }
            // return false;
            var url = "/api/page/" + pageId;
            return $http.put(url, page);
        }

        function deletePage(pageId) {
            return $http.delete("/api/page/" + pageId);
        }



        function createPage(websiteId, page) {
            return $http.post("/api/website/" + websiteId + "/page", page);
        }

        function findPageByWebsiteId(websiteId) {
            // var pageresult = [];
            // for (var i in pages) {
            //     if (pages[i].websiteId === websiteId) {
            //         pageresult.push(pages[i]);
            //     }
            // }
            // return pageresult;
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url);
        }
    }
})();

