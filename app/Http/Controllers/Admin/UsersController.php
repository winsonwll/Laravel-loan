<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Users;
use App\Models\Records;

class UsersController extends Controller
{
    /**
     * 显示用户列表页
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // 读取数据 并且分页
        $list = Users::where(function($query) use ($request){
            if($request->input('keyword')){
                $query->where('phone','like','%'.$request->input('keyword').'%');
            }
        })
            ->orderBy('id', 'desc')
            ->paginate(10);

        return response()->json([
            'status' => 0,
            'msg' => 'success',
            'data' => $list
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * 从存储器中移除指定用户
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data['status'] = 2;

        $res = Users::where('id', $id)->update($data);
        if($res){
            return response()->json([
                'status' => 0,
                'msg' => '删除成功'
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => '删除失败'
            ]);
        }
    }

    /**
     * 冻结
     *
     * @param Request $request
     * @return Response
     */
    public function doFrozen($id)
    {
        $data['status'] = 0;

        $res = Users::where('id', $id)->update($data);
        if($res){
            return response()->json([
                'status' => 0,
                'msg' => '冻结成功'
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => '冻结失败'
            ]);
        }
    }

    /**
     * 解冻
     *
     * @param Request $request
     * @return Response
     */
    public function doThaw($id)
    {
        $data['status'] = 1;

        $res = Users::where('id', $id)->update($data);
        if($res){
            return response()->json([
                'status' => 0,
                'msg' => '解冻成功'
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => '解冻失败'
            ]);
        }
    }

    /**
     * 显示申请记录
     *
     * @param int $id
     * @return Response
     */
    public function record($id)
    {
        $res = Records::where('uid', $id)
            ->leftJoin('users', 'records.uid', '=', 'users.id')
            ->leftJoin('apps', 'records.aid', '=', 'apps.id')
            ->select('records.*', 'users.phone', 'apps.name', 'apps.min_money', 'apps.max_money', 'apps.min_term', 'apps.max_term', 'apps.interest_type', 'apps.min_rate', 'apps.max_rate')
            ->orderBy('id', 'desc')
            ->paginate(10);

        if($res){
            return response()->json([
                'status' => 0,
                'msg' => 'success',
                'data' => $res
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => 'error'
            ]);
        }
    }
}