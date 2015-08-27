<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Config;
use JWT;
use GuzzleHttp;
use GuzzleHttp\Subscriber\Oauth\Oauth1;
use App\User;

class TwitterController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
	}

    /**
       * Get signed in user's profile.
       */
    public function dump(Request $request)
    {
      $profileUrl = 'https://api.twitter.com/1.1/users/show.json?screen_name=';
      $searchUrl = 'https://api.twitter.com/1.1/search/tweets.json?q=%23laravel&result_type=mixed&count=1';
      $favouriteUrl = 'https://api.twitter.com/1.1/favorites/create.json?id=636825471104237568';
      $postUrl = 'https://api.twitter.com/1.1/statuses/update.json?status=Just%20testing%20a%20little%20something...';

      $client = new GuzzleHttp\Client();
      $user = User::find($request['user']['sub']);
      $profileOauth = new Oauth1([
        'consumer_key' => Config::get('app.twitter_key'),
        'consumer_secret' => Config::get('app.twitter_secret'),
        'token' => $user->oauthToken,
        'token_secret' => $user->oauthVerifier
      ]);
      $client->getEmitter()->attach($profileOauth);
      #$profile = $client->get($profileUrl . 'lunar_dev', ['auth' => 'oauth'])->json();
      #$profile = $client->get($searchUrl, ['auth' => 'oauth'])->json();
      #$profile = $client->post($postUrl, ['auth' => 'oauth'])->getBody();
      $profile = $client->post($postUrl, ['auth' => 'oauth'])->json();
      dd($profile);
    }

    /**
    * Show the form for creating a new resource.
    *
    * @return Response
    */
    public function searchTweets()
    {
      //
      $searchUrl = 'https://api.twitter.com/1.1/search/tweets.json?q=%23laravel&result_type=mixed&count=1';
    }
    /**
    * Show the form for creating a new resource.
    *
    * @return Response
    */
    public function tweet()
    {
      //
      $postUrl = 'https://api.twitter.com/1.1/statuses/update.json?status=Testing%20Our%20System...';
    }
    /**
    * Show the form for creating a new resource.
    *
    * @return Response
    */
    public function retweet()
    {
      //
    }
    /**
    * Show the form for creating a new resource.
    *
    * @return Response
    */
    public function favourite()
    {
      //
      $favouriteUrl = 'https://api.twitter.com/1.1/favorites/create.json?id=636825471104237568';
    }
    /**
    * Show the form for creating a new resource.
    *
    * @return Response
    */
    public function followUser()
    {
      //
    }
	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}
