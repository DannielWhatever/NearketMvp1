'use strict';

angular.module('hackaton700.controllers').controller('ConcertsController', function ($scope, $state, ConcertFactory, ConcertService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //


  $scope.$on('$ionicView.enter', function () {

    console.log('in controller');

    $scope.concerts = [];

    $scope.concerts = ConcertService.getConcerts();

    console.log($scope.concerts);

    if ($scope.concerts.length === 0) {
      console.log('CALL API!');
      ConcertFactory.all().then(function (resp) {
        $scope.concerts = resp;
        ConcertService.setConcerts($scope.concerts);
      });
    }
  });
});
//# sourceMappingURL=concerts.controller.js.map
