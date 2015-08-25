'use strict';

/**
 * @ngdoc function
 * @name inventoryApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the inventoryApp
 * @requires Twitter Factory
 * @requires $window to access global Materialize library's Toasts
 * @property {Array} tweets
 * @property {twitter} new instance of Twitter factory
 * @property {Object} style object of progress bar
 */
angular.module('inventoryApp')
  .controller('AboutCtrl', function (Twitter, $window) {
    var vm = this;
    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    vm.exampleToast = {
      duration: 1000,
      message: 'You reached out!'
    };
    vm.twitter = new Twitter();
    vm.tweets = null;
    vm.outreaches = null;
    vm.exampleTweet = '';
    vm.searchTerm = '';
    vm.progress = {
      width: '0%'
    };
    /**
     * @ngdoc function
     * @name step1
     * @description
     * Checks exampleTweet length !== 0 and updates progress bar to next step in tutorial
     * @property {Number} exampleTweet.length
     */
    vm.step1 = function () {
      //if (vm.exampleTweet.length !== 0) {
        vm.progress.width = '10%';
      //}
    };
    /**
     * @ngdoc function
     * @name step2
     * @description
     * Emulates a call to Twitter's API to get tweets related to search term
     * @param {String} searchTerm is pulled from model to run search.
     */
    vm.step2 = function () {
      if (vm.searchTerm.length) {
        vm.progress.width = '37%';
      }
    };
    /**
     * @ngdoc function
     * @name step3
     * @description Emulates sending a tweet to potential client
     *
     */
    vm.step3 = function (tweet) {
      vm.outreaches += 1;
      tweet.classes = 'light-green lighten-5';
      tweet.disabled = true;
      $window.Materialize.toast('You reached out!', 3000);
      vm.progress.width = '63%';
      vm.step4();
    };
    /**
     * @ngdoc function
     * @name step4
     * @description
     * Checks which example tweet has been selected and updates progress bar to next step in tutorial
     * @param {Object} target selected example tweet
     */
    vm.step4 = function () {
      if(vm.outreaches > 1) {
        vm.progress.width = '100%';
      }
    };
  });