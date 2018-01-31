import axios from 'axios'
import { BASE_ADMIN } from '../utils/config'

// 创建axios实例
const service = axios.create({
    baseURL: BASE_ADMIN,          // api的base_url
    timeout: 5000,              // 请求超时时间
    headers: {                  // Laravel5.4 Vue 框架中 X-CSRF-TOKEN 的设置
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    }
})


// 获取图片验证码
//export const fetchCaptcha = `${BASE_ADMIN}captcha/` + new Date().getTime()

// 获取图片验证码
export function fetchCp() {
    return service({
        url: 'captcha/' + new Date().getTime(),
        method: 'get'
    })
}


// 上传产品图片地址
export const fetchAppUploadUrl = `${BASE_ADMIN}apps/uploadIcon`
// 上传广告图片地址
export const fetchAdUploadUrl = `${BASE_ADMIN}ads/uploadAd`

// 登录
export function fetchLogin( params = {} ) {
    return service({
        url: 'login',
        method: 'post',
        data: params
    })
}
// 退出登录
export function fetchLogout() {
    return service({
        url: 'logout',
        method: 'get'
    })
}

// 获取所有产品
export function fetchAllApps() {
    return service({
        url: 'allapps',
        method: 'get'
    })
}

/*************** 产品管理 ***************/
// 获取产品列表
export function fetchAppList( params = {} ) {
    return service({
        url: 'apps',
        method: 'get',
        params: params
    })
}
// 推荐
export function fetchAppRecom( id ) {
    return service({
        url: `apps/recom/${id}`,
        method: 'post'
    })
}
// 取消推荐
export function fetchAppCancelRecom( id ) {
    return service({
        url: `apps/cancelrecom/${id}`,
        method: 'post'
    })
}
// 上线
export function fetchAppOnline( id ) {
    return service({
        url: `apps/online/${id}`,
        method: 'post'
    })
}
// 下线
export function fetchAppOffline( id ) {
    return service({
        url: `apps/offline/${id}`,
        method: 'post'
    })
}
// 删除
export function fetchAppDel( id ) {
    return service({
        url: `apps/${id}`,
        method: 'delete'
    })
}
// 编辑
export function fetchAppEdit( id ) {
    return service({
        url: `apps/${id}`,
        method: 'get'
    })
}
// 保存修改
export function fetchAppSaveEdit( id, params = {} ) {
    return service({
        url: `apps/${id}`,
        method: 'patch',
        data: params
    })
}
// 保存添加
export function fetchAppSaveAdd( params = {} ) {
    return service({
        url: 'apps',
        method: 'post',
        data: params
    })
}
// 查看
export function fetchAppShow( id ) {
    return service({
        url: `apps/${id}`,
        method: 'get'
    })
}
// 排序
export function fetchSort( params = {} ) {
    return service({
        url: 'apps/sort',
        method: 'post',
        data: params
    })
}

/*************** 广告管理 ***************/
// 获取广告列表
export function fetchAdList( params = {} ) {
    return service({
        url: 'ads',
        method: 'get',
        params: params
    })
}
// 上线
export function fetchAdOnline( id ) {
    return service({
        url: `ads/online/${id}`,
        method: 'post'
    })
}
// 下线
export function fetchAdOffline( id ) {
    return service({
        url: `ads/offline/${id}`,
        method: 'post'
    })
}
// 删除
export function fetchAdDel( id ) {
    return service({
        url: `ads/${id}`,
        method: 'delete'
    })
}
// 编辑
export function fetchAdEdit( id ) {
    return service({
        url: `ads/${id}`,
        method: 'get'
    })
}
// 保存修改
export function fetchAdSaveEdit( id, params = {} ) {
    return service({
        url: `ads/${id}`,
        method: 'patch',
        data: params
    })
}
// 保存添加
export function fetchAdSaveAdd( params = {} ) {
    return service({
        url: 'ads',
        method: 'post',
        data: params
    })
}


/*************** 用户管理 ***************/
// 获取用户列表
export function fetchUserList( params = {} ) {
    return service({
        url: 'users',
        method: 'get',
        params: params
    })
}
// 冻结
export function fetchUserFrozen( id ) {
    return service({
        url: `users/frozen/${id}`,
        method: 'post'
    })
}
// 解冻
export function fetchUserThaw( id ) {
    return service({
        url: `users/thaw/${id}`,
        method: 'post'
    })
}
// 查看用户记录
export function fetchUserRecord( uid ) {
    return service({
        url: `users/record/${uid}`,
        method: 'get'
    })
}


/*************** 记录管理 ***************/
// 获取用户列表
export function fetchRecordList( params = {} ) {
    return service({
        url: 'records',
        method: 'get',
        params: params
    })
}


/*************** 管理员管理 ***************/
// 获取用户列表
export function fetchAdminList() {
    return service({
        url: 'admin',
        method: 'get'
    })
}
// 删除
export function fetchAdminDel( id ) {
    return service({
        url: `admin/${id}`,
        method: 'delete'
    })
}
// 编辑
export function fetchAdminEdit( id ) {
    return service({
        url: `admin/${id}`,
        method: 'get'
    })
}
// 保存修改
export function fetchAdminSaveEdit( id, params = {} ) {
    return service({
        url: `admin/${id}`,
        method: 'patch',
        data: params
    })
}
// 保存添加
export function fetchAdminSaveAdd( params = {} ) {
    return service({
        url: 'admin',
        method: 'post',
        data: params
    })
}
