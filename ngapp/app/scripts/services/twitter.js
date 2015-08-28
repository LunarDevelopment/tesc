'use strict';

/**
 * @ngdoc service
 * @name tweadsApp.Twitter
 * @description
 * # Twitter
 * Service in the tweadsApp.
 */
angular.module('tweadsApp')
  .factory('Twitter', function ($http, $window) {
    var vm = {};
    vm.tweets = [];
    vm.busy = false;
    vm.outreaches = 0;
    vm.retweets = 0;
    vm.favourites = 0;
    vm.followed = 0;
    vm.status = '';
    vm.since_id = null;
    vm.until = null;
    vm.max_id = null;
    vm.count = 100;
    vm.q = '';
    vm.result_type = 'mixed';
    /* 
     * mixed: Include both popular and real time results in the response.
     * recent: return only the most recent results in the response
     * popular: return only the most popular results in the response.
     */
    vm.searchTweets = function () {
      if (vm.busy) {
        return;
      }
      vm.busy = true;
      var url = "/twitter/search";
      $http({
        url: url,
        method: "GET",
        params: {
          q: vm.q,
          result_type: vm.result_type || 'mixed',
          count: vm.count || 100,
          since_id: vm.since_id || null,
          //until: vm.until || null,
          max_id: vm.max_id || null
        }
      }).then(function (response) {
        var newTweets = response.data.statuses;
        console.log('newTweets: ');
        console.log(newTweets);
        for (var i = 0; i < newTweets.length; i++) {
          vm.tweets.push(newTweets[i]);
        }
        vm.since_id = vm.tweets[vm.tweets.length - 1].id_str;
        vm.busy = false;
      }, function (response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(response);
        angular.forEach(response.data.errors, function(value, key){
          $window.Materialize.toast(value.message, 3000);
        });
      });
    };
    vm.tweet = function () {
      if (vm.busy) {
        return;
      }
      vm.busy = true;
      var url = "/twitter/tweet";
      $http({
        url: url,
        method: "POST",
        response: {
          status: vm.status || '@_tweads Help! I think I\'m using this wrong!'
        }
      }).then(function (response) {
        console.log(response);
        $window.Materialize.toast('Twead then!', 3000);
        vm.outreaches += 1;
        vm.busy = false;
      }, function (response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(response);
        angular.forEach(response.data.errors, function(value, key){
          $window.Materialize.toast(value.message, 3000);
        });
      });
    };
    vm.retweet = function (id) {
      if (vm.busy) {
        return;
      }
      vm.busy = true;
      var url = "/twitter/retweet";
      $http({
        url: url,
        method: "POST",
        response: {
          id: id || 0
        }
      }).then(function (response) {
        console.log(response);
        $window.Materialize.toast('Retweet then!', 3000);
        vm.retweets += 1;
        vm.busy = false;
      }, function (response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(response);
        angular.forEach(response.data.errors, function(value, key){
          $window.Materialize.toast(value.message, 3000);
        });
      });
    };
    vm.favourite = function (id) {
      if (vm.busy) {
        return;
      }
      vm.busy = true;
      var url = "/twitter/favourite";
      $http({
        url: url,
        method: "POST",
        response: {
          id: id || 0
        }
      }).then(function (response) {
        console.log(response);
        $window.Materialize.toast('Followed then!', 3000);
        vm.favourites += 1;
        vm.busy = false;
      }, function (response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(response);
        angular.forEach(response.data.errors, function(value, key){
          $window.Materialize.toast(value.message, 3000);
        });
      });
    };
    vm.followUser = function (screen_name) {
      if (vm.busy) {
        return;
      }
      vm.busy = true;
      var url = "/twitter/follow";
      $http({
        url: url,
        method: "POST",
        response: {
          id: screen_name || '@_tweads'
        }
      }).then(function (response) {
        console.log(response);
        $window.Materialize.toast('Followed then!', 3000);
        vm.followed += 1;
        vm.busy = false;
      }, function (response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(response);
        angular.forEach(response.data.errors, function(value, key){
          $window.Materialize.toast(value.message, 3000);
        });
      });
    };
    vm.getLatestTweets = function () {

    };
    vm.nextPage = function () {
      if (vm.busy) {
        return;
      }
      vm.busy = true;
      var url = "exampleTweets.json";
      $http({
        url: url,
        method: "GET",
        params: {
          count: 100
        }
      }).then(function (response) {
        var tweets = response.data.statuses;
        console.log('tweets: ');
        console.log(tweets);
        for (var i = 0; i < tweets.length; i++) {
          vm.tweets.push(tweets[i]);
        }
        vm.since_id = vm.tweets[vm.tweets.length - 1];
        vm.busy = false;
      }, function (response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(response);
        angular.forEach(response.data.errors, function(value, key){
          $window.Materialize.toast(value.message, 3000);
        });
      });
    };
  return vm;
  });