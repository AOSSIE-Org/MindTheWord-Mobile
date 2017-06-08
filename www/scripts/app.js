'use strict';

angular.module('mtwApp', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
          url: '/',
          views: {
              'header': {
                  templateUrl: 'views/nav.html'
              },
              'content': {
                  templateUrl: 'views/content.html'
              }
          }

      })



       
      // route to redirect to home in case URL not defined
      $urlRouterProvider.otherwise('/');

  })


.run(function ($rootScope, $state, $location) {

    // to execute commands while angular app in running
});
