'use strict';

/**
 * @ngdoc function
 * @name tweadsApp.controller:PayCtrl
 * @description
 * # PayCtrl
 * Controller of the tweadsApp
 */
angular.module('tweadsApp')
  .controller('PayCtrl', function ($scope, $http, Account) {
    var vm = this;
    vm.paid = false;
    vm.stripeCallback = function (status, response) {
      if (response.error) {
        vm.paid = false;
        vm.message = "Error from Stripe.com";
      } else {
        Account.getProfile()
          .success(function (data) {
            vm.user = data;
            var $payInfo = {
              'token': response.id,
              'customer_id': vm.user.id,
              'total': 1000
            };
            $http.post('/api/subscribe', $payInfo).success(function (data) {
              if (data.status == "OK") {
                vm.paid = true;
                vm.message = data.message;
              } else {
                vm.paid = false;
                vm.message = data.message;
              }
            });
          })
          .error(function (error) {
            console.log("couldnt find user");
          });
      }
    };
    vm.init = function () {
      vm.loaded = true;
    };
    vm.init();
  });