开发中遇到的问题

// TODO

**https://www.lilichao.com/**

## **一些问题**

### 为什么要在`componentDidMount`中获取数据？

### `componentDidUpdate`可以做什么？

### 你真的理解`setState`吗？

setState放在异步函数中，如果用setState(count+1)这种形式，触发多次只会执行一次；要改为setState(count => count + 1)

### `setState`什么时候是异步/同步的？

![image-20230201103604483](/imgs/react/image-20230201103604483.png)

- **react18**

  setState 和 useState的区别
  相同点：执行多个set（相同/不同都可以）时只执行一次render；同步和异步render执行次数和结果都是一样的
  不同点：setState只执行最后一次setState，useState每次都会执行（比如同一个state.a=0执行两次++，setState最后返回的是1，useState返回的是2）

- **react18之前**

  在异步函数中是同步的，在同步函数中是异步的

## 多页面配置

**修改配置之后要重新运行yarn start**

1. 修改/config/paths.js

   ```
   // 在module.exports中添加
   appLoginHtml: resolveApp("public/login.html"),
   appLoginJs: resolveModule(resolveApp, "src/login"),
   ```

2. 修改webpack.config.js配置文件

   ```
   // entry
   entry: {
     index:
    isEnvDevelopment && !shouldUseReactRefresh
         ? [webpackDevClientEntry, paths.appIndexJs]
         : paths.appIndexJs,
     login:
       isEnvDevelopment && !shouldUseReactRefresh
         ? [webpackDevClientEntry, paths.appLoginJs]
         : paths.appLoginJs
   },
   /*
   // 简单点
   entry: {
     index: paths.appIndexJs,
     login: paths.appLoginJs
   },
   */
   
   // output
   // 将filename修改为[name].js
   filename: isEnvProduction
           ? "static/js/[name].[contenthash:8].js"
           : isEnvDevelopment && "static/js/[name].js",
           
   // plugins
   // HtmlWebpackPlugin  修改之前的，再新增一个
   new HtmlWebpackPlugin(
       Object.assign(
         {},
         {
           inject: true,
           template: paths.appHtml,
           
           // 修改点： filename配置项和chunks
           filename: "index.html",
           chunks: ["index"],
         },
         isEnvProduction
           ? {
               minify: {
                 removeComments: true,
                 collapseWhitespace: true,
                 removeRedundantAttributes: true,
                 useShortDoctype: true,
                 removeEmptyAttributes: true,
                 removeStyleLinkTypeAttributes: true,
                 keepClosingSlash: true,
                 minifyJS: true,
                 minifyCSS: true,
                 minifyURLs: true,
               },
             }
           : undefined
       )
     ),
     new HtmlWebpackPlugin(
       Object.assign(
         {},
         {
           inject: true,
           template: paths.appLoginHtml,
           filename: "login.html",
           chunks: ["login"],
         },
         isEnvProduction
           ? {
               minify: {
                 removeComments: true,
                 collapseWhitespace: true,
                 removeRedundantAttributes: true,
                 useShortDoctype: true,
                 removeEmptyAttributes: true,
                 removeStyleLinkTypeAttributes: true,
                 keepClosingSlash: true,
                 minifyJS: true,
                 minifyCSS: true,
                 minifyURLs: true,
               },
             }
           : undefined
       )
     ),
   
   // ManifestPlugin  entrypoints.main 修改为 entrypoints.index
   new ManifestPlugin({
       fileName: "asset-manifest.json",
       publicPath: paths.publicUrlOrPath,
       generate: (seed, files, entrypoints) => {
         const manifestFiles = files.reduce((manifest, file) => {
           manifest[file.name] = file.path;
           return manifest;
         }, seed);
         const entrypointFiles = entrypoints.index.filter(
           (fileName) => !fileName.endsWith(".map")
         );
   
         return {
           files: manifestFiles,
           entrypoints: entrypointFiles,
         };
       },
     }),
   ```

## 基础

### JSX语法

1. `React.createElement(component, props, ...children)` 函数的语法糖

   ```
   <MyButton color="blue" shadowSize={2}>
     Click Me
   </MyButton>
   
   // 会被编译为
   React.createElement(
     MyButton,
     {color: 'blue', shadowSize: 2},
     'Click Me'
   )
   ```

   - **如果没有子节点，可以使用自闭合的标签形式**

   `<div className="sidebar" />`

   - **必须有结束标签**

2. 大写字母开头的 JSX 标签意味着它们是 React 组件

   **用户自定义的组件必须以大写字母开头，否则React 会认为 它 是一个 HTML 标签（因为它没有以大写字母开头）**

3. 点语法

   > 当你在一个模块中导出许多 React 组件时，以使用点语法来引用一个 React 组件。

   ```
   import React from 'react';
   
   const MyComponents = {
     DatePicker: function DatePicker(props) {
       return <div>Imagine a {props.color} datepicker here.</div>;
     }
   }
   
   function BlueDatePicker() {
     return <MyComponents.DatePicker color="blue" />;
   }
   ```

