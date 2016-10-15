'use strict';

angular.module('hackaton700.services').service('BusquedaService', function () {

  var frm = null;

  var setFrm = function setFrm(v) {
    return frm = v;
  };
  var getFrm = function getFrm() {
    return frm;
  };

  return {
    setFrm: setFrm,
    getFrm: getFrm
  };
});
//# sourceMappingURL=busqueda.service.js.map
