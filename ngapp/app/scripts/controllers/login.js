'use strict';

/**
 * @ngdoc function
 * @name tweadsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the tweadsApp
 */
angular.module('tweadsApp')
  .controller('LoginCtrl', function ($scope, $auth) {
    var vm = this;
    vm.login = function () {
      $auth.login({
          email: vm.email,
          password: vm.password
        })
        .then(function () {
          console.log({
            content: 'You have successfully logged in',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        })
        .catch(function (response) {
          console.log({
            content: response.data.message,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };
    vm.authenticate = function (provider) {
      $auth.authenticate(provider)
        .then(function () {
          console.log({
            content: 'You have successfully logged in',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        })
        .catch(function (response) {
          console.log(response);
        });
    };
  });
