(function(angular) {

    'use strict';

angular.module('NoteApp', [])

    /*Servizio */

    .service('notesService', function () {
        var data = [
            {id:1, title:'Appuntamento dentista ore 16:00 martedì 20/11'},
            
           
        ];

        return {
            notes:function () {
                return data;
            },
            addNote:function (noteTitle) {
                var currentIndex = data.length + 1;
                data.push({
                    id:currentIndex, title:noteTitle
                });
            },
            deleteNote:function (id) {
                var oldNotes = data;
                data = [];

                angular.forEach(oldNotes, function (note) {
                    if (note.id !== id) data.push(note);
                });
            }
        };
    })
    
    /*Direttive*/

    .directive('myNotebook', function () {
        return {
            restrict:"E",
            scope:{
                notes:'=',
                ondelete:'&'
            },
            templateUrl:"partials/notebook-directive.html",
            controller:function ($scope, $attrs) {
                $scope.deleteNote = function (id) {
                    $scope.ondelete({id:id});
                }
            }
        };
    })
    .directive('myNote', function () {
        return {
            restrict:'E',
            scope:{
                delete:'&',
                note:'='
            },
            link:function (scope, element, attrs) {
                var $el = $(element);

                $el.hide().fadeIn('slow');

                $('.thumbnails').sortable({
                    placeholder:"ui-state-highlight", forcePlaceholderSize:true
                });
            }
        };
    })

    /*Controller per aggiungere/eliminare note */

    .controller('NotebookCtrl', ['$scope', 'notesService', function ($scope, notesService) {
        $scope.getNotes = function () {
            return notesService.notes();
        };
    
        $scope.addNote = function (noteTitle) {
            if(noteTitle != '') {
                notesService.addNote(noteTitle);
            }
        };
    
        $scope.deleteNote = function (id) {
            notesService.deleteNote(id);
        };
        
        $scope.resetForm = function() {
            $scope.noteTitle = '';            
        };
    }])

    /*Controller per visualizzare l'orologio */

    .controller('clockCtrl', ClockController);

    function ClockController($scope, $timeout) {
    $scope.clock = "loading clock..."; 
    $scope.tickInterval = 1000 

    var tick = function () {
        $scope.clock = Date.now() 
        $timeout(tick, $scope.tickInterval); 
    }

    
    $timeout(tick, $scope.tickInterval);
}

})(window.angular);