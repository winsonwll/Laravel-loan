<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdsTable extends Migration
{
    /**
     * 运行数据库迁移
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ads', function (Blueprint $table) {
            $table->increments('id');                           //广告id
            $table->integer('aid')->unsigned();                 //产品id
            $table->string('name', 50);                        //产品名称
            $table->string('title');                            //广告标题
            $table->unsignedTinyInteger('type')->default(0);    //广告类型  0，banner广告  1，开屏广告  2，弹窗广告
            $table->string('pic');                              //广告图片
            $table->integer('showCnt')->unsigned()->nullable(); //曝光展示数
            $table->unsignedTinyInteger('status')->default(0);  //状态 0，未上线  1，已上线  2，已下线  3，已结束  4，已删除
            $table->integer('viewCnt')->unsigned()->default(0); //浏览数
            $table->integer('clickCnt')->unsigned()->default(0);    //点击数
            $table->dateTime('start_time')->nullable();         //上线时间
            $table->dateTime('end_time')->nullable();           //结束时间
            $table->dateTime('created_at')->nullable();         //创建时间
            $table->dateTime('updated_at')->nullable();         //更新时间
            $table->string('outLink')->nullable();              //外链链接
        });
    }

    /**
     * 回滚数据库迁移
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ads');
    }
}
