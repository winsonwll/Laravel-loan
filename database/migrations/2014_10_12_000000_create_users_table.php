<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * 运行数据库迁移
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');                               //用户id
            $table->char('phone', 11)->unique();                    //注册手机号
            $table->char('password', 100);                          //注册密码
            $table->string('name')->nullable();                     //姓名
            $table->unsignedTinyInteger('sex')->nullable();         //性别 0，先生  1，女士
            $table->unsignedTinyInteger('client_type')->nullable();             //设备类型  0，iphone  1，ipad  2，安卓  3，其他
            $table->dateTime('last_login_time')->nullable();                    //最近登录时间
            $table->ipAddress('last_login_ip')->nullable();                     //最近登录IP
            $table->unsignedTinyInteger('status')->default(1);      //状态  1，有效  2，冻结  3，删除
            $table->rememberToken()->nullable();                                 //记住我
            $table->dateTime('created_at')->nullable();                         //创建时间
            $table->dateTime('updated_at')->nullable();                         //更新时间
        });
    }

    /**
     * 回滚数据库迁移
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
