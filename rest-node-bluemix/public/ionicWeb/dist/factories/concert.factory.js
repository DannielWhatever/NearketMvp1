'use strict';

angular.module('hackaton700.factories').factory('ConcertFactory', function ($q, $http, BASE_URL) {

  var all = function all() {
    return $q(function (resolve, reject) {
      $http({
        method: 'GET',
        url: BASE_URL + '/concert/'
      }).then(function (resp) {
        console.log(resp);
        resp.status === 200 ? resolve(resp.data) : reject();
      }, function (failure) {
        console.error(failure);
        reject(failure);
      });
    });
  };

  return {
    all: all
  };
});
//# sourceMappingURL=concert.factory.js.map
