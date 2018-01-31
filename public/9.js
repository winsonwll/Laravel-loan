webpackJsonp([9],{

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(214)
}
var normalizeComponent = __webpack_require__(75)
/* script */
var __vue_script__ = __webpack_require__(216)
/* template */
var __vue_template__ = __webpack_require__(217)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-74a13c7e"
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
Component.options.__file = "resources\\assets\\js\\components\\page\\Reg.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-74a13c7e", Component.options)
  } else {
    hotAPI.reload("data-v-74a13c7e", Component.options)
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

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(211)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 211:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = fetchCp;
/* harmony export (immutable) */ __webpack_exports__["n"] = fetchSmscode;
/* harmony export (immutable) */ __webpack_exports__["c"] = fetchConfirmPhone;
/* harmony export (immutable) */ __webpack_exports__["m"] = fetchResetPwd;
/* harmony export (immutable) */ __webpack_exports__["l"] = fetchReg;
/* harmony export (immutable) */ __webpack_exports__["h"] = fetchLogin;
/* harmony export (immutable) */ __webpack_exports__["e"] = fetchDetail;
/* harmony export (immutable) */ __webpack_exports__["g"] = fetchLoans;
/* harmony export (immutable) */ __webpack_exports__["f"] = fetchLoan;
/* harmony export (immutable) */ __webpack_exports__["b"] = fetchByZhima;
/* harmony export (immutable) */ __webpack_exports__["a"] = fetchApply;
/* harmony export (immutable) */ __webpack_exports__["k"] = fetchMyRecords;
/* harmony export (immutable) */ __webpack_exports__["j"] = fetchMyRecord;
/* harmony export (immutable) */ __webpack_exports__["i"] = fetchLogout;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_config__ = __webpack_require__(208);



// 创建axios实例
var service = __WEBPACK_IMPORTED_MODULE_0_axios___default.a.create({
    baseURL: __WEBPACK_IMPORTED_MODULE_1__utils_config__["b" /* BASE_API */], // api的base_url
    timeout: 5000, // 请求超时时间
    headers: { // Laravel5.4 Vue 框架中 X-CSRF-TOKEN 的设置
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    }
});

// 获取图片验证码
//export const fetchCaptcha = `${BASE_API}captcha/` + new Date().getTime()

// 获取图片验证码
function fetchCp() {
    return service({
        url: 'captcha/' + new Date().getTime(),
        method: 'get'
    });
}

// 获取短信验证码
function fetchSmscode() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    service.defaults.headers.common = {
        'session': params.session
    };

    return service({
        url: 'sendSms',
        method: 'post',
        data: params
    });
}

// 下一步
function fetchConfirmPhone() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return service({
        url: 'confirmPhone',
        method: 'post',
        data: params
    });
}

// 重置密码
function fetchResetPwd() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return service({
        url: 'resetPwd',
        method: 'post',
        data: params
    });
}

// 注册
function fetchReg() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return service({
        url: 'register',
        method: 'post',
        data: params
    });
}

// 登录
function fetchLogin() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    service.defaults.headers.common = {
        'session': params.session
    };

    return service({
        url: 'login',
        method: 'post',
        data: params
    });
}

// 获取详情
function fetchDetail() {
    var access_token = localStorage.getItem('access_token');

    service.defaults.headers.common = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + access_token
    };

    return service({
        url: 'details',
        method: 'post'
    });
}

// 贷款请求
function fetchLoans() {
    return service({
        url: 'getLoans',
        method: 'get'
    });
}

// 获取具体贷款请求
function fetchLoan() {
    return service({
        url: 'getLoan/1',
        method: 'get'
    });
}

//用芝麻分借
function fetchByZhima() {
    return service({
        url: 'getByLendTime',
        method: 'get'
    });
}

// 点击申请
function fetchApply() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var access_token = localStorage.getItem('access_token');

    service.defaults.headers.common = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + access_token
    };

    return service({
        url: 'postApply',
        method: 'get',
        params: params
    });
}

// 我的申请记录列表
function fetchMyRecords() {
    var access_token = localStorage.getItem('access_token');

    service.defaults.headers.common = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + access_token
    };

    return service({
        url: 'getMyRecords/4',
        method: 'get'
    });
}

