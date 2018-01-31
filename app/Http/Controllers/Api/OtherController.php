<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OtherController extends Controller
{
    /**
     * 判断iOS是否为审核版本
     *
     * @param Request $request
     * @return Response
     */
    public function isVersion(Request $request)
    {
        $v = '1.0.0';
        $version = $request->input('version');

        if(empty($version)) {
            return response()->json([
                'status' => 2,
                'msg' => '请传版本号'
            ]);
        }

        if($version !== $v) {
            return response()->json([
                'status' => 1,
                'msg' => '正式版本'
            ]);
        } else {
            return response()->json([
                'status' => 0,
                'msg' => '审核版本'
            ]);
        }
    }


    /**
     * 用户注册协议
     *
     * @param Request $request
     * @return Response
     */
    public function agreementReg()
    {
        return view('other.agreement_reg');
    }


    /**
     * 客服问题
     *
     * @param Request $request
     * @return Response
     */
    public function help()
    {
        //return view('other.help');

        return redirect('http://m.dai.360.cn/index/question');
    }


    /**
     * 意见反馈
     *
     * @param Request $request
     * @return Response
     */
    public function feedback()
    {
        return view('other.feedback');
    }
}
