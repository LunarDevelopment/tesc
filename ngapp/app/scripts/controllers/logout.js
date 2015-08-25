'use strict';

/**
 * @ngdoc function
 * @name tweadsApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the tweadsApp
 */
angular.module('tweadsApp')
  .controller('LogoutCtrl', function ($auth) {
    var vm = this;
    if (!$auth.isAuthenticated()) {
      return;
    }
    $auth.logout()
      .then(function () {
        console.log({
          content: 'You have been logged out',
          animation: 'fadeZoomFadeDown',
          type: 'material',
          duration: 3
        });
      });
  });
