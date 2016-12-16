(function() {
    angular
        .module("utility",["ngRoute"])
        .directive("sortable",sortable);


    function sortable() {

        return {
            scope: {},
            link: linker,
            controller: sortableController,
            controllerAs: sortableController
        };
        function linker(scope, element, attributes, WidgetService) {
            var start = -1;
            var end = -1;
            element.sortable(
                {

                    start: function (event, ui) {
                        start = $(ui.item).index();

                    },
                    stop: function (event, ui) {
                        end = $(ui.item).index();
WidgetService.sort(start,end);


                    }

                }
            );
        }
        function sortableController(WidgetService) {
            var vm = this;
            vm.sort = sort;
            function sort(start, end) {
                WidgetService.sort(start, end);
            }
        }

    }
    })();