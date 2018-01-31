<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAppsTable extends Migration
{
    /**
     * 运行数据库迁移
     *
     * @return void
     */
    public function up()
    {
        Schema::create('apps', function (Blueprint $table) {
            $table->increments('id');                               //产品id
            $table->string('name', 50);                             //产品名称
            $table->string('icon');                                 //产品图标
            $table->integer('min_money')->unsigned();               //最低借款额度（元）
            $table->integer('max_money')->unsigned();               //最高借款额度（元）
            $table->integer('min_term')->unsigned();                //最低借款期限（天）
            $table->integer('max_term')->unsigned();                //最高借款期限（天）
            $table->unsignedTinyInteger('interest_type');           //费率类型   0，日费率   1，月费率
            $table->decimal('min_rate', 5, 2);                      //参考费率  日利率，小数点后面2位   月利率，小数点后面2位
            $table->decimal('max_rate', 5, 2);                      //参考费率  日利率，小数点后面2位   月利率，小数点后面2位
            $table->string('requirements');                         //申请条件
            $table->string('authentication');  
            //认证资料 （0 基本信息，1 身份认证，2 手机认证，3 芝麻信用，4 信用卡，5 填写联系人，6 填写工作信息，7 信用卡账单，8 淘宝认证，9 征信查询）
            $table->string('link');                                 //申请链接
            $table->integer('applicants')->unsigned()->nullable();  //申请人数
            $table->decimal('success_rate', 5, 2)->nullable();      //借款成功率（%）
            $table->string('description');                          //描述 多个用空格隔开
            $table->integer('lend_time')->unsigned();               //最快放款时间（分钟）
            $table->string('user_type');                            //可借贷人群  
            //0，无工作  1，蓝领  2，白领  3，上班族  4， 个体户  5，企业主  6，学生党
            $table->string('c_name');                               //所属公司
            $table->string('c_phone')->nullable();                  //客服电话
            $table->string('c_mobile')->nullable();                 //信贷联系人
            $table->decimal('price', 5, 2);                         //投放单价
            $table->integer('count')->unsigned();                   //投放数量
            $table->unsignedTinyInteger('status')->default(0);      //状态 0，未上线  1，已上线  2，已下线  3，已结束  4，已删除
            $table->unsignedTinyInteger('is_hot')->default(0);      //是否推荐  0，不推荐  1，推荐
            $table->dateTime('start_time')->nullable();             //上线时间
            $table->dateTime('end_time')->nullable();               //结束时间
            $table->dateTime('created_at')->nullable();             //创建时间
            $table->dateTime('updated_at')->nullable();             //更新时间
            $table->integer('viewCnt')->unsigned()->default(0);     //浏览数
            $table->integer('clickCnt')->unsigned()->default(0);    //点击申请数
        });
    }

    /**
     * 回滚数据库迁移
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('apps');
    }
}
