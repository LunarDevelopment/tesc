<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Config;
use JWT;
use App\User;

class PaymentController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
	}

    public function subscribe(Request $request){
      $mess = ['status' => "ERROR","message" =>"Somethings not right.."];
      $token  = $request['token'];
      $cutomer_id  =$request['customer_id'];
      $total_price  =$request['total']*100;

      $user = User::find($cutomer_id);
      
      if ($user && ! $user->subscribed()) {
        // This user is not a paying customer...
        if ($user->subscription('Basic')->create($token)) {
          $mess = ['status' => "OK","message" =>"Payment ok"];
        } else {
          $mess = ['status' => "ERROR","message" =>"Error Subscribing"];
        };
      }
      else if ($user->subscribed()) {
        if ($user->onTrial()) {
          $mess = ['status' => "OK","message" =>"You're still on your trial!"];
        }
        else if ($user->onGracePeriod()) {
          $mess = ['status' => "OK","message" =>"Your subscription is ending soon and not renewing!"];
        }
        else {
          $mess = ['status' => "OK","message" =>"Already Subscribed"];
        }
      }
      return $mess; 
    }
    public function postJoin()
    {
      $this->user->subscription(Input::get('plan'))->create(Input::get('token'), [
        'email' => $this->user->email
      ]);
      return ['status' => "postJoin","message" =>"postJoin"];
    }
    public function getCancel()
    {
      $this->user->subscription()->cancel();
      return ['status' => "getCancel","message" =>"getCancel"];
    }
    public function getResume()
    {
      $this->user->subscription($this->user->stripe_plan)->resume();
      return ['status' => "getResume","message" =>"getResume"];
    }
}
  