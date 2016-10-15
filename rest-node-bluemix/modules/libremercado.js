/**
 * Created by sebastian on 14-10-16.
 */

var merc =  require('mercadolibre');

var meliObject = new merc.Meli(5019148688988299, "wIg6VL5jzNfsy38jBOMuziVGnbxq9Rq7");

function statisticsPrice(list){
    list = list.sort(function(a, b){return a-b});
    var lnt = list.length;
    var minval = list[0];
    var maxval = list[lnt - 1];

    var deviation = (maxval - minval)/3;
    return [minval, minval + deviation, minval + deviation*2];
}

function deleteNulls(list){
    var auxList = [];
    for (index in list){
        if (list[index] != null){
            auxList.push(list[index]);
        }
    }
    return auxList;
}

module.exports = {
    buscaItem: function (itemName, respond, params) {
        var haveParams = false;
        if (params != undefined){
            console.log(params);
            haveParams = true;
        }
        var url = "/sites/MLC/search?q=" + itemName + "&city=TUxDQ1NBTjk4M2M&limit=200";
        if (haveParams) {
            if (params.discount == true){
                url += "&discount=10-100";
            }
        }
        meliObject.get(url, function (err, res) {
            var result = res.results;
            var prices = [];
            for (jsons in result) {
                var toRemove = false;
                for (item in result[jsons]) {
                    item = item.toString();
                    if (item != 'title' &&
                        item != 'price' &&
                        item != 'address' &&
                        item != 'seller_address' &&
                        item != 'available_quantity' &&
                        item != 'sold_quantity' &&
                        item != 'listing_type_id' &&
                        item != 'buying_mode' &&
                        item != 'condition' &&
                        item != 'accepts_mercadopago' &&
                        item != 'thumbnail' &&
                        item != 'permalink') {
                        delete result[jsons][item];
                    }
                    else if (item == 'price') {
                        if (haveParams) {
                            if (params.minprice != undefined) {
                                if (result[jsons][item] < params.minprice) {
                                    toRemove = true;
                                }
                            }
                            if (params.maxprice != undefined) {
                                    if (result[jsons][item] > params.maxprice) {
                                        toRemove = true;
                                    }
                            }
                        }
                    }
                }
                if (result[jsons]['seller_address']['latitude'] == ''){
                    toRemove = true;
                }
                if (toRemove){
                    delete result[jsons];
                }
                else{
                    prices.push(result[jsons]['price']);
                }
            }
            prices = statisticsPrice(prices);
            for (jsons in result){
                var price = result[jsons]['price'];
                if (price < prices[1]){
                    result[jsons].category = 'category1';
                }
                else if (price < prices[2]){
                    result[jsons].category = 'category2';
                }
                else{
                    result[jsons].category = 'category3';
                }
            }
            result = {
                'items': deleteNulls(result)
            };
            result.categories = {
                    category1: 'Desde $' + Math.floor(prices[0]) + ' a $' + Math.floor(prices[1]-1),
                    category2 : 'Desde $' + Math.floor(prices[1]) + ' a $' + Math.floor(prices[2]-1),
                    category3: 'Desde $' + Math.floor(prices[2]) + ' a $' + Math.floor(prices[0] + (prices[2]-prices[1])*3)
                };
            respond.json(result);
        });
    },
    buscaVend: function (id, respond) {
        var url = "/users/" + id;
        meliObject.get(url, function (err, res) {
            var result = res;
            for (item in result) {
                item = item.toString();
                if (item != 'nickname' && item != 'seller_reputation') {
                    delete result[item];
                }
            }
            respond.json(result);
        });
    }
};

