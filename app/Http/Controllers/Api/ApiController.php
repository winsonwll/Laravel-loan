<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Ads;
use App\Models\Apps;
use App\User;
use App\Models\Records;
use Curl\Curl;

class ApiController extends Controller
{
    private $api_url;
    private $img_url;
    private $icon;
    private $banner;
    private $bgcolor;

    public function __construct()
    {  
        $this->api_url = getenv('APP_URL').'/api/';
        $this->img_url = getenv('APP_URL').'/images/apimg/';

        $this->icon = [
            $this->img_url.'icon_nav01.png',
            $this->img_url.'icon_nav02.png',
            $this->img_url.'icon_nav03.png',
            $this->img_url.'icon_nav04.png',
            $this->img_url.'icon_nav05.png',
            $this->img_url.'icon_nav06.png',
            $this->img_url.'icon_nav07.png',
            $this->img_url.'icon_nav08.png'
        ];

        $this->banner = [
            $this->img_url.'banner01.png',
            $this->img_url.'banner02.png',
            $this->img_url.'banner03.png',
            $this->img_url.'banner04.png',
            $this->img_url.'banner05.png',
            $this->img_url.'banner06.png',
            $this->img_url.'banner07.png',
            $this->img_url.'banner08.png'
        ];

        $this->bgcolor = [ 
            '#02CCAD', 
            '#FF6600', 
            '#4205AE', 
            '#51B558', 
            '#F65259', 
            '#31B957', 
            '#FFA311', 
            '#0DAFEF'
        ];
    }


    /**
     * 请求广告
     *
     * @param Request $request
     * @return Response
     */
    public function getAds()
    {
        $lists = Ads::where('status', '1')
        ->select('ads.id', 'ads.aid', 'ads.name', 'ads.title', 'ads.type', 'ads.pic', 'ads.outLink')
        ->get();

        if(count($lists)){
            foreach ($lists as $k => $v) {
                switch ($v->type) {
                    case '0':
                        //banner广告
                        $list['banner'][] = $v;
                        break;

                    case '1':
                        //启动页广告
                        $list['startup'][] = $v;
                        break;

                    case '2':
                        //弹窗广告
                        $list['popup'][] = $v;
                        break;
                }
            }

            if(!empty($list['startup'])){
                $list['startup'] = array_pop($list['startup']);
            }

            if(!empty($list['startup'])){
                $list['popup'] = array_pop($list['popup']);
            }

            return response()->json([
                'status' => 0,
                'msg' => 'success',
                'data' => $list
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => '暂无在线广告'
            ]);
        }
    }
    

