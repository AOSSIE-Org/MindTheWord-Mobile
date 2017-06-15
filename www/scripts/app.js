'use strict';

angular.module('mtwApp', ['ui.router','ngCordova'])
  .config(function($stateProvider, $urlRouterProvider,$cordovaInAppBrowserProvider) {
    $stateProvider

      .state('app', {
          url: '/',
          views: {
            
              'content': {
                  templateUrl: 'views/landing.html'
              },
              'modal':{
                templateUrl:'views/modal.html'
              }
          }

      })
      .state('app.home', {
          url: 'home',
          views: {
              'header@': {
                  templateUrl: 'views/nav.html'
              },
              'content@': {
                  templateUrl: 'views/content.html'
              }
          }

      })
     .state('app.settings', {
          url: 'settings/',
          views: {
              'header@': {
                  templateUrl: 'views/header-nav.html'
              },
              'content@': {
                  templateUrl: 'views/settings.html'
              },
              
          }

      })
     .state('app.translation', {
          url: 'settings/translation',
          views: {
              'header@': {
                  templateUrl: 'views/header-nav.html'
              },
              'content@': {
                  templateUrl: 'views/settings/translation.html'
              },
              
          }

      })

     .state('app.blacklist', {
          url: 'settings/blacklist',
          views: {
              'header@': {
                  templateUrl: 'views/header-nav.html'
              },
              'content@': {
                  templateUrl: 'views/settings/blacklist.html'
              },
              
          }

      })
     
    .state('app.learning', {
            url: 'settings/learning',
            views: {
                'header@': {
                    templateUrl: 'views/header-nav.html'
                },
                'content@': {
                    templateUrl: 'views/settings/learning.html'
                },
                
            }

        })
       .state('app.advanced', {
            url: 'settings/advanced',
            views: {
                'header@': {
                    templateUrl: 'views/header-nav.html'
                },
                'content@': {
                    templateUrl: 'views/settings/advanced.html'
                },
                'modal':{
                  templateUrl: 'views/modal.html'
                }
            }

        })
        .state('app.backup', {
            url: 'settings/backup',
            views: {
                'header@': {
                    templateUrl: 'views/header-nav.html'
                },
                'content@': {
                    templateUrl: 'views/settings/backup.html'
                },
                'modal':{
                  templateUrl: 'views/modal.html'
                }
            }

        })
       



       
      // route to redirect to home in case URL not defined
      $urlRouterProvider.otherwise('/');

      document.addEventListener("deviceready", onDeviceReady, false);
      function onDeviceReady() {
          window.open = cordova.InAppBrowser.open;
      }



  })


.run(function ($rootScope, $state, $location) {

    // to execute commands while angular app in running
});
