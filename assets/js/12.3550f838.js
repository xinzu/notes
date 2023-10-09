(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{409:function(t,e,a){"use strict";a.r(e);var r=a(56),n=Object(r.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"入口文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#入口文件"}},[t._v("#")]),t._v(" 入口文件")]),t._v(" "),a("p",[a("strong",[t._v("AppRegistry")])]),t._v(" "),a("blockquote",[a("p",[a("code",[t._v("AppRegistry")]),t._v("是所有 React Native 应用的 JS 入口。应用的根组件应当通过"),a("code",[t._v("AppRegistry.registerComponent")]),t._v("方法注册自己，然后原生系统才可以加载应用的代码包并且在启动完成之后通过调用"),a("code",[t._v("AppRegistry.runApplication")]),t._v("来真正运行应用")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("import { Text, AppRegistry } from 'react-native';\nconst App = (props) => (\n  <View>\n    <Text>App1</Text>\n  </View>\n);\nAppRegistry.registerComponent('Appname', () => App);\n")])])]),a("h2",{attrs:{id:"rn组件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rn组件"}},[t._v("#")]),t._v(" RN组件")]),t._v(" "),a("h3",{attrs:{id:"基础组件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基础组件"}},[t._v("#")]),t._v(" 基础组件")]),t._v(" "),a("h4",{attrs:{id:"view"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#view"}},[t._v("#")]),t._v(" View")]),t._v(" "),a("blockquote",[a("p",[t._v("一个支持Flexbox布局、样式、触摸处理、无障碍功能的容器")]),t._v(" "),a("p",[t._v("支持嵌套")]),t._v(" "),a("p",[a("strong",[t._v("你必须把你的文本节点放在"),a("code",[t._v("<Text>")]),t._v("组件内")]),t._v("。你不能直接在"),a("code",[t._v("<View>")]),t._v("下放置一段文本。")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("<View style={{样式}}> </View>\n// 常用属性只有style\n")])])]),a("p",[t._v("如需要添加监听事件, 这里需要用到"),a("strong",[t._v("TouchableOpacity")]),t._v("组件")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("<TouchableOpacity onPress = {this.onClick}>\n\t<View></View>\n</TouchableOpacity>\n")])])]),a("h4",{attrs:{id:"text"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#text"}},[t._v("#")]),t._v(" Text")]),t._v(" "),a("blockquote",[a("p",[t._v("一个用于显示文本的组件，支持嵌套、样式、触摸处理")]),t._v(" "),a("p",[t._v("在"),a("strong",[t._v("iOS")]),t._v("中，Text支持嵌套View")]),t._v(" "),a("p",[a("strong",[t._v("特别注意")]),t._v("：RN中的每个文本节点都必须使用Text组件来包裹")])]),t._v(" "),a("h4",{attrs:{id:"image"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#image"}},[t._v("#")]),t._v(" Image")]),t._v(" "),a("h4",{attrs:{id:"textinput"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#textinput"}},[t._v("#")]),t._v(" TextInput")]),t._v(" "),a("h4",{attrs:{id:"scrollview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#scrollview"}},[t._v("#")]),t._v(" ScrollView")]),t._v(" "),a("h4",{attrs:{id:"stylesheet"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#stylesheet"}},[t._v("#")]),t._v(" StyleSheet")]),t._v(" "),a("h3",{attrs:{id:"交互控件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#交互控件"}},[t._v("#")]),t._v(" 交互控件")]),t._v(" "),a("h4",{attrs:{id:"statusbar"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#statusbar"}},[t._v("#")]),t._v(" StatusBar")]),t._v(" "),a("blockquote",[a("p",[t._v("控制应用状态栏的组件。")]),t._v(" "),a("p",[t._v("常见用法：防止APP标题被覆盖，通过StatusBar.currentHeight赋值给title的padding-top")])]),t._v(" "),a("h4",{attrs:{id:"safeareaview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#safeareaview"}},[t._v("#")]),t._v(" SafeAreaView")]),t._v(" "),a("blockquote",[a("p",[t._v("SafeAreaView的目的是在一个“安全”的可视区域内渲染内容。具体来说就是因为目前有 iPhone X 这样的带有“刘海”的全面屏设备，所以需要避免内容渲染到不可见的“刘海”范围内。本组件目前仅支持 iOS 设备以及 iOS 11 或更高版本。")])]),t._v(" "),a("h4",{attrs:{id:"panresponder"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#panresponder"}},[t._v("#")]),t._v(" PanResponder")]),t._v(" "),a("blockquote",[a("p",[t._v("提供了一个对"),a("a",{attrs:{href:"https://reactnative.cn/docs/0.44/gesture-responder-system.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("触摸响应系统"),a("OutboundLink")],1),t._v("响应器的可预测的包装。")])]),t._v(" "),a("ul",[a("li",[a("code",[t._v("onStartShouldSetPanResponder")]),t._v("：用户开始触摸屏幕的时候，是否愿意成为响应者；默认返回false，无法响应，当返回true的时候则可以进行之后的事件传递。")]),t._v(" "),a("li",[a("code",[t._v("onMoveShouldSetPanResponder")]),t._v("：在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互；")]),t._v(" "),a("li",[a("code",[t._v("onPanResponderGrant")]),t._v("：开始手势操作，也可以说按下去。给用户一些视觉反馈，让他们知道发生了什么事情！（如：可以修改颜色）")]),t._v(" "),a("li",[a("code",[t._v("onPanResponderMove")]),t._v("：最近一次的移动距离.如:(获取x轴y轴方向的移动距离 gestureState.dx,gestureState.dy)")]),t._v(" "),a("li",[a("code",[t._v("onPanResponderRelease")]),t._v("：用户放开了所有的触摸点，且此时视图已经成为了响应者。")]),t._v(" "),a("li",[a("code",[t._v("onPanResponderTerminate")]),t._v("：另一个组件已经成为了新的响应者，所以当前手势将被取消。")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("this._panResponder = PanResponder.create({\n  // 要求成为响应者：\n  onStartShouldSetPanResponder: (evt, gestureState) => true,\n  onStartShouldSetPanResponderCapture: (evt, gestureState) => true,\n  onMoveShouldSetPanResponder: (evt, gestureState) => true,\n  onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,\n\n  onPanResponderGrant: (evt, gestureState) => {\n    // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！\n\n    // gestureState.{x,y}0 现在会被设置为0\n  },\n  onPanResponderMove: (evt, gestureState) => {\n    // 最近一次的移动距离为gestureState.move{X,Y}\n\n    // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}\n  },\n  onPanResponderTerminationRequest: (evt, gestureState) => true,\n  onPanResponderRelease: (evt, gestureState) => {\n    // 用户放开了所有的触摸点，且此时视图已经成为了响应者。\n    // 一般来说这意味着一个手势操作已经成功完成。\n  },\n  onPanResponderTerminate: (evt, gestureState) => {\n    // 另一个组件已经成为了新的响应者，所以当前手势将被取消。\n  },\n  onShouldBlockNativeResponder: (evt, gestureState) => {\n    // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者\n    // 默认返回true。目前暂时只支持android。\n    return true;\n  }\n")])])]),a("h4",{attrs:{id:"dimensions"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#dimensions"}},[t._v("#")]),t._v(" Dimensions")]),t._v(" "),a("blockquote",[a("p",[t._v("本模块用于获取设备屏幕的宽高")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('const windoeWidth = Dimensions.get("window").width;\nconst windowHeight = Dimensions.get("window").height;\n\n// const { width, height } = Dimensions.get("window");\n')])])])]),t._v(" "),a("h4",{attrs:{id:"platform"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#platform"}},[t._v("#")]),t._v(" Platform")]),t._v(" "),a("blockquote",[a("p",[t._v("本模块用于检测当前运行平台")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("获取当前运行平台：Platform.OS  // 'ios' || 'android'\n\n// Platform.select\nconst styles = StyleSheet.create({\ncontainer: {\n flex: 1,\n ...Platform.select({\n   ios: {\n     backgroundColor: 'red'\n   },\n   android: {\n     backgroundColor: 'blue'\n   }\n })\n}\n});\n")])])])]),t._v(" "),a("h4",{attrs:{id:"permissionsandroid"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#permissionsandroid"}},[t._v("#")]),t._v(" PermissionsAndroid")]),t._v(" "),a("blockquote",[a("p",[a("code",[t._v("PermissionsAndroid")]),t._v(" 可以访问 Android M(也就是 6.0)开始提供的权限模型。有一些权限写在"),a("code",[t._v("AndroidManifest.xml")]),t._v("就可以在安装时自动获得，但有一些“危险”的权限则需要弹出提示框供用户选择。、")])]),t._v(" "),a("h2",{attrs:{id:"rn项目基本所需库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rn项目基本所需库"}},[t._v("#")]),t._v(" RN项目基本所需库")]),t._v(" "),a("ul",[a("li",[t._v("全局状态管理器，解决组件数据通信问题。")]),t._v(" "),a("li",[a("a",{attrs:{href:"https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch",target:"_blank",rel:"noopener noreferrer"}},[t._v("fetch"),a("OutboundLink")],1),t._v(" 与后端通信"),a("code",[t._v("ajax")]),t._v("在这里推荐最新版的api"),a("code",[t._v("fetch")]),t._v("。")]),t._v(" "),a("li",[a("a",{attrs:{href:"https://link.zhihu.com/?target=https%3A//reactnavigation.org/docs/zh-Hans/getting-started.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("react-navigation"),a("OutboundLink")],1),t._v(" React Navigation 源于 React Native 社区对一个可扩展且易于使用的导航/路由系统解决方案的需求，它完全使用 JavaScript 编写。")]),t._v(" "),a("li",[a("a",{attrs:{href:"https://link.zhihu.com/?target=https%3A//github.com/oblador/react-native-vector-icons",target:"_blank",rel:"noopener noreferrer"}},[t._v("react-native-vector-icons"),a("OutboundLink")],1),t._v(" icon图标容器，该库自带字体图标，也可自定义图标文件。")]),t._v(" "),a("li",[a("a",{attrs:{href:"https://link.zhihu.com/?target=https%3A//github.com/react-native-community/async-storage%23readme",target:"_blank",rel:"noopener noreferrer"}},[t._v("react-native-community/async-storage"),a("OutboundLink")],1),t._v(" 本地存储默认是不会带的，需要用该库进行操作，该语法糖与web的"),a("code",[t._v("localstorage")]),t._v("并无差别。")]),t._v(" "),a("li",[a("a",{attrs:{href:"https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/react-devtools",target:"_blank",rel:"noopener noreferrer"}},[t._v("react-devtools"),a("OutboundLink")],1),t._v(" 对react-native界面的dom进行调试。")]),t._v(" "),a("li",[a("a",{attrs:{href:"https://link.zhihu.com/?target=https%3A//github.com/jhen0409/react-native-debugger",target:"_blank",rel:"noopener noreferrer"}},[t._v("react-native-debugger"),a("OutboundLink")],1),t._v(" 对react-native程序的桌面调试工具。")]),t._v(" "),a("li",[a("a",{attrs:{href:"https://link.zhihu.com/?target=https%3A//github.com/luggit/react-native-config",target:"_blank",rel:"noopener noreferrer"}},[t._v("react-native-config"),a("OutboundLink")],1),t._v(" 解决不同环境(开发、测试、正式)变量配置。")])]),t._v(" "),a("h2",{attrs:{id:"模块api"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#模块api"}},[t._v("#")]),t._v(" 模块API")]),t._v(" "),a("h3",{attrs:{id:"asyncstorage"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#asyncstorage"}},[t._v("#")]),t._v(" AsyncStorage")]),t._v(" "),a("blockquote",[a("p",[a("code",[t._v("AsyncStorage")]),t._v("是一个简单的、异步的、持久化的 Key-Value 存储系统，它对于 App 来说是全局性的。可用来代替 LocalStorage。")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("import AsyncStorage from '@react-native-community/async-storage';\n_storeData = async () => {\n  try {\n    await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');\n  } catch (error) {\n    // Error saving data\n  }\n")])])]),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("方法--------返回一个Promise对象")]),t._v(" "),a("th",[t._v("作用")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("getItem(key, [callback])")]),t._v(" "),a("td",[t._v("获取数据")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("setItem(key, value)")]),t._v(" "),a("td",[t._v("设置数据")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("removeItem(key, [callback])")]),t._v(" "),a("td",[t._v("移除数据")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("clear()")]),t._v(" "),a("td",[t._v("移除所有数据")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("mergeItem(key, value)")]),t._v(" "),a("td",[t._v("合并数据")])])])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("let UID123_object = {\n  name: 'Chris',\n  age: 30,\n  traits: { hair: 'brown', eyes: 'brown' }\n};\n// 只需定义新增或是修改的数据\nlet UID123_delta = {\n  age: 31,\n  traits: { eyes: 'blue', shoe_size: 10 }\n};\n\nAsyncStorage.setItem(\n  'UID123',\n  JSON.stringify(UID123_object),\n  () => {\n    AsyncStorage.mergeItem(\n      'UID123',\n      JSON.stringify(UID123_delta),\n      () => {\n        AsyncStorage.getItem('UID123', (err, result) => {\n          console.log(result);\n        });\n      }\n    );\n  }\n);\n\n// Console log result:\n// => {'name':'Chris','age':31,'traits':\n//    {'shoe_size':10,'hair':'brown','eyes':'blue'}}\n")])])]),a("h2",{attrs:{id:"插件mobx-react"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#插件mobx-react"}},[t._v("#")]),t._v(" 插件mobx-react")]),t._v(" "),a("h3",{attrs:{id:"环境配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#环境配置"}},[t._v("#")]),t._v(" 环境配置")]),t._v(" "),a("ol",[a("li",[a("p",[a("strong",[t._v("安装")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("npm install --save mobx mobx-react\nnpm i --save-dev babel-plugin-transform-decorators-legacy   //由于要使用装饰器，需要这个插件\n")])])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("修改.babelrc")])])])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('{\n  "presets": ["react", "env", "stage-0"], \n  "plugins": ["transform-runtime", "transform-decorators-legacy"] \n}\n')])])]),a("h3",{attrs:{id:"核心内容"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#核心内容"}},[t._v("#")]),t._v(" 核心内容")]),t._v(" "),a("h4",{attrs:{id:"observable"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#observable"}},[t._v("#")]),t._v(" @observable")]),t._v(" "),a("p",[a("strong",[t._v("被观察者，store")])]),t._v(" "),a("div",{staticClass:"language-test.js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("import {observable} from 'mobx';\nclass TestStore {\n    // 被观察者\n    @observable name; \n    @observable age; \n    @observable sex; \n    constructor() {\n        this.name = 'YH';\n        this.age = 18;\n        this.sex = \"female\";\n    }\n}\nconst test = new TestStore() \nexport default test\n")])])]),a("h4",{attrs:{id:"inject-observer"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#inject-observer"}},[t._v("#")]),t._v(" @inject & @observer")]),t._v(" "),a("p",[a("strong",[t._v("在模块内用"),a("code",[t._v('@inject("Store")')]),t._v("，将Store注入到props上，通过this.props.Store.xxx获取值")])]),t._v(" "),a("p",[a("strong",[t._v("模块要通过@observer（观察者）进行装饰")])]),t._v(" "),a("div",{staticClass:"language-App.js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('@inject("test")\n@observer\nclass App extends Component {\n\tconstructor(props) {\n\t\tsuper(props);\n\t}\n\trender() {\n\t\tconst { name } = this.props.test; // 使用\n\t\treturn (\n\t\t\t<span>{ name }</span>\n\t\t)\n\t}\n}\nexport default App;\n')])])]),a("h4",{attrs:{id:"computed"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#computed"}},[t._v("#")]),t._v(" @computed")]),t._v(" "),a("p",[a("strong",[t._v("@computed getter")])]),t._v(" "),a("div",{staticClass:"language-test.js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("@computed get name() {\n\treturn this.name;\n}\n")])])]),a("h4",{attrs:{id:"action"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#action"}},[t._v("#")]),t._v(" @action")]),t._v(" "),a("p",[a("strong",[t._v("在Store中定义，在模块中通过this.props.xxx()调用")])]),t._v(" "),a("div",{staticClass:"language-test.js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("@action\nchangeName = name => {\n\tthis.name = name;\n}\n")])])]),a("p",[a("strong",[t._v("异步请求")])]),t._v(" "),a("ol",[a("li",[a("p",[a("strong",[t._v("runInAction+async+await")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('@observable syaye = null;\n@action\ninitData = async () => {\n\ttry {\n\t\tconst data = awiat getData();\n\t\trunInAction("说明一下这个Action干什么的，不写也可以",() => {\n\t\t\tthis.name = data.name;\n\t\t})\n\t} catch (e) {\n\t\trunInAction(() => {\n\t\t\tthis.state = "error";\n\t\t})\n\t}\n}\n')])])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("flows+生成器函数")])]),t._v(" "),a("p",[a("strong",[t._v("不需要使用@action装饰")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('fetchProjects = flow(function * () {\n\ttry {\n\t\tconst data = yeild getData();\n\t\tthis.name = data.name;\n\t} catch (e) {\n\t\tthis.state = "error";\n\t}\n})\n')])])])])]),t._v(" "),a("h2",{attrs:{id:"插件react-native-amap3d"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#插件react-native-amap3d"}},[t._v("#")]),t._v(" 插件react-native-amap3d")]),t._v(" "),a("blockquote",[a("p",[t._v("react-native 高德地图组件，支持 Android + iOS")])]),t._v(" "),a("p",[a("a",{attrs:{href:"https://www.npmjs.com/package/react-native-amap3d",target:"_blank",rel:"noopener noreferrer"}},[t._v("npm"),a("OutboundLink")],1)]),t._v(" "),a("p",[a("a",{attrs:{href:"https://qiuxiang.github.io/react-native-amap3d/api/interfaces/mapviewprops.html#center",target:"_blank",rel:"noopener noreferrer"}},[t._v("参数说明"),a("OutboundLink")],1)]),t._v(" "),a("h3",{attrs:{id:"mapview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mapview"}},[t._v("#")]),t._v(" MapView")]),t._v(" "),a("blockquote",[a("p",[t._v("地图模块")])]),t._v(" "),a("ul",[a("li",[a("p",[a("code",[t._v("locationEnabled:boolean")]),t._v("：是否启用定位")])]),t._v(" "),a("li",[a("p",[a("code",[t._v("onLocation: function")]),t._v("：定位事件")])]),t._v(" "),a("li",[a("p",[a("code",[t._v("showsZoomControls: boolean")]),t._v("：是否显示放大缩小按钮")])]),t._v(" "),a("li",[a("p",[a("code",[t._v("zoomLevel: number")]),t._v("：缩放级别")])]),t._v(" "),a("li",[a("p",[a("code",[t._v("mapType: MapType")]),t._v("： 地图类型")]),t._v(" "),a("p",[t._v("可选性：Bus（公交地图）、Night（夜间地")]),t._v(" "),a("p",[t._v("图）、Standard（标准地图）、Navi（导航地图）、Satellite（卫星地图）")])])]),t._v(" "),a("h3",{attrs:{id:"maker"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#maker"}},[t._v("#")]),t._v(" Maker")]),t._v(" "),a("blockquote",[a("p",[t._v("地图标记点")])]),t._v(" "),a("ul",[a("li",[a("p",[a("code",[t._v("icon: function")]),t._v("：自定义图标")])]),t._v(" "),a("li",[a("p",[a("code",[t._v("coordinate: LatLng")]),t._v("：坐标")]),t._v(" "),a("p",[a("strong",[t._v("LatLng")])]),t._v(" "),a("ul",[a("li",[a("code",[t._v("latitude: number")]),t._v("：维度")]),t._v(" "),a("li",[a("code",[t._v("longitude: number")]),t._v("： 经度")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("coordinate={{\n\tlatitude: 123,\n\tlongitude: 456\n}}\n")])])]),a("p",[a("strong",[t._v("PureComponent")])]),t._v(" "),a("blockquote",[a("p",[t._v("当组件更新时，如果组件的 "),a("code",[t._v("props")]),t._v(" 和 "),a("code",[t._v("state")]),t._v(" 都没发生改变， "),a("code",[t._v("render")]),t._v(" 方法就不会触发")])])])]),t._v(" "),a("h2",{attrs:{id:"插件react-native-vector-icons"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#插件react-native-vector-icons"}},[t._v("#")]),t._v(" 插件react-native-vector-icons")]),t._v(" "),a("blockquote",[a("p",[t._v("一个图标组件库，icons")])]),t._v(" "),a("p",[a("a",{attrs:{href:"https://oblador.github.io/react-native-vector-icons/",target:"_blank",rel:"noopener noreferrer"}},[t._v("图标库查看地址"),a("OutboundLink")],1)]),t._v(" "),a("h3",{attrs:{id:"使用方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用方法"}},[t._v("#")]),t._v(" 使用方法")]),t._v(" "),a("ol",[a("li",[t._v("在工程目录下通过npm安装react-native-vector-icons")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("npm install --save react-native-vector-icons\nreact-native link react-native-vector-icons // 自动关联\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[a("p",[t._v("具体使用："),a("code",[t._v("react-native-vector-icons")]),t._v("的图标分为几个模块")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('// 先引入模块\nimport AntDesign from \'react-native-vector-icons/AntDesign\'\n// 通过模块名标签，使用name字段指定某个图标\n<AntDesign name="scan1" size={22} color="transparent" />\n')])])])]),t._v(" "),a("li",[a("p",[t._v("可配置属性")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("size")]),t._v("：默认12，图标fontSize")]),t._v(" "),a("li",[a("code",[t._v("name")]),t._v("：默认None，图标name，必须")]),t._v(" "),a("li",[a("code",[t._v("color")]),t._v("：默认Inherited，图标颜色")])])])]),t._v(" "),a("h2",{attrs:{id:"react-navigation-路由管理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#react-navigation-路由管理"}},[t._v("#")]),t._v(" react-navigation-----路由管理")]),t._v(" "),a("h3",{attrs:{id:"安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[t._v("#")]),t._v(" 安装")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("npm install --save react-navigation\n")])])]),a("h3",{attrs:{id:"三种导航方式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#三种导航方式"}},[t._v("#")]),t._v(" 三种导航方式")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("StackNavigator")]),t._v(" - 为应用程序提供了一种页面切换的方法，每次切换时，新的页面会放置在堆栈的顶部")]),t._v(" "),a("li",[a("code",[t._v("TabNavigator")]),t._v(" - 用于设置具有多个Tab页的页面")]),t._v(" "),a("li",[a("code",[t._v("DrawerNavigator")]),t._v(" - 用于设置抽屉导航的页面")])]),t._v(" "),a("h4",{attrs:{id:"stacknavigator"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#stacknavigator"}},[t._v("#")]),t._v(" StackNavigator")]),t._v(" "),a("p",[t._v("创建一个"),a("code",[t._v("StackNavigator")]),t._v("。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("import { StackNavigator } from 'react-navigation';\nimport Login from './pages/Login'\n\nconst RootNavigator = StackNavigator({\n\tLogin: {\n        screen: Login,\n        navigationOptions: {\n          headerTitle: '登录',\n        },\n      }\n});\nexport default RootNavigator;\n")])])]),a("p",[t._v("页面跳转")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("const Login = ({ navigation }) => (\n\t<View>\n        <Text>Login Page</Text>\n        <Button\n          onPress={() => navigation.navigate('Home')}\n          title=\"登录，跳转到主页面\"\n        />\n  </View>\n);\nconst Home = ({ navigation }) => (\n\t<View>\n        <Text>Home Page</Text>\n        <Button\n          onPress={() => navigation.navigate('Login')}\n          title=\"退出，回到登录页面\"\n        />\n  </View>\n);\n")])])]),a("p",[a("strong",[t._v("But，直接使用"),a("code",[t._v("StackNavigator")]),t._v("的方法已废弃，目前使用的是以下方法")])]),t._v(" "),a("h4",{attrs:{id:"createstacknavigator"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#createstacknavigator"}},[t._v("#")]),t._v(" createStackNavigator")]),t._v(" "),a("p",[a("strong",[t._v("安装")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("npm install --save react-navigation-stack\n")])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("import { createStackNavigator} from 'react-navigation-stack';\n")])])]),a("blockquote",[a("p",[t._v("提供APP屏幕之间切换的能力")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("createStackNavigator(RouteConfigs, StackNavigatorConfig):\n")])])]),a("ul",[a("li",[a("p",[a("code",[t._v("RouteConfigs")]),t._v("(必选)：路由配置对象是从路由名称到路由配置的映射，告诉导航器该路由呈现什么。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("// RouteConfigs\nimport Login from './pages/Login'\nLogin: {path: '/Login', screen: Login}\n")])])])]),t._v(" "),a("li",[a("p",[a("code",[t._v("StackNavigatorConfig")]),t._v("(可选)：配置导航器的路由(如：默认首屏，defaultNavigationOptions，paths等)样式(如，转场模式mode、头部模式等)。")]),t._v(" "),a("p",[a("strong",[t._v("用于路由配置的参数")])]),t._v(" "),a("ul",[a("li",[t._v("initialRouteName: 设置默认的页面组件，必须是上面已注册的页面组件。（Login）")]),t._v(" "),a("li",[t._v("initialRouteParams: 初始路由的参数。")]),t._v(" "),a("li",[t._v("navigationOptions: 屏幕导航的默认选项，下文会详细讲解。")]),t._v(" "),a("li",[t._v("initialRouteKey - 初始路由的可选标识符。")]),t._v(" "),a("li",[t._v("paths: 用来设置支持schema跳转时使用")])]),t._v(" "),a("p",[a("strong",[t._v("用于导航样式配置的参数")])]),t._v(" "),a("ul",[a("li",[t._v("mode: 页面切换模式: 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)\n"),a("ul",[a("li",[t._v("card: 普通app常用的左右切换。")]),t._v(" "),a("li",[t._v("modal: 上下切换。")])])]),t._v(" "),a("li",[t._v("headerMode: 导航栏的显示模式: screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏。\n"),a("ul",[a("li",[t._v("float: 无透明效果, 默认。")]),t._v(" "),a("li",[t._v("screen: 有渐变透明效果, 如微信QQ的一样。")]),t._v(" "),a("li",[t._v("none: 隐藏导航栏。")])])]),t._v(" "),a("li",[t._v("headerBackTitleVisible : 提供合理的默认值以确定后退按钮标题是否可见，但如果要覆盖它，则可以使用true或` false 在此选项中。\n"),a("ul",[a("li",[t._v("fade-in-place: 标题组件交叉淡入淡出而不移动，类似于iOS的Twitter，Instagram和Facebook应用程序。 这是默认值。")]),t._v(" "),a("li",[t._v("uikit: iOS的默认行为的近似值。 headerTransitionPreset: 指定在启用headerMode：float时header应如何从一个屏幕转换到另一个屏幕。")])])]),t._v(" "),a("li",[t._v("cardStyle: 样式（iOS上页面切换会有白色渐变蒙层，想去掉则可以这样设置，cardStyle: { opacity: null },切换页面时的页面边框也在这里可以设置）。")]),t._v(" "),a("li",[t._v("onTransitionStart: 页面切换开始时的回调函数 (我们可以在这里注册一些通知，告知我们切面切换的状态，方便后面处理页面切换事件)。")]),t._v(" "),a("li",[t._v("onTransitionEnd: 页面切换结束时的回调函数。")])]),t._v(" "),a("p",[a("strong",[t._v("defaultNavigationOptions")])]),t._v(" "),a("ul",[a("li",[t._v("title: 可以作为headerTitle的备选字段(当没设置headerTitle时会用该字段作为标题)，也可以作为TabNavigator的tabBarLabel以及DrawerNavigator的drawerLabel。")]),t._v(" "),a("li",[t._v("header: 自定义导航条，可以通过设置null来隐藏导航条；")]),t._v(" "),a("li",[t._v("headerTitle: 标题；")]),t._v(" "),a("li",[t._v("headerTitleAllowFontScaling: 标题是否允许缩放，默认true；")]),t._v(" "),a("li",[t._v("headerBackTitle: 定义在iOS上当前页面进入到下一页面的回退标题，可以通过设置null来禁用它；")]),t._v(" "),a("li",[t._v("headerTruncatedBackTitle: 当回退标题不能显示的时候显示此属性的标题，比如回退标题太长了；")]),t._v(" "),a("li",[t._v("headerBackImage：React 元素或组件在标题的后退按钮中显示自定义图片。 当组件被调用时，它会在渲染时收到许多 props 如：（tintColor，title）。 默认为带有 react-navigation/views/assets/back-icon.png 这张图片的组件，后者是平台的默认后图标图像（iOS上为向左的符号，Android上为箭头）。")]),t._v(" "),a("li",[t._v("headerRight: 定义导航栏右边视图；")]),t._v(" "),a("li",[t._v("headerLeft: 定义导航栏左边视图；")]),t._v(" "),a("li",[t._v("headerStyle: 定义导航栏的样式，比如背景色等；")]),t._v(" "),a("li",[t._v("headerTitleStyle: 定义标题的样式；")]),t._v(" "),a("li",[t._v("headerLeftContainerStyle：自定义 headerLeft 组件容器的样式，例如，增加 padding。")]),t._v(" "),a("li",[t._v("headerRightContainerStyle：自定义 headerRight 组件容器的样式,，例如，增加 padding。")]),t._v(" "),a("li",[t._v("headerTitleContainerStyle：自定义 headerTitle 组件容器的样式, 例如，增加 padding。")]),t._v(" "),a("li",[t._v("headerBackTitleStyle: 定义返回标题的样式；")]),t._v(" "),a("li",[t._v("headerPressColorAndroid：颜色为材料波纹 (Android >= 5.0)；")]),t._v(" "),a("li",[t._v("headerTintColor: 定义导航条的tintColor，会覆盖headerTitleStyle中的颜色；")]),t._v(" "),a("li",[t._v("headerTransparent：默认为 false。如果 true, 则标头将不会有背景, 除非您显式提供 headerStyle 或 headerBackground。")]),t._v(" "),a("li",[t._v("headerBackground：与headerTransparent一起使用，以提供在标题后台呈现的组件。 例如，您可以使用模糊视图来创建半透明标题。")]),t._v(" "),a("li",[t._v("gesturesEnabled: 定义是否能侧滑返回，iOS默认true，Android默认false；")]),t._v(" "),a("li",[t._v("gestureResponseDistance: 定义滑动返回的有效距离，水平状态下默认：25，垂直状态默认135；")]),t._v(" "),a("li",[t._v("gestureDirection: 设置关闭手势的方向。默认从左向右，可以设置从右到左的滑动操作。")])])])]),t._v(" "),a("h4",{attrs:{id:"tabnavigator"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tabnavigator"}},[t._v("#")]),t._v(" TabNavigator")]),t._v(" "),a("blockquote",[a("p",[t._v("最常见的底部选卡的路由方式")])]),t._v(" "),a("h4",{attrs:{id:"drawernavigator"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#drawernavigator"}},[t._v("#")]),t._v(" DrawerNavigator")]),t._v(" "),a("blockquote",[a("p",[t._v("从侧边栏划出，默认左侧划出")])]),t._v(" "),a("p",[a("strong",[t._v("安装")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("npm install react-navigation-drawer --save\n")])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("import { createDrawerNavigator } from 'react-navigation-drawer'\nconst AppContainer = createAppContainer(\n  createDrawerNavigator(\n    {\n      RouteConfigs  // RouteConfigs 与 createStackNavigator一致\n    },\n    {\n    // 一些常见的属性\n      drawerType: 'slide', // 滑动时背景页面的行为方式\n      drawerPosition: 'right', // 抽屉的位置，默认为left\n      drawerBackgroundColor: '#000000F6', // 抽屉背景色\n      contentOptions: { // 设置抽屉内的每个条目样式\n        activeTintColor: '#fffccd',\n        inactiveTintColor: '#f67676'\n      }\n    }\n  )\n)\n\n// page.js\n<Button onPress={ () => navigation.openDrawer() } title='打开抽屉' />\n")])])]),a("h2",{attrs:{id:"一些其他知识点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一些其他知识点"}},[t._v("#")]),t._v(" 一些其他知识点")]),t._v(" "),a("h3",{attrs:{id:"样式的继承与优先级"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#样式的继承与优先级"}},[t._v("#")]),t._v(" 样式的继承与优先级")]),t._v(" "),a("ol",[a("li",[t._v("Text内的文字不会继承View的文字样式")]),t._v(" "),a("li",[t._v("右侧优先级最高")])]),t._v(" "),a("h3",{attrs:{id:"flexbox布局"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#flexbox布局"}},[t._v("#")]),t._v(" Flexbox布局")])])}),[],!1,null,null,null);e.default=n.exports}}]);