4. 动态组件

   ```
   function Story(props) {
     // 这里一定要先赋值再使用，JSX 类型不能是一个表达式
     const SpecificStory = components[props.storyType];
     return <SpecificStory story={props.story} />;
   }
   
   // 错误使用
   function Story(props) {
     return <components[props.storyType] story={props.story} />;
   }
   ```

5. props默认值为true

   ```
   <MyTextBox autocomplete />
   // 等价于
   <MyTextBox autocomplete={true} />
   ```

6. JSX 会移除行首尾的空格以及空行。与标签相邻的空行均会被删除，文本字符串之间的新行会被压缩为一个空格。因此以下的几种方式都是等价的：

   ```
   // 1
   <div>Hello World</div>
   
   // 2
   <div>
     Hello World
   </div>
   
   // 3
   <div>
     Hello
     World
   </div>
   
   // 4
   <div>
   
     Hello World
   </div>
   ```

7. 布尔类型、Null以及Undefined将会被忽略

   > `false`, `null`, `undefined`, and `true` 是合法的子元素。但它们并不会被渲染。

   以下的JSX表达式渲染结果相同

   ```
   // 1
   <div />
   
   // 2
   <div></div>
   
   // 3
   <div>{false}</div>
   
   // 4
   <div>{null}</div>
   
   // 5
   <div>{undefined}</div>
   
   // 6
   <div>{true}</div>
   ```
   
8. 数据是一个数组时，React可以拿到值进行展示，但如果是一个对象，只能拿到key值，无法进行展示

   ![image-20210322141300829](/imgs/react/object无法作为child.png)


### 三大核心属性

