<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Admin;
use Gregwar\Captcha\CaptchaBuilder;
use Session;
use Crypt;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    /**
     * 执行登录
     */
    public function doLogin(Request $request)
    {
        $data = $request->all();
        $pattern = '/^[0-9a-zA-z]{6,12}$/';

        //验证账号
        if(empty($data['name'])) {
            return response()->json([
                'status' => 201,
                'msg' => '用户名不能为空'
            ]);
        }else{
            if(!preg_match($pattern, $data['name'])){
                return response()->json([
                    'status' => 202,
                    'msg' => '用户名为6-12位字符'
                ]);
            }
        }

        //验证密码
        if(empty($data['password'])) {
            return response()->json([
                'status' => 203,
                'msg' => '密码不能为空'
            ]);
        }else{
            if(!preg_match($pattern, $data['password'])){
                return response()->json([
                    'status' => 204,
                    'msg' => '密码为6-12位字符'
                ]);
            }
        }

        //验证验证码
        if(empty($data['vcode'])){
            return response()->json([
                'status' => 205,
                'msg' => '验证码不能为空！'
            ]);
        }else{
            $sessionVcode = Session::get('vcode');
            if($data['vcode'] != $sessionVcode) {
                return response()->json([
                    'status' => 206,
                    'msg' => '验证码错误！'
                ]);
            }
        }

        //根据用户名获取用户信息
        $res = Admin::where('name', $data['name'])->first();

        if(!empty($res) && Hash::check($data['password'], $res->password)){
            $request->session()->put('admin', $res);      //登录成功 则记录登录信息

            //自动登录
            //$str = $data['name'].'|'.$data['password'];
            //加密
            //$accessAdmin = Crypt::encrypt($str);
            //写入cookie
            //\Cookie::queue('accessAdmin', $data['name'], 60*24*30);

            $admin = Admin::find($res->id);
            $admin->last_login_time = date('Y-m-d H:i:s');
            $admin->last_login_ip = $_SERVER["REMOTE_ADDR"];
            $admin->save();

            return response()->json([
                'status' => 0,
                'msg' => '登录成功'
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => '登录失败，用户名或密码错误'
            ]);
        }
    }

    /**
     * 验证码
     */
    public function captcha($tmp)
    {
        //生成验证码图片的Builder对象，配置相应属性
        $builder = new CaptchaBuilder();
        //可以设置图片宽高及字体
        $builder->build($width = 100, $height = 34, $font = null);
        //获取验证码的内容
        $phrase = $builder->getPhrase();

        //把内容存入session
        Session::flash('vcode', $phrase);

        //生成图片
        ob_clean();     //清除
        return response($builder->output())->header('Content-type','image/jpeg');
    }

    /**
     * 退出
     */
    public function logout()
    {
        Session::forget('admin'); //删除session对应的值
        \Cookie::forget('accessAdmin');    //删除cookie对应的值

        return response()->json([
            'status' => 0,
            'msg' => '退出成功'
        ]);
    }
}
