<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRecordsTable extends Migration
{
    /**
     * 运行数据库迁移
     *
     * @return void
     */
    public function up()
    {
        Schema::create('records', function (Blueprint $table) {
            $table->increments('id');                           //记录id
            $table->integer('uid')->unsigned();                 //用户id
            $table->integer('aid')->unsigned();                 //产品id
            $table->unsignedTinyInteger('client_type');         //设备类型  0，苹果  1，安卓  2，web  3，其他
            $table->string('longitude', 50)->nullable();                    //经度
            $table->string('latitude', 50)->nullable();                     //纬度
            $table->string('address')->nullable();                          //地址
            $table->ipAddress('ip')->nullable();                            //ip
            $table->dateTime('created_at')->nullable();                     //创建时间
            $table->dateTime('updated_at')->nullable();                     //更新时间
        });
    }

    /**
     * 回滚数据库迁移
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('records');
    }
}
