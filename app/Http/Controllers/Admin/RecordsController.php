<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Records;

class RecordsController extends Controller
{
    /**
     * 显示记录列表.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        // 读取数据 并且分页
        $list = Records::where(function($query) use ($request){
                if($request->input('aid')){
                    $query->where('aid', $request->input('aid'));
                }
            })
            ->leftJoin('users', 'records.uid', '=', 'users.id')
            ->leftJoin('apps', 'records.aid', '=', 'apps.id')
            ->select('records.*', 'users.phone', 'apps.name', 'apps.min_money', 'apps.max_money', 'apps.min_term', 'apps.max_term', 'apps.interest_type', 'apps.min_rate', 'apps.max_rate', 'apps.price', 'apps.count')
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
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