**组件实例的属性**，意味着[函数组件](#函数组件)没有这些属性

#### state

- state是组件对象最重要的属性，值是对象（可以包含多个key-value的组合）

- 组件被称为状态机，通过更新组件的state来更新对应的页面显示（重新渲染组件）

- 组件中render方法中的this为组件实例对象

- 组件自定义的方法中this为undefined，如何解决？
  - a.强制绑定this:通过函数对象的bind()
  - b.箭头函数
- 不能直接修改或更新状态数据，用setState

#### props

- 每个组件对象都会有props属性
- 组件标签的所有属性都保存在props中
- props的作用：通过标签属性从组件外向组件内传递变化的数据
- 组件内部不要修改props数据
- 给props加限制：prop-types库

#### refs

**获取元素的真实DOM对象。**

> 尽量减少在React中操作原生的DOM对象，如果实在非得操作也尽量是那些不会对数据产生影响的操作，像是设置焦点、读取信息等。

​	定义ref的三种方式

1. ```
   <input ref='inputRef' />
   
   this.refs.inputRef
   ```

2.   ```
     this.inputRef = React.createRef();
     <input ref={this.inputRef} />
     ```

3. ```
   回调ref
   <input ref={ref=this.inputRef = ref} />
   ```

#### 与HTML的差异

1. class——className
2. style属性：CSS——JS对象

### 生命周期（钩子函数）

https://zh-hans.reactjs.org/docs/react-component.html#

```
constructor就可以拿到refs和定义的事件
```

#### 主要的钩子函数

- 挂载：constructor、getDerivedStateFromProps、render、componentDidMount
- 更新：getDerivedStateFromProps、shouldComponentUpdate、render、getSnapshotBeforeUpdate、componentDidUpdate
- 卸载：componentDidUnmount
- 错误处理：getDerivedStateFromError、componentDidCatch
- 过时方法：UNSAFE_componentWillMount、UNSAFE_componentWillReceiveProps、UNSAFE_componentWillUpdate，在**react17**版本后会被弃用，**但现在仍可以使用**

**副作用：**一个函数在执行过程中产生了外部可观察的变化。比如：修改全局变量，修改传参，console.log()等外部可观察它的变化。

##### 常见方法

- `constructor`：通过super来绑定组件身上的props，只在挂载时执行一次
- `componentDidMount`：一般在这个函数中进行**异步的**数据获取
- `render`：渲染页面，挂载、更新时都会触发
- `shouldComponentUpdate`：是否进行更新，如果返回false，则不会触发render
- `componentDidUpdate`：组件开始重新渲染之前调用(TODO: 这个钩子可以做什么？)
- `componentDidUnmount`：组件卸载时触发，一般用来重置数据、清除定时器、移除监听

##### 错误边界（Error Boundaries）

在子组件树种的任何位置捕获JS错误，**它无法捕获其自身的错误**

**只有class组件才可以成为错误边界组件**

- `getDerivedStateFromError`：从错误中获取 `state`，渲染备用 UI （在render中自定义降级后的备用UI）
- `componentDidCatch`：捕获错误并进行处理，比如打印错误、上报服务器

##### react16新增

- `getDerivedStateFromProps`：在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 `null` 则不更新任何内容。此方法适用于罕见的用例，即 **state 的值在任何时候都取决于 props**。

  ```
  开发中遇到的实例：从不同页面进到同一个页面进行数据初始化的时候，state的值取决于props
  ```

- `getSnapshotBeforeUpdate`：在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 `componentDidUpdate`。

  ```
  class ScrollingList extends React.Component {
    constructor(props) {
      super(props);
      this.listRef = React.createRef();
    }
  
    getSnapshotBeforeUpdate(prevProps, prevState) {
      // 我们是否在 list 中添加新的 items ？
      // 捕获滚动位置以便我们稍后调整滚动位置。
      if (prevProps.list.length < this.props.list.length) {
        const list = this.listRef.current;
        return list.scrollHeight - list.scrollTop;
      }
      return null;
    }
  
    componentDidUpdate(prevProps, prevState, snapshot) {
      // 如果我们 snapshot 有值，说明我们刚刚添加了新的 items，
      // 调整滚动位置使得这些新 items 不会将旧的 items 推出视图。
      //（这里的 snapshot 是 getSnapshotBeforeUpdate 的返回值）
      if (snapshot !== null) {
        const list = this.listRef.current;
        list.scrollTop = list.scrollHeight - snapshot;
      }
    }
  
    render() {
      return (
        <div ref={this.listRef}>{/* ...contents... */}</div>
      );
    }
  }
  ```


##### 废弃方法

在React17之前，这些方法仍然有效，这几个生命周期之前的函数名没有UNSAFE_前缀。

- `UNSAFE_componentWillMount`：在挂载之前被调用。它在 `render()` 之前调用，因此在此方法中同步调用 `setState()` 不会触发额外渲染。通常，我们建议使用 `constructor()` 来初始化 state。**此方法是服务端渲染唯一会调用的生命周期函数。**
- `UNSAFE_componentWillReceiveProps`：`getDerivedStateFromProps`
- `UNSAFE_componentWillUpdate`：当组件收到新的 props 或 state 时，会在渲染之前调用，初始渲染不会调用此方法。
  - 此方法中不能调用 `this.setState()`；
  - 返回之前，也不应该执行任何其他操作触发对 React 组件的更新

#### **钩子函数调用顺序**

![react生命周期](/imgs/react/react生命周期.png)

#### 手动调用

上述的钩子函数是React机制主动调用的方法，还有两种方法可以触发钩子函数：`setState`和`forceUpdate`

调用 `forceUpdate 将致使组件调用 `render方法，此操作会跳过该组件的 `shouldComponentUpdate。但其子组件会触发正常的生命周期方法，包括 `shouldComponentUpdate` 方法。如果标记发生变化，React 仍将只更新 DOM。

// TODO

#### 原理解析

### 组件

> 定义组件有两个要求
>
> 1. 组件名称必须以大写字母开头
> 2. 组件返回值只能有**一个**根元素

**props默认值**

```
{
	history: {}, // 就是history对象
	location: {},
	match: {
		param: {
			title: "abc"
		}
		path: "/page/:title"
		url: "/page/abc"
	}
}
```

#### 类组件

可以定义生命周期钩子函数，render是其中必须要实现的方法

```
class Welcome extends React.Component {
  render() {
    return (
      <h1>Welcome { this.props.name }</h1>
    );
  }
}
ReactDOM.render(<Welcome name='react' />, document.getElementById('root'));
```

#### 函数组件

函数组件接收一个单一的 `props` 对象并返回了一个React元素

```
function Welcome (props) {
  return <h1>Welcome {props.name}</h1>
}
ReactDOM.render(<Welcome name='react' />, document.getElementById('root'));

```

**区别**

1. 函数组件的性能比类组件的性能要高。因为类组件使用的时候要实例化，而函数组件直接执行函数取返回结果即可。为了提高性能，尽量使用函数组件。
2. 函数组件写法比较简单，没有this、state、生命周期（因为函数式组件没有继承React.Component，由于生命周期函数是React.Component类的方法实现的，所以没继承这个类，自然就没法使用生命周期函数了）。对于不需要state和生命周期函数调用的组件可使用函数组件。
3. 函数组件没有生命周期、state的问题可以通过React Hook解决

##### 相关知识点--严格模式下this的指向问题

1. 非严格模式下默认指向window
2. 严格模式下传null指向null，不传或者传undefined都指向undefined。在函数组件中，this==undefined

#### 组件通信

##### 父子

- 父->子：props

  ![父传子](/imgs/react/父传子.jpg)

- 子->父：父组件将一个函数作为props传给子组件，子组件通过this.props.xxx(args)传值，与vue中的$emit类似

  ![子传父](/imgs/react/子传父.jpg)

##### 兄弟

兄弟组件之间的传值，是通过父组件做的中转 ，流程为：**组件A** -- `传值` --> **父组件** -- `传值` --> **组件B**

![兄弟组件传值](/imgs/react/兄弟组件传值.jpg)

##### 跨级

###### **props层层传递**

组件嵌套过深时，不建议使用这种方式

###### **[redux](#Redux)**

###### context对象

https://react.docschina.org/docs/context.html#reactcreatecontext

 **React context的局限性**

1. 在组件树中，如果中间某一个组件 ShouldComponentUpdate中 return false ，会阻碍 context 的正常传值，导致子组件无法获取更新。
2. 组件本身 extends React.PureComponent 也会阻碍 context 的更新。

> ​	PureComponent会对`props`和`state`进行浅比较，跳过不必要的更新，提高组件性能。

```
// context在如下的生命周期钩子中可以使用
constructor(props, context)
componentWillReceiveProps(nextProps, nextContext)
shouldComponentUpdate(nextProps, nextState, nextContext)
componentWillUpdate(nextProps, nextState, nextContext)
componentDidUpdate(prevProps, prevState, prevContext)
```

- 老版本的context
  - getChildContext 根组件中声明，一个函数，返回一个对象，就是context
  - childContextTypes 根组件中声明，指定context的结构类型，如不指定，会产生错误
  - contextTypes 子孙组件中声明，指定要接收的context的结构类型，可以只是context的一部分结构。contextTypes 没有定义，context将是一个空对象。
  - this.context 在子孙组件中通过此来获取上下文

- 新版本的context

  新版本的React context使用了Provider和Customer模式，和react-redux的模式非常像。

  - 在顶层的Provider中传入value，
  - 在子孙级的Consumer中获取该值，并且能够传递函数，用来修改context

  ```
  //创建Context组件
  const ThemeContext = React.createContext({
    theme: 'dark',
    toggle: () => {}, //向上下文设定一个回调方法
  });
  
  //运行APP
  class App extends React.Component {
    constructor(props) {
      super(props);
  
      this.toggle = () => { //设定toggle方法，会作为context参数传递
        this.setState(state => ({
          theme:
            state.theme === themes.dark
              ? themes.light
              : themes.dark,
        }));
      };
  
      this.state = {
        theme: themes.light,
        toggle: this.toggle,
      };
    }
  
    render() {
      return (
        <ThemeContext.Provider value={this.state}> //state包含了toggle方法
          <Content />
        </ThemeContext.Provider>
      );
    }
  }
  
  //中间组件
  function Content() {
    return (
      <div>
        <Button />
      </div>
    );
  }
  
  //接收组件
  function Button() {
    return (
      <ThemeContext.Consumer>
        {({theme, toggle}) => (
          <button
            onClick={toggle} //调用回调
            style={{backgroundColor: theme}}>
            Toggle Theme
          </button>
        )}
      </ThemeContext.Consumer>
    );
  }
  ```

  

###### **Pubsub**

```
// A.js  父组件
import React, { Component } from "react";
import PubSub from "pubsub-js";
import B from "./B";

export default class A extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "none",
    };
  }
  componentDidMount() {
    this.pubsub_token = PubSub.subscribe(
      "PubSubmessage",
      function (topic, message) {
        console.log("topic", topic);
        this.setState({
          message,
        });
      }.bind(this)
    );
  }
  componentWillUnmount() {
    PubSub.unsubscribe(this.pubsub_token);
  }
  render() {
    return (
      <div>
        <B></B>
        <div style={{ marginTop: "1.5em" }}>{this.props.children}</div>
        <div style={{ marginTop: "1.5em" }}>
          page A message:{this.state.message}
        </div>
      </div>
    );
  }
}


