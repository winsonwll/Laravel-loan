webpackJsonp([1],{

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(241)
}
var normalizeComponent = __webpack_require__(75)
/* script */
var __vue_script__ = __webpack_require__(243)
/* template */
var __vue_template__ = __webpack_require__(245)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4061e42c"
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
Component.options.__file = "resources\\assets\\js\\components\\page\\AppsIndex.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4061e42c", Component.options)
  } else {
    hotAPI.reload("data-v-4061e42c", Component.options)
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

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isvalidUsername */
/* harmony export (immutable) */ __webpack_exports__["c"] = validateURL;
/* unused harmony export validateLowerCase */
/* unused harmony export validateUpperCase */
/* unused harmony export validatAlphabets */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return pickerOptions; });
/* harmony export (immutable) */ __webpack_exports__["a"] = GMTToStr;
function isvalidUsername(str) {
    var valid_map = ['admin', 'editor'];
    return valid_map.indexOf(str.trim()) >= 0;
}

/* 合法uri*/
function validateURL(textval) {
    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(textval);
}

/* 小写字母*/
function validateLowerCase(str) {
    var reg = /^[a-z]+$/;
    return reg.test(str);
}

/* 大写字母*/
function validateUpperCase(str) {
    var reg = /^[A-Z]+$/;
    return reg.test(str);
}

/* 大小写字母*/
function validatAlphabets(str) {
    var reg = /^[A-Za-z]+$/;
    return reg.test(str);
}

var pickerOptions = [{
    text: '今天',
    onClick: function onClick(picker) {
        var end = new Date();
        var start = new Date(new Date().toDateString());
        end.setTime(start.getTime());
        picker.$emit('pick', [start, end]);
    }
}, {
    text: '最近一周',
    onClick: function onClick(picker) {
        var end = new Date(new Date().toDateString());
        var start = new Date();
        start.setTime(end.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit('pick', [start, end]);
    }
}, {
    text: '最近一个月',
    onClick: function onClick(picker) {
        var end = new Date(new Date().toDateString());
        var start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit('pick', [start, end]);
    }
}, {
    text: '最近三个月',
    onClick: function onClick(picker) {
        var end = new Date(new Date().toDateString());
        var start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit('pick', [start, end]);
    }
}];

// 格林威时间转换成字符串格式时间
function GMTToStr(time) {
    var date = new Date(time),
        year = date.getFullYear(),
        month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1),
        day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();

    return year + '-' + month + '-' + day;
}

/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(242);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(209)("4f2f2a20", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../../../../node_modules/_vue-loader@13.6.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4061e42c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/_vue-loader@13.6.1@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./AppsIndex.vue", function() {
     var newContent = require("!!../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../../../../node_modules/_vue-loader@13.6.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4061e42c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/_vue-loader@13.6.1@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./AppsIndex.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(76)(undefined);
// imports


// module
exports.push([module.i, "\n.handle-box[data-v-4061e42c] {\n    margin-bottom: 20px;\n}\n.handle-select[data-v-4061e42c] {\n    width: 120px;\n}\n.handle-input[data-v-4061e42c] {\n    width: 300px;\n    display: inline-block;\n}\n.el-table .cell .el-button[data-v-4061e42c] {\n    margin: 5px 0;\n}\n.plugins-tips[data-v-4061e42c] {\n    background: #eef1f6;\n    padding: 10px;\n    margin-bottom: 20px;\n}\n", ""]);

// exports


/***/ }),

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fetch__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_config__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_index__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sortablejs__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sortablejs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_sortablejs__);
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






