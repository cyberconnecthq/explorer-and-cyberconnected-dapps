(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ "./src/components/loading.jsx":
/*!************************************!*\
  !*** ./src/components/loading.jsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var _styles_loading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/loading */ \"./src/components/styles/loading.jsx\");\n\n\n\n\nvar Loading = function Loading() {\n  var theme = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"useSelector\"])(function (state) {\n    return state.theme;\n  });\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_loading__WEBPACK_IMPORTED_MODULE_2__[\"LoadingIcon\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"svg\", {\n    viewBox: \"0 0 32 32\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"circle\", {\n    cx: \"16\",\n    cy: \"16\",\n    fill: \"none\",\n    r: \"14\",\n    strokeWidth: \"4\",\n    style: {\n      stroke: theme.defaultBg,\n      opacity: \"0.2\"\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"circle\", {\n    cx: \"16\",\n    cy: \"16\",\n    fill: \"none\",\n    r: \"14\",\n    strokeWidth: \"4\",\n    style: {\n      stroke: theme.defaultBg,\n      strokeDasharray: 80,\n      strokeDashoffset: 60\n    }\n  })));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Loading);\n\n//# sourceURL=webpack:///./src/components/loading.jsx?");

/***/ }),

/***/ "./src/components/sidebar/index.jsx":
/*!******************************************!*\
  !*** ./src/components/sidebar/index.jsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _styles_sidebar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/sidebar */ \"./src/components/styles/sidebar.jsx\");\n/* harmony import */ var _loading__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../loading */ \"./src/components/loading.jsx\");\n/* harmony import */ var _redux_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../redux/actions */ \"./src/redux/actions.jsx\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n\n\nvar URL = undefined.REACT_APP_BACKEND_URL;\n\nvar SideBar = function SideBar() {\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(null),\n      _useState2 = _slicedToArray(_useState, 2),\n      whoFollow = _useState2[0],\n      setWhoFollow = _useState2[1];\n\n  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false),\n      _useState4 = _slicedToArray(_useState3, 2),\n      isFollowDisabled = _useState4[0],\n      setFollowDisabled = _useState4[1];\n\n  var user = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__[\"useSelector\"])(function (state) {\n    return state.user;\n  });\n  var theme = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__[\"useSelector\"])(function (state) {\n    return state.theme;\n  });\n  var uid = user.uid;\n  var token = user.token;\n  var refresh = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__[\"useSelector\"])(function (state) {\n    return state.update.refresh;\n  });\n  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__[\"useDispatch\"])();\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(function () {\n    var cancelToken = axios__WEBPACK_IMPORTED_MODULE_3___default.a.CancelToken;\n    var source = cancelToken.source();\n\n    _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n      var res;\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              _context.prev = 0;\n              _context.next = 3;\n              return axios__WEBPACK_IMPORTED_MODULE_3___default.a.get(\"\".concat(URL, \"/api/feed/who-follow?uid=\").concat(uid), {\n                cancelToken: source.token,\n                headers: {\n                  Authorization: \"Bearer \".concat(token)\n                }\n              });\n\n            case 3:\n              res = _context.sent;\n              setWhoFollow(res.data.whoFollow);\n              _context.next = 10;\n              break;\n\n            case 7:\n              _context.prev = 7;\n              _context.t0 = _context[\"catch\"](0);\n              console.error(_context.t0);\n\n            case 10:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee, null, [[0, 7]]);\n    }))();\n\n    return function () {\n      source.cancel();\n    };\n  }, [refresh]);\n\n  var handleFollow = /*#__PURE__*/function () {\n    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(e, idx) {\n      var res;\n      return regeneratorRuntime.wrap(function _callee2$(_context2) {\n        while (1) {\n          switch (_context2.prev = _context2.next) {\n            case 0:\n              e.preventDefault();\n              setFollowDisabled(true);\n              _context2.next = 4;\n              return axios__WEBPACK_IMPORTED_MODULE_3___default.a.post(\"\".concat(URL, \"/api/follow\"), {\n                followedId: whoFollow[idx].id,\n                followerId: uid\n              }, {\n                headers: {\n                  Authorization: \"Bearer \".concat(token)\n                }\n              });\n\n            case 4:\n              _context2.next = 6;\n              return axios__WEBPACK_IMPORTED_MODULE_3___default.a.get(\"\".concat(URL, \"/api/feed/who-follow?uid=\").concat(uid), {\n                headers: {\n                  Authorization: \"Bearer \".concat(token)\n                }\n              });\n\n            case 6:\n              res = _context2.sent;\n              setWhoFollow(res.data.whoFollow);\n              setFollowDisabled(false);\n              dispatch({\n                type: _redux_actions__WEBPACK_IMPORTED_MODULE_6__[\"SET_UPDATE\"]\n              });\n\n            case 10:\n            case \"end\":\n              return _context2.stop();\n          }\n        }\n      }, _callee2);\n    }));\n\n    return function handleFollow(_x, _x2) {\n      return _ref2.apply(this, arguments);\n    };\n  }();\n\n  if (!whoFollow) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_loading__WEBPACK_IMPORTED_MODULE_5__[\"default\"], null);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_sidebar__WEBPACK_IMPORTED_MODULE_4__[\"SideBarBox\"], {\n    tweetHov: theme.tweetHov\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_sidebar__WEBPACK_IMPORTED_MODULE_4__[\"Header\"], {\n    color: theme.color,\n    border: theme.border\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\", null, \"Who to follow\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_sidebar__WEBPACK_IMPORTED_MODULE_4__[\"Users\"], null, !whoFollow.length && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", {\n    style: {\n      textAlign: \"center\",\n      color: theme.color\n    }\n  }, \"No more users left to follow\"), whoFollow.map(function (user, idx) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n      to: \"/profile/\".concat(user.uid),\n      key: user.uid\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_sidebar__WEBPACK_IMPORTED_MODULE_4__[\"UserFlex\"], {\n      color: theme.color,\n      border: theme.border\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: user.avatar\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", null, user.username), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, \"@\", user.username)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      style: {\n        marginLeft: \"auto\"\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_sidebar__WEBPACK_IMPORTED_MODULE_4__[\"Button\"], {\n      onClick: function onClick(e) {\n        return handleFollow(e, idx);\n      },\n      disabled: isFollowDisabled\n    }, \"Follow\"))));\n  })));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (SideBar);\n\n//# sourceURL=webpack:///./src/components/sidebar/index.jsx?");

