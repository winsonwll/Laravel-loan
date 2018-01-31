<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdminTable extends Migration
{
    /**
     * 运行数据库迁移
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admin', function (Blueprint $table) {
            $table->increments('id');                           //管理员id
            $table->char('name', 12)->unique();                 //用户名
            $table->char('password', 100);                      //密码
            $table->unsignedTinyInteger('auth')->default(0);    //权限 0：普通管理员  1：超级管理员
            $table->dateTime('last_login_time')->nullable();    //最近登录时间
            $table->ipAddress('last_login_ip')->nullable();     //最近登录ip
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
        Schema::dropIfExists('admin');
    }
}
