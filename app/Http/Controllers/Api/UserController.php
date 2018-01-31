<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Session;
use App\User;
use App\Models\Sessions;
use App\Models\TempPhone;
use App\Models\Telbooks;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * 登录
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request){
        //验证session
        $session = $request->header('session');
        if(empty($session)) {
            return response()->json([
                'status' =>11,
                'msg' => '非法请求'
            ]);
        }

        $session_id = Sessions::where('id', $session)->first();
        if ($session != $session_id->id) {
            return response()->json([
                'status' =>12,
                'msg' => 'Session不一致'
            ]);
        }


        //验证验证码
        $vcode = $request->input('vcode', '');
        if($vcode == '') {
            return response()->json([
                'status' =>1,
                'msg' => '验证码不能为空'
            ]);
        }else{
            $sessionVcode = Session::get('vcode');

            if($vcode != $sessionVcode) {
                return response()->json([
                    'status' =>2,
                    'msg' => '验证码错误'
                ]);
            }
        }

        // 记住用户
        if(Auth::attempt(['phone' => request('phone'), 'password' => request('password'), 'status' => 1], true)){
            //获取当前已通过认证的用户
            $res = Auth::user();

            if($res){
                $success['id'] =  $res['id'];
                $success['access_token'] =  $res->createToken('MyApp')->accessToken;

                $data['client_type'] = $this->clientType();    //设备类型
                $data['last_login_ip'] = $_SERVER["REMOTE_ADDR"];
                $data['last_login_time'] = date('Y-m-d H:i:s');
                User::where('id', $res['id'])->update($data);

                //通讯录
                $d['telbook'] = $request->input('telbook', '');
                if($d['telbook']){
                    $result = Telbooks::where('uid', $res['id'])->first();
                    if($result) {
                        Telbooks::where('uid', $res['id'])->update($d);
                    } else {
                        Telbooks::create($d);
                    }
                }


                return response()->json([
                    'status' =>0,
                    'msg' => '登录成功',
                    'data' => $success
                ]);
            }else{
                return response()->json([
                    'status' => 3,
                    'msg' => '登录失败，手机号或密码错误'
                ]);
            }
        }
        else{
            return response()->json([
                'status' => 4,
                'msg' => '登录失败，手机号或密码错误'
            ]);
        }
    }

    /**
     * 注册 api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $data = $request->all();
        $patternPhone = '/^1[34578]{1}\d{9}$/';
        $patternPwd = '/^[0-9a-zA-z]{6,12}$/';

        //验证手机号
        if(empty($data['phone'])) {
            return response()->json([
                'status' => 1,
                'msg' => '手机号不能为空'
            ]);
        }else{
            if(!preg_match($patternPhone, $data['phone'])){
                return response()->json([
                    'status' => 2,
                    'msg' => '手机号格式不正确'
                ]);
            }
        }

        //验证密码
        if(empty($data['password'])) {
            return response()->json([
                'status' => 3,
                'msg' => '密码不能为空'
            ]);
        }else{
            if(!preg_match($patternPwd, $data['password'])){
                return response()->json([
                    'status' => 4,
                    'msg' => '密码为6-12位字符'
                ]);
            }
        }

        //验证短信验证码
        if(empty($data['code'])) {
            return response()->json([
                'status' => 5,
                'msg' => '短信验证码不能为空'
            ]);
        } else{
            $tempPhone = TempPhone::where('phone', $data['phone'])->first();
            if($tempPhone['code'] != $data['code']){
                return response()->json([
                    'status' => 7,
                    'msg' => '短信验证码不正确'
                ]);
            }
        }

        $phone = User::where('phone', $data['phone'])->first();
        if($phone){
            return response()->json([
                'status' => 8,
                'msg' => '该手机号已注册，请直接登录'
            ]);
        }

        $data['password'] = Hash::make($data['password']);
        unset($data['code']);

        //执行注册
        $res = User::create($data);
        if($res){
            return response()->json([
                'status' => 0,
                'msg' => '注册成功'
            ]);
        }else{
            return response()->json([
                'status' => 9,
                'msg' => '注册失败'
            ]);
        }
    }


    /**
     * 确认手机号是否注册 api
     *
     * @return \Illuminate\Http\Response
     */
    public function confirmPhone(Request $request)
    {
        $data = $request->all();
        $patternPhone = '/^1[34578]{1}\d{9}$/';

        //验证手机号
        if(empty($data['phone'])) {
            return response()->json([
                'status' => 1,
                'msg' => '手机号不能为空'
            ]);
        }else{
            if(!preg_match($patternPhone, $data['phone'])){
                return response()->json([
                    'status' => 2,
                    'msg' => '手机号格式不正确'
                ]);
            }
        }

        //验证短信验证码
        if(empty($data['code'])) {
            return response()->json([
                'status' => 3,
                'msg' => '短信验证码不能为空'
            ]);
        } else {
            $tempPhone = TempPhone::where('phone', $data['phone'])->first();
            if($tempPhone['code'] != $data['code']){
                return response()->json([
                    'status' => 5,
                    'msg' => '短信验证码不正确'
                ]);
            }
        }

        //执行查询
        $res = User::where('phone', $data['phone'])->first();
        if($res){
            return response()->json([
                'status' => 0,
                'msg' => '继续下一步重置密码'
            ]);
        }else{
            return response()->json([
                'status' => 6,
                'msg' => '该手机号未注册，请去注册'
            ]);
        }
    }


    /**
     * 未登录—重置密码 api
     *
     * @return \Illuminate\Http\Response
     */
    public function resetPwd(Request $request)
    {
        $data = $request->all();
        $patternPhone = '/^1[34578]{1}\d{9}$/';
        $patternPwd = '/^[0-9a-zA-z]{6,12}$/';

        //验证手机号
        if(empty($data['phone'])) {
            return response()->json([
                'status' => 1,
                'msg' => '手机号不能为空'
            ]);
        }else{
            if(!preg_match($patternPhone, $data['phone'])){
                return response()->json([
                    'status' => 2,
                    'msg' => '手机号格式不正确'
                ]);
            }
        }

        //验证短信验证码
        if(empty($data['code'])) {
            return response()->json([
                'status' => 3,
                'msg' => '短信验证码不能为空'
            ]);
        } else {
            $tempPhone = TempPhone::where('phone', $data['phone'])->first();
            if($tempPhone['code'] != $data['code']){
                return response()->json([
                    'status' => 5,
                    'msg' => '短信验证码不正确'
                ]);
            }
        }

        //验证密码
        if(empty($data['password'])) {
            return response()->json([
                'status' => 6,
                'msg' => '密码不能为空'
            ]);
        }else{
            if(!preg_match($patternPwd, $data['password'])){
                return response()->json([
                    'status' => 7,
                    'msg' => '密码为6-12位字符'
                ]);
            }
        }

        //验证确认密码
        if(empty($data['repassword'])) {
            return response()->json([
                'status' => 8,
                'msg' => '确认密码不能为空'
            ]);
        }else{
            if($data['repassword'] != $data['password']){
                return response()->json([
                    'status' => 10,
                    'msg' => '两次密码不一致'
                ]);
            }
        }

        $data['password'] = Hash::make($data['password']);
        unset($data['code']);
        unset($data['repassword']);

        //执行更新
        $res = User::where('phone', $data['phone'])->update($data);
        if($res){
            return response()->json([
                'status' => 0,
                'msg' => '密码修改成功'
            ]);
        }else{
            return response()->json([
                'status' => 11,
                'msg' => '密码修改失败'
            ]);
        }
    }


    /**
     * 登录—修改密码 api
     *
     * @return \Illuminate\Http\Response
     */
    public function alterPwd(Request $request)
    {
        $data = $request->all();
        $patternPwd = '/^[0-9a-zA-z]{6,12}$/';

        //验证用户id是否存在
        if(empty($data['id'])) {
            return response()->json([
                'status' => 8,
                'msg' => '用户id不能为空'
            ]);
        }

        //验证原密码
        if(empty($data['oldpassword'])) {
            return response()->json([
                'status' => 1,
                'msg' => '原密码不能为空'
            ]);
        }else{
            if(!preg_match($patternPwd, $data['oldpassword'])){
                return response()->json([
                    'status' => 2,
                    'msg' => '原密码为6-12位字符'
                ]);
            }
        }

        //验证新密码
        if(empty($data['password'])) {
            return response()->json([
                'status' => 3,
                'msg' => '新密码不能为空'
            ]);
        }else{
            if(!preg_match($patternPwd, $data['password'])){
                return response()->json([
                    'status' => 4,
                    'msg' => '新密码为6-12位字符'
                ]);
            }
        }

        //验证确认新密码
        if(empty($data['repassword'])) {
            return response()->json([
                'status' => 5,
                'msg' => '确认密码不能为空'
            ]);
        }else{
            if($data['repassword'] != $data['password']){
                return response()->json([
                    'status' => 6,
                    'msg' => '两次密码不一致'
                ]);
            }
        }

        //验证原密码和新密码不能一样
        if($data['oldpassword'] == $data['password']){
            return response()->json([
                'status' => 7,
                'msg' => '原密码和新密码不能一样'
            ]);
        }

        //根据用户名获取用户信息
        $res = User::where('id', $data['id'])->first();

        if(!empty($res) && Hash::check($data['oldpassword'], $res->password)){
            $data['password'] = Hash::make($data['password']);
            unset($data['oldpassword']);
            unset($data['repassword']);

            //执行更新
            $result = User::where('id', $data['id'])->update($data);
            if($result){
                return response()->json([
                    'status' => 0,
                    'msg' => '密码修改成功'
                ]);
            }else{
                return response()->json([
                    'status' => 11,
                    'msg' => '密码修改失败'
                ]);
            }
        }else{
            return response()->json([
                'status' => 12,
                'msg' => '原密码错误'
            ]);
        }
    }



    /**
     * details api
     *
     * @return \Illuminate\Http\Response
     */
    public function details()
    {
        $res = Auth::user();

        if($res){
            return response()->json([
                'status' => 0,
                'msg' => '请求成功',
                'data' => (object)$res
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => 'Error：未经授权'
            ]);
        }
    }

    /**
     * 退出 api
     *
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        if (Auth::check()) {
            Auth::user()->token()->delete();
        }

        return response()->json([
            'status' => 0,
            'msg' => '退出成功'
        ]);
    }

    /**
     * 获取设备类型
     */
    private function clientType() {
        $client_type = '';
        $agent = strtolower($_SERVER['HTTP_USER_AGENT']);

        $iphone = (strpos($agent, 'iphone')) ? true : false;
        $ipad = (strpos($agent, 'ipad')) ? true : false;
        $android = (strpos($agent, 'android')) ? true : false;
        if($iphone){
            $client_type = 0;
        } elseif ($ipad){
            $client_type = 1;
        } elseif ($android){
            $client_type = 2;
        } else{
            $client_type = 3;
        }

        return $client_type;
    }
}
