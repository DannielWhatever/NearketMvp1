'use strict';

angular.module('hackaton700.config').config(function ($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  /*
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
  */

  //Custom Tabs For Concerts

  .state('home', {
    url: '/home',
    views: {
      'mainview': {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
      }
    }
  }).state('busqueda', {
    url: '/busqueda/:itemId',
    views: {
      'mainview': {
        templateUrl: 'templates/busqueda.html',
        controller: 'BusquedaController'
      }
    }
  }).state('map', {
    url: '/items/:itemId/city/:cityId',
    views: {
      'mainview': {
        templateUrl: 'templates/theMap.html',
        controller: 'TheMapController'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/tab/concerts');
  $urlRouterProvider.otherwise('/home');
});
//# sourceMappingURL=routes.config.js.map
