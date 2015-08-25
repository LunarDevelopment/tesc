'use strict';
/**
 * @ngdoc overview
 * @name inventoryApp
 * @description
 * # inventoryApp
 *
 * Main module of the application.
 */
angular
  .module('inventoryApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.materialize',
    'satellizer'
  ])
  .config(function ($routeProvider, $authProvider, $httpProvider, $provide) {
    function redirectWhenLoggedOut($q, $injector) {
        return {
          responseError: function (rejection) {
            // Need to use $injector.get to bring in $state or else we get
            // a circular dependency error
            var $location = $injector.get('$location');
            // Instead of checking for a status code of 400 which might be used
            // for other reasons in Laravel, we check for the specific rejection
            // reasons to tell us if we need to redirect to the login state
            var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];
            // Loop through each rejection reason and redirect to the login
            // state if one is encountered
            angular.forEach(rejectionReasons, function (value, key) {
              if (rejection.data.error === value) {
                // If we get a rejection corresponding to one of the reasons
                // in our array, we know we need to authenticate the user so 
                // we can remove the current user from local storage
                localStorage.removeItem('user');
                // Send the user to the auth state so they can login
                $location.path("/auth");
              }
            });
            return $q.reject(rejection);
          }
        };
      }
      // Setup for the $httpInterceptor
    $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);
    // Push the new factory onto the $http interceptor array
    $httpProvider.interceptors.push('redirectWhenLoggedOut');
    // Satellizer configuration that specifies which API
    // route the JWT should be retrieved from
    $authProvider.loginUrl = '/api/authenticate';
    // Redirect to the auth state if any other states
    // are requested other than users
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .when('/auth', {
        templateUrl: 'views/auth.html',
        controller: 'AuthCtrl',
        controllerAs: 'auth'
      })
      .otherwise({
        redirectTo: '/auth'
      });
  })
  .run(function ($rootScope, $location) {
    // $stateChangeStart is fired whenever the state changes. We can use some parameters
    // such as toState to hook into details about the state as it is changing
    $rootScope.$on('$routeChangeStart', function (event, toState) {
      // Grab the user from local storage and parse it to an object
      var user = JSON.parse(localStorage.getItem('user'));
      // If there is any user data in local storage then the user is quite
      // likely authenticated. If their token is expired, or if they are
      // otherwise not actually authenticated, they will be redirected to
      // the auth state because of the rejected request anyway
      if (user) {
        // The user's authenticated state gets flipped to
        // true so we can now show parts of the UI that rely
        // on the user being logged in
        $rootScope.authenticated = true;
        // Putting the user's data on $rootScope allows
        // us to access it anywhere across the app. Here
        // we are grabbing what is in local storage
        $rootScope.currentUser = user;
        // If the user is logged in and we hit the auth route we don't need
        // to stay there and can send the user to the main state
        if ($location.path() === "auth") {
          // Preventing the default behavior allows us to use $state.go
          // to change states
          event.preventDefault();
          // go to the "main" state which in our case is users
          $location.path("/user");
        }
      }
    });
  });