var iTimer = null;

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            listLoading: true,
            allAppsOptions: [],
            pickerOptions: {
                shortcuts: __WEBPACK_IMPORTED_MODULE_2__utils_index__["b" /* pickerOptions */]
            },
            date: null,
            listQuery: {
                page: 1,
                id: undefined,
                tm_from: undefined,
                tm_to: undefined
            },
            tableData: [],
            total: 0,
            sortable: null,
            olderList: [],
            newList: []
        };
    },
    created: function created() {
        this.getData();
    },
    mounted: function mounted() {
        var _this = this;

        this.$nextTick(function () {
            _this.getAllApps();
        });
    },


    methods: {
        //获取所有产品
        getAllApps: function getAllApps() {
            var _this2 = this;

            Object(__WEBPACK_IMPORTED_MODULE_0__fetch__["n" /* fetchAllApps */])().then(function (res) {
                if (res && res.data.status == __WEBPACK_IMPORTED_MODULE_1__utils_config__["c" /* ERR_OK */]) {
                    _this2.allAppsOptions = res.data.data;
                } else {
                    _this2.$message.error('获取列表数据失败');
                }
            }).catch(function (error) {
                _this2.$message.error(error);
            });
        },


        // 获取列表
        getData: function getData() {
            var _this3 = this;

            this.listLoading = true;

            Object(__WEBPACK_IMPORTED_MODULE_0__fetch__["r" /* fetchAppList */])(this.listQuery).then(function (res) {
                if (res && res.data.status == __WEBPACK_IMPORTED_MODULE_1__utils_config__["c" /* ERR_OK */]) {
                    var result = res.data.data;

                    _this3.tableData = result.data;
                    _this3.total = result.total;

                    _this3.olderList = _this3.tableData.map(function (v) {
                        return v.id;
                    });
                    _this3.newList = _this3.olderList.slice();
                    _this3.$nextTick(function () {
                        _this3.setSort();
                    });
                } else {
                    _this3.$message.error('获取列表数据失败');
                }
                _this3.listLoading = false;
            }).catch(function (error) {
                _this3.$message.error(error);
                _this3.listLoading = false;
            });
        },


        //拖拽排序
        setSort: function setSort() {
            var _this4 = this;

            var el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
            this.sortable = __WEBPACK_IMPORTED_MODULE_3_sortablejs___default.a.create(el, {
                onEnd: function onEnd(evt) {
                    var tempIndex = _this4.newList.splice(evt.oldIndex, 1)[0];
                    _this4.newList.splice(evt.newIndex, 0, tempIndex);

                    clearTimeout(iTimer);
                    iTimer = setTimeout(function () {
                        Object(__WEBPACK_IMPORTED_MODULE_0__fetch__["D" /* fetchSort */])({
                            sort: _this4.newList
                        }).then(function (res) {
                            if (res && res.data.status == __WEBPACK_IMPORTED_MODULE_1__utils_config__["c" /* ERR_OK */]) {
                                _this4.$message.success('排序更新成功');
                            } else {
                                _this4.$message.error('排序更新失败');
                            }
                        }).catch(function (error) {
                            _this4.$message.error(error);
                        });
                    }, 1e3);
                }
            });
        },


        // 查询
        handleSearch: function handleSearch() {
            if (!this.listQuery.id && !this.date) return;

            if (this.date) {
                this.listQuery.tm_from = Object(__WEBPACK_IMPORTED_MODULE_2__utils_index__["a" /* GMTToStr */])(this.date[0]);
                this.listQuery.tm_to = Object(__WEBPACK_IMPORTED_MODULE_2__utils_index__["a" /* GMTToStr */])(this.date[1]);
            }

            this.listQuery.page = 1;
            this.getData();
        },


        // 添加产品
        handleAppsAdd: function handleAppsAdd() {
            this.$router.push('/appscreate');
        },


        // 分页
        handleCurrentChange: function handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getData();
        },


        // 推荐
        handleRecom: function handleRecom(index, row) {
            var _this5 = this;

            var id = row.id;

            this.$confirm('此操作将推荐产品 ' + row.name + ', 是否继续?', '温馨提示', { type: 'warning' }).then(function () {
                Object(__WEBPACK_IMPORTED_MODULE_0__fetch__["u" /* fetchAppRecom */])(id).then(function (res) {
                    if (res && res.data.status == __WEBPACK_IMPORTED_MODULE_1__utils_config__["c" /* ERR_OK */]) {
                        _this5.tableData[index].is_hot = 1;
                        _this5.$message.success('推荐成功');
                    } else {
                        _this5.$message.error('推荐失败');
                    }
                }).catch(function (error) {
                    _this5.$message.error(error);
                });
            }).catch(function () {
                console.log('已取消操作！');
            });
        },


        // 取消推荐
        handleCancelRecom: function handleCancelRecom(index, row) {
            var _this6 = this;

            var id = row.id;

            this.$confirm('此操作将取消推荐产品 ' + row.name + ', 是否继续?', '温馨提示', { type: 'warning' }).then(function () {
                Object(__WEBPACK_IMPORTED_MODULE_0__fetch__["o" /* fetchAppCancelRecom */])(id).then(function (res) {
                    if (res && res.data.status == __WEBPACK_IMPORTED_MODULE_1__utils_config__["c" /* ERR_OK */]) {
                        _this6.tableData[index].is_hot = 0;
                        _this6.$message.success('取消推荐成功');
                    } else {
                        _this6.$message.error('取消推荐失败');
                    }
                }).catch(function (error) {
                    _this6.$message.error(error);
                });
            }).catch(function () {
                console.log('已取消操作');
            });
        },


        // 上线
        handleOnline: function handleOnline(index, row) {
            var _this7 = this;

            var id = row.id;

            this.$confirm('此操作将上线产品 ' + row.name + ', 是否继续?', '温馨提示', { type: 'warning' }).then(function () {
                Object(__WEBPACK_IMPORTED_MODULE_0__fetch__["t" /* fetchAppOnline */])(id).then(function (res) {
                    if (res && res.data.status == __WEBPACK_IMPORTED_MODULE_1__utils_config__["c" /* ERR_OK */]) {
                        _this7.tableData[index].status = 1;
                        _this7.$message.success('上线成功');
                    } else {
                        _this7.$message.error('上线失败');
                    }
                }).catch(function (error) {
                    _this7.$message.error(error);
                });
            }).catch(function () {
                console.log('已取消操作');
            });
        },


        // 下线
        handleOffline: function handleOffline(index, row) {
            var _this8 = this;

            var id = row.id;

            this.$confirm('此操作将下线产品 ' + row.name + ', 是否继续?', '温馨提示', { type: 'warning' }).then(function () {
                Object(__WEBPACK_IMPORTED_MODULE_0__fetch__["s" /* fetchAppOffline */])(id).then(function (res) {
                    if (res && res.data.status == __WEBPACK_IMPORTED_MODULE_1__utils_config__["c" /* ERR_OK */]) {
                        _this8.tableData[index].status = 2;
                        _this8.$message.success('下线成功');
                    } else {
                        _this8.$message.error('下线失败');
                    }
                }).catch(function (error) {
                    _this8.$message.error(error);
                });
            }).catch(function () {
                console.log('已取消操作');
            });
        },


        // 查看
        handleShow: function handleShow(index, row) {
            var id = row.id;
            this.$router.push('/appsshow/' + id);
        },


        // 编辑
        handleEdit: function handleEdit(index, row) {
            var id = row.id;
            this.$router.push('/appsedit/' + id);
        },


        // 删除
        handleDelete: function handleDelete(index, row) {
            var _this9 = this;

            var id = row.id;

            this.$confirm('此操作将删除产品 ' + row.name + ', 是否继续?', '温馨提示', { type: 'warning' }).then(function () {
                Object(__WEBPACK_IMPORTED_MODULE_0__fetch__["p" /* fetchAppDel */])(id).then(function (res) {
                    if (res && res.data.status == __WEBPACK_IMPORTED_MODULE_1__utils_config__["c" /* ERR_OK */]) {
                        var _index = _this9.tableData.indexOf(row);
                        _this9.tableData.splice(_index, 1);
                        --_this9.total;
                        _this9.$message.success('删除成功');
                    } else {
                        _this9.$message.error('删除失败');
                    }
                }).catch(function (error) {
                    _this9.$message.error(error);
                });
            }).catch(function () {
                console.log('已取消操作');
            });
        }
    }
});

/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @license MIT
 */

