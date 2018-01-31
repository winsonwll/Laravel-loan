webpackJsonp([13],{

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(75)
/* script */
var __vue_script__ = __webpack_require__(274)
/* template */
var __vue_template__ = __webpack_require__(275)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\page\\AdminCreateEdit.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-50a17e3f", Component.options)
  } else {
    hotAPI.reload("data-v-50a17e3f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BASE_ADMIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BASE_API; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ERR_OK; });
//const domain = 'http://127.0.0.1:8000/'
var domain = 'http://www.appvf.com/';

var BASE_ADMIN = domain + 'admin/';
var BASE_API = domain + 'api/';

var ERR_OK = 0;

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["z"] = fetchCp;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return fetchAppUploadUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return fetchAdUploadUrl; });
/* harmony export (immutable) */ __webpack_exports__["A"] = fetchLogin;
/* harmony export (immutable) */ __webpack_exports__["B"] = fetchLogout;
/* harmony export (immutable) */ __webpack_exports__["n"] = fetchAllApps;
/* harmony export (immutable) */ __webpack_exports__["r"] = fetchAppList;
/* harmony export (immutable) */ __webpack_exports__["u"] = fetchAppRecom;
/* harmony export (immutable) */ __webpack_exports__["o"] = fetchAppCancelRecom;
/* harmony export (immutable) */ __webpack_exports__["t"] = fetchAppOnline;
/* harmony export (immutable) */ __webpack_exports__["s"] = fetchAppOffline;
/* harmony export (immutable) */ __webpack_exports__["p"] = fetchAppDel;
/* harmony export (immutable) */ __webpack_exports__["q"] = fetchAppEdit;
/* harmony export (immutable) */ __webpack_exports__["w"] = fetchAppSaveEdit;
/* harmony export (immutable) */ __webpack_exports__["v"] = fetchAppSaveAdd;
/* harmony export (immutable) */ __webpack_exports__["x"] = fetchAppShow;
/* harmony export (immutable) */ __webpack_exports__["D"] = fetchSort;
/* harmony export (immutable) */ __webpack_exports__["c"] = fetchAdList;
/* harmony export (immutable) */ __webpack_exports__["e"] = fetchAdOnline;
/* harmony export (immutable) */ __webpack_exports__["d"] = fetchAdOffline;
/* harmony export (immutable) */ __webpack_exports__["a"] = fetchAdDel;
/* harmony export (immutable) */ __webpack_exports__["b"] = fetchAdEdit;
/* harmony export (immutable) */ __webpack_exports__["g"] = fetchAdSaveEdit;
/* harmony export (immutable) */ __webpack_exports__["f"] = fetchAdSaveAdd;
/* harmony export (immutable) */ __webpack_exports__["F"] = fetchUserList;
/* harmony export (immutable) */ __webpack_exports__["E"] = fetchUserFrozen;
/* harmony export (immutable) */ __webpack_exports__["H"] = fetchUserThaw;
/* harmony export (immutable) */ __webpack_exports__["G"] = fetchUserRecord;
/* harmony export (immutable) */ __webpack_exports__["C"] = fetchRecordList;
/* harmony export (immutable) */ __webpack_exports__["k"] = fetchAdminList;
/* harmony export (immutable) */ __webpack_exports__["i"] = fetchAdminDel;
/* harmony export (immutable) */ __webpack_exports__["j"] = fetchAdminEdit;
/* harmony export (immutable) */ __webpack_exports__["m"] = fetchAdminSaveEdit;
/* harmony export (immutable) */ __webpack_exports__["l"] = fetchAdminSaveAdd;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_config__ = __webpack_require__(208);



// 创建axios实例
var service = __WEBPACK_IMPORTED_MODULE_0_axios___default.a.create({
    baseURL: __WEBPACK_IMPORTED_MODULE_1__utils_config__["a" /* BASE_ADMIN */], // api的base_url
    timeout: 5000, // 请求超时时间
    headers: { // Laravel5.4 Vue 框架中 X-CSRF-TOKEN 的设置
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    }
});

// 获取图片验证码
//export const fetchCaptcha = `${BASE_ADMIN}captcha/` + new Date().getTime()

// 获取图片验证码
function fetchCp() {
    return service({
        url: 'captcha/' + new Date().getTime(),
        method: 'get'
    });
}

// 上传产品图片地址
var fetchAppUploadUrl = __WEBPACK_IMPORTED_MODULE_1__utils_config__["a" /* BASE_ADMIN */] + 'apps/uploadIcon';
// 上传广告图片地址
var fetchAdUploadUrl = __WEBPACK_IMPORTED_MODULE_1__utils_config__["a" /* BASE_ADMIN */] + 'ads/uploadAd';

// 登录
function fetchLogin() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return service({
        url: 'login',
        method: 'post',
        data: params
    });
}
// 退出登录
function fetchLogout() {
    return service({
        url: 'logout',
        method: 'get'
    });
}

