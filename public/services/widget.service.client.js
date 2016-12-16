(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    // var widgets = [
    //     { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
    //     { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
    //         "url": "http://lorempixel.com/400/200/"},
    //     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    //     { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
    //         "url": "https://youtu.be/AM2Ivdi9c4E" },
    //     { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    // ];

    function WidgetService($http){
        var api = {
            createWidget : createWidget,
            // userLikesMovie: userLikesMovie,
            findWidgetsByPageId : findWidgetsByPageId,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget
            // reorderWidget:reorderWidget

        };

        return api;

        // function createWidget(pageId, widget){
        //     var url = "/api/page/"+pageId+"/widget"; return $http.post(url,widget);
        // // }
        // function userLikesMovie(userId, movie) {
        //     return $http.post("/api/user/" + userId + "/page/"+ pageId + "/movie/" + movie.imdbID, movie);
        // }


        function createWidget(pageId, newWidget) {
            return $http.post("/api/page/" + pageId + "/widget", newWidget);
        }
        // function reorderWidget(pageId,start, end) {
        //     // var pageId =
        //     console.log(start);
        //     console.log(end);
        //     return $http.put("/page/"+pageId+"/widget?start="+start+"&end="+end);
        // }
    
        function findWidgetsByPageId(pageId){
            var url = "/api/page/"+pageId+"/widget";
            return $http.get(url);
        }

        function findWidgetById(widgetId){
            var url = "/api/widget/"+widgetId;
            return $http.get(url);
        }

        function updateWidget(widgetId, widget){
            var url = "/api/widget/"+widgetId;
            return $http.put(url,widget);
        }

        function deleteWidget(widgetId){
            var url = "/api/widget/"+widgetId;
            return $http.delete(url);
        }
    }
})();