// 我的申请记录
function fetchMyRecord() {
    var access_token = localStorage.getItem('access_token');

    service.defaults.headers.common = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + access_token
    };

    return service({
        url: 'getMyRecord/6',
        method: 'get'
    });
}

// 退出登录
function fetchLogout() {
    var access_token = localStorage.getItem('access_token');

    service.defaults.headers.common = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + access_token
    };

    return service({
        url: 'logout',
        method: 'get'
    });
}

/***/ }),

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(215);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(209)("e0087690", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../../../../node_modules/_vue-loader@13.6.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-74a13c7e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/_vue-loader@13.6.1@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Reg.vue", function() {
     var newContent = require("!!../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../../../../node_modules/_vue-loader@13.6.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-74a13c7e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/_vue-loader@13.6.1@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Reg.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(76)(undefined);
// imports


// module
exports.push([module.i, "\n.login-wrap[data-v-74a13c7e]{\n    position: relative;\n    width:100%;\n    height:100%;\n    background: #324157;\n}\n.ms-title[data-v-74a13c7e]{\n    position: absolute;\n    top:50%;\n    width:100%;\n    margin-top: -230px;\n    text-align: center;\n    font-size:30px;\n    color: #fff;\n}\n.ms-login[data-v-74a13c7e]{\n    position: absolute;\n    left:50%;\n    top:50%;\n    width:300px;\n    height:361px;\n    margin:-150px 0 0 -190px;\n    padding:40px;\n    border-radius: 5px;\n    background: #fff;\n}\n.login-btn[data-v-74a13c7e]{\n    text-align: center;\n}\n.login-btn button[data-v-74a13c7e]{\n    width:100%;\n    height:36px;\n}\n", ""]);

// exports


/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fetch_api__ = __webpack_require__(213);
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




/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            vcodeImg: '',
            session: '',
            ruleForm: {
                phone: undefined,
                vcode: undefined,
                code: undefined,
                password: undefined,
                isAgree: true
            },
            rules: {
                phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
                vcode: [{ required: true, message: '请输入图像验证码', trigger: 'blur' }],
                code: [{ required: true, message: '请输入短信验证码', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            },
            loading: false
        };
    },

    created: function created() {
        this.getCp();
    },


    methods: {
        getCp: function getCp() {
            var _this = this;

            Object(__WEBPACK_IMPORTED_MODULE_0__fetch_api__["d" /* fetchCp */])().then(function (res) {
                _this.vcodeImg = res.data.data.captcha;
                _this.session = res.data.data.session;
            }).catch(function (error) {
                _this.$message.error(error);
            });
        },
        handleChange: function handleChange() {
            this.ruleForm.vcode = '';
            this.getCp();
        },
        handleGetSmscode: function handleGetSmscode() {
            var _this2 = this;

            Object(__WEBPACK_IMPORTED_MODULE_0__fetch_api__["n" /* fetchSmscode */])({
                phone: this.ruleForm.phone,
                vcode: this.ruleForm.vcode,
                session: this.session
            }).then(function (res) {
                if (res && res.status == 200 && res.data.status == 0) {
                    _this2.$message.success('发送成功！');
                } else {
                    _this2.$message.error(res.data.msg);
                    _this2.handleChange();
                }
            }).catch(function (error) {
                _this2.$message.error(error);
            });
        },
        confirmPhone: function confirmPhone() {
            var _this3 = this;

            Object(__WEBPACK_IMPORTED_MODULE_0__fetch_api__["c" /* fetchConfirmPhone */])({
                phone: this.ruleForm.phone,
                code: this.ruleForm.code
            }).then(function (res) {
                console.log(res);
            }).catch(function (error) {
                _this3.$message.error(error);
            });
        },
        resetPwd: function resetPwd() {
            var _this4 = this;

            Object(__WEBPACK_IMPORTED_MODULE_0__fetch_api__["m" /* fetchResetPwd */])({
                phone: this.ruleForm.phone,
                code: this.ruleForm.code,
                password: '222222',
                repassword: '222222'
            }).then(function (res) {
                console.log(res);
            }).catch(function (error) {
                _this4.$message.error(error);
            });
        },
        submitForm: function submitForm(formName) {
            var _this5 = this;

            this.$refs[formName].validate(function (valid) {
                if (valid) {
                    _this5.loading = true;

                    Object(__WEBPACK_IMPORTED_MODULE_0__fetch_api__["l" /* fetchReg */])({
                        phone: _this5.ruleForm.phone,
                        code: _this5.ruleForm.code,
                        password: _this5.ruleForm.password
                    }).then(function (res) {
                        if (res && res.status == 200 && res.data.status == 0) {
                            _this5.$message.success('注册成功');
                            _this5.$router.push('/log');
                        } else {
                            _this5.$message.error(res.data.msg);
                            _this5.handleChange();
                        }
                        _this5.loading = false;
                    }).catch(function (error) {
                        _this5.$message.error(error);
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
});

/***/ }),

/***/ 217:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "login-wrap" }, [
    _c("div", { staticClass: "ms-title" }, [_vm._v("用户注册")]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "ms-login" },
      [
        _c(
          "el-form",
          {
            ref: "ruleForm",
            staticClass: "demo-ruleForm",
            attrs: {
              model: _vm.ruleForm,
              rules: _vm.rules,
              "label-width": "0px"
            }
          },
          [
            _c(
              "el-form-item",
              { attrs: { prop: "phone" } },
              [
                _c("el-input", {
                  attrs: { placeholder: "请输入手机号码" },
                  model: {
                    value: _vm.ruleForm.phone,
                    callback: function($$v) {
                      _vm.$set(_vm.ruleForm, "phone", $$v)
                    },
                    expression: "ruleForm.phone"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { prop: "vcode" } },
              [
                _c("el-input", {
                  staticStyle: { width: "175px", "vertical-align": "15px" },
                  attrs: { placeholder: "请输入图像验证码" },
                  model: {
                    value: _vm.ruleForm.vcode,
                    callback: function($$v) {
                      _vm.$set(_vm.ruleForm, "vcode", $$v)
                    },
                    expression: "ruleForm.vcode"
                  }
                }),
                _vm._v(" "),
                _c("img", {
                  staticStyle: { cursor: "pointer" },
                  attrs: { src: _vm.vcodeImg },
                  on: { click: _vm.handleChange }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { prop: "code" } },
              [
                _c("el-input", {
                  staticStyle: { width: "175px" },
                  attrs: { placeholder: "请输入短信验证码" },
                  model: {
                    value: _vm.ruleForm.code,
                    callback: function($$v) {
                      _vm.$set(_vm.ruleForm, "code", $$v)
                    },
                    expression: "ruleForm.code"
                  }
                }),
                _vm._v(" "),
                _c("el-button", { on: { click: _vm.handleGetSmscode } }, [
                  _vm._v("获取验证码")
                ])
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { prop: "password" } },
              [
                _c("el-input", {
                  attrs: { placeholder: "请设置密码", type: "password" },
                  model: {
                    value: _vm.ruleForm.password,
                    callback: function($$v) {
                      _vm.$set(_vm.ruleForm, "password", $$v)
                    },
                    expression: "ruleForm.password"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { prop: "isAgree" } },
              [
                _c(
                  "el-checkbox",
                  {
                    model: {
                      value: _vm.ruleForm.isAgree,
                      callback: function($$v) {
                        _vm.$set(_vm.ruleForm, "isAgree", $$v)
                      },
                      expression: "ruleForm.isAgree"
                    }
                  },
                  [
                    _vm._v("我同意 "),
                    _c("a", { attrs: { href: "" } }, [
                      _vm._v("《贷款导航的协议》")
                    ])
                  ]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "login-btn" },
              [
                _c(
                  "el-button",
                  {
                    attrs: { type: "primary", loading: _vm.loading },
                    on: {
                      click: function($event) {
                        _vm.submitForm("ruleForm")
                      }
                    }
                  },
                  [_vm._v("立即注册")]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-button",
              { attrs: { type: "primary" }, on: { click: _vm.confirmPhone } },
              [_vm._v("下一步")]
            ),
            _vm._v(" "),
            _c(
              "el-button",
              { attrs: { type: "primary" }, on: { click: _vm.resetPwd } },
              [_vm._v("重置密码")]
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-74a13c7e", module.exports)
  }
}

/***/ })

});