(function sortableModule(factory) {
	"use strict";

	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	else if (typeof module != "undefined" && typeof module.exports != "undefined") {
		module.exports = factory();
	}
	else {
		/* jshint sub:true */
		window["Sortable"] = factory();
	}
})(function sortableFactory() {
	"use strict";

	if (typeof window === "undefined" || !window.document) {
		return function sortableError() {
			throw new Error("Sortable.js requires a window with a document");
		};
	}

	var dragEl,
		parentEl,
		ghostEl,
		cloneEl,
		rootEl,
		nextEl,
		lastDownEl,

		scrollEl,
		scrollParentEl,
		scrollCustomFn,

		lastEl,
		lastCSS,
		lastParentCSS,

		oldIndex,
		newIndex,

		activeGroup,
		putSortable,

		autoScroll = {},

		tapEvt,
		touchEvt,

		moved,

		/** @const */
		R_SPACE = /\s+/g,
		R_FLOAT = /left|right|inline/,

		expando = 'Sortable' + (new Date).getTime(),

		win = window,
		document = win.document,
		parseInt = win.parseInt,
		setTimeout = win.setTimeout,

		$ = win.jQuery || win.Zepto,
		Polymer = win.Polymer,

		captureMode = false,
		passiveMode = false,

		supportDraggable = ('draggable' in document.createElement('div')),
		supportCssPointerEvents = (function (el) {
			// false when IE11
			if (!!navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie)/i)) {
				return false;
			}
			el = document.createElement('x');
			el.style.cssText = 'pointer-events:auto';
			return el.style.pointerEvents === 'auto';
		})(),

		_silent = false,

		abs = Math.abs,
		min = Math.min,

		savedInputChecked = [],
		touchDragOverListeners = [],

		_autoScroll = _throttle(function (/**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl) {
			// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
			if (rootEl && options.scroll) {
				var _this = rootEl[expando],
					el,
					rect,
					sens = options.scrollSensitivity,
					speed = options.scrollSpeed,

					x = evt.clientX,
					y = evt.clientY,

					winWidth = window.innerWidth,
					winHeight = window.innerHeight,

					vx,
					vy,

					scrollOffsetX,
					scrollOffsetY
				;

				// Delect scrollEl
				if (scrollParentEl !== rootEl) {
					scrollEl = options.scroll;
					scrollParentEl = rootEl;
					scrollCustomFn = options.scrollFn;

					if (scrollEl === true) {
						scrollEl = rootEl;

						do {
							if ((scrollEl.offsetWidth < scrollEl.scrollWidth) ||
								(scrollEl.offsetHeight < scrollEl.scrollHeight)
							) {
								break;
							}
							/* jshint boss:true */
						} while (scrollEl = scrollEl.parentNode);
					}
				}

				if (scrollEl) {
					el = scrollEl;
					rect = scrollEl.getBoundingClientRect();
					vx = (abs(rect.right - x) <= sens) - (abs(rect.left - x) <= sens);
					vy = (abs(rect.bottom - y) <= sens) - (abs(rect.top - y) <= sens);
				}


				if (!(vx || vy)) {
					vx = (winWidth - x <= sens) - (x <= sens);
					vy = (winHeight - y <= sens) - (y <= sens);

					/* jshint expr:true */
					(vx || vy) && (el = win);
				}


				if (autoScroll.vx !== vx || autoScroll.vy !== vy || autoScroll.el !== el) {
					autoScroll.el = el;
					autoScroll.vx = vx;
					autoScroll.vy = vy;

					clearInterval(autoScroll.pid);

					if (el) {
						autoScroll.pid = setInterval(function () {
							scrollOffsetY = vy ? vy * speed : 0;
							scrollOffsetX = vx ? vx * speed : 0;

							if ('function' === typeof(scrollCustomFn)) {
								return scrollCustomFn.call(_this, scrollOffsetX, scrollOffsetY, evt);
							}

							if (el === win) {
								win.scrollTo(win.pageXOffset + scrollOffsetX, win.pageYOffset + scrollOffsetY);
							} else {
								el.scrollTop += scrollOffsetY;
								el.scrollLeft += scrollOffsetX;
							}
						}, 24);
					}
				}
			}
		}, 30),

		_prepareGroup = function (options) {
			function toFn(value, pull) {
				if (value === void 0 || value === true) {
					value = group.name;
				}

				if (typeof value === 'function') {
					return value;
				} else {
					return function (to, from) {
						var fromGroup = from.options.group.name;

						return pull
							? value
							: value && (value.join
								? value.indexOf(fromGroup) > -1
								: (fromGroup == value)
							);
					};
				}
			}

			var group = {};
			var originalGroup = options.group;

			if (!originalGroup || typeof originalGroup != 'object') {
				originalGroup = {name: originalGroup};
			}

			group.name = originalGroup.name;
			group.checkPull = toFn(originalGroup.pull, true);
			group.checkPut = toFn(originalGroup.put);
			group.revertClone = originalGroup.revertClone;

			options.group = group;
		}
	;

	// Detect support a passive mode
	try {
		window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
			get: function () {
				// `false`, because everything starts to work incorrectly and instead of d'n'd,
				// begins the page has scrolled.
				passiveMode = false;
				captureMode = {
					capture: false,
					passive: passiveMode
				};
			}
		}));
	} catch (err) {}

	/**
	 * @class  Sortable
	 * @param  {HTMLElement}  el
	 * @param  {Object}       [options]
	 */
	function Sortable(el, options) {
		if (!(el && el.nodeType && el.nodeType === 1)) {
			throw 'Sortable: `el` must be HTMLElement, and not ' + {}.toString.call(el);
		}

		this.el = el; // root element
		this.options = options = _extend({}, options);


		// Export instance
		el[expando] = this;

		// Default options
		var defaults = {
			group: Math.random(),
			sort: true,
			disabled: false,
			store: null,
			handle: null,
			scroll: true,
			scrollSensitivity: 30,
			scrollSpeed: 10,
			draggable: /[uo]l/i.test(el.nodeName) ? 'li' : '>*',
			ghostClass: 'sortable-ghost',
			chosenClass: 'sortable-chosen',
			dragClass: 'sortable-drag',
			ignore: 'a, img',
			filter: null,
			preventOnFilter: true,
			animation: 0,
			setData: function (dataTransfer, dragEl) {
				dataTransfer.setData('Text', dragEl.textContent);
			},
			dropBubble: false,
			dragoverBubble: false,
			dataIdAttr: 'data-id',
			delay: 0,
			forceFallback: false,
			fallbackClass: 'sortable-fallback',
			fallbackOnBody: false,
			fallbackTolerance: 0,
			fallbackOffset: {x: 0, y: 0},
			supportPointer: Sortable.supportPointer !== false
		};


		// Set default options
		for (var name in defaults) {
			!(name in options) && (options[name] = defaults[name]);
		}

		_prepareGroup(options);

		// Bind all private methods
		for (var fn in this) {
			if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
				this[fn] = this[fn].bind(this);
			}
		}

		// Setup drag mode
		this.nativeDraggable = options.forceFallback ? false : supportDraggable;

		// Bind events
		_on(el, 'mousedown', this._onTapStart);
		_on(el, 'touchstart', this._onTapStart);
		options.supportPointer && _on(el, 'pointerdown', this._onTapStart);

		if (this.nativeDraggable) {
			_on(el, 'dragover', this);
			_on(el, 'dragenter', this);
		}

		touchDragOverListeners.push(this._onDragOver);

		// Restore sorting
		options.store && this.sort(options.store.get(this));
	}


	Sortable.prototype = /** @lends Sortable.prototype */ {
		constructor: Sortable,

		_onTapStart: function (/** Event|TouchEvent */evt) {
			var _this = this,
				el = this.el,
				options = this.options,
				preventOnFilter = options.preventOnFilter,
				type = evt.type,
				touch = evt.touches && evt.touches[0],
				target = (touch || evt).target,
				originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0]) || target,
				filter = options.filter,
				startIndex;

			_saveInputCheckedState(el);


			// Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.
			if (dragEl) {
				return;
			}

			if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
				return; // only left button or enabled
			}

			// cancel dnd if original target is content editable
			if (originalTarget.isContentEditable) {
				return;
			}

			target = _closest(target, options.draggable, el);

			if (!target) {
				return;
			}

			if (lastDownEl === target) {
				// Ignoring duplicate `down`
				return;
			}

			// Get the index of the dragged element within its parent
			startIndex = _index(target, options.draggable);

			// Check filter
			if (typeof filter === 'function') {
				if (filter.call(this, evt, target, this)) {
					_dispatchEvent(_this, originalTarget, 'filter', target, el, el, startIndex);
					preventOnFilter && evt.preventDefault();
					return; // cancel dnd
				}
			}
			else if (filter) {
				filter = filter.split(',').some(function (criteria) {
					criteria = _closest(originalTarget, criteria.trim(), el);

					if (criteria) {
						_dispatchEvent(_this, criteria, 'filter', target, el, el, startIndex);
						return true;
					}
				});

				if (filter) {
					preventOnFilter && evt.preventDefault();
					return; // cancel dnd
				}
			}

			if (options.handle && !_closest(originalTarget, options.handle, el)) {
				return;
			}

			// Prepare `dragstart`
			this._prepareDragStart(evt, touch, target, startIndex);
		},

		_prepareDragStart: function (/** Event */evt, /** Touch */touch, /** HTMLElement */target, /** Number */startIndex) {
			var _this = this,
				el = _this.el,
				options = _this.options,
				ownerDocument = el.ownerDocument,
				dragStartFn;

			if (target && !dragEl && (target.parentNode === el)) {
				tapEvt = evt;

				rootEl = el;
				dragEl = target;
				parentEl = dragEl.parentNode;
				nextEl = dragEl.nextSibling;
				lastDownEl = target;
				activeGroup = options.group;
				oldIndex = startIndex;

				this._lastX = (touch || evt).clientX;
				this._lastY = (touch || evt).clientY;

				dragEl.style['will-change'] = 'all';

				dragStartFn = function () {
					// Delayed drag has been triggered
					// we can re-enable the events: touchmove/mousemove
					_this._disableDelayedDrag();

					// Make the element draggable
					dragEl.draggable = _this.nativeDraggable;

					// Chosen item
					_toggleClass(dragEl, options.chosenClass, true);

					// Bind the events: dragstart/dragend
					_this._triggerDragStart(evt, touch);

					// Drag start event
					_dispatchEvent(_this, rootEl, 'choose', dragEl, rootEl, rootEl, oldIndex);
				};

				// Disable "draggable"
				options.ignore.split(',').forEach(function (criteria) {
					_find(dragEl, criteria.trim(), _disableDraggable);
				});

				_on(ownerDocument, 'mouseup', _this._onDrop);
				_on(ownerDocument, 'touchend', _this._onDrop);
				_on(ownerDocument, 'touchcancel', _this._onDrop);
				_on(ownerDocument, 'selectstart', _this);
				options.supportPointer && _on(ownerDocument, 'pointercancel', _this._onDrop);

				if (options.delay) {
					// If the user moves the pointer or let go the click or touch
					// before the delay has been reached:
					// disable the delayed drag
					_on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchend', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
					_on(ownerDocument, 'mousemove', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchmove', _this._disableDelayedDrag);
					options.supportPointer && _on(ownerDocument, 'pointermove', _this._disableDelayedDrag);

					_this._dragStartTimer = setTimeout(dragStartFn, options.delay);
				} else {
					dragStartFn();
				}


			}
		},

		_disableDelayedDrag: function () {
			var ownerDocument = this.el.ownerDocument;

			clearTimeout(this._dragStartTimer);
			_off(ownerDocument, 'mouseup', this._disableDelayedDrag);
			_off(ownerDocument, 'touchend', this._disableDelayedDrag);
			_off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
			_off(ownerDocument, 'mousemove', this._disableDelayedDrag);
			_off(ownerDocument, 'touchmove', this._disableDelayedDrag);
			_off(ownerDocument, 'pointermove', this._disableDelayedDrag);
		},

		_triggerDragStart: function (/** Event */evt, /** Touch */touch) {
			touch = touch || (evt.pointerType == 'touch' ? evt : null);

			if (touch) {
				// Touch device support
				tapEvt = {
					target: dragEl,
					clientX: touch.clientX,
					clientY: touch.clientY
				};

				this._onDragStart(tapEvt, 'touch');
			}
			else if (!this.nativeDraggable) {
				this._onDragStart(tapEvt, true);
			}
			else {
				_on(dragEl, 'dragend', this);
				_on(rootEl, 'dragstart', this._onDragStart);
			}

			try {
				if (document.selection) {
					// Timeout neccessary for IE9
					_nextTick(function () {
						document.selection.empty();
					});
				} else {
					window.getSelection().removeAllRanges();
				}
			} catch (err) {
			}
		},

		_dragStarted: function () {
			if (rootEl && dragEl) {
				var options = this.options;

				// Apply effect
				_toggleClass(dragEl, options.ghostClass, true);
				_toggleClass(dragEl, options.dragClass, false);

				Sortable.active = this;

				// Drag start event
				_dispatchEvent(this, rootEl, 'start', dragEl, rootEl, rootEl, oldIndex);
			} else {
				this._nulling();
			}
		},

		_emulateDragOver: function () {
			if (touchEvt) {
				if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY) {
					return;
				}

				this._lastX = touchEvt.clientX;
				this._lastY = touchEvt.clientY;

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', 'none');
				}

				var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
				var parent = target;
				var i = touchDragOverListeners.length;

				if (target && target.shadowRoot) {
					target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
					parent = target;
				}

				if (parent) {
					do {
						if (parent[expando]) {
							while (i--) {
								touchDragOverListeners[i]({
									clientX: touchEvt.clientX,
									clientY: touchEvt.clientY,
									target: target,
									rootEl: parent
								});
							}

							break;
						}

						target = parent; // store last element
					}
					/* jshint boss:true */
					while (parent = parent.parentNode);
				}

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', '');
				}
			}
		},


		_onTouchMove: function (/**TouchEvent*/evt) {
			if (tapEvt) {
				var	options = this.options,
					fallbackTolerance = options.fallbackTolerance,
					fallbackOffset = options.fallbackOffset,
					touch = evt.touches ? evt.touches[0] : evt,
					dx = (touch.clientX - tapEvt.clientX) + fallbackOffset.x,
					dy = (touch.clientY - tapEvt.clientY) + fallbackOffset.y,
					translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';

				// only set the status to dragging, when we are actually dragging
				if (!Sortable.active) {
					if (fallbackTolerance &&
						min(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY)) < fallbackTolerance
					) {
						return;
					}

					this._dragStarted();
				}

				// as well as creating the ghost element on the document body
				this._appendGhost();

				moved = true;
				touchEvt = touch;

				_css(ghostEl, 'webkitTransform', translate3d);
				_css(ghostEl, 'mozTransform', translate3d);
				_css(ghostEl, 'msTransform', translate3d);
				_css(ghostEl, 'transform', translate3d);

				evt.preventDefault();
			}
		},

		_appendGhost: function () {
			if (!ghostEl) {
				var rect = dragEl.getBoundingClientRect(),
					css = _css(dragEl),
					options = this.options,
					ghostRect;

				ghostEl = dragEl.cloneNode(true);

				_toggleClass(ghostEl, options.ghostClass, false);
				_toggleClass(ghostEl, options.fallbackClass, true);
				_toggleClass(ghostEl, options.dragClass, true);

				_css(ghostEl, 'top', rect.top - parseInt(css.marginTop, 10));
				_css(ghostEl, 'left', rect.left - parseInt(css.marginLeft, 10));
				_css(ghostEl, 'width', rect.width);
				_css(ghostEl, 'height', rect.height);
				_css(ghostEl, 'opacity', '0.8');
				_css(ghostEl, 'position', 'fixed');
				_css(ghostEl, 'zIndex', '100000');
				_css(ghostEl, 'pointerEvents', 'none');

				options.fallbackOnBody && document.body.appendChild(ghostEl) || rootEl.appendChild(ghostEl);

				// Fixing dimensions.
				ghostRect = ghostEl.getBoundingClientRect();
				_css(ghostEl, 'width', rect.width * 2 - ghostRect.width);
				_css(ghostEl, 'height', rect.height * 2 - ghostRect.height);
			}
		},

		_onDragStart: function (/**Event*/evt, /**boolean*/useFallback) {
			var _this = this;
			var dataTransfer = evt.dataTransfer;
			var options = _this.options;

			_this._offUpEvents();

			if (activeGroup.checkPull(_this, _this, dragEl, evt)) {
				cloneEl = _clone(dragEl);

				cloneEl.draggable = false;
				cloneEl.style['will-change'] = '';

				_css(cloneEl, 'display', 'none');
				_toggleClass(cloneEl, _this.options.chosenClass, false);

				// #1143: IFrame support workaround
				_this._cloneId = _nextTick(function () {
					rootEl.insertBefore(cloneEl, dragEl);
					_dispatchEvent(_this, rootEl, 'clone', dragEl);
				});
			}

			_toggleClass(dragEl, options.dragClass, true);

			if (useFallback) {
				if (useFallback === 'touch') {
					// Bind touch events
					_on(document, 'touchmove', _this._onTouchMove);
					_on(document, 'touchend', _this._onDrop);
					_on(document, 'touchcancel', _this._onDrop);

					if (options.supportPointer) {
						_on(document, 'pointermove', _this._onTouchMove);
						_on(document, 'pointerup', _this._onDrop);
					}
				} else {
					// Old brwoser
					_on(document, 'mousemove', _this._onTouchMove);
					_on(document, 'mouseup', _this._onDrop);
				}

				_this._loopId = setInterval(_this._emulateDragOver, 50);
			}
			else {
				if (dataTransfer) {
					dataTransfer.effectAllowed = 'move';
					options.setData && options.setData.call(_this, dataTransfer, dragEl);
				}

				_on(document, 'drop', _this);

				// #1143: Бывает элемент с IFrame внутри блокирует `drop`,
				// поэтому если вызвался `mouseover`, значит надо отменять весь d'n'd.
				// Breaking Chrome 62+
				// _on(document, 'mouseover', _this);

				_this._dragStartId = _nextTick(_this._dragStarted);
			}
		},

		_onDragOver: function (/**Event*/evt) {
			var el = this.el,
				target,
				dragRect,
				targetRect,
				revert,
				options = this.options,
				group = options.group,
				activeSortable = Sortable.active,
				isOwner = (activeGroup === group),
				isMovingBetweenSortable = false,
				canSort = options.sort;

			if (evt.preventDefault !== void 0) {
				evt.preventDefault();
				!options.dragoverBubble && evt.stopPropagation();
			}

			if (dragEl.animated) {
				return;
			}

			moved = true;

			if (activeSortable && !options.disabled &&
				(isOwner
					? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
					: (
						putSortable === this ||
						(
							(activeSortable.lastPullMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) &&
							group.checkPut(this, activeSortable, dragEl, evt)
						)
					)
				) &&
				(evt.rootEl === void 0 || evt.rootEl === this.el) // touch fallback
			) {
				// Smart auto-scrolling
				_autoScroll(evt, options, this.el);

				if (_silent) {
					return;
				}

				target = _closest(evt.target, options.draggable, el);
				dragRect = dragEl.getBoundingClientRect();

				if (putSortable !== this) {
					putSortable = this;
					isMovingBetweenSortable = true;
				}

				if (revert) {
					_cloneHide(activeSortable, true);
					parentEl = rootEl; // actualization

					if (cloneEl || nextEl) {
						rootEl.insertBefore(dragEl, cloneEl || nextEl);
					}
					else if (!canSort) {
						rootEl.appendChild(dragEl);
					}

					return;
				}


				if ((el.children.length === 0) || (el.children[0] === ghostEl) ||
					(el === evt.target) && (_ghostIsLast(el, evt))
				) {
					//assign target only if condition is true
					if (el.children.length !== 0 && el.children[0] !== ghostEl && el === evt.target) {
						target = el.lastElementChild;
					}

					if (target) {
						if (target.animated) {
							return;
						}

						targetRect = target.getBoundingClientRect();
					}

					_cloneHide(activeSortable, isOwner);

					if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt) !== false) {
						if (!dragEl.contains(el)) {
							el.appendChild(dragEl);
							parentEl = el; // actualization
						}

						this._animate(dragRect, dragEl);
						target && this._animate(targetRect, target);
					}
				}
				else if (target && !target.animated && target !== dragEl && (target.parentNode[expando] !== void 0)) {
					if (lastEl !== target) {
						lastEl = target;
						lastCSS = _css(target);
						lastParentCSS = _css(target.parentNode);
					}

					targetRect = target.getBoundingClientRect();

					var width = targetRect.right - targetRect.left,
						height = targetRect.bottom - targetRect.top,
						floating = R_FLOAT.test(lastCSS.cssFloat + lastCSS.display)
							|| (lastParentCSS.display == 'flex' && lastParentCSS['flex-direction'].indexOf('row') === 0),
						isWide = (target.offsetWidth > dragEl.offsetWidth),
						isLong = (target.offsetHeight > dragEl.offsetHeight),
						halfway = (floating ? (evt.clientX - targetRect.left) / width : (evt.clientY - targetRect.top) / height) > 0.5,
						nextSibling = target.nextElementSibling,
						after = false
					;

					if (floating) {
						var elTop = dragEl.offsetTop,
							tgTop = target.offsetTop;

						if (elTop === tgTop) {
							after = (target.previousElementSibling === dragEl) && !isWide || halfway && isWide;
						}
						else if (target.previousElementSibling === dragEl || dragEl.previousElementSibling === target) {
							after = (evt.clientY - targetRect.top) / height > 0.5;
						} else {
							after = tgTop > elTop;
						}
						} else if (!isMovingBetweenSortable) {
						after = (nextSibling !== dragEl) && !isLong || halfway && isLong;
					}

					var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

					if (moveVector !== false) {
						if (moveVector === 1 || moveVector === -1) {
							after = (moveVector === 1);
						}

						_silent = true;
						setTimeout(_unsilent, 30);

						_cloneHide(activeSortable, isOwner);

						if (!dragEl.contains(el)) {
							if (after && !nextSibling) {
								el.appendChild(dragEl);
							} else {
								target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
							}
						}

						parentEl = dragEl.parentNode; // actualization

						this._animate(dragRect, dragEl);
						this._animate(targetRect, target);
					}
				}
			}
		},

		_animate: function (prevRect, target) {
			var ms = this.options.animation;

			if (ms) {
				var currentRect = target.getBoundingClientRect();

				if (prevRect.nodeType === 1) {
					prevRect = prevRect.getBoundingClientRect();
				}

				_css(target, 'transition', 'none');
				_css(target, 'transform', 'translate3d('
					+ (prevRect.left - currentRect.left) + 'px,'
					+ (prevRect.top - currentRect.top) + 'px,0)'
				);

				target.offsetWidth; // repaint

				_css(target, 'transition', 'all ' + ms + 'ms');
				_css(target, 'transform', 'translate3d(0,0,0)');

				clearTimeout(target.animated);
				target.animated = setTimeout(function () {
					_css(target, 'transition', '');
					_css(target, 'transform', '');
					target.animated = false;
				}, ms);
			}
		},

		_offUpEvents: function () {
			var ownerDocument = this.el.ownerDocument;

			_off(document, 'touchmove', this._onTouchMove);
			_off(document, 'pointermove', this._onTouchMove);
			_off(ownerDocument, 'mouseup', this._onDrop);
			_off(ownerDocument, 'touchend', this._onDrop);
			_off(ownerDocument, 'pointerup', this._onDrop);
			_off(ownerDocument, 'touchcancel', this._onDrop);
			_off(ownerDocument, 'pointercancel', this._onDrop);
			_off(ownerDocument, 'selectstart', this);
		},

		_onDrop: function (/**Event*/evt) {
			var el = this.el,
				options = this.options;

			clearInterval(this._loopId);
			clearInterval(autoScroll.pid);
			clearTimeout(this._dragStartTimer);

			_cancelNextTick(this._cloneId);
			_cancelNextTick(this._dragStartId);

			// Unbind events
			_off(document, 'mouseover', this);
			_off(document, 'mousemove', this._onTouchMove);

			if (this.nativeDraggable) {
				_off(document, 'drop', this);
				_off(el, 'dragstart', this._onDragStart);
			}

			this._offUpEvents();

			if (evt) {
				if (moved) {
					evt.preventDefault();
					!options.dropBubble && evt.stopPropagation();
				}

				ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

				if (rootEl === parentEl || Sortable.active.lastPullMode !== 'clone') {
					// Remove clone
					cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
				}

				if (dragEl) {
					if (this.nativeDraggable) {
						_off(dragEl, 'dragend', this);
					}

					_disableDraggable(dragEl);
					dragEl.style['will-change'] = '';

					// Remove class's
					_toggleClass(dragEl, this.options.ghostClass, false);
					_toggleClass(dragEl, this.options.chosenClass, false);

					// Drag stop event
					_dispatchEvent(this, rootEl, 'unchoose', dragEl, parentEl, rootEl, oldIndex);

					if (rootEl !== parentEl) {
						newIndex = _index(dragEl, options.draggable);

						if (newIndex >= 0) {
							// Add event
							_dispatchEvent(null, parentEl, 'add', dragEl, parentEl, rootEl, oldIndex, newIndex);

							// Remove event
							_dispatchEvent(this, rootEl, 'remove', dragEl, parentEl, rootEl, oldIndex, newIndex);

							// drag from one list and drop into another
							_dispatchEvent(null, parentEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
							_dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
						}
					}
					else {
						if (dragEl.nextSibling !== nextEl) {
							// Get the index of the dragged element within its parent
							newIndex = _index(dragEl, options.draggable);

							if (newIndex >= 0) {
								// drag & drop within the same list
								_dispatchEvent(this, rootEl, 'update', dragEl, parentEl, rootEl, oldIndex, newIndex);
								_dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
							}
						}
					}

					if (Sortable.active) {
						/* jshint eqnull:true */
						if (newIndex == null || newIndex === -1) {
							newIndex = oldIndex;
						}

						_dispatchEvent(this, rootEl, 'end', dragEl, parentEl, rootEl, oldIndex, newIndex);

						// Save sorting
						this.save();
					}
				}

			}

			this._nulling();
		},

		_nulling: function() {
			rootEl =
			dragEl =
			parentEl =
			ghostEl =
			nextEl =
			cloneEl =
			lastDownEl =

			scrollEl =
			scrollParentEl =

			tapEvt =
			touchEvt =

			moved =
			newIndex =

			lastEl =
			lastCSS =

			putSortable =
			activeGroup =
			Sortable.active = null;

			savedInputChecked.forEach(function (el) {
				el.checked = true;
			});
			savedInputChecked.length = 0;
		},

		handleEvent: function (/**Event*/evt) {
			switch (evt.type) {
				case 'drop':
				case 'dragend':
					this._onDrop(evt);
					break;

				case 'dragover':
				case 'dragenter':
					if (dragEl) {
						this._onDragOver(evt);
						_globalDragOver(evt);
					}
					break;

				case 'mouseover':
					this._onDrop(evt);
					break;

				case 'selectstart':
					evt.preventDefault();
					break;
			}
		},


		/**
		 * Serializes the item into an array of string.
		 * @returns {String[]}
		 */
		toArray: function () {
			var order = [],
				el,
				children = this.el.children,
				i = 0,
				n = children.length,
				options = this.options;

			for (; i < n; i++) {
				el = children[i];
				if (_closest(el, options.draggable, this.el)) {
					order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
				}
			}

			return order;
		},


		/**
		 * Sorts the elements according to the array.
		 * @param  {String[]}  order  order of the items
		 */
		sort: function (order) {
			var items = {}, rootEl = this.el;

			this.toArray().forEach(function (id, i) {
				var el = rootEl.children[i];

				if (_closest(el, this.options.draggable, rootEl)) {
					items[id] = el;
				}
			}, this);

			order.forEach(function (id) {
				if (items[id]) {
					rootEl.removeChild(items[id]);
					rootEl.appendChild(items[id]);
				}
			});
		},


		/**
		 * Save the current sorting
		 */
		save: function () {
			var store = this.options.store;
			store && store.set(this);
		},


		/**
		 * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
		 * @param   {HTMLElement}  el
		 * @param   {String}       [selector]  default: `options.draggable`
		 * @returns {HTMLElement|null}
		 */
		closest: function (el, selector) {
			return _closest(el, selector || this.options.draggable, this.el);
		},


		/**
		 * Set/get option
		 * @param   {string} name
		 * @param   {*}      [value]
		 * @returns {*}
		 */
		option: function (name, value) {
			var options = this.options;

			if (value === void 0) {
				return options[name];
			} else {
				options[name] = value;

				if (name === 'group') {
					_prepareGroup(options);
				}
			}
		},


		/**
		 * Destroy
		 */
		destroy: function () {
			var el = this.el;

			el[expando] = null;

			_off(el, 'mousedown', this._onTapStart);
			_off(el, 'touchstart', this._onTapStart);
			_off(el, 'pointerdown', this._onTapStart);

			if (this.nativeDraggable) {
				_off(el, 'dragover', this);
				_off(el, 'dragenter', this);
			}

			// Remove draggable attributes
			Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
				el.removeAttribute('draggable');
			});

			touchDragOverListeners.splice(touchDragOverListeners.indexOf(this._onDragOver), 1);

			this._onDrop();

			this.el = el = null;
		}
	};


	function _cloneHide(sortable, state) {
		if (sortable.lastPullMode !== 'clone') {
			state = true;
		}

		if (cloneEl && (cloneEl.state !== state)) {
			_css(cloneEl, 'display', state ? 'none' : '');

			if (!state) {
				if (cloneEl.state) {
					if (sortable.options.group.revertClone) {
						rootEl.insertBefore(cloneEl, nextEl);
						sortable._animate(dragEl, cloneEl);
					} else {
						rootEl.insertBefore(cloneEl, dragEl);
					}
				}
			}

			cloneEl.state = state;
		}
	}


	function _closest(/**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx) {
		if (el) {
			ctx = ctx || document;

			do {
				if ((selector === '>*' && el.parentNode === ctx) || _matches(el, selector)) {
					return el;
				}
				/* jshint boss:true */
			} while (el = _getParentOrHost(el));
		}

		return null;
	}


	function _getParentOrHost(el) {
		var parent = el.host;

		return (parent && parent.nodeType) ? parent : el.parentNode;
	}


	function _globalDragOver(/**Event*/evt) {
		if (evt.dataTransfer) {
			evt.dataTransfer.dropEffect = 'move';
		}
		evt.preventDefault();
	}


	function _on(el, event, fn) {
		el.addEventListener(event, fn, captureMode);
	}


	function _off(el, event, fn) {
		el.removeEventListener(event, fn, captureMode);
	}


	function _toggleClass(el, name, state) {
		if (el) {
			if (el.classList) {
				el.classList[state ? 'add' : 'remove'](name);
			}
			else {
				var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
				el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
			}
		}
	}


	function _css(el, prop, val) {
		var style = el && el.style;

		if (style) {
			if (val === void 0) {
				if (document.defaultView && document.defaultView.getComputedStyle) {
					val = document.defaultView.getComputedStyle(el, '');
				}
				else if (el.currentStyle) {
					val = el.currentStyle;
				}

				return prop === void 0 ? val : val[prop];
			}
			else {
				if (!(prop in style)) {
					prop = '-webkit-' + prop;
				}

				style[prop] = val + (typeof val === 'string' ? '' : 'px');
			}
		}
	}


	function _find(ctx, tagName, iterator) {
		if (ctx) {
			var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;

			if (iterator) {
				for (; i < n; i++) {
					iterator(list[i], i);
				}
			}

			return list;
		}

		return [];
	}



	function _dispatchEvent(sortable, rootEl, name, targetEl, toEl, fromEl, startIndex, newIndex) {
		sortable = (sortable || rootEl[expando]);

		var evt = document.createEvent('Event'),
			options = sortable.options,
			onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);

		evt.initEvent(name, true, true);

		evt.to = toEl || rootEl;
		evt.from = fromEl || rootEl;
		evt.item = targetEl || rootEl;
		evt.clone = cloneEl;

		evt.oldIndex = startIndex;
		evt.newIndex = newIndex;

		rootEl.dispatchEvent(evt);

		if (options[onName]) {
			options[onName].call(sortable, evt);
		}
	}


	function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvt, willInsertAfter) {
		var evt,
			sortable = fromEl[expando],
			onMoveFn = sortable.options.onMove,
			retVal;

		evt = document.createEvent('Event');
		evt.initEvent('move', true, true);

		evt.to = toEl;
		evt.from = fromEl;
		evt.dragged = dragEl;
		evt.draggedRect = dragRect;
		evt.related = targetEl || toEl;
		evt.relatedRect = targetRect || toEl.getBoundingClientRect();
		evt.willInsertAfter = willInsertAfter;

		fromEl.dispatchEvent(evt);

		if (onMoveFn) {
			retVal = onMoveFn.call(sortable, evt, originalEvt);
		}

		return retVal;
	}


	function _disableDraggable(el) {
		el.draggable = false;
	}


	function _unsilent() {
		_silent = false;
	}


	/** @returns {HTMLElement|false} */
	function _ghostIsLast(el, evt) {
		var lastEl = el.lastElementChild,
			rect = lastEl.getBoundingClientRect();

		// 5 — min delta
		// abs — нельзя добавлять, а то глюки при наведении сверху
		return (evt.clientY - (rect.top + rect.height) > 5) ||
			(evt.clientX - (rect.left + rect.width) > 5);
	}


	/**
	 * Generate id
	 * @param   {HTMLElement} el
	 * @returns {String}
	 * @private
	 */
	function _generateId(el) {
		var str = el.tagName + el.className + el.src + el.href + el.textContent,
			i = str.length,
			sum = 0;

		while (i--) {
			sum += str.charCodeAt(i);
		}

		return sum.toString(36);
	}

	/**
	 * Returns the index of an element within its parent for a selected set of
	 * elements
	 * @param  {HTMLElement} el
	 * @param  {selector} selector
	 * @return {number}
	 */
	function _index(el, selector) {
		var index = 0;

		if (!el || !el.parentNode) {
			return -1;
		}

		while (el && (el = el.previousElementSibling)) {
			if ((el.nodeName.toUpperCase() !== 'TEMPLATE') && (selector === '>*' || _matches(el, selector))) {
				index++;
			}
		}

		return index;
	}

	function _matches(/**HTMLElement*/el, /**String*/selector) {
		if (el) {
			selector = selector.split('.');

			var tag = selector.shift().toUpperCase(),
				re = new RegExp('\\s(' + selector.join('|') + ')(?=\\s)', 'g');

			return (
				(tag === '' || el.nodeName.toUpperCase() == tag) &&
				(!selector.length || ((' ' + el.className + ' ').match(re) || []).length == selector.length)
			);
		}

		return false;
	}

	function _throttle(callback, ms) {
		var args, _this;

		return function () {
			if (args === void 0) {
				args = arguments;
				_this = this;

				setTimeout(function () {
					if (args.length === 1) {
						callback.call(_this, args[0]);
					} else {
						callback.apply(_this, args);
					}

					args = void 0;
				}, ms);
			}
		};
	}

	function _extend(dst, src) {
		if (dst && src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) {
					dst[key] = src[key];
				}
			}
		}

		return dst;
	}

	function _clone(el) {
		if (Polymer && Polymer.dom) {
			return Polymer.dom(el).cloneNode(true);
		}
		else if ($) {
			return $(el).clone(true)[0];
		}
		else {
			return el.cloneNode(true);
		}
	}

	function _saveInputCheckedState(root) {
		var inputs = root.getElementsByTagName('input');
		var idx = inputs.length;

		while (idx--) {
			var el = inputs[idx];
			el.checked && savedInputChecked.push(el);
		}
	}

	function _nextTick(fn) {
		return setTimeout(fn, 0);
	}

	function _cancelNextTick(id) {
		return clearTimeout(id);
	}

	// Fixed #973:
	_on(document, 'touchmove', function (evt) {
		if (Sortable.active) {
			evt.preventDefault();
		}
	});

	// Export utils
	Sortable.utils = {
		on: _on,
		off: _off,
		css: _css,
		find: _find,
		is: function (el, selector) {
			return !!_closest(el, selector, el);
		},
		extend: _extend,
		throttle: _throttle,
		closest: _closest,
		toggleClass: _toggleClass,
		clone: _clone,
		index: _index,
		nextTick: _nextTick,
		cancelNextTick: _cancelNextTick
	};


	/**
	 * Create sortable instance
	 * @param {HTMLElement}  el
	 * @param {Object}      [options]
	 */
	Sortable.create = function (el, options) {
		return new Sortable(el, options);
	};


	// Export
	Sortable.version = '1.7.0';
	return Sortable;
});


