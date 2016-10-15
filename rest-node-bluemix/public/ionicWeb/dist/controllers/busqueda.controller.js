'use strict';

angular.module('hackaton700.controllers').controller('BusquedaController', function ($scope, $stateParams, BusquedaService) {

  $scope.frm = {
    itemSearched: $stateParams.itemId
  };

  $scope.busquedaService = BusquedaService;
});
//# sourceMappingURL=busqueda.controller.js.map
