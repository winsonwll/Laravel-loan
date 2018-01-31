<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTelbooksTable extends Migration
{
    /**
     * 运行数据库迁移
     *
     * @return void
     */
    public function up()
    {
        Schema::create('telbooks', function (Blueprint $table) {
            $table->increments('id');                           //通讯录id
            $table->integer('uid')->unsigned();                 //用户id
            $table->longText('telbook');                        //通讯录
            $table->dateTime('created_at')->nullable();         //创建时间
            $table->dateTime('updated_at')->nullable();         //更新时间
        });
    }

    /**
     * 回滚数据库迁移
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('telbooks');
    }
}
