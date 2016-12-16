(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController ($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.pageId = $routeParams.pid;
        vm.userId = $routeParams.userId;
        vm.webId = $routeParams.webId;

        vm.getSafeHtml = function getSafeHtml(webId) {
            return $sce.trustAsHtml(webId.text);
        };

        vm.getSafeUrl = function getSafeUrl(webId) {
            var urlParts = webId.url.split("/");
            var id = urlParts[urlParts.length-1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }
               
               
        // function reorderWidget(start,end){
        //     console.log(start+" "+end);
        //     WidgetService
        //         .reorderWidget(vm.pageId,start,end)
        //         .then(
        //             function(response){init();
        //             },
        //             function(response){
        //                 vm.error = "Unable to reorder widgets";
        //             });
        // }

        function init(){
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(function (response) {
                    vm.widgets = response.data;
                    $(".container").sortable({axis: "y"});
                });
        }
        init();


    }

})();
