/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap')

import Vue from 'vue'
import App from './App.vue'
import router from './router'                           //路由配置文件
import ElementUI from 'element-ui'                     //引入element－ui
import 'element-ui/lib/theme-chalk/index.css'      //引入element－ui所需的css样式资源文件
import * as filters from './filters' // 全局filter

Vue.use(ElementUI)                                        //把引入的ElementUI装入我们的Vue

// 注册全局过滤器
Object.keys(filters).forEach(key => {
        Vue.filter(key, filters[key])
})

// 实例化 Vue
const app = new Vue({
        el: '#app',
        router,
        render: h => h(App)                   //渲染一个视图，然后提供给el挂载
})