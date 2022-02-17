# 入口文件

**AppRegistry**

> `AppRegistry`是所有 React Native 应用的 JS 入口。应用的根组件应当通过`AppRegistry.registerComponent`方法注册自己，然后原生系统才可以加载应用的代码包并且在启动完成之后通过调用`AppRegistry.runApplication`来真正运行应用

```
import { Text, AppRegistry } from 'react-native';
const App = (props) => (
  <View>
    <Text>App1</Text>
  </View>
);
AppRegistry.registerComponent('Appname', () => App);
```



# RN组件

## 基础组件

### View

> 一个支持Flexbox布局、样式、触摸处理、无障碍功能的容器
>
> 支持嵌套
>
> **你必须把你的文本节点放在`<Text>`组件内**。你不能直接在`<View>`下放置一段文本。

````
<View style={{样式}}> </View>
// 常用属性只有style
````

如需要添加监听事件, 这里需要用到**TouchableOpacity**组件

````
<TouchableOpacity onPress = {this.onClick}>
	<View></View>
</TouchableOpacity>
````

### Text

> 一个用于显示文本的组件，支持嵌套、样式、触摸处理
>
> 在**iOS**中，Text支持嵌套View
>
> **特别注意**：RN中的每个文本节点都必须使用Text组件来包裹

### Image

### TextInput

### ScrollView

### StyleSheet

## 交互控件

### StatusBar

> 控制应用状态栏的组件。
>
> 常见用法：防止APP标题被覆盖，通过StatusBar.currentHeight赋值给title的padding-top

### SafeAreaView

> SafeAreaView的目的是在一个“安全”的可视区域内渲染内容。具体来说就是因为目前有 iPhone X 这样的带有“刘海”的全面屏设备，所以需要避免内容渲染到不可见的“刘海”范围内。本组件目前仅支持 iOS 设备以及 iOS 11 或更高版本。

### PanResponder

