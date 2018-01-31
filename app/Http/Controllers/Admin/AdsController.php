<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Ads;
use Config;
use Intervention\Image\ImageManagerStatic as Image;

class AdsController extends Controller
{
    /**
     * 显示广告列表.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        // 读取数据 并且分页
        $list = Ads::where(function($query) use ($request){
                if($request->input('aid')){
                    $query->where('aid', $request->input('aid'));
                }

                if($request->input('tm_from') && $request->input('tm_to')){
                    $query->whereBetween('created_at', [$request->input('tm_from'), $request->input('tm_to')]);
                }
            })
            ->where('status', '!=', '4')
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
     * 上传广告图片
     *
     * @param Request $request
     * @return Response
     */
    public function uploadAd(Request $request)
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
                        'msg' => '文件上传成功！',
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
     * 将新创建的广告存储到存储器
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        //提取部分参数
        $file = $request->input('file');
        $data = $request->except('file');
        $data['pic'] = $file[0]['response']['data'];

        unset($file);

        //执行创建
        $res = Ads::create($data);
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
     * 显示指定广告
     *
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        $res = Ads::find($id);
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
     * 在存储器中更新指定广告
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //提取部分参数
        $file = $request->input('file');
        $data = $request->except('file');
        $data['pic'] = $file[0]['response']['data'];

        unset($file);

        $res = Ads::where('id', $id)->update($data);
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
     * 从存储器中移除指定广告
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        $data['status'] = 4;

        $res = Ads::where('id', $id)->update($data);
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
     * 上线
     *
     * @param Request $request
     * @return Response
     */
    public function doOnline($id)
    {
        $data['status'] = 1;
        $data['start_time'] = date('Y-m-d H:i:s');            //上线时间

        $res = Ads::where('id', $id)->update($data);
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

        $res = Ads::where('id', $id)->update($data);
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
}
