'use strict';

/**
 * @ngdoc factory
 * @name inventoryApp.twitter
 * @description
 * # twitter
 * Factory in the inventoryApp.
 * Interacts with the rest Twitter API to retrieve new tweets for user to assess and reply to. 
 */
angular.module('inventoryApp')
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
        params: {count: 100}
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