// 获取所有产品
function fetchAllApps() {
    return service({
        url: 'allapps',
        method: 'get'
    });
}

/*************** 产品管理 ***************/
// 获取产品列表
function fetchAppList() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return service({
        url: 'apps',
        method: 'get',
        params: params
    });
}
// 推荐
function fetchAppRecom(id) {
    return service({
        url: 'apps/recom/' + id,
        method: 'post'
    });
}
// 取消推荐
function fetchAppCancelRecom(id) {
    return service({
        url: 'apps/cancelrecom/' + id,
        method: 'post'
    });
}
// 上线
function fetchAppOnline(id) {
    return service({
        url: 'apps/online/' + id,
        method: 'post'
    });
}
// 下线
function fetchAppOffline(id) {
    return service({
        url: 'apps/offline/' + id,
        method: 'post'
    });
}
// 删除
function fetchAppDel(id) {
    return service({
        url: 'apps/' + id,
        method: 'delete'
    });
}
// 编辑
function fetchAppEdit(id) {
    return service({
        url: 'apps/' + id,
        method: 'get'
    });
}
// 保存修改
function fetchAppSaveEdit(id) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return service({
        url: 'apps/' + id,
        method: 'patch',
        data: params
    });
}
// 保存添加
function fetchAppSaveAdd() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return service({
        url: 'apps',
        method: 'post',
        data: params
    });
}
// 查看
function fetchAppShow(id) {
    return service({
        url: 'apps/' + id,
        method: 'get'
    });
}
// 排序
function fetchSort() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return service({
        url: 'apps/sort',
        method: 'post',
        data: params
    });
}

/*************** 广告管理 ***************/
// 获取广告列表
function fetchAdList() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return service({
        url: 'ads',
        method: 'get',
        params: params
    });
}
// 上线
function fetchAdOnline(id) {
    return service({
        url: 'ads/online/' + id,
        method: 'post'
    });
}
// 下线
function fetchAdOffline(id) {
    return service({
        url: 'ads/offline/' + id,
        method: 'post'
    });
}
// 删除
function fetchAdDel(id) {
    return service({
        url: 'ads/' + id,
        method: 'delete'
    });
}
// 编辑
function fetchAdEdit(id) {
    return service({
        url: 'ads/' + id,
        method: 'get'
    });
}
// 保存修改
function fetchAdSaveEdit(id) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return service({
        url: 'ads/' + id,
        method: 'patch',
        data: params
    });
}
// 保存添加
function fetchAdSaveAdd() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return service({
        url: 'ads',
        method: 'post',
        data: params
    });
}

/*************** 用户管理 ***************/
// 获取用户列表
function fetchUserList() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return service({
        url: 'users',
        method: 'get',
        params: params
    });
}
// 冻结
function fetchUserFrozen(id) {
    return service({
        url: 'users/frozen/' + id,
        method: 'post'
    });
}
// 解冻
function fetchUserThaw(id) {
    return service({
        url: 'users/thaw/' + id,
        method: 'post'
    });
}
// 查看用户记录
function fetchUserRecord(uid) {
    return service({
        url: 'users/record/' + uid,
        method: 'get'
    });
}

/*************** 记录管理 ***************/
// 获取用户列表
function fetchRecordList() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return service({
        url: 'records',
        method: 'get',
        params: params
    });
}

