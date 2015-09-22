'use strict';

/**
 * @ngdoc function
 * @name tweadsApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the tweadsApp
 */
angular.module('tweadsApp')
  .controller('DashboardCtrl', function (Twitter, $window) {
    var vm = this;
    vm.twitter = Twitter;
    vm.getUserClass = function (val) {
      return {
        'border-left': 'solid 2px',
        'border-left-color': '#' + val
      };
    };
  });
