(function(angular) {

    'use strict';
    var vm = angular.module('todoApp', ['ngMaterial'])

   /* Controller per gestire la Sidenav*/

    vm.controller('sideCtrl', SideController);

    function SideController ($scope, $mdSidenav) {
	$scope.showMobileMainHeader = true;
	$scope.openSideNavPanel = function() {
		$mdSidenav('left').open();
	};
	$scope.closeSideNavPanel = function() {
		$mdSidenav('left').close();
	};
    }


    /*Controller per l'orologio */

    vm.controller('clockCtrl', ClockController);

    function ClockController($scope, $timeout) {
    $scope.clock = "loading clock..."; 
    $scope.tickInterval = 1000 

    var tick = function () {
        $scope.clock = Date.now() 
        $timeout(tick, $scope.tickInterval); 
    }

   
    $timeout(tick, $scope.tickInterval);
    }   


    /* Controller per le Info */

    vm.controller('boCtrl', bottomSheetController);

        function bottomSheetController ($scope, $mdBottomSheet) {
           $scope.openBottomSheet = function() {
              $mdBottomSheet.show({
                 template: '<md-bottom-sheet> Authors: <b> <br> Elisa Zappal\à <br> Mariagrazia Di S\ì </b> <br> C.d.LM Ingegneria Informatica <br> Universit\à di Catania </md-bottom-sheet>'
              });
           };
        }   

    /* Controller dei Task */

    vm.controller('TodoController', TodoController);

    function TodoController(storageService, $mdDialog) {
        var vm = this;

        vm.selectedItem = null;
        vm.items = storageService.get() || [];

        vm.notDone = function(item) {
            return item.done == false;
        }

        vm.done = function(item) {
            return item.done == true;
        }

        vm.all = function(item) {
            return true;
        }

        //Delete the current selected item, if any
        vm.deleteItem = function(ev) {

            if (vm.selectedItem != null) {
                var confirm = $mdDialog.confirm()

                .textContent('The task "' + vm.selectedItem.title + '" will be deleted. Are you sure?')
                    .ariaLabel('Delete task')
                    .targetEvent(ev)
                    .ok('Yes')
                    .cancel('No');

                $mdDialog.show(confirm).then(function(result) {
                    if (result) {
                        var index = vm.items.indexOf(vm.selectedItem);
                        if (index != -1) {
                            vm.items.splice(index, 1);
                            storageService.set(vm.items);
                        }
                    }
                });
            }
        }

        //Creates a new item with the given parameters
        vm.createItem = function(title, priority, done, date) {
            vm.items.push({
                title: title,
                done: done || false,
                priority: priority || 0,
                date: date || Date.now()
            });
            storageService.set(vm.items);
        }


        //Add a new task to the items list 
        vm.addTask = function(ev) {
            var confirm = $mdDialog.prompt()
                .title('Add New Task')
                .placeholder('Your task title...')
                .ariaLabel('Your task title...')
                .targetEvent(ev)
                .ok('Add')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function(result) {
                if (result)
                    vm.createItem(result);
            });
        };

    }


})(window.angular);