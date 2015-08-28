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
    vm.exampleToast = {
      duration: 1000,
      message: 'You reached out!'
    };
    vm.twitter = Twitter;
    vm.tweets = null;
  });
