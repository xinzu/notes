(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{424:function(e,v,_){"use strict";_.r(v);var t=_(56),i=Object(t.a)({},(function(){var e=this,v=e.$createElement,_=e._self._c||v;return _("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[_("ul",[_("li",[_("p",[e._v("vue2和vue3的区别")]),e._v(" "),_("ul",[_("li",[_("p",[e._v("双向绑定的底层原理不同")]),e._v(" "),_("ul",[_("li",[_("p",[e._v("vue2使用"),_("code",[e._v("Object.defineProperty")]),e._v(", vue3使用"),_("code",[e._v("new Proxy")])])]),e._v(" "),_("li",[_("p",[_("code",[e._v("defineProperty")]),e._v("的问题：后添加的属性劫持不到，对象/数组新增时，需要"),_("code",[e._v("vm.$set")])])])])]),e._v(" "),_("li",[_("p",[_("a",{attrs:{href:"https://xinzu.github.io/notes/vue/Vue3.html#%E4%BB%8Evue2%E4%B8%AD%E8%BF%81%E7%A7%BB",target:"_blank",rel:"noopener noreferrer"}},[e._v("其他"),_("OutboundLink")],1)])])])]),e._v(" "),_("li",[_("p",[_("code",[e._v("defineProperty")]),e._v(" 和 "),_("code",[e._v("Proxy")]),e._v(" 的区别")]),e._v(" "),_("ul",[_("li",[e._v("Proxy 是代理整个对象，defineProperty是劫持数据（只能劫持对象中的单个属性）")]),e._v(" "),_("li",[e._v("defineProperty访问源对象属性时会触发"),_("code",[e._v("get")]),e._v("方法，Proxy只有访问代理对象时才会触发")]),e._v(" "),_("li",[e._v("defineProperty 新增 / 删除属性无法劫持（vue2有$set和数组方法重写解决该问题）")]),e._v(" "),_("li",[e._v("defineProperty 不能监听数组下标改变值的变化")]),e._v(" "),_("li",[e._v("defineProperty 性能较差，监听对象时需要遍历循环每个属性")])])]),e._v(" "),_("li",[_("p",[e._v("vue3 中如何获取类似于 vue2 中的this")]),e._v(" "),_("ul",[_("li",[_("p",[e._v("setup 语法糖 "),_("code",[e._v("const instance = getCurrentInstance()")])])]),e._v(" "),_("li",[_("p",[_("code",[e._v("setup(props, ctx)")]),e._v(", ctx 就是 this")])])])]),e._v(" "),_("li",[_("p",[e._v("虚拟列表")]),e._v(" "),_("blockquote",[_("p",[e._v("dom元素只显示固定数量")])]),e._v(" "),_("ul",[_("li",[e._v("需要一个div用来显示滚动条")]),e._v(" "),_("li",[e._v("滚动后修改列表数据")])])]),e._v(" "),_("li",[_("p",[e._v("上线打包优化")]),e._v(" "),_("ul",[_("li",[e._v("禁止生成 sourceMap 文件")]),e._v(" "),_("li",[e._v("关闭 Prefetch")]),e._v(" "),_("li",[e._v("路由懒加载")]),e._v(" "),_("li",[e._v("element 组件库按需加载")]),e._v(" "),_("li",[e._v("使用CDN加载外部资源")]),e._v(" "),_("li",[e._v("GZIP")]),e._v(" "),_("li",[e._v("图片压缩")])])]),e._v(" "),_("li")])])}),[],!1,null,null,null);v.default=i.exports}}]);