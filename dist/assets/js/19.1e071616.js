(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{418:function(e,o,n){"use strict";n.r(o);var a=n(56),t=Object(a.a)({},(function(){var e=this,o=e.$createElement,n=e._self._c||o;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"数据存储"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#数据存储"}},[e._v("#")]),e._v(" 数据存储")]),e._v(" "),n("p",[e._v("需求：")]),e._v(" "),n("ol",[n("li",[e._v("已登录状态，复制域名在同一浏览器访问不强制重新登录；")]),e._v(" "),n("li",[e._v("同一浏览器可以多用户登录；")]),e._v(" "),n("li",[e._v("已登录状态，复制域名在不同浏览器访问强制重新登录；"),n("br"),e._v("\n目前遇到的问题"),n("br"),e._v("\n使用cookie：同一浏览器不能同时登陆两个账号（思路：setCookie时判断）"),n("br"),e._v("\n使用session：同一浏览器也需要重新登录")])]),e._v(" "),n("h2",{attrs:{id:"cookie"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#cookie"}},[e._v("#")]),e._v(" Cookie")]),e._v(" "),n("p",[n("strong",[e._v("js设置cookie时，最好使用encodeURIComponent()对key和value进行编码，其他参数比如expires、path等不需要进行编码")])]),e._v(" "),n("h3",{attrs:{id:"document-cookie"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#document-cookie"}},[e._v("#")]),e._v(" document.cookie")]),e._v(" "),n("p",[e._v("读：所有的key-value")]),e._v(" "),n("p",[e._v('写：在原有cookie后添加（只需要documnt.cookie="新增cookie=value"）')]),e._v(" "),n("p",[e._v("删除：将key值对应的value清空")]),e._v(" "),n("h3",{attrs:{id:"cookieutil对象"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#cookieutil对象"}},[e._v("#")]),e._v(" CookieUtil对象")]),e._v(" "),n("p",[n("strong",[e._v("自定义CookieUtil对象")])]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[e._v('var CookieUtil = {\n    // 设置cookie\n    set : function (name, value, expires, domain, path, secure) {\n        var cookieText = "";\n        cookieText += encodeURIComponent(name) + "=" + encodeURIComponent(value);\n        if (expires instanceof Date) {\n            cookieText += "; expires=" + expires.toGMTString();\n        }\n        if (path) {\n            cookieText += "; path=" + path;\n        }\n        if (domain) {\n            cookieText += "; domain=" + domain;\n        }\n        if (secure) {\n            cookieText += "; secure";\n        }\n        document.cookie = cookieText;\n    },\n    // name=value; expires=expiration_time; path=domain_path; domain=domain_name; secure\n    // 获取cookie\n    get : function (name) {\n        var cookieName = encodeURIComponent(name) + "=",\n            cookieStart = document.cookie.indexOf(cookieName),\n            cookieValue = "";\n        if (cookieStart > -1) {\n            var cookieEnd = document.cookie.indexOf (";", cookieStart);\n            if (cookieEnd == -1) {\n                cookieEnd = document.cookie.length;\n            }\n            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));\n        }\n        return cookieValue; \n    },\n    // 删除cookie\n    unset : function (name, domain, path, secure) {\n        this.set(name, "", Date(0), domain, path, secure);\n    }\n};\n')])])]),n("h3",{attrs:{id:"子cookie"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#子cookie"}},[e._v("#")]),e._v(" 子cookie")]),e._v(" "),n("p",[n("strong",[e._v("为了绕开浏览器单域名下的cookie数限制")])]),e._v(" "),n("p",[e._v("表现形式：key=key1=value1&key2=value2&key3=value3")]),e._v(" "),n("p",[n("strong",[e._v("自定义SubCookieUtil对象")])]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[e._v('var SubCookieUtil = {\n\n    get: function (name, subName) {\n        var subCookies = this.getAll(name);\n        if (subCookies) {\n            return subCookies[subName];\n        } else {\n            return null;\n        }\n    },\n\n    getAll: function (name) {\n        var cookieName = encodeURIComponent(name) + "=",\n            cookieStart = document.cookie.indexOf(cookieName),\n            cookieValue = null,\n            result = {};\n\n        if (cookieStart > -1) {\n            var cookieEnd = document.cookie.indexOf(";", cookieStart);\n            if (cookieEnd == -1) {\n                cookieEnd = document.cookie.length;\n            }\n            cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd);\n\n            if (cookieValue.length > 0) {\n                var subCookies = cookieValue.split("&");\n\n                for (var i = 0, len = subCookies.length; i < len; i++) {\n                    var parts = subCookies[i].split("=");\n                    result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);\n                }\n                return result;\n            }\n        }\n        return null;\n    },\n\n    set: function (name, subName, value, expires, path, domain, secure) {\n        var subcookies = this.getAll(name) || {};\n        subcookies[subName] = value;\n        this.setAll(name, subcookies, expires, path, domain, secure);\n    },\n\n    setAll: function (name, subcookies, expires, path, domain, secure) {\n\n        var cookieText = encodeURIComponent(name) + "=";\n        var subcookieParts = new Array();\n\n        for (var subName in subcookies) {\n            if (subName.length > 0 && subcookies.hasOwnProperty(subName)) {\n                subcookieParts.push(encodeURIComponent(subName) + "=" + encodeURIComponent(subcookies[subName]));\n            }\n        }\n\n        if (subcookieParts.length > 0) {\n            cookieText += subcookieParts.join("&");\n\n            if (expires instanceof Date) {\n                cookieText += "; expires=" + expires.toGMTString();\n            }\n\n            if (path) {\n                cookieText += "; path=" + path;\n            }\n\n            if (domain) {\n                cookieText += ";domain=" + domain;\n            }\n\n            if (secure) {\n                cookieText += ";secure";\n            }\n        } else {\n            cookieText += "; expires=" + (new Date(0)).toGMTString();\n        }\n        document.cookie = cookieText;\n    },\n\n    unset: function (name, subName, path, domain, secure) {\n        var subcookies = this.getAll(name);\n        if (subcookies) {\n            delete subcookies[subName];\n            this.setAll(name, subcookies, null, path, domain, secure);\n        }\n    },\n\n    unsetAll: function (name, path, domain, secure) {\n        this.setAll(name, null, new Date(0), path, domain, secure);\n    }\n};\n//假设document.cookie=data=name=Nicholas&book=Professional%20JavaScript\n\n//取得全部子cookie\nvar data = SubCookieUtil.getAll("data");\nalert(data.name); //"Nicholas"\nalert(data.book); //"Professional JavaScript"\n\n//逐个取得子cookie\nalert(SubCookieUtil.get("data", "name")); //"Nicholas"\nalert(SubCookieUtil.get("data", "book")); //"Professional JavaScript"\n\n//设置两个cookie\nSubCookieUtil.set("data", "name", "Nicholas");\nSubCookieUtil.set("data", "book", "Professional JavaScript");\n\n//设置全部子cookie和失效日期\nSubCookieUtil.setAll("data", { name: "Nicholas", book: "Professional Javascript" }, new Data("January 1, 2010"));\n\n//修改名字的值，并修改cookie的失效日期\nSubCookieUtil.set("data", "name", "Michael", new Date("February 1, 2010"));\n')])])]),n("h2",{attrs:{id:"web存储机制"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#web存储机制"}},[e._v("#")]),e._v(" Web存储机制")]),e._v(" "),n("h3",{attrs:{id:"storage类型"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#storage类型"}},[e._v("#")]),e._v(" Storage类型")]),e._v(" "),n("ul",[n("li",[e._v("clear()：删除所有值，不兼容FF")]),e._v(" "),n("li",[e._v("getItem(name)：获取name对应的value")]),e._v(" "),n("li",[e._v("setItem(name,value)：设置session")]),e._v(" "),n("li",[e._v("removeItem(name)：删除name-value")]),e._v(" "),n("li",[e._v("key(index)：获取index位置处的name")])]),e._v(" "),n("h3",{attrs:{id:"sessionstorage对象"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#sessionstorage对象"}},[e._v("#")]),e._v(" sessionStorage对象")]),e._v(" "),n("p",[e._v("存储于某个会话，也就是该数据值保持到浏览器关闭，可以跨越页面刷新而存在。")]),e._v(" "),n("p",[n("strong",[e._v("兼容IE8处理")]),e._v("\nFF和chrome实现了同步写入；IE为异步写入，会相对较慢（大量数据）。"),n("br"),e._v("\n在IE8中可强制把数据写入磁盘：在设置新数据之前使用begin()方法，并且在所有设置完成之后调用commit()方法。")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[e._v('//只适用于IE8\nsessionStorage.begin();\nsessionStorage.name="Nicholas";\nsessionStorage.book="Professional JavaScript";\nsessionStorage.commit();\n')])])]),n("h3",{attrs:{id:"globalstorage"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#globalstorage"}},[e._v("#")]),e._v(" globalStorage")])])}),[],!1,null,null,null);o.default=t.exports}}]);