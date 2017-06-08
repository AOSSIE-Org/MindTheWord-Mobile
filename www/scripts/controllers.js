'use strict';

var baseUrl = 'http://139.59.23.184:8001';


angular.module('mtwApp')

.controller('MainController', ['$rootScope', '$scope', '$state', '$location', function ($rootScope, $scope, $state, $location) {

  $rootScope.title="Mind The Word";
}])

.controller('NavController', ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $state) {
  
  setTimeout(function(){
  $(".button-collapse").sideNav();
  },1000);

}])

.controller('HomeController', ['$rootScope', '$scope', '$state', '$location', function ($rootScope, $scope, $state, $location) {

  
}])