/*************** 管理员管理 ***************/
// 获取用户列表
function fetchAdminList() {
    return service({
        url: 'admin',
        method: 'get'
    });
}
// 删除
function fetchAdminDel(id) {
    return service({
        url: 'admin/' + id,
        method: 'delete'
    });
}
// 编辑
function fetchAdminEdit(id) {
    return service({
        url: 'admin/' + id,
        method: 'get'
    });
}
// 保存修改
function fetchAdminSaveEdit(id) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return service({
        url: 'admin/' + id,
        method: 'patch',
        data: params
    });
}
// 保存添加
function fetchAdminSaveAdd() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return service({
        url: 'admin',
        method: 'post',
        data: params
    });
}

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fetch__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_config__ = __webpack_require__(208);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        var _this = this;

        var validatePwd = function validatePwd(rule, value, callback) {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (value.length < 6 || value.length > 12) {
                    callback(new Error('密码为 6-12 位字符'));
                }
                callback();
            }
        };
        var validateRePwd = function validateRePwd(rule, value, callback) {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== _this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };

        return {
            isDisabled: false,
            id: '',
            ruleForm: {
                name: '',
                password: '',
                repassword: '',
                auth: '0'
            },
            rules: {
                name: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { min: 6, max: 12, message: '用户名为6-12位字符', trigger: 'blur' }],
                password: [{ required: true, validator: validatePwd, trigger: 'blur' }],
                repassword: [{ required: true, validator: validateRePwd, trigger: 'blur' }],
                auth: [{ required: true, message: '请选择权限', trigger: 'change' }]
            },
            loading: false
        };
    },
    computed: {
        isEdit: function isEdit() {
            return this.$route.meta.isEdit;
        }
    },
    created: function created() {
        if (this.isEdit) {
            this.isDisabled = true;
            this.id = this.$route.params.id;
            this.getAdminInfo();
        }
    },

    methods: {
        // 编辑页面信息
        getAdminInfo: function getAdminInfo() {
            var _this2 = this;

            Object(__WEBPACK_IMPORTED_MODULE_0__fetch__["j" /* fetchAdminEdit */])(this.id).then(function (res) {
                if (res && res.data.status == __WEBPACK_IMPORTED_MODULE_1__utils_config__["c" /* ERR_OK */]) {
                    var data = res.data.data;
                    data.password = '';
                    data.auth = data.auth + '';

                    _this2.ruleForm = data;
                } else {
                    _this2.$message.error('获取信息失败');
                }
            }).catch(function (error) {
                _this2.$message.error(error);
            });
        },
        onSubmit: function onSubmit() {
            var _this3 = this;

            this.$refs.ruleForm.validate(function (valid) {
                if (valid) {
                    _this3.loading = true;

                    if (_this3.isEdit) {
                        // 修改提交
                        Object(__WEBPACK_IMPORTED_MODULE_0__fetch__["m" /* fetchAdminSaveEdit */])(_this3.id, _this3.ruleForm).then(function (res) {
                            if (res && res.data.status == __WEBPACK_IMPORTED_MODULE_1__utils_config__["c" /* ERR_OK */]) {
                                _this3.$message.success('修改成功');
                                setTimeout(function () {
                                    _this3.$router.push('/admin');
                                }, 1e3);
                            } else {
                                _this3.$message.error('修改失败');
                            }
                            _this3.loading = false;
                        }).catch(function (error) {
                            _this3.$message.error(error);
                        });
                    } else {
                        // 添加提交
                        Object(__WEBPACK_IMPORTED_MODULE_0__fetch__["l" /* fetchAdminSaveAdd */])(_this3.ruleForm).then(function (res) {
                            if (res && res.data.status == __WEBPACK_IMPORTED_MODULE_1__utils_config__["c" /* ERR_OK */]) {
                                _this3.$message.success('创建成功');
                                setTimeout(function () {
                                    _this3.$router.push('/admin');
                                }, 1e3);
                            } else {
                                _this3.$message.error('创建失败');
                            }
                            _this3.loading = false;
                        }).catch(function (error) {
                            _this3.$message.error(error);
                        });
                    }
                } else {
                    return false;
                }
            });
        },
        cancelForm: function cancelForm() {
            this.$router.go(-1);
        }
    }
});

