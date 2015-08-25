'use strict';

/**
 * @ngdoc service
 * @name tweadsApp.Account
 * @description
 * # Account
 * Service in the tweadsApp.
 */
angular.module('tweadsApp')
  .factory('Account', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      getProfile: function() {
        return $http.get('/api/me');
      },
      updateProfile: function(profileData) {
        return $http.put('/api/me', profileData);
      }
    };
  });
