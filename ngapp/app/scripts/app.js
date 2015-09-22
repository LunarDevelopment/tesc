'use strict';

/**
 * @ngdoc overview
 * @name tweadsApp
 * @description
 * # tweadsApp
 *
 * Main module of the application.
 */
angular
  .module('tweadsApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.materialize',
    'satellizer',
    'angularPayments',
    'ngStorage'
  ])
  .config(function ($routeProvider, $authProvider, $httpProvider, $provide) {
    function redirectWhenLoggedOut($q, $injector) {
        return {
          responseError: function (rejection) {
            // Need to use $injector.get to bring in $state or else we get
            // a circular dependency error
            var $location = $injector.get('$location');
            var $rootScope = $injector.get('$rootScope');
            var $auth = $injector.get('$auth');
            // Instead of checking for a status code of 400 which might be used
            // for other reasons in Laravel, we check for the specific rejection
            // reasons to tell us if we need to redirect to the login state
            var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid', 'Internal Server Error', 'Unauthorized'];
            // Loop through each rejection reason and redirect to the login
            // state if one is encountered
            angular.forEach(rejectionReasons, function (value, key) {
              if (rejection.statusText === value) {
                // If we get a rejection corresponding to one of the reasons
                // in our array, we know we need to authenticate the user so 
                // we can remove the current user from local storage
                $rootScope.authenticated = false;
                delete $rootScope.$storage.user;
                $auth.logout();
                var logoutMessage = {
                  status: 'ERROR',
                  message: 'Something went wrong, please log in again.'
                };
                //Notify.new(logoutMessage);
                console.log(logoutMessage);
                // Send the user to the auth state so they can login
                $location.path("/login");
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
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup'
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl',
        controllerAs: 'logout'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .when('/pay', {
        templateUrl: 'views/pay.html',
        controller: 'PayCtrl',
        controllerAs: 'pay'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .otherwise({
        redirectTo: '/'
      });
    $authProvider.facebook({
      clientId: '657854390977827'
    });

    $authProvider.google({
      clientId: '429673858105-8hjk4qonb299tsocgevvpjq5o1tolu4g.apps.googleusercontent.com'
    });

    $authProvider.github({
      clientId: '73e1708345e680b2f8b2'
    });

    $authProvider.linkedin({
      clientId: '77cw786yignpzj'
    });

    $authProvider.yahoo({
      clientId: 'dj0yJmk9SDVkM2RhNWJSc2ZBJmQ9WVdrOWIzVlFRMWxzTXpZbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yYw--'
    });

    $authProvider.twitter({
      url: '/auth/twitter'
    });

    $authProvider.live({
      clientId: '000000004C12E68D'
    });
    $authProvider.oauth2({
      name: 'foursquare',
      url: '/auth/foursquare',
      clientId: 'MTCEJ3NGW2PNNB31WOSBFDSAD4MTHYVAZ1UKIULXZ2CVFC2K',
      redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
      authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate'
    });
    $authProvider.httpInterceptor = true; // Add Authorization header to HTTP request
    $authProvider.loginOnSignup = true;
    $authProvider.baseUrl = '/'; // API Base URL for the paths below.
    $authProvider.loginRedirect = '/profile';
    $authProvider.logoutRedirect = '/login';
    $authProvider.signupRedirect = '/';
    $authProvider.loginUrl = '/auth/login';
    $authProvider.signupUrl = '/auth/signup';
    $authProvider.loginRoute = '/login';
    $authProvider.signupRoute = '/signup';
    $authProvider.tokenRoot = false; // set the token parent element if the token is not the JSON root
    $authProvider.tokenName = 'token';
    $authProvider.tokenPrefix = 'tweads'; // Local Storage name prefix was: satellizer
    $authProvider.unlinkUrl = '/auth/unlink/';
    $authProvider.unlinkMethod = 'get';
    $authProvider.authHeader = 'Authorization';
    $authProvider.authToken = 'Bearer';
    $authProvider.withCredentials = true;
    $authProvider.platform = 'browser'; // or 'mobile'
    $authProvider.storage = 'localStorage'; // or 'sessionStorage'
    // GitHub
    $authProvider.github({
      url: '/auth/github',
      authorizationEndpoint: 'https://github.com/login/oauth/authorize',
      redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
      scope: ['user:email'],
      scopeDelimiter: ' ',
      type: '2.0',
      popupOptions: {
        width: 1020,
        height: 618
      }
    });
  })
  .run(function ($rootScope, $location, $auth, $localStorage, Account) {
    // global logout function
    //    $rootScope.logout = $auth.logout();
    // $stateChangeStart is fired whenever the state changes. We can use some parameters
    // such as toState to hook into details about the state as it is changing
    //    $rootScope.$on('$routeChangeStart', function (event) {
    var isAuthed = $auth.isAuthenticated();
    $rootScope.$storage = $localStorage;
    $rootScope.logout = function () {
      $rootScope.authenticated = false;
      delete $rootScope.$storage.user;
      $auth.logout();
      var logoutMessage = {
        status: 'OK',
        message: 'You\'ve logged out!'
      };
      console.log(logoutMessage);
    };
    // Grab the user from local storage and parse it to an object
    // If there is any user data in local storage then the user is quite
    // likely authenticated. If their token is expired, or if they are
    // otherwise not actually authenticated, they will be redirected to
    // the auth state because of the rejected request anyway
    if (!isAuthed) {
      // The user's authenticated state gets flipped to
      // true so we can now show parts of the UI that rely
      // on the user being logged in
      $rootScope.authenticated = false;
      // Putting the user's data on $rootScope allows
      // us to access it anywhere across the app. Here
      // we are grabbing what is in local storage
      delete $rootScope.$storage.user;
      // If the user is logged in and we hit the auth route we don't need
      // to stay there and can send the user to the main state
      /*if ($location.path() !== "/" || "/contact" || "/about" || "/login" || "/signup") {
          // Preventing the default behavior allows us to use $state.go
          // to change states
          event.preventDefault();
          // go to the "main" state which in our case is users
          $location.path("/login");
        }*/
    } else if (isAuthed) {
      $rootScope.authenticated = true;
      if (!$rootScope.$storage.user) {
        Account.getProfile()
          .then(function (data) {
            $rootScope.$storage.user = data;
          })
          .catch(function (response) {
            console.log(response);
          });
      }
    }
    //   });
  });
