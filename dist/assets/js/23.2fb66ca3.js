(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{421:function(e,n,t){"use strict";t.r(n);var a=t(56),l=Object(a.a)({},(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("p",[e._v("弹出框后退会返回到上一个弹出框的界面或者将上一个界面显示在弹出框中")]),e._v(" "),t("p",[e._v("以下为禁用弹出框后退页面的方法。")]),e._v(" "),t("p",[t("code",[e._v('.on("keydown", banBackSpace);')])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("function banBackSpace(event) {\n\n    var elem = event.target || event.srcElement,\n\n        nodeName = elem.nodeName.toLowerCase(),\n\n        elemType = \"\n\n    if (event.keyCode == 8) {\n\n        if (nodeName != 'input' && nodeName != 'textarea') {\n\n            return false;\n\n        } else if (nodeName == \"input\") {\n\n            elemType = elem.type;\n\n            if (elemType != 'text' && elemType != 'textarea' && elemType != 'password' && elemType != 'file' && (elem.readOnly == true || elem.disabled == true)) {\n\n                return false;\n\n            }\n\n        }\n\n    }\n\n} \n\n")])])]),t("p",[t("code")])])}),[],!1,null,null,null);n.default=l.exports}}]);