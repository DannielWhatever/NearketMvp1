//https://api.mercadolibre.com/sites/MLC/search?q=bici&discount=40-100&city=TUxDQ1NBTjk4M2M
//url: URL_MLC+'/search?q='+itemSearched+'&discount=10-100&city='+city

angular.module('hackaton700.factories')

  .factory('ItemFactory', function($q,$http,URL_API) {

    let buscar = (itemSearched,city,advancedSearch) => {
      var theData = {
        item: itemSearched
      };
      if(advancedSearch){
        theData.params = advancedSearch;
      }
      return $http({
          method: 'POST',
          url: URL_API+'/buscar/item',
          data: theData
        });
    };

    return {
      buscar
    };

  });
