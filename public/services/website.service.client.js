(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",WebsiteService);
    function WebsiteService($http){

        var api = {
            findWebsitesByUser : findWebsitesByUser,
            createWebsite : createWebsite,
            findWebsiteById : findWebsiteById,
            updateWebsite : updateWebsite,
            deleteWebsite : deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            return $http.post("/api/user/" + userId + "/website", website);
        }

        function findWebsitesByUser(userId){
            var websites = $http.get("/api/user/"+userId+"/website");
            return websites;
        }


        function findWebsiteById(websiteId){
            var website = $http.get("/api/website/"+websiteId);
            return website;

        }


        function updateWebsite(websiteId,website){

            var website = $http.put("/api/website/"+websiteId,website);
            return website;

        }


        function deleteWebsite(websiteId){

            var result = $http.delete("/api/website/"+websiteId);
            return result;
        }
    }

})();
