'use strict';

/**
 * @ngdoc directive
 * @name tweadsApp.directive:navLinks
 * @description
 * # navLinks
 */
angular.module('tweadsApp')
  .directive('navLinks', function () {
    return {
      restrict: 'E',
      template:       '<li class=""><a title="Tweads Home Page" href="#/">Home</a></li>' +
      '<li class=""><a title="About Social Media Marketing" href="#/about">About</a></li>' +
      '<li class="" ng-show="!authenticated"><a title="About Social Media Marketing" href="#/signup">Sign Up</a> </li>' +
      '<li class="" ng-show="authenticated"><a title="About Social Media Marketing" ng-click="logout();">Log Out</a></li>' +
      '<li class=""  ng-show="authenticated"><a title="About Social Media Marketing" href="#/profile">Profile</a> </li>' +
      '<li class="" ng-show="authenticated"><a title="About Social Media Marketing" href="#/dashboard">Dashboard</a> </li>' +
      '<li class=""  ng-show="authenticated"><a title="About Social Media Marketing" href="#/pay">Pay</a> </li>' +
      '<li class="" ng-show="!authenticated"><a href="#/login">Log In</a> </li>' +
      '<li class=""><a title="Contact Tweads" href="#/contact">Contact</a> </li>' 
    };
  });
