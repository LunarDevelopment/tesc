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

    public function pay(Request $request){
      
      $token  = $request['token'];
      $cutomer_id  =$request['customer_id'];
      $total_price  =$request['total']*100;

      $user = User::find($cutomer_id);
      if (!$user->subscribed()) {
        $user->subscription('Basic')->create($token);
      }
      if ($user->subscribed()) {
        $mess = ['status' => "OK","message" =>"Payment ok"];
        return $mess;
      }else{
        $mess = ['status' => "ERROR","message" =>"Error submitting payment"];
        return $mess;
      }
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
