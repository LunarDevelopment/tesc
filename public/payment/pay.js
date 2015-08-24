'use strict';

angular.module('MyApp')
  .controller('PayController', function ($scope, $http, Account) {
    $scope.paid = false;
  $scope.stripeCallback = function(status, response){
      if(response.error) {
        $scope.paid= false;
        $scope.message = "Error from Stripe.com";
      } else {
        Account.getProfile()
          .success(function(data) {
            $scope.user = data;
            var $payInfo = {
              'token' : response.id,
              'customer_id' : $scope.user.id,
              'total': 1000
            };
            $http.post('/api/subscribe', $payInfo).success(function(data){
              if(data.status=="OK"){
                $scope.paid= true;
                $scope.message = data.message;
              }else{
                $scope.paid= false;
                $scope.message = data.message;
              }
            });
          })
          .error(function(error) {
          console.log("couldnt find user");
        });
      }
    };
    /*$scope.stripeCallback = function (code, result) {
      if (result.error) {
        $scope.message = result.error.message;
      } else {
        $scope.message = result.id;
      }
    };*/
    $scope.init = function () {
      $scope.loaded = true;
    };
    $scope.init();
  });
