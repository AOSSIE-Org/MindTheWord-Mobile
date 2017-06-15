'use strict';

var baseUrl = 'http://139.59.23.184:8001';


angular.module('mtwApp')

.controller('MainController', ['$rootScope', '$scope', '$state', '$location', function ($rootScope, $scope, $state, $location) {

	$rootScope.title="Mind The Word";
	
	// initialize

}])

.controller('LandingController', ['$rootScope', '$scope', '$state', '$location', function ($rootScope, $scope, $state, $location) {

  
}])

.controller('NavController', ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $state) {
  
  setTimeout(function(){
  $(".button-collapse").sideNav();
  },1000);

}])

.controller('HeaderNavController', ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $state) {
  
    $rootScope.title = 'Settings';



  setTimeout(function(){
  $(".button-collapse").sideNav();
  },1000);

}])

.controller('HomeController', ['$rootScope', '$scope', '$state', '$location', function ($rootScope, $scope, $state, $location) {


     var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
    };

    $scope.url = '';

    $scope.openUrl = function(){
        // $cordovaInAppBrowser.open($scope.url, '_self', options)
     //  .then(function(event) {
     //    // success
     //  })
     //  .catch(function(event) {
     //    // error
     //  });

     var ref = cordova.InAppBrowser.open($scope.url, '_self', 'location=yes');


    // $cordovaInAppBrowser.close();

    }

    // $scope.toggleMenu = function($event){
    //  var pullMenuElement = $event.currentTarget;
    //  $(pullMenuElement).toggleClass('up');
    //  var bottomBarHeight = $('.bottom.bar').height();
    //  if($(pullMenuElement).hasClass('up')){
    //      $('.bottom.bar').slideDown();
    //  }
    //  else{
    //      $('.bottom.bar').slideUp();
    //  }

    // }
  
}])

.controller('SettingsController', ['$rootScope', '$scope', '$state', '$location', function ($rootScope, $scope, $state, $location) {
    // console.log($state,$location.$$path);
}])
.controller('TranslationSettingsController', ['$rootScope', '$scope', '$state', '$location', function ($rootScope, $scope, $state, $location) {
    $rootScope.title = 'Translation';
    // console.log($state,$location.$$path);
}]).controller('BlacklistSettingsController', ['$rootScope', '$scope', '$state', '$location', function ($rootScope, $scope, $state, $location) {
    $rootScope.title = 'Blacklist';
    // console.log($state,$location.$$path);
}])
.controller('LearningSettingsController', ['$rootScope', '$scope', '$state', '$location', function ($rootScope, $scope, $state, $location) {
    $rootScope.title = 'Learning';
    // console.log($state,$location.$$path);
}])
.controller('AdvancedSettingsController', ['$rootScope', '$scope', '$state', '$location', function ($rootScope, $scope, $state, $location) {
    $rootScope.title = 'Advanced';
    // console.log($state,$location.$$path);
}])
.controller('BackupSettingsController', ['$rootScope', '$scope', '$state', '$location', function ($rootScope, $scope, $state, $location) {
    $rootScope.title = 'Backup';
    // console.log($state,$location.$$path);
}])
.controller('ModalController', ['$rootScope', '$scope', '$state', '$location', function ($rootScope, $scope, $state, $location) {
    // $rootScope.title = 'Backup';
    // console.log($state,$location.$$path);
}])
