<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    /**
     * 显示管理员列表页
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $list = Admin::all();

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
     * 添加管理员
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->except('repassword');

        $name = Admin::where('name', $data['name'])->first();
        if($name){
            return response()->json([
                'status' => 205,
                'msg' => '用户名已经存在，请重新输入'
            ]);
        }

        $data['password'] = Hash::make($data['password']);

        //执行添加
        $res = Admin::create($data);
        if($res){
            return response()->json([
                'status' => 0,
                'msg' => '注册成功'
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => '注册失败！'
            ]);
        }
    }

    /**
     * 显示指定管理员
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $res = Admin::find($id);
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
     * 在存储器中更新指定管理员
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->except(['name', 'repassword']);
        
        $data['password'] = Hash::make($data['password']);

        $res = Admin::where('id', $id)->update($data);
        if($res){
            return response()->json([
                'status' => 0,
                'msg' => '修改成功'
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => '修改失败'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $res = Admin::destroy($id);
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
}
