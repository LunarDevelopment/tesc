'use strict';

/**
 * @ngdoc directive
 * @name tweadsApp.directive:helloUser
 * @description
 * # helloUser
 */
angular.module('tweadsApp')
  .directive('helloUser', function () {
    return {
      restrict: "E",
      template: '<ul ng-show="$storage.user.displayName" class="left hide-on-med-and-down">' +
        '<li class="">' +
        '<a href="#/profile" >Hello {{$storage.user.displayName}}</a>' +
        '</li>' +
        '</ul>'
    };
  });
