'use strict';

/**
 * @ngdoc function
 * @name tweadsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tweadsApp
 */
angular.module('tweadsApp')
  .controller('MainCtrl', function (Twitter, $window) {
    var vm = this;
    vm.exampleToast = {
      duration: 1000,
      message: 'You reached out!'
    };
    vm.showcasePosts = {
      mainPost: {
        id: 1,
        image: 'http://placehold.it/1024x683',
        alt: 'Alternative Text',
        caption: 'Summer is Coming'
      },
      subPosts: [
        {
          id: 1,
          image: 'http://placehold.it/1024x683',
          alt: 'Alternative Text',
          caption: 'Summer is Coming'
        }, {
          id: 1,
          image: 'http://placehold.it/1024x683',
          alt: 'Alternative Text',
          caption: 'Summer is Coming'
        }, {
          id: 1,
          image: 'http://placehold.it/1024x683',
          alt: 'Alternative Text',
          caption: 'Summer is Coming'
        }, {
          id: 1,
          image: 'http://placehold.it/1024x683',
          alt: 'Alternative Text',
          caption: 'Summer is Coming'
        } 
      ]
    };
    //vm.twitter = new Twitter();
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
      if (vm.outreaches > 1) {
        vm.progress.width = '100%';
      }
    };
  });