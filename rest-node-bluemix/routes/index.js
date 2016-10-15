var express = require('express');
var router = express.Router();
var appi = require('../modules/libremercado.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Nearcat' });
});

router.post('/buscar/item', function(req, res, next){
  appi.buscaItem(req.body.item, res, req.body.params);
});

router.post('/buscar/usuario', function(req, res, next){
  appi.buscaVend(req.body.id_usr, res);
});

router.post('/oauth2/callback', function(req, res, next){
  console.log(req);
});


module.exports = router;
