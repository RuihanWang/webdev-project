(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController",EditWidgetController);

    function EditWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId; vm.websiteId = $routeParams.webId; vm.pageId = $routeParams.pid;
       vm.widgetId = $routeParams.widgetId; vm.deleteWidget = deleteWidget; vm.updateWidget = updateWidget;
        vm.checkitem = false;


        function init(){
            WidgetService.findWidgetById(vm.widgetId)
                .then(function (response) {
                    vm.widget= response.data;

                });

        }
        init();

        function updateWidget() {
            vm.checkitem = true;
            if(vm.widget.name && vm.widget.name != ""){
                WidgetService
                .updateWidget(vm.widgetId, vm.widget)
                .then(
                    function(response) {$location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                        vm.checkitem = false;

                    }, function(error) {vm.error = error.data;
                    }
                )
        }else {vm.error ="name required"}}

        function deleteWidget(widget) {
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(function (response) {
                    var result = response.data;
                    if (result){$location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    }else {vm.error = "Error";
                    }
                });
        }

        function getSafeHtml(widget){
            return $sce.trustAsHtml(widget.text);
        }

    }
})();