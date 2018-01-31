import axios from 'axios'
import { BASE_API } from '../utils/config'

// 创建axios实例
const service = axios.create({
    baseURL: BASE_API,          // api的base_url
    timeout: 5000,              // 请求超时时间
    headers: {                  // Laravel5.4 Vue 框架中 X-CSRF-TOKEN 的设置
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    }
})


// 获取图片验证码
//export const fetchCaptcha = `${BASE_API}captcha/` + new Date().getTime()

// 获取图片验证码
export function fetchCp() {
    return service({
        url: 'captcha/' + new Date().getTime(),
        method: 'get'
    })
}

// 获取短信验证码
export function fetchSmscode( params = {} ) {
    service.defaults.headers.common = {
        'session': params.session
     }

    return service({
        url: 'sendSms',
        method: 'post',
        data: params
    })
}

// 下一步
export function fetchConfirmPhone( params = {} ) {
    return service({
        url: 'confirmPhone',
        method: 'post',
        data: params
    })
}

// 重置密码
export function fetchResetPwd( params = {} ) {
    return service({
        url: 'resetPwd',
        method: 'post',
        data: params
    })
}


// 注册
export function fetchReg( params = {} ) {
    return service({
        url: 'register',
        method: 'post',
        data: params
    })
}

// 登录
export function fetchLogin( params = {} ) {
    service.defaults.headers.common = {
        'session': params.session
     }
     
    return service({
        url: 'login',
        method: 'post',
        data: params
    })
}

// 获取详情
export function fetchDetail() {
    let access_token = localStorage.getItem('access_token')

    service.defaults.headers.common = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${access_token}`
     }

    return service({
        url: 'details',
        method: 'post'
    })
}


// 贷款请求
export function fetchLoans() {
    return service({
        url: 'getLoans',
        method: 'get'
    })
}

// 获取具体贷款请求
export function fetchLoan() {
    return service({
        url: 'getLoan/1',
        method: 'get'
    })
}

//用芝麻分借
export function fetchByZhima() {
    return service({
        url: 'getByLendTime',
        method: 'get'
    })
}

// 点击申请
export function fetchApply( params = {} ) {
    let access_token = localStorage.getItem('access_token')

    service.defaults.headers.common = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${access_token}`
    }

    return service({
        url: 'postApply',
        method: 'get',
        params: params
    })
}

// 我的申请记录列表
export function fetchMyRecords() {
    let access_token = localStorage.getItem('access_token')

    service.defaults.headers.common = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${access_token}`
    }

    return service({
        url: 'getMyRecords/4',
        method: 'get'
    })
}

// 我的申请记录
export function fetchMyRecord() {
    let access_token = localStorage.getItem('access_token')

    service.defaults.headers.common = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${access_token}`
    }

    return service({
        url: 'getMyRecord/6',
        method: 'get'
    })
}

// 退出登录
export function fetchLogout() {
    let access_token = localStorage.getItem('access_token')

    service.defaults.headers.common = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${access_token}`
    }
    
    return service({
        url: 'logout',
        method: 'get'
    })
}