// B.js  子组件
import React, { Component } from "react";
import PubSub from "pubsub-js";
import C from "./C";

export default class B extends Component {
  constructor(props) {
    super(props);
    this.state = {
      increase: "B页面传值---------increase",
      decrease: "B页面传值---------decrease",
    };
  }
  buttonIncrease() {
    PubSub.publish("PubSubmessage", this.state.increase);
  }
  buttonDecrease() {
    PubSub.publish("PubSubmessage", this.state.decrease);
  }
  render() {
    return (
      <div style={{ color: "red" }}>
        Page B: font color is Red
        <br />
        This is Page B. Some state changes:
        <button onClick={this.buttonIncrease.bind(this)}>Increase</button>
        <button onClick={this.buttonDecrease.bind(this)}>Decrease</button>
        <C></C>
      </div>
    );
  }
}

// C.js  孙子组件
import React, { Component } from "react";
import PubSub from "pubsub-js";
export default class C extends Component {
  constructor(props) {
    super(props);
    this.state = {
      increase: "C页面传值---------increase",
      decrease: "C页面传值---------decrease",
    };
  }
  buttonIncrease() {
    PubSub.publish("PubSubmessage", this.state.increase);
  }
  buttonDecrease() {
    PubSub.publish("PubSubmessage", this.state.decrease);
  }
  render() {
    return (
      <div>
        This is Page C. Some state changes:
        <button onClick={this.buttonIncrease.bind(this)}>Increase</button>
        <button onClick={this.buttonDecrease.bind(this)}>Decrease</button>
      </div>
    );
  }
}
```

##### 非嵌套组件通信

**自定义事件EventEmitter**

```
npm install events --save
```

```
// 定义函数
emitter.addListener(funcName, func(args){})

