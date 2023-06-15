(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{413:function(e,v,t){"use strict";t.r(v);var a=t(56),_=Object(a.a)({},(function(){var e=this,v=e.$createElement,t=e._self._c||v;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h2",{attrs:{id:"兼容性"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#兼容性"}},[e._v("#")]),e._v(" 兼容性")]),e._v(" "),t("p",[e._v("Vue 不支持 IE8 及以下版本，因为 Vue 使用了 IE8 无法模拟的 ECMAScript 5 特性。但它支持所有兼容 ECMAScript 5 的浏览器。"),t("br"),e._v("\n通过使用 "),t("strong",[e._v("v-once")]),e._v(" 指令，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。但请留心这会影响到该节点上的其它数据绑定"),t("br"),e._v("\n双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，你需要使用 "),t("strong",[e._v("v-html")]),e._v(" 指令"),t("br"),e._v("\nmustache 语法(双大括号)不能作用在 HTML 特性(属性)上，遇到这种情况应该使用 "),t("em",[e._v("v-bind")]),e._v(" 指令(v-bind:id)")]),e._v(" "),t("h2",{attrs:{id:"一些高级应用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#一些高级应用"}},[e._v("#")]),e._v(" 一些高级应用")]),e._v(" "),t("h3",{attrs:{id:"组件中name的作用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#组件中name的作用"}},[e._v("#")]),e._v(" 组件中name的作用")]),e._v(" "),t("ol",[t("li",[e._v("使用keep-alive时通过name进行过滤")]),e._v(" "),t("li",[e._v("递归组件使用")])]),e._v(" "),t("h3",{attrs:{id:"sync"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#sync"}},[e._v("#")]),e._v(" sync")]),e._v(" "),t("p",[t("code",[e._v('<comp :foo.sync="bar"></comp>')])]),e._v(" "),t("p",[e._v("相当于")]),e._v(" "),t("p",[t("code",[e._v('<comp :foo="bar" @update:foo="val => bar = val"></comp>')])]),e._v(" "),t("p",[e._v("子组件中需要更新bar值时")]),e._v(" "),t("p",[t("code",[e._v("this.$emit('update:foo', newValue)")])]),e._v(" "),t("h3",{attrs:{id:"自定义组件的v-model"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#自定义组件的v-model"}},[e._v("#")]),e._v(" 自定义组件的v-model")]),e._v(" "),t("p",[t("code",[e._v('<comp v-modal="val">')])]),e._v(" "),t("p",[e._v("相当于")]),e._v(" "),t("p",[t("code",[e._v('<comp :value="val" @input="newVal=> val = newVal">')])]),e._v(" "),t("h3",{attrs:{id:"监听组件生命周期"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#监听组件生命周期"}},[e._v("#")]),e._v(" 监听组件生命周期")]),e._v(" "),t("p",[e._v("当子组件某个生命周期完成之后通知父组件，然后在父组件做对应的处理")]),e._v(" "),t("ol",[t("li",[t("p",[e._v("传统方式")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("// 子组件在对应的钩子中发布事件  \ncreated(){  \nthis.$emit('done')  \n}  \n\n// 父组件订阅 \n<list @done=\"childDone\">\n")])])])]),e._v(" "),t("li",[t("p",[e._v("@hook")]),e._v(" "),t("p",[t("code",[e._v('<list @hook:mounted="listMounted" />')])])])]),e._v(" "),t("h3",{attrs:{id:"路由组件传参"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#路由组件传参"}},[e._v("#")]),e._v(" 路由组件传参")]),e._v(" "),t("ol",[t("li",[t("p",[e._v("布尔模式")]),e._v(" "),t("p",[e._v("如果 "),t("code",[e._v("props")]),e._v(" 被设置为 "),t("code",[e._v("true")]),e._v("，"),t("code",[e._v("route.params")]),e._v(" 将会被设置为组件属性。")])]),e._v(" "),t("li",[t("p",[e._v("对象模式")]),e._v(" "),t("p",[e._v("如果 "),t("code",[e._v("props")]),e._v(" 是一个对象，它会被按原样设置为组件属性。当 "),t("code",[e._v("props")]),e._v(" 是静态的时候有用。")])]),e._v(" "),t("li",[t("p",[e._v("函数模式")]),e._v(" "),t("p",[e._v("你可以创建一个函数返回 "),t("code",[e._v("props")]),e._v("。这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等。")]),e._v(" "),t("p",[e._v("请尽可能保持 "),t("code",[e._v("props")]),e._v(" 函数为无状态的，因为它只会在路由发生变化时起作用。如果你需要状态来定义 "),t("code",[e._v("props")]),e._v("，请使用包装组件，这样 Vue 才可以对状态变化做出反应")])])]),e._v(" "),t("h3",{attrs:{id:"定时器优化"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#定时器优化"}},[e._v("#")]),e._v(" 定时器优化")]),e._v(" "),t("p",[e._v("一般需要用到定时器的情况，我们会定义一个额外的变量来定义定时器，它的作用仅用于在beforeDestory内取到定时器来清除。除此之外，没有其他作用。")]),e._v(" "),t("p",[e._v("如果可以的话，最好只有生命周期钩子可以访问到它")]),e._v(" "),t("p",[e._v("具体实现如下：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("mounted() {  \n    this.creatInterval('hello')  \n    this.creatInterval('world')  \n},  \ncreatInterval(msg) {  \n    let timer = setInterval(() => {  \n        console.log(msg)  \n    }, 1000)  \n    this.$once('hook:beforeDestroy', function() {  \n        clearInterval(timer)  \n    })\n}\n")])])]),t("h4",{attrs:{id:"vue3删掉了-once-怎么实现这种优化"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#vue3删掉了-once-怎么实现这种优化"}},[e._v("#")]),e._v(" ？？vue3删掉了$once，怎么实现这种优化")])])}),[],!1,null,null,null);v.default=_.exports}}]);