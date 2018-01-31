<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//图形验证码
Route::get('captcha/{tmp}','Service\ValidateController@captcha');
//获取短信验证码
Route::post('sendSms', 'Service\ValidateController@sendSMS');

//注册
Route::post('register', 'Api\UserController@register');
//登录
Route::post('login', 'Api\UserController@login');

//确认手机号是否注册
Route::post('confirmPhone', 'Api\UserController@confirmPhone');
//重置密码
Route::post('resetPwd', 'Api\UserController@resetPwd');


//判断iOS是否为审核版本
Route::post('version','Api\OtherController@isVersion');


//获取广告
Route::get('getAds','Api\ApiController@getAds');

//获取动态和导航
Route::get('getThematicBroadcast','Api\ApiController@getThematicBroadcast');

//获取贷款app列表
Route::get('getLoans','Api\ApiController@getLoans');

//具体贷款请求
Route::get('getLoan/{id}','Api\ApiController@getLoan');

//用芝麻分借
Route::get('getByZhima','Api\ApiController@getByZhima');
//本周放款王
Route::get('getByCount','Api\ApiController@getByCount');
//高成功率
Route::get('getBySuccessRate','Api\ApiController@getBySuccessRate');
//极速放款专区
Route::get('getByLendTime','Api\ApiController@getByLendTime');
//借款新口子
Route::get('getByStartTime','Api\ApiController@getByStartTime');
//无工作也能借
Route::get('getByUserType0','Api\ApiController@getByUserType0');
//蓝领借款专区
Route::get('getByUserType1','Api\ApiController@getByUserType1');
//白领借款专区
Route::get('getByUserType2','Api\ApiController@getByUserType2');


Route::group(['middleware' => 'auth:api'], function(){
    //查看用户详情
    Route::post('details', 'Api\UserController@details');

    //点击申请
    Route::get('postApply','Api\ApiController@postApply');

    //我的申请记录
    Route::get('getMyRecords/{uid}','Api\ApiController@getMyRecords');

    //我的具体某条申请记录
    Route::get('getMyRecord/{id}','Api\ApiController@getMyRecord');

    //修改密码
    Route::post('alterPwd', 'Api\UserController@alterPwd');

    //退出登录
    Route::get('logout', 'Api\UserController@logout');
});

//用户注册协议
Route::get('agreement_reg','Api\OtherController@agreementReg');

//客服问题
Route::get('help','Api\OtherController@help');

//意见反馈
Route::get('feedback','Api\OtherController@feedback');