// 调用函数传值
emitter.emit(funcName, args)
```



### 事件处理

> 1. 在 React 中另一个不同点是你不能通过返回 `false` 的方式阻止默认行为。你必须显式的使用 `preventDefault` 。
> 2. class 的方法默认不会[绑定](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind) `this`。如果你忘记绑定 `this.handleClick` 并把它传入了 `onClick`，当你调用这个函数的时候 `this` 的值为 `undefined`

#### 绑定事件的几种方法

##### 在构造函数中使用bind绑定this

```
// render
<button onClick={this.handleClick}>
// constructor
this.handleClick = this.handleClick.bind(this);
```

##### 在调用的时候使用bind绑定this

```
// render
<button onClick={this.handleClick.bind(this)}>
```

##### 在调用的时候使用箭头函数绑定this

```
// render
<button onClick={() => this.handleClick()}>
```

##### 函数定义使用箭头函数

```
// render
<button onClick={this.handleClick}>
// 事件定义
handleClick = () => {
// 这里的this是组件的this
}
```

#### 事件流

在`React`的事件处理系统中，默认的事件流就是冒泡，如果希望以捕获的方式来触发事件的话，可以使用`onClickCapture`来绑定事件，也就是在事件类型后面加一个后缀`Capture`

#### 事件委托

#### 合成事件

#### 原生事件

## protal

通过ReactDOM中的createPortal()方法，可以在渲染元素时将元素渲染到网页中的指定位置

**使用情况**

> 需要在React中添加一个会盖住其他元素的Backdrop组件，Backdrop显示后，页面中所有的元素都会被遮盖。很显然这里需要用到定位，但是如果将遮罩层直接在当前组件中渲染的话，遮罩层会成为当前组件的后代元素。如果此时，当前元素后边的兄弟元素中有开启定位的情况出现，且层级不低于当前元素时，便会出现盖住遮罩层的情况。

```
const backdropDOM = document.getElementById('backdrop');

