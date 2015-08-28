##To Do 

* free access to reviewers / brand championers ? (chris n G ?) 
* angular and lav logic to track who has been tweeted to. 
* outreaches count on main and dashboard 
* ~~hide twead progress bar on med-and-down~~
* not just authenticated() but make sure user is subscribed. 
- Could run this on server side for every request and have a redirect in all successes on client to show a "Plans" modal then payment. 
* add into paymentcontroller.php && Angularjs controllers the post var for different plan subscriptions. 
* Multifunction buttons (retweet + favourite + reply) etc
* rate limit Requests / 15-min window (user auth) max = 180
* get since_id // max_id working. 
* add timeout  failsafe to $http config objects. milliseconds or callback function 
* ng-show = dashboard.twitter.busy === true 
* twitter.js line 80 + twittercontroller.php retweet id | favourite ID | follow user / everything else should default to a _tweads promo tweet. 
* rewrite twitterjs to use .then, functionality. .success is depreicated.
* twittercontroller.php use GuzzleHttp\Exception\BadResponseException and process
* Contact us page probably needs: Not sending the JWT for specific requests
```
// This request will NOT send the token as it has skipAuthentication
$http({
  url: '/api/endpoint',
  skipAuthorization: true
  method: 'GET'
});
```