<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
      Schema::create('products', function(Blueprint $table)
      {
        $table->increments('id');
        $table->string('title')->nullable();
        $table->string('image')->nullable();
        $table->string('alt')->nullable();
        $table->string('caption')->nullable();
        $table->longText('content')->nullable();
        $table->timestamps();
      });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('products', function(Blueprint $table)
		{
			//
		});
	}

}
