webpackJsonp([3],{

/***/ 199:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(246)
}
var normalizeComponent = __webpack_require__(75)
/* script */
var __vue_script__ = __webpack_require__(248)
/* template */
var __vue_template__ = __webpack_require__(249)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3c4e993e"
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
Component.options.__file = "resources\\assets\\js\\components\\page\\AppsCreateEdit.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3c4e993e", Component.options)
  } else {
    hotAPI.reload("data-v-3c4e993e", Component.options)
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

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(247);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(209)("78de0298", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../../../../node_modules/_vue-loader@13.6.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3c4e993e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/_vue-loader@13.6.1@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./AppsCreateEdit.vue", function() {
     var newContent = require("!!../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../../../../node_modules/_vue-loader@13.6.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3c4e993e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/_vue-loader@13.6.1@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./AppsCreateEdit.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(76)(undefined);
// imports


// module
exports.push([module.i, "\nh3[data-v-3c4e993e] {\n    border-bottom: 1px solid #eee;\n    padding-bottom: 10px;\n    margin: 30px 0 20px 0;\n}\n.el-input__tip[data-v-3c4e993e] {\n    font-size: 12px;\n    color: #5a5e66;\n    margin-top: 15px;\n    line-height: 24px;\n}\n", ""]);

// exports


/***/ }),

/***/ 248:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fetch__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_config__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_index__ = __webpack_require__(212);
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





/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        var _this = this;

        var validateIcon = function validateIcon(rule, value, callback) {
            if (!_this.ruleForm.file.length) {
                callback(new Error('请上传产品ICON'));
            } else {
                callback();
            }
        };

        var validateLinkUri = function validateLinkUri(rule, value, callback) {
            if (value) {
                if (Object(__WEBPACK_IMPORTED_MODULE_2__utils_index__["c" /* validateURL */])(value)) {
                    callback();
                } else {
                    callback(new Error('链接填写不正确'));
                }
            } else {
                callback(new Error('请输入申请跳转链接'));
            }
        };

        return {
            id: '',
            uploadUrl: __WEBPACK_IMPORTED_MODULE_0__fetch__["y" /* fetchAppUploadUrl */],
            ruleForm: {
                name: '',
                file: [],
                min_money: undefined,
                max_money: undefined,
                min_term: undefined,
                max_term: undefined,
                interest_type: '1',
                min_rate: undefined,
                max_rate: undefined,
                requirements: '',
                authentication: [],
                link: '',
                applicants: undefined,
                success_rate: undefined,
                description: '',
                lend_time: undefined,
                user_type: [],
                c_name: '',
                c_phone: '',
                c_mobile: '',
                price: undefined,
                count: undefined,
                is_hot: '0'
            },
            rules: {
                name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
                file: [{ required: true, validator: validateIcon, trigger: 'change' }],
                min_money: [{ type: 'number', required: true, message: '请输入正确的最低借款额度', trigger: 'blur' }],
                max_money: [{ type: 'number', required: true, message: '请输入正确的最高借款额度', trigger: 'blur' }],
                min_term: [{ type: 'number', required: true, message: '请输入正确的最低借款期限', trigger: 'blur' }],
                max_term: [{ type: 'number', required: true, message: '请输入正确的最高借款期限', trigger: 'blur' }],
                interest_type: [{ required: true, message: '请选择费率', trigger: 'change' }],
                min_rate: [{ required: true, message: '请输入正确的最小费率', trigger: 'blur' }],
                max_rate: [{ required: true, message: '请输入正确的最大费率', trigger: 'blur' }],
                requirements: [{ required: true, message: '请输入申请条件', trigger: 'blur' }],
                authentication: [{ type: 'array', required: true, message: '请选择认证资料', trigger: 'change' }],
                link: [{ required: true, validator: validateLinkUri, trigger: 'blur' }],
                applicants: [{ type: 'number', message: '请输入正确的申请人数', trigger: 'blur' }],
                success_rate: [{ message: '请输入正确的借款成功率', trigger: 'blur' }],
                description: [{ required: true, message: '请输入描述', trigger: 'blur' }],
                lend_time: [{ type: 'number', required: true, message: '请输入正确的最快放款时间', trigger: 'blur' }],
                user_type: [{ type: 'array', required: true, message: '请选择可借贷人群', trigger: 'change' }],
                c_name: [{ required: true, message: '请输入所属公司', trigger: 'blur' }],
                c_phone: [{ required: true, message: '请输入客服电话', trigger: 'blur' }],
                price: [{ required: true, message: '请输入正确的投放单价', trigger: 'blur' }],
                count: [{ type: 'number', required: true, message: '请输入正确的投放数量', trigger: 'blur' }]
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
            this.id = this.$route.params.id;
            this.getAppInfo();
        }
    },

    methods: {
        // 编辑页面信息
        getAppInfo: function getAppInfo() {
            var _this2 = this;

            var id = this.id;

            Object(__WEBPACK_IMPORTED_MODULE_0__fetch__["q" /* fetchAppEdit */])(id).then(function (res) {
                if (res && res.data.status == __WEBPACK_IMPORTED_MODULE_1__utils_config__["c" /* ERR_OK */]) {
                    var data = res.data.data;

                    data.authentication = data.authentication.split(',');
                    data.user_type = data.user_type.split(',');
                    data.interest_type = data.interest_type + '';
                    data.is_hot = data.is_hot + '';

                    data.file = [{
                        'name': data.name,
                        'url': data.icon
                    }];
                    _this2.ruleForm = data;
                } else {
                    _this2.$message.error('获取产品信息失败');
                }
            }).catch(function (error) {
                _this2.$message.error(error);
            });
        },
        handleExceed: function handleExceed(files, fileList) {
            this.$message.warning('当前已选择了 1 个文件，您可以删除重新上传');
        },
        beforeUpload: function beforeUpload(file) {
            var isImg = false,
                isLt2M = file.size / 1024 / 1024 < 2;

            switch (file.type) {
                case 'image/jpg':
                    isImg = true;
                    break;
                case 'image/jpeg':
                    isImg = true;
                    break;
                case 'image/png':
                    isImg = true;
                    break;
                case 'image/gif':
                    isImg = true;
                    break;
            }

            if (!isImg) {
                this.$message.error('上传图片格式不正确');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB');
            }
            return isImg && isLt2M;
        },
        handleSuccess: function handleSuccess(res, file, fileList) {
            if (res && res.status == __WEBPACK_IMPORTED_MODULE_1__utils_config__["c" /* ERR_OK */]) {
                this.ruleForm.file = fileList;
            } else {
                this.$message.error(res.msg);
            }
        },
        handleError: function handleError(err, file, fileList) {
            this.$message.error(err.msg);
        },
        onSubmit: function onSubmit() {
            var _this3 = this;

            this.$refs.ruleForm.validate(function (valid) {
                if (valid) {
                    _this3.loading = true;

                    if (_this3.isEdit) {
                        // 修改提交
                        var tmp = _this3.ruleForm;
                        delete tmp.clickCnt;
                        delete tmp.file;
                        delete tmp.viewCnt;

                        Object(__WEBPACK_IMPORTED_MODULE_0__fetch__["w" /* fetchAppSaveEdit */])(_this3.id, tmp).then(function (res) {
                            if (res && res.data.status == __WEBPACK_IMPORTED_MODULE_1__utils_config__["c" /* ERR_OK */]) {
                                _this3.$message.success('修改成功');
                                setTimeout(function () {
                                    _this3.$router.push('/index');
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
                        Object(__WEBPACK_IMPORTED_MODULE_0__fetch__["v" /* fetchAppSaveAdd */])(_this3.ruleForm).then(function (res) {
                            if (res && res.data.status == __WEBPACK_IMPORTED_MODULE_1__utils_config__["c" /* ERR_OK */]) {
                                _this3.$message.success('创建成功');
                                setTimeout(function () {
                                    _this3.$router.push('/index');
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

/***/ 249:
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
              _vm._v(" 产品管理")
            ]),
            _vm._v(" "),
            _vm.isEdit
              ? _c("el-breadcrumb-item", [_vm._v("编辑产品")])
              : _c("el-breadcrumb-item", [_vm._v("添加产品")])
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
            _c("h3", [_vm._v("基本信息")]),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "产品名称", prop: "name" } },
              [
                _c("el-input", {
                  attrs: { placeholder: "请输入产品名称" },
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
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "产品ICON", prop: "file" } },
              [
                _c(
                  "el-upload",
                  {
                    ref: "upload",
                    attrs: {
                      action: _vm.uploadUrl,
                      multiple: false,
                      "list-type": "picture",
                      "file-list": _vm.ruleForm.file,
                      limit: 1,
                      "on-exceed": _vm.handleExceed,
                      "before-upload": _vm.beforeUpload,
                      "on-success": _vm.handleSuccess,
                      "on-error": _vm.handleError
                    }
                  },
                  [
                    _c(
                      "el-button",
                      {
                        attrs: {
                          slot: "trigger",
                          size: "small",
                          type: "success"
                        },
                        slot: "trigger"
                      },
                      [_vm._v("上传图片")]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "el-upload__tip",
                        attrs: { slot: "tip" },
                        slot: "tip"
                      },
                      [
                        _vm._v(
                          "尺寸 128x128；只能上传jpg/png/gif文件，且不超过2MB"
                        )
                      ]
                    )
                  ],
                  1
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "最低借款额度", prop: "min_money" } },
              [
                _c(
                  "el-input",
                  {
                    attrs: { placeholder: "请输入最低借款额度", min: 1 },
                    model: {
                      value: _vm.ruleForm.min_money,
                      callback: function($$v) {
                        _vm.$set(_vm.ruleForm, "min_money", _vm._n($$v))
                      },
                      expression: "ruleForm.min_money"
                    }
                  },
                  [_c("template", { slot: "append" }, [_vm._v("元")])],
                  2
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "最高借款额度", prop: "max_money" } },
              [
                _c(
                  "el-input",
                  {
                    attrs: { placeholder: "请输入最高借款额度", min: 1 },
                    model: {
                      value: _vm.ruleForm.max_money,
                      callback: function($$v) {
                        _vm.$set(_vm.ruleForm, "max_money", _vm._n($$v))
                      },
                      expression: "ruleForm.max_money"
                    }
                  },
                  [_c("template", { slot: "append" }, [_vm._v("元")])],
                  2
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "最低借款期限", prop: "min_term" } },
              [
                _c(
                  "el-input",
                  {
                    attrs: { placeholder: "请输入最低借款期限", min: 1 },
                    model: {
                      value: _vm.ruleForm.min_term,
                      callback: function($$v) {
                        _vm.$set(_vm.ruleForm, "min_term", _vm._n($$v))
                      },
                      expression: "ruleForm.min_term"
                    }
                  },
                  [_c("template", { slot: "append" }, [_vm._v("天")])],
                  2
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "最高借款期限", prop: "max_term" } },
              [
                _c(
                  "el-input",
                  {
                    attrs: { placeholder: "请输入最高借款期限", min: 1 },
                    model: {
                      value: _vm.ruleForm.max_term,
                      callback: function($$v) {
                        _vm.$set(_vm.ruleForm, "max_term", _vm._n($$v))
                      },
                      expression: "ruleForm.max_term"
                    }
                  },
                  [_c("template", { slot: "append" }, [_vm._v("天")])],
                  2
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "费率类型", prop: "interest_type" } },
              [
                _c(
                  "el-radio",
                  {
                    attrs: { label: "0" },
                    model: {
                      value: _vm.ruleForm.interest_type,
                      callback: function($$v) {
                        _vm.$set(_vm.ruleForm, "interest_type", $$v)
                      },
                      expression: "ruleForm.interest_type"
                    }
                  },
                  [_vm._v("日费率")]
                ),
                _vm._v(" "),
                _c(
                  "el-radio",
                  {
                    attrs: { label: "1" },
                    model: {
                      value: _vm.ruleForm.interest_type,
                      callback: function($$v) {
                        _vm.$set(_vm.ruleForm, "interest_type", $$v)
                      },
                      expression: "ruleForm.interest_type"
                    }
                  },
                  [_vm._v("月费率")]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "最小费率", prop: "min_rate" } },
              [
                _c(
                  "el-input",
                  {
                    attrs: { placeholder: "请输入最小费率" },
                    model: {
                      value: _vm.ruleForm.min_rate,
                      callback: function($$v) {
                        _vm.$set(_vm.ruleForm, "min_rate", $$v)
                      },
                      expression: "ruleForm.min_rate"
                    }
                  },
                  [_c("template", { slot: "append" }, [_vm._v("%")])],
                  2
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "最大费率", prop: "max_rate" } },
              [
                _c(
                  "el-input",
                  {
                    attrs: { placeholder: "请输入最大费率" },
                    model: {
                      value: _vm.ruleForm.max_rate,
                      callback: function($$v) {
                        _vm.$set(_vm.ruleForm, "max_rate", $$v)
                      },
                      expression: "ruleForm.max_rate"
                    }
                  },
                  [_c("template", { slot: "append" }, [_vm._v("%")])],
                  2
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "申请条件", prop: "requirements" } },
              [
                _c("el-input", {
                  attrs: {
                    type: "textarea",
                    autosize: { minRows: 3, maxRows: 6 },
                    placeholder: "请输入申请条件，多个回车换行"
                  },
                  model: {
                    value: _vm.ruleForm.requirements,
                    callback: function($$v) {
                      _vm.$set(
                        _vm.ruleForm,
                        "requirements",
                        typeof $$v === "string" ? $$v.trim() : $$v
                      )
                    },
                    expression: "ruleForm.requirements"
                  }
                }),
                _vm._v(" "),
                _c("div", { staticClass: "el-input__tip" }, [
                  _c("h4", [_vm._v("参考格式：")]),
                  _vm._v(" "),
                  _c("p", [
                    _vm._v("\n                        1.22-55周岁大陆公民；"),
                    _c("br"),
                    _vm._v(
                      "\n                        2.本人手机号实名制，且已使用半年以上；"
                    ),
                    _c("br"),
                    _vm._v(
                      "\n                        3.芝麻信用分600分以上。\n                    "
                    )
                  ])
                ])
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "认证资料", prop: "authentication" } },
              [
                _c(
                  "el-checkbox-group",
                  {
                    model: {
                      value: _vm.ruleForm.authentication,
                      callback: function($$v) {
                        _vm.$set(_vm.ruleForm, "authentication", $$v)
                      },
                      expression: "ruleForm.authentication"
                    }
                  },
                  [
                    _c("el-checkbox", { attrs: { label: "0" } }, [
                      _vm._v("基本信息")
                    ]),
                    _vm._v(" "),
                    _c("el-checkbox", { attrs: { label: "1" } }, [
                      _vm._v("身份认证")
                    ]),
                    _vm._v(" "),
                    _c("el-checkbox", { attrs: { label: "2" } }, [
                      _vm._v("手机认证")
                    ]),
                    _vm._v(" "),
                    _c("el-checkbox", { attrs: { label: "3" } }, [
                      _vm._v("芝麻信用")
                    ]),
                    _vm._v(" "),
                    _c("el-checkbox", { attrs: { label: "4" } }, [
                      _vm._v("信用卡")
                    ]),
                    _vm._v(" "),
                    _c("el-checkbox", { attrs: { label: "5" } }, [
                      _vm._v("填写联系人")
                    ]),
                    _vm._v(" "),
                    _c("el-checkbox", { attrs: { label: "6" } }, [
                      _vm._v("填写工作信息")
                    ]),
                    _vm._v(" "),
                    _c("el-checkbox", { attrs: { label: "7" } }, [
                      _vm._v("信用卡账单")
                    ]),
                    _vm._v(" "),
                    _c("el-checkbox", { attrs: { label: "8" } }, [
                      _vm._v("淘宝认证")
                    ]),
                    _vm._v(" "),
                    _c("el-checkbox", { attrs: { label: "9" } }, [
                      _vm._v("征信查询")
                    ])
                  ],
                  1
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "申请跳转链接", prop: "link" } },
              [
                _c("el-input", {
                  attrs: { placeholder: "请输入申请跳转链接" },
                  model: {
                    value: _vm.ruleForm.link,
                    callback: function($$v) {
                      _vm.$set(
                        _vm.ruleForm,
                        "link",
                        typeof $$v === "string" ? $$v.trim() : $$v
                      )
                    },
                    expression: "ruleForm.link"
                  }
                }),
                _vm._v(" "),
                _c("div", { staticClass: "el-input__tip" }, [
                  _vm._v("需要带http(s)://")
                ])
              ],
              1
            ),
            _vm._v(" "),
            _c("h3", [_vm._v("投放信息")]),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "投放单价", prop: "price" } },
              [
                _c(
                  "el-input",
                  {
                    attrs: { placeholder: "请输入投放单价" },
                    model: {
                      value: _vm.ruleForm.price,
                      callback: function($$v) {
                        _vm.$set(_vm.ruleForm, "price", $$v)
                      },
                      expression: "ruleForm.price"
                    }
                  },
                  [_c("template", { slot: "append" }, [_vm._v("元")])],
                  2
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "投放数量", prop: "count" } },
              [
                _c("el-input-number", {
                  attrs: { min: 1 },
                  model: {
                    value: _vm.ruleForm.count,
                    callback: function($$v) {
                      _vm.$set(_vm.ruleForm, "count", _vm._n($$v))
                    },
                    expression: "ruleForm.count"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "是否推荐", prop: "is_hot" } },
              [
                _c("el-switch", {
                  attrs: { "active-value": "1", "inactive-value": "0" },
                  model: {
                    value: _vm.ruleForm.is_hot,
                    callback: function($$v) {
                      _vm.$set(_vm.ruleForm, "is_hot", $$v)
                    },
                    expression: "ruleForm.is_hot"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c("h3", [_vm._v("附属信息")]),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "申请人数", prop: "applicants" } },
              [
                _c("el-input", {
                  attrs: { placeholder: "请输入申请人数", min: 1 },
                  model: {
                    value: _vm.ruleForm.applicants,
                    callback: function($$v) {
                      _vm.$set(_vm.ruleForm, "applicants", _vm._n($$v))
                    },
                    expression: "ruleForm.applicants"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "借款成功率", prop: "success_rate" } },
              [
                _c(
                  "el-input",
                  {
                    attrs: { placeholder: "请输入借款成功率" },
                    model: {
                      value: _vm.ruleForm.success_rate,
                      callback: function($$v) {
                        _vm.$set(_vm.ruleForm, "success_rate", $$v)
                      },
                      expression: "ruleForm.success_rate"
                    }
                  },
                  [_c("template", { slot: "append" }, [_vm._v("%")])],
                  2
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "描 述", prop: "description" } },
              [
                _c("el-input", {
                  attrs: { placeholder: "多个用空格隔开" },
                  model: {
                    value: _vm.ruleForm.description,
                    callback: function($$v) {
                      _vm.$set(
                        _vm.ruleForm,
                        "description",
                        typeof $$v === "string" ? $$v.trim() : $$v
                      )
                    },
                    expression: "ruleForm.description"
                  }
                }),
                _vm._v(" "),
                _c("div", { staticClass: "el-input__tip" }, [
                  _c("b", [_vm._v("参考格式：")]),
                  _vm._v("10秒审批 最高5万 放款快，利率低")
                ])
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "最快放款时间", prop: "lend_time" } },
              [
                _c(
                  "el-input",
                  {
                    attrs: { placeholder: "请输入最快放款时间", min: 0 },
                    model: {
                      value: _vm.ruleForm.lend_time,
                      callback: function($$v) {
                        _vm.$set(_vm.ruleForm, "lend_time", _vm._n($$v))
                      },
                      expression: "ruleForm.lend_time"
                    }
                  },
                  [_c("template", { slot: "append" }, [_vm._v("分钟")])],
                  2
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "可借贷人群", prop: "user_type" } },
              [
                _c(
                  "el-checkbox-group",
                  {
                    model: {
                      value: _vm.ruleForm.user_type,
                      callback: function($$v) {
                        _vm.$set(_vm.ruleForm, "user_type", $$v)
                      },
                      expression: "ruleForm.user_type"
                    }
                  },
                  [
                    _c("el-checkbox", { attrs: { label: "0" } }, [
                      _vm._v("无工作")
                    ]),
                    _vm._v(" "),
                    _c("el-checkbox", { attrs: { label: "1" } }, [
                      _vm._v("蓝领")
                    ]),
                    _vm._v(" "),
                    _c("el-checkbox", { attrs: { label: "2" } }, [
                      _vm._v("白领")
                    ]),
                    _vm._v(" "),
                    _c("el-checkbox", { attrs: { label: "3" } }, [
                      _vm._v("上班族")
                    ]),
                    _vm._v(" "),
                    _c("el-checkbox", { attrs: { label: "4" } }, [
                      _vm._v("个体户")
                    ]),
                    _vm._v(" "),
                    _c("el-checkbox", { attrs: { label: "5" } }, [
                      _vm._v("企业主")
                    ]),
                    _vm._v(" "),
                    _c("el-checkbox", { attrs: { label: "6" } }, [
                      _vm._v("学生党")
                    ])
                  ],
                  1
                )
              ],
              1
            ),
            _vm._v(" "),
            _c("h3", [_vm._v("借贷公司信息")]),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "所属公司", prop: "c_name" } },
              [
                _c("el-input", {
                  attrs: { placeholder: "请输入所属公司" },
                  model: {
                    value: _vm.ruleForm.c_name,
                    callback: function($$v) {
                      _vm.$set(
                        _vm.ruleForm,
                        "c_name",
                        typeof $$v === "string" ? $$v.trim() : $$v
                      )
                    },
                    expression: "ruleForm.c_name"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "客服电话", prop: "c_phone" } },
              [
                _c("el-input", {
                  attrs: { placeholder: "请输入客服电话" },
                  model: {
                    value: _vm.ruleForm.c_phone,
                    callback: function($$v) {
                      _vm.$set(
                        _vm.ruleForm,
                        "c_phone",
                        typeof $$v === "string" ? $$v.trim() : $$v
                      )
                    },
                    expression: "ruleForm.c_phone"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "信贷联系人", prop: "c_mobile" } },
              [
                _c("el-input", {
                  attrs: { placeholder: "请输入信贷联系人" },
                  model: {
                    value: _vm.ruleForm.c_mobile,
                    callback: function($$v) {
                      _vm.$set(
                        _vm.ruleForm,
                        "c_mobile",
                        typeof $$v === "string" ? $$v.trim() : $$v
                      )
                    },
                    expression: "ruleForm.c_mobile"
                  }
                }),
                _vm._v(" "),
                _c("div", { staticClass: "el-input__tip" }, [
                  _c("b", [_vm._v("参考格式：")]),
                  _vm._v("王某某：18711111111")
                ])
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-3c4e993e", module.exports)
  }
}

/***/ })

});