/***/ }),

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "crumbs" },
      [
        _c(
          "el-breadcrumb",
          { attrs: { "separator-class": "el-icon-arrow-right" } },
          [
            _c("el-breadcrumb-item", [
              _c("i", { staticClass: "el-icon-date" }),
              _vm._v(" 管理员管理")
            ]),
            _vm._v(" "),
            _c("el-breadcrumb-item", [_vm._v("添加管理员")])
          ],
          1
        )
      ],
      1
    ),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "form-box" },
      [
        _c(
          "el-form",
          {
            ref: "ruleForm",
            attrs: {
              model: _vm.ruleForm,
              rules: _vm.rules,
              "label-width": "150px"
            }
          },
          [
            _c(
              "el-tooltip",
              { attrs: { content: "用户名为 6-12 位字符", placement: "top" } },
              [
                _c(
                  "el-form-item",
                  { attrs: { label: "用户名", prop: "name" } },
                  [
                    _c("el-input", {
                      attrs: {
                        disabled: _vm.isDisabled,
                        placeholder: "请输入用户名"
                      },
                      model: {
                        value: _vm.ruleForm.name,
                        callback: function($$v) {
                          _vm.$set(
                            _vm.ruleForm,
                            "name",
                            typeof $$v === "string" ? $$v.trim() : $$v
                          )
                        },
                        expression: "ruleForm.name"
                      }
                    })
                  ],
                  1
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-tooltip",
              { attrs: { content: "密码为 6-12 位字符", placement: "top" } },
              [
                _c(
                  "el-form-item",
                  { attrs: { label: "密 码", prop: "password" } },
                  [
                    _c("el-input", {
                      attrs: {
                        type: "password",
                        "auto-complete": "off",
                        placeholder: "请输入密码"
                      },
                      model: {
                        value: _vm.ruleForm.password,
                        callback: function($$v) {
                          _vm.$set(
                            _vm.ruleForm,
                            "password",
                            typeof $$v === "string" ? $$v.trim() : $$v
                          )
                        },
                        expression: "ruleForm.password"
                      }
                    })
                  ],
                  1
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "确认密码", prop: "repassword" } },
              [
                _c("el-input", {
                  attrs: {
                    type: "password",
                    "auto-complete": "off",
                    placeholder: "请输入密码"
                  },
                  model: {
                    value: _vm.ruleForm.repassword,
                    callback: function($$v) {
                      _vm.$set(
                        _vm.ruleForm,
                        "repassword",
                        typeof $$v === "string" ? $$v.trim() : $$v
                      )
                    },
                    expression: "ruleForm.repassword"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "权 限", prop: "auth" } },
              [
                _c(
                  "el-radio",
                  {
                    attrs: { label: "0" },
                    model: {
                      value: _vm.ruleForm.auth,
                      callback: function($$v) {
                        _vm.$set(_vm.ruleForm, "auth", $$v)
                      },
                      expression: "ruleForm.auth"
                    }
                  },
                  [_vm._v("普通管理员")]
                ),
                _vm._v(" "),
                _c(
                  "el-radio",
                  {
                    attrs: { label: "1" },
                    model: {
                      value: _vm.ruleForm.auth,
                      callback: function($$v) {
                        _vm.$set(_vm.ruleForm, "auth", $$v)
                      },
                      expression: "ruleForm.auth"
                    }
                  },
                  [_vm._v("超级管理员")]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              [
                _c(
                  "el-button",
                  {
                    attrs: { type: "primary", loading: _vm.loading },
                    on: { click: _vm.onSubmit }
                  },
                  [_vm._v("确认提交")]
                ),
                _vm._v(" "),
                _c("el-button", { on: { click: _vm.cancelForm } }, [
                  _vm._v("取 消")
                ])
              ],
              1
            )
          ],
          1
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-50a17e3f", module.exports)
  }
}

/***/ })

});