/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "table" },
    [
      _c(
        "div",
        { staticClass: "crumbs" },
        [
          _c(
            "el-breadcrumb",
            { attrs: { "separator-class": "el-icon-arrow-right" } },
            [
              _c("el-breadcrumb-item", [
                _c("i", { staticClass: "el-icon-menu" }),
                _vm._v(" 产品管理")
              ]),
              _vm._v(" "),
              _c("el-breadcrumb-item", [_vm._v("产品列表")])
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "handle-box" },
        [
          _c(
            "el-select",
            {
              attrs: { clearable: "", filterable: "", placeholder: "全部产品" },
              model: {
                value: _vm.listQuery.id,
                callback: function($$v) {
                  _vm.$set(_vm.listQuery, "id", $$v)
                },
                expression: "listQuery.id"
              }
            },
            _vm._l(_vm.allAppsOptions, function(item, key) {
              return _c("el-option", {
                key: item.id,
                attrs: { label: item.id + " - " + item.name, value: item.id }
              })
            })
          ),
          _vm._v(" "),
          _c("el-date-picker", {
            attrs: {
              clearable: "",
              type: "daterange",
              align: "center",
              "unlink-panels": "",
              "range-separator": "-",
              "start-placeholder": "开始日期",
              "end-placeholder": "结束日期",
              "picker-options": _vm.pickerOptions
            },
            model: {
              value: _vm.date,
              callback: function($$v) {
                _vm.date = $$v
              },
              expression: "date"
            }
          }),
          _vm._v(" "),
          _c(
            "el-button",
            {
              attrs: { type: "primary", icon: "el-icon-search" },
              on: { click: _vm.handleSearch }
            },
            [_vm._v("查询")]
          ),
          _vm._v(" "),
          _c(
            "el-button",
            {
              attrs: { type: "primary", icon: "el-icon-plus" },
              on: { click: _vm.handleAppsAdd }
            },
            [_vm._v("添加产品")]
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm._m(0),
      _vm._v(" "),
      _c(
        "el-table",
        {
          directives: [
            {
              name: "loading",
              rawName: "v-loading",
              value: _vm.listLoading,
              expression: "listLoading"
            }
          ],
          staticStyle: { width: "100%" },
          attrs: {
            data: _vm.tableData,
            stripe: "",
            border: "",
            "element-loading-text": "拼命加载中..."
          }
        },
        [
          _c("el-table-column", {
            attrs: { prop: "id", label: "ID", align: "center" }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "name", label: "产品名称", align: "center" }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { label: "产品ICON", align: "center" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _c("img", { attrs: { src: scope.row.icon, width: "80" } })
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c(
            "el-table-column",
            { attrs: { label: "借款信息", align: "center" } },
            [
              _c("el-table-column", {
                attrs: { label: "借款额度", align: "center" },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return [
                        _vm._v(
                          _vm._s(scope.row.min_money) +
                            "-" +
                            _vm._s(scope.row.max_money) +
                            " 元"
                        )
                      ]
                    }
                  }
                ])
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { label: "借款期限", align: "center" },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return [
                        _vm._v(
                          _vm._s(scope.row.min_term) +
                            "-" +
                            _vm._s(scope.row.max_term) +
                            " 天"
                        )
                      ]
                    }
                  }
                ])
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { label: "费率类型", align: "center" },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return [
                        _vm._v(
                          _vm._s(
                            scope.row.interest_type > 0 ? "月费率" : "日费率"
                          )
                        )
                      ]
                    }
                  }
                ])
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { label: "参考费率", align: "center" },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return [
                        _vm._v(
                          _vm._s(scope.row.min_rate) +
                            "-" +
                            _vm._s(scope.row.max_rate) +
                            _vm._s(scope.row.rate) +
                            " %"
                        )
                      ]
                    }
                  }
                ])
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-table-column",
            { attrs: { label: "投放信息", align: "center" } },
            [
              _c("el-table-column", {
                attrs: { label: "投放单价", align: "center" },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return [_vm._v(_vm._s(scope.row.price) + " 元")]
                    }
                  }
                ])
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { prop: "count", label: "投放数量", align: "center" }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-table-column",
            { attrs: { label: "数据统计", align: "center" } },
            [
              _c("el-table-column", {
                attrs: {
                  prop: "applicants",
                  label: "申请人数",
                  align: "center"
                }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { label: "借款成功率", align: "center" },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return [_vm._v(_vm._s(scope.row.success_rate) + " %")]
                    }
                  }
                ])
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { prop: "viewCnt", label: "浏览数", align: "center" }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { prop: "clickCnt", label: "申请数", align: "center" }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { label: "是否推荐", align: "center" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      "\n                " +
                        _vm._s(scope.row.is_hot > 0 ? "推荐" : "不推荐") +
                        "\n                "
                    ),
                    scope.row.is_hot == 1
                      ? _c(
                          "el-button",
                          {
                            attrs: { size: "small" },
                            on: {
                              click: function($event) {
                                _vm.handleCancelRecom(scope.$index, scope.row)
                              }
                            }
                          },
                          [_vm._v("取消推荐")]
                        )
                      : _c(
                          "el-button",
                          {
                            attrs: { size: "small", type: "primary" },
                            on: {
                              click: function($event) {
                                _vm.handleRecom(scope.$index, scope.row)
                              }
                            }
                          },
                          [_vm._v("推荐")]
                        )
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { label: "状态", align: "center" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      "\n                " +
                        _vm._s(_vm._f("filterStatus")(scope.row.status)) +
                        "\n                "
                    ),
                    scope.row.status == 1
                      ? _c(
                          "el-button",
                          {
                            attrs: { size: "small", type: "warning" },
                            on: {
                              click: function($event) {
                                _vm.handleOffline(scope.$index, scope.row)
                              }
                            }
                          },
                          [_vm._v("下线")]
                        )
                      : _c(
                          "el-button",
                          {
                            attrs: { size: "small", type: "primary" },
                            on: {
                              click: function($event) {
                                _vm.handleOnline(scope.$index, scope.row)
                              }
                            }
                          },
                          [_vm._v("上线")]
                        )
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { label: "操作", prop: "status", align: "center" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _c(
                      "el-button",
                      {
                        attrs: { size: "small" },
                        on: {
                          click: function($event) {
                            _vm.handleShow(scope.$index, scope.row)
                          }
                        }
                      },
                      [_vm._v("查看")]
                    ),
                    _vm._v(" "),
                    _c(
                      "el-button",
                      {
                        attrs: { size: "small" },
                        on: {
                          click: function($event) {
                            _vm.handleEdit(scope.$index, scope.row)
                          }
                        }
                      },
                      [_vm._v("编辑")]
                    ),
                    _vm._v(" "),
                    scope.row.status != 4
                      ? _c(
                          "el-button",
                          {
                            attrs: { size: "small", type: "danger" },
                            on: {
                              click: function($event) {
                                _vm.handleDelete(scope.$index, scope.row)
                              }
                            }
                          },
                          [_vm._v("删除")]
                        )
                      : _vm._e()
                  ]
                }
              }
            ])
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: !_vm.listLoading && _vm.total,
              expression: "!listLoading && total"
            }
          ],
          staticClass: "pagination"
        },
        [
          _c("el-pagination", {
            attrs: { layout: "total, prev, pager, next", total: _vm.total },
            on: { "current-change": _vm.handleCurrentChange }
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "plugins-tips" }, [
      _c("i", { staticClass: "el-icon-upload2" }),
      _vm._v(" 移动到列表行拖拽可改变排序\n    ")
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-4061e42c", module.exports)
  }
}

/***/ })

});