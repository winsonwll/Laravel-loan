webpackJsonp([6],{

/***/ 196:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(222)
}
var normalizeComponent = __webpack_require__(75)
/* script */
var __vue_script__ = __webpack_require__(224)
/* template */
var __vue_template__ = __webpack_require__(225)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6adb175a"
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
Component.options.__file = "resources\\assets\\js\\components\\page\\Login.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6adb175a", Component.options)
  } else {
    hotAPI.reload("data-v-6adb175a", Component.options)
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

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(223);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(209)("3f5cb0da", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../../../../node_modules/_vue-loader@13.6.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6adb175a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/_vue-loader@13.6.1@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Login.vue", function() {
     var newContent = require("!!../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../../../../node_modules/_vue-loader@13.6.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6adb175a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/_vue-loader@13.6.1@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Login.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 223:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(76)(undefined);
// imports


// module
exports.push([module.i, "\n.login-wrap[data-v-6adb175a]{\n    position: relative;\n    width:100%;\n    height:100%;\n    background: #324157;\n}\n.ms-title[data-v-6adb175a]{\n    position: absolute;\n    top:50%;\n    width:100%;\n    margin-top: -230px;\n    text-align: center;\n    font-size:30px;\n    color: #fff;\n}\n.ms-login[data-v-6adb175a]{\n    position: absolute;\n    left:50%;\n    top:50%;\n    width:300px;\n    height:210px;\n    margin:-150px 0 0 -190px;\n    padding:40px;\n    border-radius: 5px;\n    background: #fff;\n}\n.login-btn[data-v-6adb175a]{\n    text-align: center;\n}\n.login-btn button[data-v-6adb175a]{\n    width:100%;\n    height:36px;\n}\n", ""]);

// exports


/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fetch__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_config__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_auth__ = __webpack_require__(77);
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

        return {
            //vcodeImg: fetchCaptcha,
            vcodeImg: '',
            ruleForm: {
                name: '',
                password: '',
                vcode: ''
            },
            rules: {
                name: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { min: 6, max: 12, message: '用户名为6-12位字符', trigger: 'blur' }],
                password: [{ required: true, validator: validatePwd, trigger: 'blur' }],
                vcode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
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

            Object(__WEBPACK_IMPORTED_MODULE_0__fetch__["z" /* fetchCp */])().then(function (res) {
                _this.vcodeImg = res.data.data.captcha;
            }).catch(function (error) {
                _this.$message.error(error);
            });
        },
        handleChange: function handleChange() {
            this.ruleForm.vcode = '';
            this.getCp();
        },
        submitForm: function submitForm(formName) {
            var _this2 = this;

            this.$refs[formName].validate(function (valid) {
                if (valid) {
                    _this2.loading = true;

                    Object(__WEBPACK_IMPORTED_MODULE_0__fetch__["A" /* fetchLogin */])(_this2.ruleForm).then(function (res) {
                        if (res && res.data.status == __WEBPACK_IMPORTED_MODULE_1__utils_config__["c" /* ERR_OK */]) {
                            Object(__WEBPACK_IMPORTED_MODULE_2__utils_auth__["c" /* setToken */])(_this2.ruleForm.name);
                            _this2.$message.success('登录成功');

                            setTimeout(function () {
                                _this2.$router.push({ path: '/' });
                            }, 1e3);
                        } else {
                            _this2.handleChange();
                            _this2.$message.error(res.data.msg);
                        }
                        _this2.loading = false;
                    }).catch(function (error) {
                        _this2.$message.error(error);
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

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "login-wrap" }, [
    _c("div", { staticClass: "ms-title" }, [_vm._v("后台管理系统")]),
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
              { attrs: { prop: "name" } },
              [
                _c("el-input", {
                  attrs: { placeholder: "请输入用户名" },
                  model: {
                    value: _vm.ruleForm.name,
                    callback: function($$v) {
                      _vm.$set(_vm.ruleForm, "name", $$v)
                    },
                    expression: "ruleForm.name"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { prop: "password" } },
              [
                _c("el-input", {
                  attrs: { type: "password", placeholder: "请输入密码" },
                  nativeOn: {
                    keyup: function($event) {
                      if (
                        !("button" in $event) &&
                        _vm._k($event.keyCode, "enter", 13, $event.key)
                      ) {
                        return null
                      }
                      _vm.submitForm("ruleForm")
                    }
                  },
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
              { attrs: { prop: "vcode" } },
              [
                _c("el-input", {
                  staticStyle: { width: "175px", "vertical-align": "15px" },
                  attrs: { placeholder: "请输入验证码" },
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
                  [_vm._v("登 录")]
                )
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-6adb175a", module.exports)
  }
}

/***/ })

});