const Backdrop = () => {
  return ReactDOM.createPortal(
  <div
           style={
      {
        position:'fixed',
        top:0,
        bottom:0,
        left:0,
        right:0,
        zIndex:9999,
        background:'rgba(0,0,0,.3)'
      }
    }
           >
  </div>,
      backdropDOM
  );
};
// Backdrop会直接渲染到网页中id为backdrop的div中
```



## 全家桶

### Router

#### 标签

##### BrowserRouter

Router的一种，通过使用HTML5提供的history API机制来维持页面UI通URL的统一

**props**

- `basename`：该路由路径的base url。有前置斜杠，不能有后置斜杠。

  ```
  <BrowserRouter basename="/calendar"/>
  <Link to="/today"/> // renders <a href="/calendar/today">
  ```

- `getUserCOnfirmation`：路由跳转的二次确认函数，用来拦截Prompt组件，默认情况下使用window.confirm弹框  **需要配合Prompt一起使用，没有Prompt不会弹出**

- `forceRefresh`：布尔值。为true时, router在进行路由跳转的时候会进行页面刷新。**可能只在浏览器不支持H5 history api的情况下需要使用。**

- `keyLength`：自定义location.key的长度，默认为6  **？？？？？？？**

- `children`：需要渲染的**单个reactNode元素组件**

##### HashRouter

通过URL hash部分，如location.hash来保持UI同URL一致。

**hashRouter一般用于低版本浏览器，在较高版本浏览器中推荐配置服务器端使用browserHistory**

**props**

- `basename`
- `getUserConfirmation`
- `hashType`：string，
  - "slash"- 创建像#/和的哈希#/sunshine/lollipops，默认
  - "noslash"- 创建像#和的哈希#sunshine/lollipops
- `children`

##### Link

进入页面路由的链接
**props**

- `to`
- `replace`： 布尔值- 为true时，将会替换history stack中的当前路径

##### NavLink

`<Link>` 的特殊版本，当匹配当前URL时，会给当前link添加样式。

- `activeClassName`：选中时添加的类名，默认为`active`
- `activeStyle`：对象，样式
- `exact`
- `strict`：布尔值，为true时，当进行路由匹配时，后置斜杠将会被考虑在内
- `isActive`：func。额外函数来进一步验证当前路由是否匹配

##### Route

React router中最重要的模块，主要职责是当location匹配路由时，会将UI **render**出来。

**props**

- `to`： string, url地址
- `to`： object,
  - `pathname`：跳转路径
  - `search`：查询参数
  -  `hash`：url中的hash, eg. #a-hash, 
  - `state`：存储到location中的额外状态数据. location中的state可以在redirect跳转组件的`this.props.location.state`访问
- `push`： 为true表示redirect path将往history stack中推一条新数据而不是替换
- `from`： redirect from url, 会进行正则匹配。只能用在`<Switch>`中
- `exact`： bool, 精准匹配
- `strict`： bool, 严格模式，后斜杠将考虑在内

##### Redirect

使用redirect将跳转到一个新的路由，新的location将会覆盖history stack中的当前location.

使用场景：初始化时默认选中一个路由

```
<Redirect to="/xxx" />
```

##### Switch

渲染`Route`或`Redirect`中第一个匹配location的组件，且子元素只能为`Route`或`Redirect`

避免：不使用Switch时，如果有两个组件的path是同一个值，会同时展示（会一直匹配到最后一个Link，如果to一样，就显示）

好处：使用Switch后，匹配到之后就不再继续之后的匹配，一般路径和组件是一一对应的，提高渲染效率

**props**

- `location`：Object
- `children`： 只能为`Route`或`Redirect`

##### Prompt

当想阻止用户跳转路由，可以使用`prompt`提示用户是否跳转

**props**

- `message`：提示的信息
- `when`：布尔值，true表示弹出跳转提示框

##### MemoryRouter

`Router`一种, 将url history保存在内存中，不可再页面地址栏中读取，通常用于测试或者非浏览器的环境，如react native

##### StaticRouter

静态路由，页面的location 将不会改变。一般用于服务器端。

##### withRouter

`withRouter`的作用就是，如果我们某个东西不是一个`Router`，但是我们要依靠它去跳转一个页面，比如点击页面的logo 这时候就可以使用`withRouter`来做。

**使用**

将一个组件包裹进`Route`里面, 然后`react-router`的三个对象`history, location, match`就会被放进这个组件的`props`属性中。

```
class Nav extends React.Component {
    constructor(){//跳转到
    	super(props);
     	console.log(this.props)
    }
    render() {
        return (
        	<div>{this.props.xxx}</div>
        );
    }
}
export default withRouter(Nav);
```

![image-20201221104523737](/imgs/react/image-20201221104523737.png)

#### 路由组件传参

##### params

```
// 注册
<Route path={`${path}/:id/:msg`} />
// 传参
<Link to={`${path}/123/456`} component={xxx}/>
// 接收
this.props.match.params
// 结果
id=123  msg=456
```

##### search

```
// 注册
<Route path={`${path}`} />
// 传参
<Link to={`${path}/?id=123&msg=456`} component={xxx}/>
// 接收,通过插件querystring进行转换
this.props.location.search
// 结果
id=123  msg=456
```

##### state

```
// 传参
<Link to={{path:`${path}/?id=123&msg=456`,state:{id:123,msg:456}}} component={xxx}}/>
// 注册
<Route path={`${path}`} />
// 接收,通过插件querystring进行转换
this.props.location.state
```

#### 路由跳转改为replace模式

```
<Route path={`${path}`} replace/>
```

#### 编程式路由

##### push

> 向history栈里面添加一条新记录

##### replace

> 不会向 history 添加新记录

##### go

`go(num)`

> 大于0时：加载history中num个之后的URL
>
> 小于0时：加载history中num个之前的URL

##### goBack

> 加载history中前一个的URL

##### goFoward

> 加载history中下一个的URL

### Router6

#### 钩子函数

###### useNavigate

> 编程式的路由跳转

```
navigate(pathname[,{replace: true, state: xxx}])
// pathname: 跳转路径
// pathname?key=value: search方式传参
// pathname/value: params方式传参，需要修改路由的path为'/login/:key'
// replace: true history.replceState，不设置时默认为history.pushState
// state: 传递state参数
```

```
function App() {
	const navigate = useNavigate();
	
	const jumpLogin = () => {
		navigate('/login')
	}
	
	return (
		<div>
			<button onClick={jumpLogin}></button>
		</div>
	)
}
```

###### useParams

> 获取params参数

```
const params = useParams()
console.log(params.key)
```

###### useSearchParams

> 获取search参数

```
const [search, setsearch] = useSearchParams()
console.log(search.get('name'))
console.log(search.get('age'))
```

###### useLocation

> 获取state参数

```
const state = useLocation()
console.log(state)
```



###### useRoutes



### Redux

**Redux中的Store修改之后，React不会自动监听，也就是说页面不会重新渲染，需要手动进行监听**

```
一般在最外层父组件中进行监听
componentDidMount(){
	store.subscribe(()=>{
		this.setState({})
	})
}
```

#### Redux

````
import { createStore } from "redux";
import { reducer } from "./reducer"

store = createStore(reducer)
````

##### store

![image-20201222150802906](/imgs/react/image-20201222150802906.png)

##### action

- actionType

  ```
  export const ADD_TYPE = "ADD_TYPE";
  ```

- index

  ```
  import * as actionType from "./actionType";
  
  export const add = (value) => {
    return {
      type: actionType.ADD_TYPE,
      title: "这是 ADD_TYPE action",
      value,
    };
  };
  ```


##### reducer

```
import * as actionType from "../actionType";
const initState = {
  title: "默认值",
};
export const reducer = (state = initState, action) => {
  let newState = {};
  switch (action.type) {
    case actionType.ADD_TYPE:
      newState = Object.assign({}, state, action);
      return newState;
    default:
      return state;
  }
};
```

#### React-Redux

##### Provider

> 用于包裹整个结构，让每一层级的组件都能够获取到store

```
<Provider store={store}>
  <div>
    <ComA></ComA>
    <ComB></ComB>
  </div>
</Provider>
```

##### connect

```
class ComA extends React.Component {}
export default connect(mapStateToProps, mapDispatchToProps)(ComA)

// mapStateToProps和mapDispatchToProps是react-redux调用的，参数也是react-redux传的
// mapStateToProps
function mapStateToProps(state) {
	return state
}

// mapDispatchToprops
function mapDispatchToprops(dispatch) {
	// dispatch里面的add是action里面定义的add
	add: value => dispatch(add(value))
}

// mapDispatchToprops简写
let mapDispatchToprops = {
	add
}
```

#### Redux-toolkit  (RTK)

```
npm i @reduxjs/toolkit
```

```
import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
 	name: 'counter', // 命名空间，在调用action的时候会默认的设置为action的前缀
 	// 初始值
 	initialState: {
 		count: 1,
 		title: 'redux toolkit pre',
  	},
     // 这里的属性会自动的导出为actions，在组件中可以直接通过dispatch进行触发
     reducers: {
        increment(state, { payload }) {
            state.count = state.count + payload.step; // 内置了immutable
        },
        decrement(state) {
            state.count -= 1;
        },
      },
});

