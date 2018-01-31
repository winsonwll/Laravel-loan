<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/***********************************后台相关***********************************/
Route::group(['prefix' => 'admin'], function () {
    Route::group(['middleware'=>'check.login'], function(){
        //图形验证码
        Route::get('captcha/{tmp}','Service\ValidateController@captcha');
        
        //执行登录
        Route::post('login','Admin\LoginController@doLogin');
    });

    Route::group(['middleware'=>'check.admin.login'], function(){
        // 获取所有产品
        Route::get('allapps','Admin\AppsController@allapps');

        // 推荐
        Route::post('apps/recom/{id}','Admin\AppsController@doRecom');
        // 取消推荐
        Route::post('apps/cancelrecom/{id}','Admin\AppsController@doCancelRecom');
        // 上线
        Route::post('apps/online/{id}','Admin\AppsController@doOnline');
        // 下线
        Route::post('apps/offline/{id}','Admin\AppsController@doOffline');
        // 上传ICON
        Route::post('apps/uploadIcon','Admin\AppsController@uploadIcon');
        // 更改排序
        Route::post('apps/sort','Admin\AppsController@doSort');
        
        // 产品管理
        Route::resource('apps', 'Admin\AppsController');

        // 上传ICON
        Route::post('ads/uploadAd','Admin\AdsController@uploadAd');
        // 上线
        Route::post('ads/online/{id}','Admin\AdsController@doOnline');
        // 下线
        Route::post('ads/offline/{id}','Admin\AdsController@doOffline');
        // 广告管理
        Route::resource('ads', 'Admin\AdsController');

        // 冻结
        Route::post('users/frozen/{id}','Admin\UsersController@doFrozen');
        // 解冻
        Route::post('users/thaw/{id}','Admin\UsersController@doThaw');
        // 申请记录
        Route::get('users/record/{id}','Admin\UsersController@record');
        // 用户管理
        Route::resource('users', 'Admin\UsersController');

        // 记录管理
        Route::resource('records', 'Admin\RecordsController');

        // 管理员管理
        Route::resource('admin', 'Admin\AdminController');

        //退出后台
        Route::get('logout','Admin\LoginController@logout');
    });
});

# Vue
Route::combine([
    '/',
    '/login',
    '/reg',
    '/log',
    '/index',

    '/apps',
    '/appsindex',
    '/appscreate',
    '/appsedit/{id}',
    '/appsshow/{id}',

    '/ads',
    '/adsindex',
    '/adscreate',
    '/adsedit/{id}',
    '/adsshow/{id}',
    
    '/users',
    '/usersindex',
    '/usersrecord/{uid}',

    '/records',
    '/recordsindex',

    '/admin',
    '/adminindex',
    '/admincreate',
    '/adminedit/{id}'
], function () {
    return view('index');
});