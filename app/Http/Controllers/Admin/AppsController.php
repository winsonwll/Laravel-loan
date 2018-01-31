<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Apps;
use Config;
use Intervention\Image\ImageManagerStatic as Image;

class AppsController extends Controller
{
    /**
     * 显示所有产品列表.
     *
     * @param Request $request
     * @return Response
     */
    public function allapps(Request $request)
    {
        $list = Apps::get();

        return response()->json([
            'status' => 0,
            'msg' => 'success',
            'data' => $list
        ]);
    }

    /**
     * 显示产品列表.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        // 读取数据 并且分页
        $list = Apps::where(function($query) use ($request){
                    if($request->input('id')){
                        $query->where('id', $request->input('id'));
                    }
        
                    if($request->input('tm_from') && $request->input('tm_to')){
                        $query->whereBetween('created_at', [$request->input('tm_from'), $request->input('tm_to')]);
                    }
                })
            ->where('status', '!=', '4')
            ->orderBy('updated_at', 'asc')
            ->paginate(10);

        return response()->json([
            'status' => 0,
            'msg' => 'success',
            'data' => $list
        ]);
    }

    /**
     * 创建新产品表单页面
     *
     * @return Response
     */
    public function create()
    {
        //
    }


    /**
     * 上传产品ICON
     *
     * @param Request $request
     * @return Response
     */
    public function uploadIcon(Request $request)
    {
        //实现图片上传 且随机文件名
        if($request->hasFile('file')){                      //判断是否有上传
            $file=$request->file('file');                   //获取上传信息
            if($file->isValid()){                           //确认上传的文件是否成功
                $ext=$file->getClientOriginalExtension();   //获取上传文件名的后缀名
                $filename=time().rand(1000,9999).'.'.$ext;
                $file->move(Config::get('app.upload_dir'),$filename);    //执行移动上传文件

                //第三方插件执行等比缩放
                $img = Image::make(Config::get('app.upload_dir').$filename)->fit(128,128,function($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });

                $res = $img->save(Config::get('app.upload_dir')."s_".$filename); //另存为
                if($res){
                    return response()->json([
                        'status' => 0,
                        'msg' => '文件上传成功',
                        'data' =>  getenv('APP_URL').'/'.Config::get('app.upload_dir')."s_".$filename
                    ]);
                }
            }else{
                return response()->json([
                    'status' => 202,
                    'msg' => '文件上传失败'
                ]);
            }
        }else{
            return response()->json([
                'status' => 201,
                'msg' => '无法获取上传文件'
            ]);
        }
    }


    /**
     * 将新创建的产品存储到存储器
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        //提取部分参数
        $file = $request->input('file');
        $data = $request->except('file');
        $data['icon'] = $file[0]['response']['data'];
        $data['authentication'] = implode(',', $data['authentication']);
        $data['user_type'] = implode(',', $data['user_type']);

        unset($file);

        //执行创建
        $res = Apps::create($data);
        if($res){
            //创建成功
            return response()->json([
                'status' => 0,
                'msg' => '创建成功'
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => '创建失败'
            ]);
        }
    }

    /**
     * 显示指定产品
     *
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        $res = Apps::find($id);
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
     * 显示编辑指定产品的表单页面
     *
     * @param int $id
     * @return Response
     */
    public function edit($id)
    {

    }

    /**
     * 在存储器中更新指定产品
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();
        $data['authentication'] = implode(',', $data['authentication']);
        $data['user_type'] = implode(',', $data['user_type']);
        
        $res = Apps::where('id', $id)->update($data);
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
     * 从存储器中移除指定产品
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        $data['status'] = 4;

        $res = Apps::where('id', $id)->update($data);
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
     * 推荐
     *
     * @param Request $request
     * @return Response
     */
    public function doRecom($id)
    {
        $data['is_hot'] = 1;

        $res = Apps::where('id', $id)->update($data);
        if($res){
            return response()->json([
                'status' => 0,
                'msg' => '推荐成功'
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => '推荐失败'
            ]);
        }
    }

    /**
     * 取消推荐
     *
     * @param Request $request
     * @return Response
     */
    public function doCancelRecom($id)
    {
        $data['is_hot'] = 0;

        $res = Apps::where('id', $id)->update($data);
        if($res){
            return response()->json([
                'status' => 0,
                'msg' => '取消推荐成功'
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => '取消推荐失败'
            ]);
        }
    }


    /**
     * 上线
     *
     * @param Request $request
     * @return Response
     */
    public function doOnline($id)
    {
        $data['status'] = 1;
        $data['start_time'] = date('Y-m-d H:i:s');            //上线时间
        
        $res = Apps::where('id', $id)->update($data);
        if($res){
            return response()->json([
                'status' => 0,
                'msg' => '上线成功'
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => '上线失败'
            ]);
        }
    }

    /**
     * 下线
     *
     * @param Request $request
     * @return Response
     */
    public function doOffline($id)
    {
        $data['status'] = 2;
        $data['end_time'] = date('Y-m-d H:i:s');            //结束时间
        
        $res = Apps::where('id', $id)->update($data);
        if($res){
            return response()->json([
                'status' => 0,
                'msg' => '下线成功'
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => '下线失败'
            ]);
        }
    }

    /**
     * 排序
     *
     * @param Request
     * @return Response
     */
    public function doSort(Request $request)
    {
        $sort = $request->input('sort');

        foreach ($sort as $key => $value) {
            $res[] = Apps::where('id', $value)->update(['updated_at' => date('Y-m-d H:i:s')]);
            sleep(1);
        }

        if(count($res) == count($sort )){
            return response()->json([
                'status' => 0,
                'msg' => '排序更新成功'
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => '排序更新失败'
            ]);
        }
    }
}