// 导出actions
export const { increment, decrement } = counterSlice.actions;

// 内置了thunk插件，可以直接处理异步请求
export const asyncIncrement = (payload) => (dispatch) => {
     setTimeout(() => {
     dispatch(increment(payload));
      }, 2000);
};

export default counterSlice.reducer; // 导出reducer，在创建store时使用到
```

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './store';

ReactDOM.render(
	<Provider store={store}>
 		<App />
	</Provider>,
 	document.getElementById('root')
);
在组件内部，使用useState和useDispatch可以直接获取state数据与dispatch方法
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, asyncIncrement } from './store/features/counterSlice'; // 引入actions

function App() {
     const { count } = useSelector((state) => state.counter);
     const dispatch = useDispatch();
     return (
         <div className='App'>
             <button
                 onClick={() => {
                    dispatch(increment({ step: 2 })); // dispatch派发action
                 }}
             >
                {count}
             </button>
            <hr />
             <button
                onClick={() => {
                    dispatch(asyncIncrement({ step: 1 }));
                }}
              >
                  {count}
              </button>
        </div>
  );
}

export default App;
```



#### Mobx-redux

## reactHooks

> 在函数组件中使用state，生命周期

- 只能用于函数组件或自定义的钩子函数中
- 只能直接在函数组件中使用，函数组件的方法中不行

### 常用Hooks

#### useState

`const [state, setState] = useState(initialState);`

返回一个state，以及更新state的函数

在初始渲染期间，返回的状态 (`state`) 与传入的第一个参数 (`initialState`) 值相同。

**注意：**

1. 如果你的更新函数返回值与当前 state 完全相同，则随后的重渲染会被完全跳过。