    /**
     * 请求动态列表和导航
     *
     * @param Request $request
     * @return Response
     */
    public function getThematicBroadcast(Request $request)
    {
        $test = $request->input('test');

        $broadcast_msg = $test ? '成功发红包' : '成功放款';
        $thematic_title = [
            '用芝麻分借',
            '本周放款王',
            '高成功率',
            '极速放款专区',
            '借款新口子',
            '无工作也能借',
            '蓝领借款专区',
            '白领借款专区'
        ];
        $thematic_test_title = [
            '小说',
            '爱情',
            '历史',
            '外国文学',
            '青春',
            '励志',
            '随笔',
            '传记'
        ];

        //可借贷人群  0，无工作  1，蓝领  2，白领  3，上班族  4， 个体户  5，企业主  6，学生党
        //认证资料 （基本信息：0，身份认证：1，手机认证：2，芝麻信用：3，信用卡：4，填写联系人：5，填写工作信息：6，信用卡账单：7，淘宝认证：8，征信查询：9）

        //app列表
        $apps_list = Apps::where('status', 1)
            ->orderByRaw('RAND()')
            ->take(20)
            ->get();

        $len = count($apps_list);
        if($len < 20){
            for($i = 0; $i < (20-$len); $i++) {
                $rand = mt_rand(0,($len-1));
                $apps_list[] = $apps_list[$rand];
            }
        }

        //随机、批量手机号
        //匹配手机号的正则表达式 #^(13[0-9]|14[47]|15[0-35-9]|17[6-8]|18[0-9])([0-9]{8})$#
        $arrPhone = array(
            130,131,132,133,134,135,136,137,138,139,
            144,147,
            150,151,152,153,155,156,157,158,159,
            176,177,178,
            180,181,182,183,184,185,186,187,188,189,
        );
        for($i = 0; $i < 20; $i++) {
            $tmpPhone[] = $arrPhone[array_rand($arrPhone)].str_repeat('*',4).mt_rand(1000,9999);
        }

        for($i = 0; $i < 20; $i++) {
            $tmpMoney[] = mt_rand(3,50)*1000;
        }
        //$money = array_unique($tmpMoney);

        for($i = 0; $i < 20; $i++) {
            $broadcast_list[] = $apps_list[$i]['name'].' 为用户'.$tmpPhone[$i].$broadcast_msg.$tmpMoney[$i].'元';
        }


        $thematic_list = [
            [
                'title' => $test ? $thematic_test_title[0] : $thematic_title[0],
                'icon_url' => $this->icon[0],
                'link_url' => $this->api_url.'getByZhima'     //authentication = 2
            ],
            [
                'title' => $test ? $thematic_test_title[1] : $thematic_title[1],
                'icon_url' => $this->icon[1],
                'link_url' => $this->api_url.'getByCount'     //count  start_time
            ],
            [
                'title' => $test ? $thematic_test_title[2] : $thematic_title[2],
                'icon_url' => $this->icon[2],
                'link_url' => $this->api_url.'getBySuccessRate'     //success_rate > 95%
            ],
            [
                'title' => $test ? $thematic_test_title[3] : $thematic_title[3],
                'icon_url' => $this->icon[3],
                'link_url' => $this->api_url.'getByLendTime'     //lend_time < 5
            ],
            [
                'title' => $test ? $thematic_test_title[4] : $thematic_title[4],
                'icon_url' => $this->icon[4],
                'link_url' => $this->api_url.'getByStartTime'     //start_time
            ],
            [
                'title' => $test ? $thematic_test_title[5] : $thematic_title[5],
                'icon_url' => $this->icon[5],
                'link_url' => $this->api_url.'getByUserType0'     //user_type = 0
            ],
            [
                'title' => $test ? $thematic_test_title[6] : $thematic_title[6],
                'icon_url' => $this->icon[6],
                'link_url' => $this->api_url.'getByUserType1'     //user_type = 1
            ],
            [
                'title' => $test ? $thematic_test_title[7] : $thematic_title[7],
                'icon_url' => $this->icon[7],
                'link_url' => $this->api_url.'getByUserType2'     //user_type = 2
            ]
        ];

        //今日申请
        $startTime = date('Y-m-d 00:00:00');
        $endTime = date('Y-m-d 23:59:59');
        $todayRecord = Records::whereBetween('created_at', [$startTime, $endTime])->count();
        //累计申请
        $countRecord = Records::count();

        $list['todayRecord'] = $todayRecord;
        $list['countRecord'] = $countRecord;
        $list['broadcast'] = $broadcast_list;
        $list['thematic'] = $thematic_list;

        if($list){
            return response()->json([
                'status' => 0,
                'msg' => 'success',
                'data' => $list
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => '获取数据失败'
            ]);
        }
    }


    /**
     * 请求产品列表.
     *
     * @param Request $request
     * @return Response
     */
    public function getLoans(Request $request)
    {
        $data = $request->all();
        $start = empty($data['page']) ? 0 : ($data['page']-1)*10;

        if(!empty($data['test'])) {
            $list['list'] = $this->curlBooks('推理', $start);
        } else {
            //app列表
            $list['list'] = Apps::where('status', 1)
                ->select('apps.id', 'apps.name', 'apps.icon', 'apps.max_money', 'apps.lend_time', 'apps.success_rate')
                ->orderBy('is_hot', 'desc')
                ->orderBy('updated_at', 'asc')
                ->paginate(10);
        }

        
        if($list['list']){
            return response()->json([
                'status' => 0,
                'msg' => '获取数据成功',
                'data' => $list
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => '获取数据失败'
            ]);
        }
    }

    /**
     * 用芝麻分借.
     *
     * @param Request $request
     * @return Response
     */
    public function getByZhima(Request $request)
    {
        $list['banner'] = $this->banner[0];
        $list['bgcolor'] = $this->bgcolor[0];

        $data = $request->all();
        $start = empty($data['page']) ? 0 : ($data['page']-1)*10;

        if(!empty($data['test'])) {
            $list['list'] = $this->curlBooks('小说', $start);
        } else {
            $list['list'] = Apps::where('status', 1)
                ->where(function($query){
                    $query->where('authentication','like','%3%');
                })
                ->select('apps.id', 'apps.name', 'apps.icon', 'apps.max_money', 'apps.lend_time', 'apps.description', 'apps.success_rate')
                ->orderBy('is_hot', 'desc')
                ->orderBy('updated_at', 'asc')
                ->paginate(10);
        }


        if($list){
            return response()->json([
                'status' => 0,
                'msg' => '获取数据成功',
                'data' => $list
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => '获取数据失败'
            ]);
        }
    }