/***/ }),

/***/ "./src/components/styles/loading.jsx":
/*!*******************************************!*\
  !*** ./src/components/styles/loading.jsx ***!
  \*******************************************/
/*! exports provided: LoadingIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LoadingIcon\", function() { return LoadingIcon; });\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\nvar _templateObject, _templateObject2;\n\nfunction _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\n\nvar spin = Object(styled_components__WEBPACK_IMPORTED_MODULE_0__[\"keyframes\"])(_templateObject || (_templateObject = _taggedTemplateLiteral([\"\\n    0% { transform: rotate(0deg); }\\n    100% { transform: rotate(360deg); }\\n\"])));\nvar LoadingIcon = styled_components__WEBPACK_IMPORTED_MODULE_0__[\"default\"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral([\"\\n  text-align: center;\\n  padding-top: 5%;\\n  padding-bottom: 5%;\\n  svg {\\n    width: 26px;\\n    height: 26px;\\n    animation: \", \" 2s linear infinite;\\n  }\\n\"])), spin);\n\n//# sourceURL=webpack:///./src/components/styles/loading.jsx?");

/***/ }),

/***/ "./src/components/styles/sidebar.jsx":
/*!*******************************************!*\
  !*** ./src/components/styles/sidebar.jsx ***!
  \*******************************************/
/*! exports provided: SideBarBox, Header, Users, UserFlex, Button */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SideBarBox\", function() { return SideBarBox; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Header\", function() { return Header; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Users\", function() { return Users; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UserFlex\", function() { return UserFlex; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Button\", function() { return Button; });\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\nvar _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;\n\nfunction _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\n\nvar SideBarBox = styled_components__WEBPACK_IMPORTED_MODULE_0__[\"default\"].div(_templateObject || (_templateObject = _taggedTemplateLiteral([\"\\n  position: sticky;\\n  top: 5%;\\n  background: \", \";\\n  width: 70%;\\n  margin: 10% 0 0 5%;\\n  border-radius: 15px;\\n  @media (max-width: 768px) {\\n    width: 90%;\\n  }\\n\"])), function (props) {\n  return props.tweetHov;\n});\nvar Header = styled_components__WEBPACK_IMPORTED_MODULE_0__[\"default\"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral([\"\\n  padding: 10px 15px;\\n  border-bottom: \", \";\\n  h2 {\\n    color: \", \";\\n    font-size: 19px;\\n    font-weight: 800;\\n    margin: 0;\\n  }\\n\"])), function (props) {\n  return \"1px solid \".concat(props.border);\n}, function (props) {\n  return props.color;\n});\nvar Users = styled_components__WEBPACK_IMPORTED_MODULE_0__[\"default\"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral([\"\\n  a:last-child div {\\n    border: none;\\n  }\\n\"])));\nvar UserFlex = styled_components__WEBPACK_IMPORTED_MODULE_0__[\"default\"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral([\"\\n  display: flex;\\n  padding: 10px 15px;\\n  border-bottom: \", \";\\n  img {\\n    width: 49px;\\n    height: 49px;\\n    border-radius: 50%;\\n    margin-right: 10px;\\n  }\\n  h3,\\n  p {\\n    margin: 0;\\n  }\\n  h3 {\\n    color: \", \";\\n    font-size: 15px;\\n    font-weight: 700;\\n    line-height: 19.68px;\\n  }\\n  h3:hover {\\n    text-decoration: underline;\\n  }\\n  p {\\n    line-height: 19.68px;\\n    color: rgb(101, 119, 134);\\n  }\\n  &:hover {\\n    background-color: rgba(0, 0, 0, 0.03);\\n  }\\n\"])), function (props) {\n  return \"1px solid \".concat(props.border);\n}, function (props) {\n  return props.color;\n});\nvar Button = styled_components__WEBPACK_IMPORTED_MODULE_0__[\"default\"].button(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral([\"\\n  background-color: transparent;\\n  border: 1px solid rgb(29, 161, 242);\\n  border-radius: 50px;\\n  padding: 5px 12px;\\n  cursor: pointer;\\n  outline: none;\\n  font-weight: 700;\\n  &:hover {\\n    background-color: rgba(29, 161, 242, 0.1);\\n  }\\n  &:disabled {\\n    cursor: not-allowed;\\n  }\\n\"])));\n\n//# sourceURL=webpack:///./src/components/styles/sidebar.jsx?");

/***/ })

}]);