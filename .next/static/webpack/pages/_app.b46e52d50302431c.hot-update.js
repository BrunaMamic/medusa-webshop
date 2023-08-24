"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./lib/context/account-context.tsx":
/*!*****************************************!*\
  !*** ./lib/context/account-context.tsx ***!
  \*****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AccountProvider: function() { return /* binding */ AccountProvider; },\n/* harmony export */   LOGIN_VIEW: function() { return /* binding */ LOGIN_VIEW; },\n/* harmony export */   checkIfCustomerExists: function() { return /* binding */ checkIfCustomerExists; },\n/* harmony export */   handleRegistrationClick: function() { return /* binding */ handleRegistrationClick; },\n/* harmony export */   useAccount: function() { return /* binding */ useAccount; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ \"./lib/config.ts\");\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tanstack/react-query */ \"./node_modules/@tanstack/react-query/build/lib/index.mjs\");\n/* harmony import */ var medusa_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! medusa-react */ \"./node_modules/medusa-react/dist/index.mjs\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/navigation */ \"./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _medusajs_medusa_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @medusajs/medusa-js */ \"./node_modules/@medusajs/medusa-js/dist/index.mjs\");\n/* __next_internal_client_entry_do_not_use__ LOGIN_VIEW,handleRegistrationClick,checkIfCustomerExists,AccountProvider,useAccount auto */ \nvar _s = $RefreshSig$(), _s1 = $RefreshSig$();\n\n\n\n\n\n\nvar LOGIN_VIEW;\n(function(LOGIN_VIEW) {\n    LOGIN_VIEW[\"SIGN_IN\"] = \"sign-in\";\n    LOGIN_VIEW[\"REGISTER\"] = \"register\";\n})(LOGIN_VIEW || (LOGIN_VIEW = {}));\nconst AccountContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_4__.createContext)(null);\nconst medusa = new _medusajs_medusa_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({\n    baseUrl: _config__WEBPACK_IMPORTED_MODULE_1__.MEDUSA_BACKEND_URL,\n    maxRetries: 3\n});\n// export const addAddress = async (\n//   first_name:string, last_name:string\n// ) => {\n//   const response = await medusa.customers.addresses.addAddress({\n//   address: {\n//     first_name: \"Celia\",\n//     last_name: \"Schumm\",\n//     address_1: \"225 Bednar Curve\",\n//     city: \"Danielville\",\n//     country_code: \"US\",\n//     postal_code: \"85137\",\n//     phone: \"981-596-6748 x90188\",\n//     company: \"Wyman LLC\",\n//     province: \"Georgia\",\n//     metadata: undefined,\n//     address_2: ''\n//   }\n// })\n// }\nconst handleRegistrationClick = async (first_name, last_name, email, password)=>{\n    const response = await medusa.customers.create({\n        first_name: first_name,\n        last_name: last_name,\n        email: email,\n        password: password\n    });\n    return response.customer;\n};\nconst checkIfCustomerExists = async (email)=>{\n    const { exists } = await _config__WEBPACK_IMPORTED_MODULE_1__.medusaClient.auth.exists(email);\n    return exists;\n};\nconst handleDeleteSession = ()=>{\n    return _config__WEBPACK_IMPORTED_MODULE_1__.medusaClient.auth.deleteSession();\n};\nconst AccountProvider = (param)=>{\n    let { children } = param;\n    _s();\n    const { customer, isLoading: retrievingCustomer, refetch, remove } = (0,medusa_react__WEBPACK_IMPORTED_MODULE_2__.useMeCustomer)({\n        onError: ()=>{}\n    });\n    const loginView = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(LOGIN_VIEW.SIGN_IN);\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    const handleLogin = (0,react__WEBPACK_IMPORTED_MODULE_4__.useCallback)(async (email, password)=>{\n        const response = await _config__WEBPACK_IMPORTED_MODULE_1__.medusaClient.auth.authenticate({\n            email: email,\n            password: password\n        });\n        if (response.customer) [\n            refetch()\n        ];\n    }, []);\n    const updateCustomerInfo = async (data)=>{\n        const response = await _config__WEBPACK_IMPORTED_MODULE_1__.medusaClient.customers.update(data);\n        if (response.customer) {\n            refetch();\n        }\n    };\n    const checkSession = (0,react__WEBPACK_IMPORTED_MODULE_4__.useCallback)(()=>{\n        if (!customer && !retrievingCustomer) {\n            router.push(\"/account/login\");\n        }\n    }, [\n        customer,\n        retrievingCustomer,\n        router\n    ]);\n    const useDeleteSession = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__.useMutation)({\n        mutationFn: handleDeleteSession,\n        mutationKey: [\n            \"delete-session\"\n        ]\n    });\n    const handleLogout = ()=>{\n        useDeleteSession.mutate(undefined, {\n            onSuccess: ()=>{\n                remove();\n                loginView[1](LOGIN_VIEW.SIGN_IN);\n                router.push(\"/my-account/login\");\n            }\n        });\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AccountContext.Provider, {\n        value: {\n            customer,\n            retrievingCustomer,\n            loginView,\n            checkSession,\n            refetchCustomer: refetch,\n            handleLogout,\n            handleLogin,\n            updateCustomerInfo\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/brunamamic/Documents/_dev/internship-webshop-bruna/lib/context/account-context.tsx\",\n        lineNumber: 138,\n        columnNumber: 5\n    }, undefined);\n};\n_s(AccountProvider, \"GM6aESgA1y85lsH86x8u4eyqccA=\", false, function() {\n    return [\n        medusa_react__WEBPACK_IMPORTED_MODULE_2__.useMeCustomer,\n        next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter,\n        _tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__.useMutation\n    ];\n});\n_c = AccountProvider;\nconst useAccount = ()=>{\n    _s1();\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_4__.useContext)(AccountContext);\n    if (context === null) {\n        throw new Error(\"useAccuont must be used within a AccountProvider\");\n    }\n    return context;\n};\n_s1(useAccount, \"b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=\");\nvar _c;\n$RefreshReg$(_c, \"AccountProvider\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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akMsZUFBZXlDLFFBQVE7UUFDdEJDLE9BQU87WUFDTDlCO1lBQ0FTO1lBQ0FJO1lBQ0FPO1lBQ0FXLGlCQUFpQnJCO1lBQ2pCZTtZQUNBVjtZQUNBRTtRQUNGO2tCQUVDVjs7Ozs7O0FBR1AsRUFBRTtHQXRFV0Q7O1FBTVA3Qix1REFBYUE7UUFJRkMsc0RBQVNBO1FBNkJDRiw4REFBV0E7OztLQXZDekI4QjtBQXdFTixNQUFNMEIsYUFBYTs7SUFDeEIsTUFBTUMsVUFBVW5ELGlEQUFVQSxDQUFDTTtJQUUzQixJQUFJNkMsWUFBWSxNQUFNO1FBQ3BCLE1BQU0sSUFBSUMsTUFBTTtJQUNsQjtJQUNBLE9BQU9EO0FBQ1QsRUFBRTtJQVBXRCIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9saWIvY29udGV4dC9hY2NvdW50LWNvbnRleHQudHN4P2MyNTgiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnO1xuXG5pbXBvcnQgeyBNRURVU0FfQkFDS0VORF9VUkwsIG1lZHVzYUNsaWVudCB9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQgeyBDdXN0b21lciB9IGZyb20gJ0BtZWR1c2Fqcy9tZWR1c2EnO1xuaW1wb3J0IHsgdXNlTXV0YXRpb24gfSBmcm9tICdAdGFuc3RhY2svcmVhY3QtcXVlcnknO1xuaW1wb3J0IHsgdXNlTWVDdXN0b21lciB9IGZyb20gJ21lZHVzYS1yZWFjdCc7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L25hdmlnYXRpb24nO1xuaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNhbGxiYWNrLCB1c2VDb250ZXh0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBNZWR1c2EgZnJvbSAnQG1lZHVzYWpzL21lZHVzYS1qcyc7XG5cbmV4cG9ydCBlbnVtIExPR0lOX1ZJRVcge1xuICBTSUdOX0lOID0gJ3NpZ24taW4nLFxuICBSRUdJU1RFUiA9ICdyZWdpc3RlcicsXG59XG5cbmludGVyZmFjZSBBY2NvdW50Q29udGV4dCB7XG4gIGN1c3RvbWVyPzogT21pdDxDdXN0b21lciwgJ3Bhc3N3b3JkX2hhc2gnPjtcbiAgcmV0cmlldmluZ0N1c3RvbWVyOiBib29sZWFuO1xuICBsb2dpblZpZXc6IFtMT0dJTl9WSUVXLCBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxMT0dJTl9WSUVXPj5dO1xuICBjaGVja1Nlc3Npb246ICgpID0+IHZvaWQ7XG4gIHJlZmV0Y2hDdXN0b21lcjogKCkgPT4gdm9pZDtcbiAgaGFuZGxlTG9nb3V0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVMb2dpbjogKGVtYWlsOiBzdHJpbmcsIHBhc3M6IHN0cmluZykgPT4gUHJvbWlzZTx2b2lkPjtcbiAgdXBkYXRlQ3VzdG9tZXJJbmZvOiAoZGF0YTphbnkpID0+IFByb21pc2U8dm9pZD47XG59XG5cbmNvbnN0IEFjY291bnRDb250ZXh0ID0gY3JlYXRlQ29udGV4dDxBY2NvdW50Q29udGV4dCB8IG51bGw+KG51bGwpO1xuXG5pbnRlcmZhY2UgQWNjb3VudFByb3ZpZGVyUHJvcHMge1xuICBjaGlsZHJlbj86IFJlYWN0LlJlYWN0Tm9kZTtcbn1cblxuXG5cbmNvbnN0IG1lZHVzYSA9IG5ldyBNZWR1c2EoeyBiYXNlVXJsOiBNRURVU0FfQkFDS0VORF9VUkwsIG1heFJldHJpZXM6IDMgfSk7XG4vLyBleHBvcnQgY29uc3QgYWRkQWRkcmVzcyA9IGFzeW5jIChcbi8vICAgZmlyc3RfbmFtZTpzdHJpbmcsIGxhc3RfbmFtZTpzdHJpbmdcblxuLy8gKSA9PiB7XG4vLyAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbWVkdXNhLmN1c3RvbWVycy5hZGRyZXNzZXMuYWRkQWRkcmVzcyh7XG4vLyAgIGFkZHJlc3M6IHtcbi8vICAgICBmaXJzdF9uYW1lOiBcIkNlbGlhXCIsXG4vLyAgICAgbGFzdF9uYW1lOiBcIlNjaHVtbVwiLFxuLy8gICAgIGFkZHJlc3NfMTogXCIyMjUgQmVkbmFyIEN1cnZlXCIsXG4vLyAgICAgY2l0eTogXCJEYW5pZWx2aWxsZVwiLFxuLy8gICAgIGNvdW50cnlfY29kZTogXCJVU1wiLFxuLy8gICAgIHBvc3RhbF9jb2RlOiBcIjg1MTM3XCIsXG4vLyAgICAgcGhvbmU6IFwiOTgxLTU5Ni02NzQ4IHg5MDE4OFwiLFxuLy8gICAgIGNvbXBhbnk6IFwiV3ltYW4gTExDXCIsXG4vLyAgICAgcHJvdmluY2U6IFwiR2VvcmdpYVwiLFxuLy8gICAgIG1ldGFkYXRhOiB1bmRlZmluZWQsXG4vLyAgICAgYWRkcmVzc18yOiAnJ1xuLy8gICB9XG4vLyB9KVxuLy8gfVxuXG5cblxuZXhwb3J0IGNvbnN0IGhhbmRsZVJlZ2lzdHJhdGlvbkNsaWNrID0gYXN5bmMgKFxuICBmaXJzdF9uYW1lOiBzdHJpbmcsXG4gIGxhc3RfbmFtZTogc3RyaW5nLFxuICBlbWFpbDogc3RyaW5nLFxuICBwYXNzd29yZDogYW55XG4pID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBtZWR1c2EuY3VzdG9tZXJzLmNyZWF0ZSh7XG4gICAgZmlyc3RfbmFtZTogZmlyc3RfbmFtZSxcbiAgICBsYXN0X25hbWU6IGxhc3RfbmFtZSxcbiAgICBlbWFpbDogZW1haWwsXG4gICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICB9KTtcbiAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbWVyO1xufTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrSWZDdXN0b21lckV4aXN0cyA9IGFzeW5jIChlbWFpbDogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IHsgZXhpc3RzIH0gPSBhd2FpdCBtZWR1c2FDbGllbnQuYXV0aC5leGlzdHMoZW1haWwpO1xuICByZXR1cm4gZXhpc3RzO1xufTtcblxuY29uc3QgaGFuZGxlRGVsZXRlU2Vzc2lvbiA9ICgpID0+IHtcbiAgcmV0dXJuIG1lZHVzYUNsaWVudC5hdXRoLmRlbGV0ZVNlc3Npb24oKTtcbn07XG5cbmV4cG9ydCBjb25zdCBBY2NvdW50UHJvdmlkZXIgPSAoeyBjaGlsZHJlbiB9OiBBY2NvdW50UHJvdmlkZXJQcm9wcykgPT4ge1xuICBjb25zdCB7XG4gICAgY3VzdG9tZXIsXG4gICAgaXNMb2FkaW5nOiByZXRyaWV2aW5nQ3VzdG9tZXIsXG4gICAgcmVmZXRjaCxcbiAgICByZW1vdmUsXG4gIH0gPSB1c2VNZUN1c3RvbWVyKHsgb25FcnJvcjogKCkgPT4ge30gfSk7XG5cbiAgY29uc3QgbG9naW5WaWV3ID0gdXNlU3RhdGU8TE9HSU5fVklFVz4oTE9HSU5fVklFVy5TSUdOX0lOKTtcblxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblxuICBjb25zdCBoYW5kbGVMb2dpbiA9IHVzZUNhbGxiYWNrKGFzeW5jIChlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBtZWR1c2FDbGllbnQuYXV0aC5hdXRoZW50aWNhdGUoe1xuICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgIH0pO1xuICAgIFxuICAgIGlmIChyZXNwb25zZS5jdXN0b21lcikgW1xuICAgICAgcmVmZXRjaCgpXG4gICAgXVxuICB9LCBbXSk7XG5cbiAgY29uc3QgdXBkYXRlQ3VzdG9tZXJJbmZvID0gYXN5bmMgKGRhdGE6IGFueSkgPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbWVkdXNhQ2xpZW50LmN1c3RvbWVycy51cGRhdGUoZGF0YSk7XG4gIFxuICAgIGlmIChyZXNwb25zZS5jdXN0b21lcikge1xuICAgICAgcmVmZXRjaCgpO1xuICAgIH1cbiAgfTtcblxuXG5cbiAgY29uc3QgY2hlY2tTZXNzaW9uID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghY3VzdG9tZXIgJiYgIXJldHJpZXZpbmdDdXN0b21lcikge1xuICAgICAgcm91dGVyLnB1c2goJy9hY2NvdW50L2xvZ2luJyk7XG4gICAgfVxuICB9LCBbY3VzdG9tZXIsIHJldHJpZXZpbmdDdXN0b21lciwgcm91dGVyXSk7XG5cbiAgY29uc3QgdXNlRGVsZXRlU2Vzc2lvbiA9IHVzZU11dGF0aW9uKHtcbiAgICBtdXRhdGlvbkZuOiBoYW5kbGVEZWxldGVTZXNzaW9uLFxuICAgIG11dGF0aW9uS2V5OiBbJ2RlbGV0ZS1zZXNzaW9uJ10sXG4gIH0pO1xuXG4gIGNvbnN0IGhhbmRsZUxvZ291dCA9ICgpID0+IHtcbiAgICB1c2VEZWxldGVTZXNzaW9uLm11dGF0ZSh1bmRlZmluZWQsIHtcbiAgICAgIG9uU3VjY2VzczogKCkgPT4ge1xuICAgICAgICByZW1vdmUoKTtcbiAgICAgICAgbG9naW5WaWV3WzFdKExPR0lOX1ZJRVcuU0lHTl9JTik7XG4gICAgICAgIHJvdXRlci5wdXNoKCcvbXktYWNjb3VudC9sb2dpbicpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxBY2NvdW50Q29udGV4dC5Qcm92aWRlclxuICAgICAgdmFsdWU9e3tcbiAgICAgICAgY3VzdG9tZXIsXG4gICAgICAgIHJldHJpZXZpbmdDdXN0b21lcixcbiAgICAgICAgbG9naW5WaWV3LFxuICAgICAgICBjaGVja1Nlc3Npb24sXG4gICAgICAgIHJlZmV0Y2hDdXN0b21lcjogcmVmZXRjaCxcbiAgICAgICAgaGFuZGxlTG9nb3V0LFxuICAgICAgICBoYW5kbGVMb2dpbixcbiAgICAgICAgdXBkYXRlQ3VzdG9tZXJJbmZvLFxuICAgICAgfX1cbiAgICA+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9BY2NvdW50Q29udGV4dC5Qcm92aWRlcj5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2VBY2NvdW50ID0gKCkgPT4ge1xuICBjb25zdCBjb250ZXh0ID0gdXNlQ29udGV4dChBY2NvdW50Q29udGV4dCk7XG5cbiAgaWYgKGNvbnRleHQgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZUFjY3VvbnQgbXVzdCBiZSB1c2VkIHdpdGhpbiBhIEFjY291bnRQcm92aWRlcicpO1xuICB9XG4gIHJldHVybiBjb250ZXh0O1xufTtcbiJdLCJuYW1lcyI6WyJNRURVU0FfQkFDS0VORF9VUkwiLCJtZWR1c2FDbGllbnQiLCJ1c2VNdXRhdGlvbiIsInVzZU1lQ3VzdG9tZXIiLCJ1c2VSb3V0ZXIiLCJSZWFjdCIsImNyZWF0ZUNvbnRleHQiLCJ1c2VDYWxsYmFjayIsInVzZUNvbnRleHQiLCJ1c2VTdGF0ZSIsIk1lZHVzYSIsIkxPR0lOX1ZJRVciLCJTSUdOX0lOIiwiUkVHSVNURVIiLCJBY2NvdW50Q29udGV4dCIsIm1lZHVzYSIsImJhc2VVcmwiLCJtYXhSZXRyaWVzIiwiaGFuZGxlUmVnaXN0cmF0aW9uQ2xpY2siLCJmaXJzdF9uYW1lIiwibGFzdF9uYW1lIiwiZW1haWwiLCJwYXNzd29yZCIsInJlc3BvbnNlIiwiY3VzdG9tZXJzIiwiY3JlYXRlIiwiY3VzdG9tZXIiLCJjaGVja0lmQ3VzdG9tZXJFeGlzdHMiLCJleGlzdHMiLCJhdXRoIiwiaGFuZGxlRGVsZXRlU2Vzc2lvbiIsImRlbGV0ZVNlc3Npb24iLCJBY2NvdW50UHJvdmlkZXIiLCJjaGlsZHJlbiIsImlzTG9hZGluZyIsInJldHJpZXZpbmdDdXN0b21lciIsInJlZmV0Y2giLCJyZW1vdmUiLCJvbkVycm9yIiwibG9naW5WaWV3Iiwicm91dGVyIiwiaGFuZGxlTG9naW4iLCJhdXRoZW50aWNhdGUiLCJ1cGRhdGVDdXN0b21lckluZm8iLCJkYXRhIiwidXBkYXRlIiwiY2hlY2tTZXNzaW9uIiwicHVzaCIsInVzZURlbGV0ZVNlc3Npb24iLCJtdXRhdGlvbkZuIiwibXV0YXRpb25LZXkiLCJoYW5kbGVMb2dvdXQiLCJtdXRhdGUiLCJ1bmRlZmluZWQiLCJvblN1Y2Nlc3MiLCJQcm92aWRlciIsInZhbHVlIiwicmVmZXRjaEN1c3RvbWVyIiwidXNlQWNjb3VudCIsImNvbnRleHQiLCJFcnJvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./lib/context/account-context.tsx\n"));

/***/ })

});