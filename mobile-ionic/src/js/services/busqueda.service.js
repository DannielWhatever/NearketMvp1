angular.module('hackaton700.services')

  .service('BusquedaService', function() {

    let frm = null;


    let setFrm = v => frm = v;
    let getFrm = () => frm;


    return {
      setFrm,
      getFrm
    };

  });