    /**
     * 本周放款王.
     *
     * @param Request $request
     * @return Response
     */
    public function getByCount(Request $request)
    {
        $start = date("Y-m-d H:i:s",mktime(0, 0 , 0,date("m"),date("d")-date("w")+1,date("Y")));
        $end = date("Y-m-d H:i:s",mktime(23,59,59,date("m"),date("d")-date("w")+7,date("Y")));

        $list['banner'] = $this->banner[1];
        $list['bgcolor'] = $this->bgcolor[1];

        $data = $request->all();
        $start = empty($data['page']) ? 0 : ($data['page']-1)*10;

        if(!empty($data['test'])) {
            $list['list'] = $this->curlBooks('爱情', $start);
        } else {
            $list['list'] = Apps::where('status', 1)
                ->whereBetween('start_time', [$start, $end])
                ->select('apps.id', 'apps.name', 'apps.icon', 'apps.max_money', 'apps.lend_time', 'apps.description', 'apps.success_rate')
                ->orderBy('is_hot', 'desc')
                ->orderBy('count', 'desc')
                ->orderBy('updated_at', 'asc')
                ->paginate(10);
        }


        if($list){
            return response()->json([
                'status' => 0,
                'msg' => '获取数据成功',
                'data' => $list
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => '获取数据失败'
            ]);
        }
    }

    /**
     * 高成功率.
     *
     * @param Request $request
     * @return Response
     */
    public function getBySuccessRate(Request $request)
    {
        $list['banner'] = $this->banner[2];
        $list['bgcolor'] = $this->bgcolor[2];

        $data = $request->all();
        $start = empty($data['page']) ? 0 : ($data['page']-1)*10;

        if(!empty($data['test'])) {
            $list['list'] = $this->curlBooks('历史', $start);
        } else {
            $list['list'] = Apps::where('status', 1)
                ->where('success_rate', '>', '90')
                ->select('apps.id', 'apps.name', 'apps.icon', 'apps.max_money', 'apps.lend_time', 'apps.description', 'apps.success_rate')
                ->orderBy('is_hot', 'desc')
                ->orderBy('updated_at', 'asc')
                ->paginate(10);
        }


        if($list){
            return response()->json([
                'status' => 0,
                'msg' => '获取数据成功',
                'data' => $list
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => '获取数据失败'
            ]);
        }
    }

    /**
     * 极速放款专区.
     *
     * @param Request $request
     * @return Response
     */
    public function getByLendTime(Request $request)
    {
        $list['banner'] = $this->banner[3];
        $list['bgcolor'] = $this->bgcolor[3];

        $data = $request->all();
        $start = empty($data['page']) ? 0 : ($data['page']-1)*10;

        if(!empty($data['test'])) {
            $list['list'] = $this->curlBooks('外国文学', $start);
        } else {
            $list['list'] = Apps::where('status', 1)
                ->where('lend_time', '<', '5')
                ->select('apps.id', 'apps.name', 'apps.icon', 'apps.max_money', 'apps.lend_time', 'apps.description', 'apps.success_rate')
                ->orderBy('is_hot', 'desc')
                ->orderBy('updated_at', 'asc')
                ->paginate(10);
        }


        if($list){
            return response()->json([
                'status' => 0,
                'msg' => '获取数据成功',
                'data' => $list
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => '获取数据失败'
            ]);
        }
    }

    /**
     * 借款新口子.
     *
     * @param Request $request
     * @return Response
     */
    public function getByStartTime(Request $request)
    {
        $list['banner'] = $this->banner[4];
        $list['bgcolor'] = $this->bgcolor[4];

        $data = $request->all();
        $start = empty($data['page']) ? 0 : ($data['page']-1)*10;

        if(!empty($data['test'])) {
            $list['list'] = $this->curlBooks('青春', $start);
        } else {
            $list['list'] = Apps::where('status', 1)
                ->whereDate('start_time', date("Y-m-d"))
                ->select('apps.id', 'apps.name', 'apps.icon', 'apps.max_money', 'apps.lend_time', 'apps.description', 'apps.success_rate')
                ->orderBy('is_hot', 'desc')
                ->orderBy('updated_at', 'asc')
                ->paginate(10);
        }


        if($list){
            return response()->json([
                'status' => 0,
                'msg' => '获取数据成功',
                'data' => $list
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => '获取数据失败'
            ]);
        }
    }

