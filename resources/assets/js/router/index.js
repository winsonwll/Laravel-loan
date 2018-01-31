import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from '../utils/auth'

Vue.use(Router)

// 接口测试
const Reg = resolve => require(['../components/page/Reg.vue'], resolve)
const Log = resolve => require(['../components/page/Log.vue'], resolve)

// 登录注册
const Login = resolve => require(['../components/page/Login.vue'], resolve)
const Home = resolve => require(['../components/common/Home.vue'], resolve)

// 产品管理
const AppsIndex = resolve => require(['../components/page/AppsIndex.vue'], resolve)
const AppsCreateEdit = resolve => require(['../components/page/AppsCreateEdit.vue'], resolve)
const AppsShow = resolve => require(['../components/page/AppsShow.vue'], resolve)

// 广告管理
const AdsIndex = resolve => require(['../components/page/AdsIndex.vue'], resolve)
const AdsCreateEdit = resolve => require(['../components/page/AdsCreateEdit.vue'], resolve)

// 用户管理
const UsersIndex = resolve => require(['../components/page/UsersIndex.vue'], resolve)
const UsersRecord = resolve => require(['../components/page/UsersRecord.vue'], resolve)

// 记录管理
const RecordsIndex = resolve => require(['../components/page/RecordsIndex.vue'], resolve)

// 管理员管理
const AdminIndex = resolve => require(['../components/page/AdminIndex.vue'], resolve)
const AdminCreateEdit = resolve => require(['../components/page/AdminCreateEdit.vue'], resolve)

const router = new Router({
    mode: 'history', //后端支持可开
    saveScrollPosition: true,
    routes: [
        {
            name: '首页',
            path: '/',
            redirect: '/index'
        },
        {
            name: '登录',
            path: '/login',
            component: Login
        },
        {
            name: '接口注册',
            path: '/reg',
            component: Reg
        },
        {
            name: '接口登录',
            path: '/log',
            component: Log
        },
        {
            path: '/index',
            component: Home,
            redirect: '/apps',
            children: [
                {
                    name: '产品管理',
                    path: '/apps',
                    redirect: '/appsindex'
                },
                {
                    name: '产品列表',
                    path: '/appsindex',
                    component: AppsIndex
                },
                {
                    name: '添加产品',
                    path: '/appscreate',
                    component: AppsCreateEdit
                },
                {
                    name: '编辑产品',
                    path: '/appsedit/:id',
                    component: AppsCreateEdit,
                    meta: { isEdit: true }
                },
                {
                    name: '产品详情',
                    path: '/appsshow/:id',
                    component: AppsShow
                },

                {
                    name: '广告管理',
                    path: '/ads',
                    redirect: '/adsindex'
                },
                {
                    name: '广告列表',
                    path: '/adsindex',
                    component: AdsIndex
                },
                {
                    name: '添加广告',
                    path: '/adscreate',
                    component: AdsCreateEdit
                },
                {
                    name: '编辑广告',
                    path: '/adsedit/:id',
                    component: AdsCreateEdit,
                    meta: { isEdit: true }
                },

                {
                    name: '用户管理',
                    path: '/users',
                    redirect: '/usersindex'
                },
                {
                    name: '用户列表',
                    path: '/usersindex',
                    component: UsersIndex
                },
                {
                    name: '申请记录',
                    path: '/usersrecord/:uid',
                    component: UsersRecord
                },

                {
                    name: '记录管理',
                    path: '/records',
                    redirect: '/recordsindex'
                },
                {
                    name: '记录列表',
                    path: '/recordsindex',
                    component: RecordsIndex
                },

                {
                    name: '管理员管理',
                    path: '/admin',
                    redirect: '/adminindex'
                },
                {
                    name: '管理员列表',
                    path: '/adminindex',
                    component: AdminIndex
                },
                {
                    name: '添加管理员',
                    path: '/admincreate',
                    component: AdminCreateEdit
                },
                {
                    name: '编辑管理员',
                    path: '/adminedit/:id',
                    component: AdminCreateEdit,
                    meta: { isEdit: true }
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (!getToken()) {
        if (to.path === '/login') {
            next()
        } else {
            next({
                path: '/login'
            })
        }
    } else {
        if (to.path === '/login') {
            next({
                path: '/'
            })
        } else {
            next()
        }
    }
})

export default router