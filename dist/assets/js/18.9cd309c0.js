(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{415:function(t,a,i){"use strict";i.r(a);var e=i(56),p=Object(e.a)({},(function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[i("p",[t._v("浏览器的内核是多线程的，它们在内核控制下相互配合以保持同步，一个浏览器至少实现三个常驻线程：JavaScript引擎线程，GUI渲染线程，浏览器事件触发线程。")]),t._v(" "),i("ol",[i("li",[i("p",[t._v("JavaScript引擎是基于事件驱动单线程执行的，JavaScript引擎一直等待着任务队列中任务的到来，然后加以处理，浏览器无论什么时候都只有一个JavaScript线程在运行JavaScript程序。")])]),t._v(" "),i("li",[i("p",[t._v("GUI渲染线程负责渲染浏览器界面，当界面需要重绘（Repaint）或由于某种操作引发回流(Reflow)时,该线程就会执行。但需要注意，GUI渲染线程与JavaScript引擎是互斥的，当JavaScript引擎执行时GUI线程会被挂起，GUI更新会被保存在一个队列中等到JavaScript引擎空闲时立即被执行。")])]),t._v(" "),i("li",[i("p",[t._v("事件触发线程，当一个事件被触发时该线程会把事件添加到待处理队列的队尾，等待JavaScript引擎的处理。这些事件可来自JavaScript引擎当前执行的代码块如setTimeout、也可来自浏览器内核的其他线程如鼠标点击、Ajax异步请求等，但由于JavaScript的单线程关系所有这些事件都得排队等待JavaScript引擎处理（当线程中没有执行任何同步代码的前提下才会执行异步代码）。")])])]),t._v(" "),i("p",[i("strong",[t._v("setTimeout有一个最小执行时间，当指定的时间小于该时间时，浏览器会用最小允许的时间作为setTimeout的时间间隔，也就是说即使我们把setTimeout的毫秒数设置为0，被调用的程序也没有马上启动。")])]),t._v(" "),i("p",[i("strong",[t._v("setTimeout中所执行函数中的this，永远指向window。是所执行函数中的this,不是setTimeout中的this")])])])}),[],!1,null,null,null);a.default=p.exports}}]);