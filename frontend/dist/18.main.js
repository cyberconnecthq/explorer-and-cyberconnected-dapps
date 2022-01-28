(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[18],{

/***/ "./src/components/bookmarks/index.js":
/*!*******************************************!*\
  !*** ./src/components/bookmarks/index.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var _styles_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/common */ \"./src/components/styles/common.js\");\n/* harmony import */ var _profile_activity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../profile/activity */ \"./src/components/profile/activity.js\");\n\n\n\n\nvar URL = {\"REACT_APP_SERVER_URL\":\"http://localhost:5000\",\"REACT_APP_SECRET_KEY\":\"verysecretkey\"}.REACT_APP_SERVER_URL;\n\nvar BookMarks = function BookMarks() {\n  var user = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"useSelector\"])(function (state) {\n    return state.profile.user;\n  });\n  var theme = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"useSelector\"])(function (state) {\n    return state.theme;\n  });\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_common__WEBPACK_IMPORTED_MODULE_2__[\"ProfileCorner\"], {\n    border: theme.border\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles_common__WEBPACK_IMPORTED_MODULE_2__[\"Header\"], {\n    bg: theme.bg,\n    color: theme.color,\n    para: theme.para,\n    border: theme.border\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\", null, \"Bookmarks\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, \"@ \", user.username)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_profile_activity__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    url: \"\".concat(URL, \"/bookmarks?userId=\").concat(user.id),\n    dataKey: \"bookmarks\",\n    removeBookmark: true,\n    isBookmark: true\n  }));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (BookMarks);\n\n//# sourceURL=webpack:///./src/components/bookmarks/index.js?");

/***/ })

}]);