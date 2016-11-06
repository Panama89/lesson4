(function(angular) {

    'use strict';

var myApp = angular.module('rubricaApp', ['ngRoute'])

/*Configurazione della ng-route */

.config(function ($routeProvider, $locationProvider){
  $routeProvider
    .when('/Home', {
      templateUrl: 'default.html',
    })
    .when('/contact-info/:contact_index', {
      templateUrl: 'contact_info.html',
      controller: 'contactInfoCtrl'
    })
    .when('/Add', {
      templateUrl: 'contact_form.html',
      controller: 'addContactCtrl'
    })
    .when('/edit/:contact_index', {
      templateUrl: 'contact_form.html',
      controller: 'editContactCtrl'
    })
    .otherwise({redirectTo: '/Home'});
})

/* Controllers */

.controller('navCtrl', function ($scope) {
  $scope.nav = {
    navItems: ['Home', 'Add'],
    selectedIndex: 0,
    navClick: function ($index) {
      $scope.nav.selectedIndex = $index;
    }
  };
})


.controller('homeCtrl', function ($scope, ContactService){
  $scope.contacts = ContactService.getContacts();

  $scope.removeContact = function (item) {
    var index = $scope.contacts.indexOf(item);
    $scope.contacts.splice(index, 1);
    $scope.removed = 'Contact successfully removed.';
  };

})

.controller('contactInfoCtrl', function ($scope, $routeParams){
  var index = $routeParams.contact_index;
  $scope.currentContact = $scope.contacts[index];
})

.controller('addContactCtrl', function ($scope, $location) {
 
  $scope.path = $location.path();

  $scope.addContact = function () {
    var contact = $scope.currentContact;
    contact.id = $scope.contacts.length;
    $scope.contacts.push(contact);
  };

})

.controller('editContactCtrl', function ($scope, $routeParams){
  $scope.index = $routeParams.contact_index;
  $scope.currentContact = $scope.contacts[$scope.index];
})

/* Direttiva */
.directive('contact', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'contact.html'
  }
})

/* Servizio */
.factory('ContactService', [function () {
  var factory = {};

  factory.getContacts = function () {
    return contactList;
  }

  /*Contact List con alcuni nomi inseriti*/

  var contactList = [
    {id: 0, name: 'Elisa', email: 'eli@gmail.com', phone: '095222222', url: 'www.google.com', notes: ''},
    {id: 0, name: 'Mariagrazia', email: 'mari@gmail.com', phone: '095777777', url: 'www.google.com', notes: ''},
  ];
  
  return factory;
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