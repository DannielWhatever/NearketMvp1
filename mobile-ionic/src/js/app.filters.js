angular.module('hackaton700')
  .filter('toDate', function() {
    return d => d ? (d.dayOfMonth + '/' + d.month + '/' + d.year) : ''
  })
;