> 提供了一个对[触摸响应系统](https://reactnative.cn/docs/0.44/gesture-responder-system.html)响应器的可预测的包装。

- `onStartShouldSetPanResponder`：用户开始触摸屏幕的时候，是否愿意成为响应者；默认返回false，无法响应，当返回true的时候则可以进行之后的事件传递。
- `onMoveShouldSetPanResponder`：在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互；
- `onPanResponderGrant`：开始手势操作，也可以说按下去。给用户一些视觉反馈，让他们知道发生了什么事情！（如：可以修改颜色）
- `onPanResponderMove`：最近一次的移动距离.如:(获取x轴y轴方向的移动距离 gestureState.dx,gestureState.dy)
- `onPanResponderRelease`：用户放开了所有的触摸点，且此时视图已经成为了响应者。
- `onPanResponderTerminate`：另一个组件已经成为了新的响应者，所以当前手势将被取消。

```
this._panResponder = PanResponder.create({
  // 要求成为响应者：
  onStartShouldSetPanResponder: (evt, gestureState) => true,
  onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
  onMoveShouldSetPanResponder: (evt, gestureState) => true,
  onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

  onPanResponderGrant: (evt, gestureState) => {
    // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！

    // gestureState.{x,y}0 现在会被设置为0
  },
  onPanResponderMove: (evt, gestureState) => {
    // 最近一次的移动距离为gestureState.move{X,Y}

    // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
  },
  onPanResponderTerminationRequest: (evt, gestureState) => true,
  onPanResponderRelease: (evt, gestureState) => {
    // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
    // 一般来说这意味着一个手势操作已经成功完成。
  },
  onPanResponderTerminate: (evt, gestureState) => {
    // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
  },
  onShouldBlockNativeResponder: (evt, gestureState) => {
    // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
    // 默认返回true。目前暂时只支持android。
    return true;
  }
```

### Dimensions

> 本模块用于获取设备屏幕的宽高
>
> ````
> const windoeWidth = Dimensions.get("window").width;
> const windowHeight = Dimensions.get("window").height;
> 
> // const { width, height } = Dimensions.get("window");
> ````

### Platform

> 本模块用于检测当前运行平台
>
> ````
> 获取当前运行平台：Platform.OS  // 'ios' || 'android'
> 
> // Platform.select
> const styles = StyleSheet.create({
> container: {
>  flex: 1,
>  ...Platform.select({
>    ios: {
>      backgroundColor: 'red'
>    },
>    android: {
>      backgroundColor: 'blue'
>    }
>  })
> }
> });
> ````

### PermissionsAndroid

> `PermissionsAndroid` 可以访问 Android M(也就是 6.0)开始提供的权限模型。有一些权限写在`AndroidManifest.xml`就可以在安装时自动获得，但有一些“危险”的权限则需要弹出提示框供用户选择。、

# RN项目基本所需库

-  全局状态管理器，解决组件数据通信问题。
- [fetch](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch) 与后端通信`ajax`在这里推荐最新版的api`fetch`。
- [react-navigation](https://link.zhihu.com/?target=https%3A//reactnavigation.org/docs/zh-Hans/getting-started.html) React Navigation 源于 React Native 社区对一个可扩展且易于使用的导航/路由系统解决方案的需求，它完全使用 JavaScript 编写。
- [react-native-vector-icons](https://link.zhihu.com/?target=https%3A//github.com/oblador/react-native-vector-icons) icon图标容器，该库自带字体图标，也可自定义图标文件。
- [react-native-community/async-storage](https://link.zhihu.com/?target=https%3A//github.com/react-native-community/async-storage%23readme) 本地存储默认是不会带的，需要用该库进行操作，该语法糖与web的`localstorage`并无差别。
- [react-devtools](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/react-devtools) 对react-native界面的dom进行调试。
- [react-native-debugger](https://link.zhihu.com/?target=https%3A//github.com/jhen0409/react-native-debugger) 对react-native程序的桌面调试工具。
- [react-native-config](https://link.zhihu.com/?target=https%3A//github.com/luggit/react-native-config) 解决不同环境(开发、测试、正式)变量配置。

# 模块API



## AsyncStorage

> `AsyncStorage`是一个简单的、异步的、持久化的 Key-Value 存储系统，它对于 App 来说是全局性的。可用来代替 LocalStorage。

````
import AsyncStorage from '@react-native-community/async-storage';
_storeData = async () => {
  try {
    await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
  } catch (error) {
    // Error saving data
  }
````

| 方法--------返回一个Promise对象 | 作用         |
| :------------------------------ | ------------ |
| getItem(key, [callback])        | 获取数据     |
| setItem(key, value)             | 设置数据     |
| removeItem(key, [callback])     | 移除数据     |
| clear()                         | 移除所有数据 |
| mergeItem(key, value)           | 合并数据     |

````
let UID123_object = {
  name: 'Chris',
  age: 30,
  traits: { hair: 'brown', eyes: 'brown' }
};
// 只需定义新增或是修改的数据
let UID123_delta = {
  age: 31,
  traits: { eyes: 'blue', shoe_size: 10 }
};

AsyncStorage.setItem(
  'UID123',
  JSON.stringify(UID123_object),
  () => {
    AsyncStorage.mergeItem(
      'UID123',
      JSON.stringify(UID123_delta),
      () => {
        AsyncStorage.getItem('UID123', (err, result) => {
          console.log(result);
        });
      }
    );
  }
);

// Console log result:
// => {'name':'Chris','age':31,'traits':
//    {'shoe_size':10,'hair':'brown','eyes':'blue'}}
````



# 插件mobx-react

## **环境配置**

1. **安装**

   ````
   npm install --save mobx mobx-react
   npm i --save-dev babel-plugin-transform-decorators-legacy   //由于要使用装饰器，需要这个插件
   ````

2.  **修改.babelrc**

   ````
   {
     "presets": ["react", "env", "stage-0"], 
     "plugins": ["transform-runtime", "transform-decorators-legacy"] 
   }
   ````

   

## **核心内容**

### **@observable**

**被观察者，store**

````test.js
import {observable} from 'mobx';
class TestStore {
    // 被观察者
    @observable name; 
    @observable age; 
    @observable sex; 
    constructor() {
        this.name = 'YH';
        this.age = 18;
        this.sex = "female";
    }
}
const test = new TestStore() 
export default test
````

### **@inject & @observer**

**在模块内用`@inject("Store")`，将Store注入到props上，通过this.props.Store.xxx获取值**

**模块要通过@observer（观察者）进行装饰**

````App.js
@inject("test")
@observer
class App extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { name } = this.props.test; // 使用
		return (
			<span>{ name }</span>
		)
	}
}
export default App;
````



### **@computed**

**@computed getter**

````test.js
@computed get name() {
	return this.name;
}
````

### **@action**

**在Store中定义，在模块中通过this.props.xxx()调用**

````test.js
@action
changeName = name => {
	this.name = name;
}
````

**异步请求**

1. **runInAction+async+await**

   ````
   @observable syaye = null;
   @action
   initData = async () => {
   	try {
   		const data = awiat getData();
   		runInAction("说明一下这个Action干什么的，不写也可以",() => {
   			this.name = data.name;
   		})
   	} catch (e) {
   		runInAction(() => {
   			this.state = "error";
   		})
   	}
   }
   ````

   

2. **flows+生成器函数**

   **不需要使用@action装饰**

   ````
   fetchProjects = flow(function * () {
   	try {
   		const data = yeild getData();
   		this.name = data.name;
   	} catch (e) {
   		this.state = "error";
   	}
   })
   ````

# 插件react-native-amap3d

> react-native 高德地图组件，支持 Android + iOS

[npm](https://www.npmjs.com/package/react-native-amap3d)

[参数说明](https://qiuxiang.github.io/react-native-amap3d/api/interfaces/mapviewprops.html#center)

## MapView

> 地图模块

- `locationEnabled:boolean`：是否启用定位

- `onLocation: function`：定位事件

- `showsZoomControls: boolean`：是否显示放大缩小按钮

- `zoomLevel: number`：缩放级别

- `mapType: MapType`： 地图类型

  可选性：Bus（公交地图）、Night（夜间地

  

  图）、Standard（标准地图）、Navi（导航地图）、Satellite（卫星地图）

## Maker

> 地图标记点

- `icon: function`：自定义图标

- `coordinate: LatLng`：坐标

  **LatLng**

  - `latitude: number`：维度
  - `longitude: number`： 经度

  ```
  coordinate={{
  	latitude: 123,
  	longitude: 456
  }}
  ```

  **PureComponent**

  > 当组件更新时，如果组件的 `props` 和 `state` 都没发生改变， `render` 方法就不会触发

# 插件react-native-vector-icons

> 一个图标组件库，icons

[图标库查看地址](https://oblador.github.io/react-native-vector-icons/)

## **使用方法**

1.  在工程目录下通过npm安装react-native-vector-icons

   ```
   npm install --save react-native-vector-icons
   react-native link react-native-vector-icons // 自动关联
   ```

2. 具体使用：`react-native-vector-icons`的图标分为几个模块

   ````
   // 先引入模块
   import AntDesign from 'react-native-vector-icons/AntDesign'
   // 通过模块名标签，使用name字段指定某个图标
   <AntDesign name="scan1" size={22} color="transparent" />
   ````

3. 可配置属性

   - `size`：默认12，图标fontSize
   - `name`：默认None，图标name，必须
   - `color`：默认Inherited，图标颜色

# react-navigation-----路由管理

## 安装

```
npm install --save react-navigation
```

## 三种导航方式

- `StackNavigator` - 为应用程序提供了一种页面切换的方法，每次切换时，新的页面会放置在堆栈的顶部
- `TabNavigator` - 用于设置具有多个Tab页的页面
- `DrawerNavigator` - 用于设置抽屉导航的页面

### StackNavigator

创建一个`StackNavigator`。

```
import { StackNavigator } from 'react-navigation';
import Login from './pages/Login'

const RootNavigator = StackNavigator({
	Login: {
        screen: Login,
        navigationOptions: {
          headerTitle: '登录',
        },
      }
});
export default RootNavigator;
```

页面跳转

```
const Login = ({ navigation }) => (
	<View>
        <Text>Login Page</Text>
        <Button
          onPress={() => navigation.navigate('Home')}
          title="登录，跳转到主页面"
        />
  </View>
);
const Home = ({ navigation }) => (
	<View>
        <Text>Home Page</Text>
        <Button
          onPress={() => navigation.navigate('Login')}
          title="退出，回到登录页面"
        />
  </View>
);
```

**But，直接使用`StackNavigator`的方法已废弃，目前使用的是以下方法**

#### createStackNavigator

**安装**

```
npm install --save react-navigation-stack
```

```
import { createStackNavigator} from 'react-navigation-stack';
```

> 提供APP屏幕之间切换的能力

```
createStackNavigator(RouteConfigs, StackNavigatorConfig):
```

- `RouteConfigs`(必选)：路由配置对象是从路由名称到路由配置的映射，告诉导航器该路由呈现什么。

  ````
  // RouteConfigs
  import Login from './pages/Login'
  Login: {path: '/Login', screen: Login}
  ````

  

- `StackNavigatorConfig`(可选)：配置导航器的路由(如：默认首屏，defaultNavigationOptions，paths等)样式(如，转场模式mode、头部模式等)。

  **用于路由配置的参数**

  - initialRouteName: 设置默认的页面组件，必须是上面已注册的页面组件。（Login）
  - initialRouteParams: 初始路由的参数。
  - navigationOptions: 屏幕导航的默认选项，下文会详细讲解。
  - initialRouteKey - 初始路由的可选标识符。
  - paths: 用来设置支持schema跳转时使用

  **用于导航样式配置的参数**

  - mode: 页面切换模式: 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    - card: 普通app常用的左右切换。
    - modal: 上下切换。
  - headerMode: 导航栏的显示模式: screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏。
    - float: 无透明效果, 默认。
    - screen: 有渐变透明效果, 如微信QQ的一样。
    - none: 隐藏导航栏。
  - headerBackTitleVisible : 提供合理的默认值以确定后退按钮标题是否可见，但如果要覆盖它，则可以使用true或` false 在此选项中。
    - fade-in-place: 标题组件交叉淡入淡出而不移动，类似于iOS的Twitter，Instagram和Facebook应用程序。 这是默认值。
    - uikit: iOS的默认行为的近似值。 headerTransitionPreset: 指定在启用headerMode：float时header应如何从一个屏幕转换到另一个屏幕。
  - cardStyle: 样式（iOS上页面切换会有白色渐变蒙层，想去掉则可以这样设置，cardStyle: { opacity: null },切换页面时的页面边框也在这里可以设置）。
  - onTransitionStart: 页面切换开始时的回调函数 (我们可以在这里注册一些通知，告知我们切面切换的状态，方便后面处理页面切换事件)。
  - onTransitionEnd: 页面切换结束时的回调函数。

  **defaultNavigationOptions**

  - title: 可以作为headerTitle的备选字段(当没设置headerTitle时会用该字段作为标题)，也可以作为TabNavigator的tabBarLabel以及DrawerNavigator的drawerLabel。
  - header: 自定义导航条，可以通过设置null来隐藏导航条；
  - headerTitle: 标题；
  - headerTitleAllowFontScaling: 标题是否允许缩放，默认true；
  - headerBackTitle: 定义在iOS上当前页面进入到下一页面的回退标题，可以通过设置null来禁用它；
  - headerTruncatedBackTitle: 当回退标题不能显示的时候显示此属性的标题，比如回退标题太长了；
  - headerBackImage：React 元素或组件在标题的后退按钮中显示自定义图片。 当组件被调用时，它会在渲染时收到许多 props 如：（tintColor，title）。 默认为带有 react-navigation/views/assets/back-icon.png 这张图片的组件，后者是平台的默认后图标图像（iOS上为向左的符号，Android上为箭头）。
  - headerRight: 定义导航栏右边视图；
  - headerLeft: 定义导航栏左边视图；
  - headerStyle: 定义导航栏的样式，比如背景色等；
  - headerTitleStyle: 定义标题的样式；
  - headerLeftContainerStyle：自定义 headerLeft 组件容器的样式，例如，增加 padding。
  - headerRightContainerStyle：自定义 headerRight 组件容器的样式,，例如，增加 padding。
  - headerTitleContainerStyle：自定义 headerTitle 组件容器的样式, 例如，增加 padding。
  - headerBackTitleStyle: 定义返回标题的样式；
  - headerPressColorAndroid：颜色为材料波纹 (Android >= 5.0)；
  - headerTintColor: 定义导航条的tintColor，会覆盖headerTitleStyle中的颜色；
  - headerTransparent：默认为 false。如果 true, 则标头将不会有背景, 除非您显式提供 headerStyle 或 headerBackground。
  - headerBackground：与headerTransparent一起使用，以提供在标题后台呈现的组件。 例如，您可以使用模糊视图来创建半透明标题。
  - gesturesEnabled: 定义是否能侧滑返回，iOS默认true，Android默认false；
  - gestureResponseDistance: 定义滑动返回的有效距离，水平状态下默认：25，垂直状态默认135；
  - gestureDirection: 设置关闭手势的方向。默认从左向右，可以设置从右到左的滑动操作。

### TabNavigator

> 最常见的底部选卡的路由方式

### DrawerNavigator

> 从侧边栏划出，默认左侧划出

**安装**

```
npm install react-navigation-drawer --save
```

```
import { createDrawerNavigator } from 'react-navigation-drawer'
const AppContainer = createAppContainer(
  createDrawerNavigator(
    {
      RouteConfigs  // RouteConfigs 与 createStackNavigator一致
    },
    {
    // 一些常见的属性
      drawerType: 'slide', // 滑动时背景页面的行为方式
      drawerPosition: 'right', // 抽屉的位置，默认为left
      drawerBackgroundColor: '#000000F6', // 抽屉背景色
      contentOptions: { // 设置抽屉内的每个条目样式
        activeTintColor: '#fffccd',
        inactiveTintColor: '#f67676'
      }
    }
  )
)

// page.js
<Button onPress={ () => navigation.openDrawer() } title='打开抽屉' />
```

# 一些知识点

## 样式的继承与优先级

1. Text内的文字不会继承View的文字样式
2. 右侧优先级最高

## Flexbox布局