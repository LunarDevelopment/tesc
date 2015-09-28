'use strict';

/**
 * @ngdoc function
 * @name tweadsApp.controller:PayCtrl
 * @description
 * # PayCtrl
 * Controller of the tweadsApp
 */
angular.module('tweadsApp')
  .controller('PayCtrl', function ($rootScope, $scope, $http, stripe, Account) {
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
    /* ========================================= */
    $scope.charge = function () {
      return stripe.card.createToken($scope.payment.card)
        .then(function (token) {
          console.log('token created for card ending in ', token.card.last4);
          var payment = angular.copy($scope.payment);
          payment.card = void 0;
          payment.customer_id = $rootScope.$storage.user.id;
          payment.token = token.id;
          payment.total = 1000;
          return $http.post('/api/subscribe', payment);
        })
        .then(function (payment) {
          console.log(payment);
          console.log(payment.message);
        })
        .catch(function (err) {
          if (err.type && /^Stripe/.test(err.type)) {
            console.log('Stripe error: ', err.message);
          } else {
            console.log('Other error occurred, possibly with your API', err.message);
          }
        });
    };

    /* ========================================= */
    vm.init = function () {
      vm.loaded = true;
    };
    vm.init();
  });