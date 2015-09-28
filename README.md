##To Do 

* Have a plans Page which displays PAY modal. - reusable on all pages
* Display subscription plan in profile 
* Download invoices in profile
* Redirect to pay when authed but not subbed. 
  - Need to check user_>isAuthed() on twitter ctrl. 
  - in config interceptor something like if msg = not subbed redirect to plans / pay page 
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
* angular config http interceptor for logged out
* store target ID_str to check who you've contacted before and color / show could accordingly - do this server side and store contact in a db. then pull them in on page load alone with search results. 
  - http://stackoverflow.com/questions/23829928/comparing-objects-between-2-arrays-in-angularjs
  - change vm.outreaches to array and do outreaches.length as a counter.. 
  - can remove the outreaches += 1 and move logic to push array on reply. 
```javascript
var promises = [$http.get('/items'), $http.get('/favourites')];

$q.all(promises).then(function (resultsArray) {

$scope.items = resultsArray[0];
var favourites = resultsArray[1];

$scope.items.forEach(function (item) {
var matches = favourites.filter(function (f) {
return f.id === item.id;
});
item.favourite = matches.length ? true : false;
});

});
```
* Contact us page probably needs: Not sending the JWT for specific requests
```javascript
// This request will NOT send the token as it has skipAuthentication
$http({
  url: '/api/endpoint',
  skipAuthorization: true
  method: 'GET'
});
```