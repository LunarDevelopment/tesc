'use strict';

/**
 * @ngdoc service
 * @name inventoryApp.data
 * @description
 * # data
 * Service in the inventoryApp.
 */
angular.module('inventoryApp')
  .service('data', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var vm = this;
    vm.searchTweets = function () {
      return $http.get('exampleTweets.json');
    };
  });