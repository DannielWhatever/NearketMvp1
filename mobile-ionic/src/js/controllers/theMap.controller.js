angular.module('hackaton700.controllers')

  .controller('TheMapController', function($scope,
                                           $stateParams,
                                           $cordovaGeolocation,ItemFactory,
                                           BusquedaService
  ) {



    $scope.categories = {
      category1: 'Desde $' + 0 + ' a $' + 10000,
      category2 : 'Desde $' + 10000 + ' a $' + 100000,
      category3: 'Desde $' + 100000 + ' a $' + 99999999
    };


    $scope.tooglers = {
      category1 : true,
      category2 : true,
      category3 : true
    };

    var options = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation.getCurrentPosition(options).then(function(position) {

      console.log(position);

      var latLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

      var mapOptions = {
        center: latLng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

      //console.log($stateParams);
      var advancedSearch = BusquedaService.getFrm();
      if(advancedSearch){
        console.log(advancedSearch);
        loadItems($stateParams.itemId, advancedSearch);
      }else{
        loadItems($stateParams.itemId);
      }

    }, function(error){
        console.log("Could not get location");
    });




    //private
    function loadItems(itemId,advancedSearch) {
      ItemFactory.buscar(itemId,'TUxDQ1NBTjk4M2M',advancedSearch).then(
          resp=>{
            console.log(resp);

            var results = resp.data.items;
            $scope.categories = resp.data.categories;

            _.filter(results,item=>{
              return item.seller_address && item.seller_address.latitude!="" && item.seller_address.longitude!=null;
            });


            _.forEach(results, item => {
              //console.log(item);


              var latLng = new google.maps.LatLng(item.seller_address.latitude,item.seller_address.longitude);
              //console.log(latLng);
              new google.maps.event.addListenerOnce($scope.map, 'idle', function(){


                var contentString =
                  '<div id="content">'+
                    '<div id="bodyContent">'+
                       //'<img src="'+item.thumbnail+'" /><br/>' +
                      '<h3>'+item.title+'</h3>'+
                      '<p>' +
                        '<b>$'+ item.price+'</b><br/>'+
                        '<span>Disponibles '+ item.available_quantity+' / Vendidos '+ item.sold_quantity+'</span><br/>'+
                        '<span>'+ (item.condition=='new' ? 'Nuevo' : 'Usado') +'</span><br/>'+
                      '</p>'+
                      '<a href="'+item.permalink+'" class="button button-energized">Compra en ML</a>'+
                    '</div>'+
                  '</div>';

                var infowindow = new google.maps.InfoWindow({
                  content: contentString
                });


                var marker = new google.maps.Marker({
                  map: $scope.map,
                  animation: google.maps.Animation.DROP,
                  position: latLng,
                  icon: '/img/markers/'+item.category+'.png'
                });

                marker.addListener('click', function() {
                  infowindow.open($scope.map, marker);
                });

                $scope.map.addListener('toogleOff'+item.category, () => {
                  marker.setVisible($scope.tooglers[item.category]);
                });


              });

              $scope.map.setZoom(12);

            });




        },failure=>{
          console.error(failure);
        });
    }


    $scope.categToogle = (categ) => {
      $scope.tooglers[categ] = !$scope.tooglers[categ];
      google.maps.event.trigger($scope.map,'toogleOff'+categ);
    };

  });
