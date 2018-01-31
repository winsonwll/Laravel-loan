<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTempPhoneTable extends Migration
{
    /**
     * 运行数据库迁移
     *
     * @return void
     */
    public function up()
    {
        Schema::create('temp_phone', function (Blueprint $table) {
            $table->increments('id');                           //id
            $table->char('phone', 11);                          //手机号
            $table->integer('code')->unsigned();                //短信验证码
            $table->timestamp('deadline')->nullable();          //过期时间
        });
    }

    /**
     * 回滚数据库迁移
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('temp_phone');
    }
}
