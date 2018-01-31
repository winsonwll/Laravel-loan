<?php

namespace App\Http\Controllers\Service;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Gregwar\Captcha\CaptchaBuilder;
use Session;
use App\Tool\SMS\SendTemplateSMS;
use App\Models\Sessions;
use App\Models\TempPhone;
use App\Models\M3Result;


class ValidateController extends Controller
{
    /**
     * 发送短信验证码
     */
    public function sendSMS(Request $request)
    {
        $m3_result = new M3Result;

        //验证session
        $session = $request->header('session');
        if(empty($session)) {
            $m3_result->status = 11;
            $m3_result->msg = '非法请求';
            return $m3_result->toJson();
        }

        $session_id = Sessions::where('id', $session)->first();
        if ($session != $session_id->id) {
            $m3_result->status = 12;
            $m3_result->msg = 'Session不一致';
            return $m3_result->toJson();
        }

        //验证手机号
        $phone = $request->input('phone', '');
        if($phone == '') {
            $m3_result->status = 1;
            $m3_result->msg = '手机号不能为空';
            return $m3_result->toJson();
        }
        if(strlen($phone) != 11 || $phone[0] != '1') {
            $m3_result->status = 2;
            $m3_result->msg = '手机格式不正确';
            return $m3_result->toJson();
        }

        //验证验证码
        $vcode = $request->input('vcode', '');
        if($vcode == '') {
            $m3_result->status = 1;
            $m3_result->msg = '验证码不能为空';
            return $m3_result->toJson();
        }else{
            $sessionVcode = Session::get('vcode');

            if($vcode != $sessionVcode) {
                $m3_result->status = 2;
                $m3_result->msg = '验证码错误';
                return $m3_result->toJson();
            }
        }

        $sendTemplateSMS = new SendTemplateSMS;
        $code = '';
        $charset = '1234567890';
        $_len = strlen($charset) - 1;
        for ($i = 0;$i < 6;++$i) {
            $code .= $charset[mt_rand(0, $_len)];
        }
        $m3_result = $sendTemplateSMS->sendTemplateSMS($phone, array($code, 60), 1);

        if(!is_string($m3_result->status)){
            $m3_result->status = json_decode(json_encode($m3_result->status), true)[0];
            if($m3_result->status == '000000'){
                $m3_result->status = 0;
                //$m3_result->msg = json_decode(json_encode($m3_result->msg), true);
                $m3_result->msg = '发送成功！';
            }else{
                $m3_result->msg = json_decode(json_encode($m3_result->msg), true)[0];
            }
        }

        if($m3_result->status == 0) {
            $tempPhone = TempPhone::where('phone', $phone)->first();
            if($tempPhone == null) {
                $tempPhone = new TempPhone;
            }
            $tempPhone->phone = $phone;
            $tempPhone->code = $code;
            $tempPhone->deadline = date('Y-m-d H-i-s', time() + 60*60);
            $tempPhone->save();
        }

        return $m3_result->toJson();
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

        //清除缓存
        ob_clean();

        //生成图片
        $oldPath = './';
        $newPath = 'captchas/';
        $filename = time().rand(1000,9999).'.jpg';
        $builder->save($filename);

        copy($oldPath.$filename, $newPath.$filename);
        unlink($filename);

        if($filename){
            //把内容存入session
            Session::flash('vcode', $phrase);

            return response()->json([
                'status' => 0,
                'msg' => '获取验证码成功',
                'data' => [
                    'session' => Session::getId(),
                    'captcha' => getenv('APP_URL').'/'.$newPath.$filename
                ]
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => '获取验证码失败'
            ]);
        }
    }
}