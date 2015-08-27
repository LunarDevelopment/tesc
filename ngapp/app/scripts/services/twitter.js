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
    var twitter = function () {
      this.tweets = [];
      this.busy = false;
      this.outreaches = 0;
      this.retweets = 0;
      this.favourites = 0;
      this.followed = 0;
      this.status = '';
      this.since_id = null;
      this.until = null;
      this.max_id = null;
      this.count = 100;
      this.q = '';
      this.result_type = 'mixed';
      /* * 
       * mixed: Include both popular and real time results in the response.
       * recent: return only the most recent results in the response
       * popular: return only the most popular results in the response.
       * */
    };
    twitter.prototype.searchTweets = function () {
      if (this.busy) return;
      this.busy = true;
      var url = "/twitter/search";
      $http({
        url: url,
        method: "GET",
        params: {
          q: this.q,
          result_type: this.result_type || 'mixed',
          count: this.count || 100,
          since_id: this.since_id || null,
          //until: this.until || null,
          max_id: this.max_id || null
        }
      }).success(function (data) {
        var tweets = data.statuses;
        console.log('tweets: ');
        console.log(tweets);
        for (var i = 0; i < tweets.length; i++) {
          this.tweets.push(tweets[i]);
        }
        this.since_id = this.tweets[this.tweets.length - 1].id_str;
        this.busy = false;
      }.bind(this));
    };
    twitter.prototype.tweet = function () {
      if (this.busy) return;
      this.busy = true;
      var url = "/twitter/tweet";
      $http({
        url: url,
        method: "POST",
        data: {
          status: this.status || '@_tweads Help! I think I\'m using this wrong!'
        }
      }).success(function (data) {
        console.log(data);
        $window.Materialize.toast('Twead Success!', 3000);
        this.outreaches += 1;
        this.busy = false;
      }.bind(this));
    };
    twitter.prototype.retweet = function (id) {
      if (this.busy) return;
      this.busy = true;
      var url = "/twitter/retweet";
      $http({
        url: url,
        method: "POST",
        data: {
          id: id || 0
        }
      }).success(function (data) {
        console.log(data);
        $window.Materialize.toast('Retweet Success!', 3000);
        this.retweets += 1;
        this.busy = false;
      }.bind(this));
    };
    twitter.prototype.favourite = function (id) {
      if (this.busy) return;
      this.busy = true;
      var url = "/twitter/favourite";
      $http({
        url: url,
        method: "POST",
        data: {
          id: id || 0
        }
      }).success(function (data) {
        console.log(data);
        $window.Materialize.toast('Followed Success!', 3000);
        this.favourites += 1;
        this.busy = false;
      }.bind(this));
    };
  twitter.prototype.followUser = function (screen_name) {
      if (this.busy) return;
      this.busy = true;
      var url = "/twitter/follow";
      $http({
        url: url,
        method: "POST",
        data: {
          id: screen_name || '@_tweads'
        }
      }).success(function (data) {
        console.log(data);
        $window.Materialize.toast('Followed Success!', 3000);
        this.followed += 1;
        this.busy = false;
      }.bind(this));
    };
    twitter.prototype.getLatestTweets = function () {

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
        this.since_id = this.tweets[this.tweets.length - 1];
        this.busy = false;
      }.bind(this));
    };
    return twitter;
  });