'use strict';

/**
 * @ngdoc service
 * @name tweadsApp.Twitter
 * @description
 * # Twitter
 * Service in the tweadsApp.
 */
angular.module('tweadsApp')
  .factory('Twitter', function ($http) {
    var twitter = function () {
      this.tweets = [];
      this.busy = false;
      this.after = '';
    };
    twitter.prototype.nextPage = function () {
      if (this.busy) return;
      this.busy = true;
      var url = "exampleTweets.json";
      $http({
        url: url,
        method: "GET",
        params: {
          count: 100
        }
      }).success(function (data) {
        var tweets = data.statuses;
        console.log('tweets: ');
        console.log(tweets);
        for (var i = 0; i < tweets.length; i++) {
          this.tweets.push(tweets[i]);
        }
        this.after = this.tweets[this.tweets.length - 1];
        this.busy = false;
      }.bind(this));
    };
    return twitter;
  });