2. 与 class 组件中的 `setState` 方法不同，`useState` 不会自动合并更新对象

   [useReducer](#useReducer) 是另一种可选方案，它更适合用于管理包含多个子值的 state 对象。

#### useEffect

`useEffect(didUpdate);`

> *Effect Hook* 可以让你在函数组件中执行副作用操作

> 在函数组件主体内（这里指在 React 渲染阶段）改变 DOM、添加订阅、设置定时器、记录日志以及执行其他包含副作用的操作都是不被允许的，因为这可能会产生莫名其妙的 bug 并破坏 UI 的一致性。

副作用操作的例子：

![image-20230201153745912](imgs/react/react-副作用.png)

```
const ThemeContext = React.createContext({
  theme: 'dark',
  toggle: () => {}, //向上下文设定一个回调方法
  clear: () => {}
});

function App() {
	const [theme, setTheme] = useState('dark');
	const toggle = () => setTheme(theme === 'dark' ? 'light' : 'dark');
	const clear = () => setTheme('');
	return (
		<ThemeContext.Provider value={{theme, toggle, clear}}>
            <Content />
          </ThemeContext.Provider>
    );
}

function Content() {
    const {toggle, clear, theme} = useContext(ThemeContext);
    const [count, setCount] = useState(0);
    if (!theme) setCount(1);
    return (
    	<Fragment>
    		<button onClick={toggle}>修改theme</button>
    		<button onClick={clear}>清空theme</button>
    	</Fragment>
    )
}

// 当theme被清空时，调用了setCount，再一次触发了重新渲染，会重新进入if判断，导致死循环
```

##### 可以作为类似于生命周期使用

- 第一个参数：函数，该函数内的逻辑视为`componentDidMount`；如果该函数有函数返回值，视为`componentWillUnmount`

```
// useEffect返回一个清除函数
useEffect(() => {
  // componentDidMount 
  const subscription = props.source.subscribe();
  return () => {
    // componentWillUnmount
    subscription.unsubscribe();
  };
});
```

- 第二个参数

1. 没有第二个参数：组件的初始化和更新都会执行

   ```
   useEffect(() => {
     // componentDidMount componentDidUpdate
     // ...
   });
   ```

2. 空数组：初始化调用一次之后不再执行，相当于componentDidMount

   ```
   // 解决上面的副作用
   // ...
   function Content() {
       const {
           toggle, clear, theme 
       } = useContext(ThemeContext);
       const [count, setCount] = useState(0);
       useEffect(() => {
           console.log('useEffect', count)
           if (!theme) setCount(1);
       });
       // ...
   }
   ```

   

3. 有一个值：初始化时和该值改变时会执行，相当于componentDidMount，componentDidUpdate

4. 有多个值：对比每个值，其中一个有变化时执行

#### useRef

`const refContainer = useRef(initialValue);`

##### 和createRef的区别

- createRef会在组件每次渲染的时候重新创建
- useRef只会在组件首次渲染时创建

##### 作用于普通组件时

作用于普通组件时，与createRef的用法是一样的

```
import { Input, Button } from 'antd';
import { useRef, createRef } from 'react';

import type { InputRef } from 'antd';

const RefDemo = () => {
  const inputEL = useRef<InputRef>(null);
  const inputEL2 = useRef<HTMLInputElement>(null);
  const inputEL3 = createRef<HTMLInputElement>();

  const getInput = () => {
    console.log('antd DOM', inputEL.current?.input?.value);
    console.log('原生 DOM', inputEL2.current?.value);
    console.log('createRef', inputEL3.current?.value);
  };

  return (
    <div>
      <p>antd Input：<Input ref={inputEL} style={{width: 167}} /></p>
      <p>原生 Input：<input type="text" ref={inputEL2} /></p>
      <p>createRef Input：<input type="text" ref={inputEL3} /></p>
      <p><Button onClick={getInput}>获取Input Value</Button></p>
    </div>
  );
};

export default RefDemo;
```

##### 调用子组件的方法/获取子组件

需要用到两个方法 `useImperativeHandle` 和 `forwardRef`

###### `forwardRef`

> 引用传递（Ref forwading）是一种通过组件向子组件自动传递 **引用ref** 的技术。对于应用者的大多数组件来说没什么作用。但是对于有些重复使用的组件，可能有用。例如某些input组件，需要控制其focus，本来是可以使用ref来控制，但是因为该input已被包裹在组件中，这时就需要使用Ref forward来透过组件获得该input的引用。

###### `useImperativeHandle`

> useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。
>
> 在大多数情况下，应当避免使用 ref 这样的命令式代码。
>
> useImperativeHandle 应当与 **forwardRef** 一起使用。

`useImperativeHandle(ref, createHandle, [deps])`

```
// 调用子组件的方法
import React, { useRef, useImperativeHandle,forwardRef } from 'react';
import ReactDOM from 'react-dom';

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));

  return <input ref={inputRef} type="text" />
});

const App = props => {
  const fancyInputRef = useRef();

  return (
    <div>
      <FancyInput ref={fancyInputRef} />
      <button
        onClick={() => fancyInputRef.current.focus()}
      >父组件调用子组件的 focus</button>
    </div>
  )
}

ReactDOM.render(<App />, root);
```

```
// 获取子组件
import React, { useRef,forwardRef } from 'react';
import ReactDOM from 'react-dom';

const FancyInput = forwardRef((props, ref) => (
	<input ref={ref} type="text" value={props.children}/>
));

const App = props => {
  const fancyInputRef = useRef();

  return (
    <div>
      <FancyInput ref={fancyInputRef}>hhtest</FancyInput>
    </div>
  )
}

ReactDOM.render(<App />, root);
```



### 其他Hooks

#### useReducer

[useState](#useState)的替代方案，在某些场景下，`useReducer` 会比 `useState` 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。并且，使用 `useReducer` 还能给那些会触发深更新的组件做性能优化，因为你可以向子组件传递 `dispatch` 而不是回调函数 。

使用：

```
import {useReducer} from 'react';

function App() {
    const reducer = (state, action) => {
        switch(action.type){
            case 'add':
                return state + 1;
            case 'sub':
                return state - 1;
        }
    };
    
    const [count, countDispath] = useReducer(reducer, 1);
    
    return (
        <div className="App">
            {count}
            <div>
                <button onClick={()=>countDispath({type:'sub'})}>-</button>
                <button onClick={()=>countDispath({type:'add'})}>+</button>
            </div>
        </div>
    );
}
```

#### useMemo

```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

##### React.memo

减少不必要的重新渲染，比如App->A->B，当App重新渲染时，A和B都会重新渲染。但B组件没有state、context、props，没有必要每次都重新渲染，此时可以用到`React.memo`方法

在B组件中使用，`React.memo(B)`

**useMemo和[useCallback](#useCallback)作用和用法是一样的**

#### useCallback

用来创建React中的回调函数，该回调函数仅在某个依赖项改变时才会更新

`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`。

- 第二个参数：不指定时，每次都会更新；指定时，其中某个变化时才会更新

```
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

可以解决[React.memo](#React.memo)的遗留问题，如果B组件中某个按钮点击触发了A组件的事件，A组件更新时，B组件仍然会更新

##### useMemo、useCallback的区别

- useCallback 和 useMemo 的区别

​	`useCallback`返回一个函数，当把它返回的这个函数作为子组件使用时，可以避免每次父组件更新时都重新渲染这个子组件；`seMemo`返回的的是一个值，用于避免在每次渲染时都进行高开销的计算。

- 什么时候用`useCallback`、`useMemo`
- 任何时候都用是一个好的习惯，但是大部分时间不用也没什么大问题。但是如果该函数或变量作为 props 传给子组件，请一定要用，避免子组件的非必要渲染

#### useContext

​	如果需要在组件之间共享状态，可以使用useContext()。和[Context.Consumer](#context对象)一样

```
//接收组件
function Button() {
	const {theme, toggle} = useContext(ThemeContext);
  	return (
        <button
          onClick={toggle} //调用回调
          style={{backgroundColor: theme}}
        >
          Toggle Theme
        </button>
  	);
}


// Context.Consumer
//接收组件
function Button() {
  return (
    <ThemeContext.Consumer>
      {({theme, toggle}) => (
        <button
          onClick={toggle} //调用回调
          style={{backgroundColor: theme}}>
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  );
}
```



## 源码分析

[#userState]: 
[#useState]: 