    /**
     * 无工作也能借.
     *
     * @param Request $request
     * @return Response
     */
    public function getByUserType0(Request $request)
    {
        $list['banner'] = $this->banner[5];
        $list['bgcolor'] = $this->bgcolor[5];

        $data = $request->all();
        $start = empty($data['page']) ? 0 : ($data['page']-1)*10;

        if(!empty($data['test'])) {
            $list['list'] = $this->curlBooks('励志', $start);
        } else {
            $list['list'] = Apps::where('status', 1)
                ->where(function($query){
                    $query->where('user_type','like','%0%');
                })
                ->select('apps.id', 'apps.name', 'apps.icon', 'apps.max_money', 'apps.lend_time', 'apps.description', 'apps.success_rate')
                ->orderBy('is_hot', 'desc')
                ->orderBy('updated_at', 'asc')
                ->paginate(10);
        }


        if($list){
            return response()->json([
                'status' => 0,
                'msg' => '获取数据成功',
                'data' => $list
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => '获取数据失败'
            ]);
        }
    }

    /**
     * 蓝领借款专区.
     *
     * @param Request $request
     * @return Response
     */
    public function getByUserType1(Request $request)
    {
        $list['banner'] = $this->banner[6];
        $list['bgcolor'] = $this->bgcolor[6];

        $data = $request->all();
        $start = empty($data['page']) ? 0 : ($data['page']-1)*10;

        if(!empty($data['test'])) {
            $list['list'] = $this->curlBooks('随笔', $start);
        } else {
            $list['list'] = Apps::where('status', 1)
                ->where(function($query){
                    $query->where('user_type','like','%1%');
                })
                ->select('apps.id', 'apps.name', 'apps.icon', 'apps.max_money', 'apps.lend_time', 'apps.description', 'apps.success_rate')
                ->orderBy('is_hot', 'desc')
                ->orderBy('updated_at', 'asc')
                ->paginate(10);
        }


        if($list){
            return response()->json([
                'status' => 0,
                'msg' => '获取数据成功',
                'data' => $list
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => '获取数据失败'
            ]);
        }
    }

    /**
     * 白领借款专区.
     *
     * @param Request $request
     * @return Response
     */
    public function getByUserType2(Request $request)
    {
        $list['banner'] = $this->banner[7];
        $list['bgcolor'] = $this->bgcolor[7];

        $data = $request->all();
        $start = empty($data['page']) ? 0 : ($data['page']-1)*10;

        if(!empty($data['test'])) {
            $list['list'] = $this->curlBooks('传记', $start);
        } else {
            $list['list'] = Apps::where('status', 1)
                ->where(function($query){
                    $query->where('user_type','like','%2%');
                })
                ->select('apps.id', 'apps.name', 'apps.icon', 'apps.max_money', 'apps.lend_time', 'apps.description', 'apps.success_rate')
                ->orderBy('is_hot', 'desc')
                ->orderBy('updated_at', 'asc')
                ->paginate(10);
        }


        if($list){
            return response()->json([
                'status' => 0,
                'msg' => '获取数据成功',
                'data' => $list
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => '获取数据失败'
            ]);
        }
    }


    /**
     * 获取指定产品
     *
     * @param int $id
     * @return Response
     */
    public function getLoan($id)
    {
        $res = Apps::where('status', 1)
            ->select('apps.id', 'apps.name', 'apps.icon', 'apps.min_money', 'apps.max_money', 'apps.min_term', 'apps.max_term', 'apps.interest_type', 'apps.min_rate', 'apps.max_rate', 'apps.requirements', 'apps.authentication', 'apps.lend_time', 'apps.success_rate', 'apps.description', 'apps.viewCnt')
            ->find($id);

        if($res){
            $rand = mt_rand(50,500);
            $data['viewCnt'] = $res['viewCnt'] + $rand;
            Apps::where('id', $id)->update($data);

            return response()->json([
                'status' => 0,
                'msg' => '获取数据成功',
                'data' => $res
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => '获取数据失败'
            ]);
        }
    }


