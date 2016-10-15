'use strict';

angular.module('hackaton700').filter('toDate', function () {
  return function (d) {
    return d ? d.dayOfMonth + '/' + d.month + '/' + d.year : '';
  };
});
//# sourceMappingURL=app.filters.js.map
