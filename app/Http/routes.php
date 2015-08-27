<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

// OAuth, Login and Signup Routes.
Route::group(['prefix' => 'auth'], function()
{
  Route::post('twitter', 'AuthController@twitter');
  Route::post('facebook', 'AuthController@facebook');
  Route::post('foursquare', 'AuthController@foursquare');
  Route::post('github', 'AuthController@github');
  Route::post('google', 'AuthController@google');
  Route::post('linkedin', 'AuthController@linkedin');
  Route::post('login', 'AuthController@login');
  Route::post('signup', 'AuthController@signup');
  Route::get('unlink/{provider}', ['middleware' => 'auth', 'uses' => 'AuthController@unlink']);
});

// API Routes.
Route::group(['prefix' => 'api'], function()
{
  Route::get('me', ['middleware' => 'auth', 'uses' => 'UserController@getUser']);
  Route::put('me', ['middleware' => 'auth', 'uses' => 'UserController@updateUser']);
  Route::post('subscribe', ['middleware' => 'auth', 'uses' => 'PaymentController@subscribe']);
});
// Twitter Routes.
Route::group(['prefix' => 'twitter'], function()
{
  Route::get('dump', ['middleware' => 'auth', 'uses' => 'UserController@dump']);
});
// Initialize Angular.js App Route.
Route::get('/', 'HomeController@index');