    /**
     * 点击申请
     *
     * @param Request $request
     * @return Response
     */
    public function postApply(Request $request)
    {
        if(!empty($request->input('test'))) {
            return response()->json([
                'status' => 0,
                'msg' => '请求成功',
                'data' => 'https://m.douban.com/book/subject/'.$request->input('aid').'/comments?from=subject'
            ]);
        }

        //验证用户
        $uid = $request->input('uid', '');
        if($uid == '') {
            return response()->json([
                'status' => 1,
                'msg' => '用户id不能为空'
            ]);
        } else {
            $user = User::where('id', $uid)->first();
            if(!$user){
                return response()->json([
                    'status' => 2,
                    'msg' => '用户不存在'
                ]);
            }
        }

        //验证产品
        $aid = $request->input('aid', '');
        $app = null;
        if($aid == '') {
            return response()->json([
                'status' => 3,
                'msg' => '产品id不能为空'
            ]);
        } else {
            $app = Apps::where('id', $aid)->first();
            if(!$app){
                return response()->json([
                    'status' => 4,
                    'msg' => '产品不存在'
                ]);
            }
        }

        $data['uid'] = $uid;
        $data['aid'] = $aid;
        $data['client_type'] = $this->clientType();
        $data['longitude'] = $request->input('longitude', '');
        $data['latitude'] = $request->input('latitude', '');
        $data['address'] = $request->input('address', '');
        $data['ip'] = $_SERVER["REMOTE_ADDR"];

        //执行创建
        $res = Records::create($data);
        if($res){
            //创建成功
            return response()->json([
                'status' => 0,
                'msg' => '请求成功',
                'data' => $app->link
            ]);
        }else{
            return response()->json([
                'status' => 5,
                'msg' => '获取数据失败'
            ]);
        }
    }


    /**
     * 我的申请记录.
     *
     * @param int $id
     * @return Response
     */
    public function getMyRecords($uid)
    {
        $list['list'] = Records::where('records.uid', $uid)
            ->leftJoin('apps', 'records.aid', '=', 'apps.id')
            ->select('records.id', 'records.uid', 'records.aid', 'records.updated_at', 'apps.name', 'apps.icon', 'apps.min_money', 'apps.max_money', 'apps.min_term', 'apps.max_term', 'apps.interest_type', 'apps.min_rate', 'apps.max_rate', 'apps.c_phone')
            ->orderBy('records.id', 'desc')
            ->paginate(10);

        if($list['list']){
            return response()->json([
                'status' => 0,
                'msg' => 'success',
                'data' => $list
            ]);
        }else{
            return response()->json([
                'status' => 1,
                'msg' => 'error'
            ]);
        }
    }

    /**
     * 我的具体某条申请记录
     *
     * @param Request $request
     * @return Response
     */
    public function getMyRecord($id)
    {
        $res = Records::where('records.id', $id)
            ->leftJoin('apps', 'records.aid', '=', 'apps.id')
            ->select('records.id', 'records.uid', 'records.aid', 'records.updated_at', 'apps.name', 'apps.icon', 'apps.min_money', 'apps.max_money', 'apps.min_term', 'apps.max_term', 'apps.interest_type', 'apps.min_rate', 'apps.max_rate', 'apps.c_phone')
            ->orderBy('records.id', 'desc')
            ->first();

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


    /**
     * 获取豆瓣图书数据
     */
    private function curlBooks($filter, $start) {
        $curl = new Curl();
        $curl->setOpt(CURLOPT_RETURNTRANSFER, TRUE);
        $curl->setOpt(CURLOPT_SSL_VERIFYPEER, FALSE);

        /*$curl->get('https://m.douban.com/rexxar/api/v2/subject_collection/'.$filter.'/items?start='.$start.'&count=10');*/

        $curl->get('https://api.douban.com/v2/book/search?q='.$filter.'&start='.$start.'&count=10');

        if ($curl->error) {
            return response()->json([
                'status' => 201,
                'msg' => $curl->error_code
            ]);
        } else {
            $books = json_decode($curl->response);
            //$items = $books->subject_collection_items;
            $items = $books->books;
            $lists = [];

            foreach ($items as $key => $value) {
                $lists['id'] = $value->id;
                $lists['name'] = $value->title;
                $lists['icon'] = $value->image;
                $lists['max_money'] = $value->rating->numRaters;
                $lists['lend_time'] = $value->rating->average;
                $lists['description'] = $value->subtitle;
                $lists['success_rate'] = mt_rand(80, 99);
                //$lists['web_url'] = $value->url;
                $lists['web_url'] = 'https://m.douban.com/book/subject/'.$value->id.'/';
                
                $list['list'][] = $lists;
            }
        }

        return $list['list'];
    }
}
