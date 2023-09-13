##   React

### 安装

- 安装脚手架

`npm install create-react-app -g`

- 创建项目

  - js项目

    `create-react-app my-project`

  - ts项目

    `create-react-app my-project --template typescript`

- 项目初始文件删减

![image-20230724164753392](/notes/imgs/react/react初始化目录.png)

​	删减之后

![image-20230724165700273](/notes/imgs/react/react初始化目录删减.png)

- 暴露脚手架配置

  `yarn eject`

  **该操作不可逆，且运行之前必须先把代码提交到git【防止暴露后的代码覆盖本地代码】**

  ![image-20230724165940168](/notes/imgs/react/eject不可逆.png)

- 配置路径别名

  - 暴露脚手架后，在`config/webpack.config.js`中修改`alias`

    ```json
    alias: {
        // ...
        ...(isEnvProductionProfile && {
            // ...
            // 新增别名配置
            '@': path.resolve(__dirname, '../src')
        }),
    }
    ```

  - 安装carco `npm i -D @craco/craco`

    1. 在项目根目录创建 craco 的配置文件：craco.config.js，并在配置文件中配置路径别名

       ```js
       // carco.config.js
       const path = require('path')
        
       module.exports = {
         // webpack 配置
         webpack: {
           // 配置别名
           alias: {
             // 约定：使用 @ 表示 src 文件所在路径
             '@': path.resolve(__dirname, 'src')
           }
         }
       }
       ```

    2. 修改package.json中的脚本命令

       ```json
       // 将 start/build/test 三个命令修改为 craco 方式
       "scripts": {
         "start": "craco start",
         "build": "craco build",
         "test": "craco test",
         "eject": "react-scripts eject"
       }
       ```

  - 别名路径提示

    在tsconfig.json配置文件中新增

    ```json
    {
      "compilerOptions": {
        "baseUrl": "./",
        "paths": {
          "@/*": ["src/*"]
        }
      }
    }
    ```

### 创建一个项目

```tsx
import ReactDOM from 'react-dom/client';
import '@/assets/css/index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// 只能有一个根节点
root.render(
    <div>
        HHTEST
    </div>
);
```

### 多页面配置

**运行eject命令之后**

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

### JSX

> JavaScript and XML

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

7. 布尔类型、Null、Undefined将会被忽略

   以下的JSX表达式渲染结果相同

   ```
   // 1
   <div />
   
   // 2
   <div></div>
   
   // 3
   <div>{null}</div>
   
   // 4
   <div>{undefined}</div>
   
   // 5
   <div>{true}</div>
   
   // 6
   <div>{false}</div>
   ```

8. 数据是一个数组时，React可以拿到值进行展示，但如果是一个对象，只能拿到key值，无法进行展示

   ![image-20210322141300829](/notes/imgs/react/object无法作为child.png)

9. 给元素设置样式

   1. style

      ```tsx
      <h2 style={{ color: 'red', fontSize: '18px' }} />
      ```

   2. 类名：在JSX中需要使用`className`

### 组件化开发

#### 插槽

##### 普通插槽

> 父组件在子组件标签中传入元素

```tsx
// 父组件
export default function TestP() {
    return (
        <TestC>
            <p>Hello</span>
            <p>World</span>
        </TestC>
    )
}

// 子组件
// 通过props.children拿到父组件传入的元素
export default function TestC(props) {
    return (
        <>
            <div>子组件内容</div>
            {props.children}
        </>
    )
}
```

##### 具名插槽

> 父组件通过props属性向子组件传递元素

```tsx
// 父组件
export default function TestP() {
    const title = <h2>我是标题</h2>;
    const content = <p>我是内容</p>;
    <TestC title={title} content={content} />
}

// 子组件
export default function TestC(props) {
    return (
        <>
            {props.title}
            <div>子组件内容</div>
            {props.content}
        </>
    )
}
```

#### 函数组件

> 函数组件接收一个单一的 `props` 对象并返回了一个React元素

**函数组件的每一次更新都是将函数重新执行**

```tsx
// Test.tsx
export default function Test() {
    return (
        <div>Component Test</div>
    )
}

// Index.tsx
import ReactDOM from 'react-dom/client';
import Test from '@/components/Test';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <>
        <div>Index Page</div>
        <Test />
    </>
);
```

#### 类组件

```tsx
import React, { Component } from 'react'

export default class ClassTest extends Component {
  render() {
    return (
      <div>ClassTest</div>
    )
  }
}
```

##### Component 和 PureComponent的区别

PureComponent自带通过props和state的**浅对比**来实现 shouldComponentUpate()，而Component没有。

因为`PureComponent`是浅对比可能会因深层的数据不一致而产生错误的否定判断，界面得不到更新。

> 如果定义了 shouldComponentUpdate()，无论组件是否是 PureComponent，它都会执行shouldComponentUpdate结果来判断是否 update。如果组件未实现 shouldComponentUpdate() ，则会判断该组件是否是 PureComponent，如果是的话，会对新旧 props、state 进行 shallowEqual 比较，一旦新旧不一致，会触发 update。

#### Hooks组件

> 在函数组件基础上，使用hooks函数，让函数组件可以拥有状态和生命周期

### 生命周期

![image-20230725155314609](/notes/imgs/react/生命周期.png)

#### 父子组件嵌套深度优先

父组件在操作中，遇到子组件，一定是把子组件处理完，父组件才能继续处理

- 初次渲染：

  父`render` -->

  ​		子`componentWillMount` --> 子`render` --> 子`componentDidMount` --> 

  父`componentDidMount`

- 父组件更新：

  父`shouldComponentUpdate` --> 父`componentWillUpdate` --> 父`render` --> 

  ​		子`componentWillReceiveProps` -->子`shouldComponentUpdate` --> 子`componentWillUpdate` --> 子`render` --> 子`componentDidUpdate` --> 

  父`componentDidUpdate`

- 父组件销毁

  父`componentWillUnmount` --> 

  ​		子`omponentWillUnmount` --> 子销毁 --> 

  父销毁

### 三大核心属性

#### props

- 为props设置默认值

  ```tsx
  export default function Test(props) {
      return (
          <>
              <div>Component Test</div>
          	<h2>{props.title}</h2>
          </>
      )
  }
  
  Test.defaultProps = {
      title: 'msg'
  }
  ```

- 设置prop类型，需要安装 prop-types 插件

  ```tsx
  import PropTypes from 'prop-types';
  export default function Test(props: {title: string}) {
      return (
          <div>Component Test:{props.title}</div>
      )
  }
  
  Test.defaultProps = {
      title: 'msg'
  }
  
  Test.propTypes = {
      title: PropTypes.string.isRequired
  }
  ```

#### state

##### setState

1. `this.setState(partialState[, callback])`

   - `partialState`: 修改的状态
   - `callback`: 在状态更改/视图更新完毕后触发执行 （发生在`componentDidUpdate`之后）

2. 在React18中，setState在**任何地方**执行，都是异步操作。基于异步操作，实现状态的批处理（可以减少视图更新的次数）。

   ![image-20230725174637558](D:/notes/imgs/react/批处理.png)

   ```tsx
   export default class ClassTest extends Component {
       state = {
           x: 1,
           y: 1,
           z: 1
       }
   
       handleClick = () => {
           // 视图更新一次
           this.setState({x: 2});
           this.setState({y: 2});
           this.setState({z: 2});
           // 结果：1 1 1，先打印这一行再打印RENDER
           console.log(this.state.x, this.state.x, this.state.x);
           
           // 视图更新一次
           /*
           setTimeout(() => {
               this.setState({x: 2});
               this.setState({y: 2});
               this.setState({z: 2});
               // 结果：1 1 1，先打印这一行再打印RENDER
               console.log(this.state.x, this.state.x, this.state.x);
   		});
           */
       }
   
       render() {
           console.log("======RENDER=====")
           return (
               <div onClick={this.handleClick}>ClassTest{this.state.x}-{this.state.y}-{this.state.z}</div>
           )
       }
   }
   ```

   **react18之前**：在异步函数中是同步的，在同步函数中是异步的

   ```tsx
   export default class ClassTest extends Component {
       state = {
           x: 1,
           y: 1,
           z: 1
       }
   
       handleClick = () => {
           // 视图更新一次
           this.setState({x: 2});
           this.setState({y: 2});
           this.setState({z: 2});
           // 结果：1 1 1，先打印这一行再打印RENDER
           console.log(this.state.x, this.state.x, this.state.x);
           
           // 视图更新三次
           /*
           setTimeout(() => {
               this.setState({x: 2});
               this.setState({y: 2});
               this.setState({z: 2});
               // 结果：2 2 2，打印三次RENDER之后打印这一行
               console.log(this.state.x, this.state.x, this.state.x);
   		});
           */
       }
   
       render() {
           console.log("======RENDER=====")
           return (
               <div onClick={this.handleClick}>ClassTest{this.state.x}-{this.state.y}-{this.state.z}</div>
           )
       }
   }
   ```

3. 退出批处理：`flushSync`

   > 在某些场景下 我们可能不需要批处理状态更新, 此时我们需要用到 react-dom 提供的flushSync函数, 该函数需传入一个回调, 并且会同步刷新回调中的状态更新

   ```tsx
   flushSync(() => {
       this.setState({ x: 2, y: 2, z: 2});
   });
   console.log('=====flushSync', this.state); // { x: 2, y: 2, z: 2}
   this.setState({ x: 3, y: 3, z: 3});
   console.log(this.state);  // { x: 2, y: 2, z: 2}
   ```

   在函数组件中使用`useState`，遇到`flushSync`会更新一次状态，但之后打印的值没有变

   ```tsx
   import { useState, useEffect } from 'react';
   import { flushSync } from 'react-dom';
   
   export default function Test(props: any) {
       const [state, setState] = useState({count: 0})
       useEffect(() => {
           console.log("=========useEffect", state.count)
       })
       const handleClick = () => {
           flushSync(() => {
               setState({
                   count: 2
               });
           });
           console.log("=========flushAsync", state.count)
           setState({
               count: 3
           });
           setState({
               count: 4
           });
       }
       return (
           <>
               {props.titleWrap}
               <div onClick={handleClick}>Component Test: {props.title}</div>
               {props.content}
           </>
       )
   }
   
   // 点击后输出
   // =========useEffect 2
   // =========flushAsync 0
   // =========useEffect 4
   ```

4.  `this.setState((prevState) => {}, ()=>{})`

   第一个传参是函数时，参数为上一次的state，保存数据已经更改，但state更新/视图更新之前的数据

5. `this.setState` 和 `useState`中 `setState`的区别

   ```tsx
   // 类组件
   state = {
       x: 0
   }
   // 最终显示结果为 x: 1
   for (let i = 0; i < 20; i++) {
       this.setState({x: this.state.x + 1});
   }
   // 最终显示结果为 x: 20
   for (let i = 0; i < 20; i++) {
       this.setState((prevState: {x:number, y: number, z: number}) => {
           return {x: prevState.x + 1}
       });
   }
   
   // Hook组件
   const [x, setState] = useState(0);
   for (let i = 0; i < 20; i++) {
       setState({x: x + 1});
   }
   // 最终显示结果为 x: 20
   ```

#### ref

##### 受控组件和非受控组件

- 受控组件：基于修改数据/状态，让视图更新，达到需要的效果
- 非受控组件：基于ref获取DOM元素，操作DOM元素，实现需求和效果

#####    定义ref

```tsx
// 在类组件中,通过this.refs获取
// 在严格模式下会报错，不推荐使用
<input ref='inputRef' />
this.refs.inputRef

// createRef
this.inputRef = React.createRef();
<input ref={this.inputRef} />

// 回调
<input ref={ref => this.inputRef = ref} />

// hook
inputRef = useRef();
<input ref='inputRef' />
```

#### 设置ref的目的

- 标签：获取对应的DOM元素
- 类组件：获取子组件，后续可以获取子组件属性
- 函数组件：获取子组件内部的某个元素  (直接设置ref会报错，需要借助`forwardRef)`

#### forwardRef

> 父组件传入子组件`ref`属性指向子组件中的任意节点

- 没有使用`forwardRef`时，父组件传入子组件`ref`属性，此时`ref`指向的是**子组件本身**
- 函数组件不能定义`ref`，必须使用`forwardRef`

```tsx
// 父组件
const App = () => {
    const ref = useRef();
    return (
    	<div>
        	<FancyInput ref= {ref} />
        </div>
    )
}

// 子组件
// 传入的ref定义在哪，父组件中获取到的就是谁
const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  return <input ref={ref} type="text" />
});
```

### 事件

#### 合成事件

> React内部经过特殊处理，把各个浏览器的事件对象统一化后，构建的一个事件对象。

- React绑定事件时，返回的是合成事件【SyntheticBaseEvent】。

- 不能通过返回 `false` 的方式阻止默认行为。你必须显式的使用 `preventDefault` 。
- 可以通过 `nativeEvent` 获取浏览器内置的原生事件

#### 类组件绑定事件的几种方法

- 在构造函数中使用bind绑定this

  ```tsx
  <button onClick={this.handleClick}>
      
  // constructor
  this.handleClick = this.handleClick.bind(this);
  ```

- 在调用的时候使用bind绑定this

  ```tsx
  <button onClick={this.handleClick.bind(this)}>
  ```

- 在调用的时候使用箭头函数绑定this

  ```tsx
  <button onClick={() => this.handleClick()}>
  ```

- 函数定义时使用箭头函数

  ```tsx
  handleClick = () => {
  	// 这里的this是组件的this
  }
  ```

#### 事件流

在`React`的事件处理系统中，默认的事件流就是冒泡，如果希望以捕获的方式来触发事件的话，可以使用`onClickCapture`来绑定事件，也就是在事件类型后面加一个后缀`Capture`

- 18版本的事件流

​		![image-20230803100408769](/notes/imgs/react/react18事件流.jpg)

- 16版本的事件流

  ![image-20230803100724037](/notes/imgs/react/react16事件流.jpg)

#### 合成事件原理

1. React中的合成事件，都是基于事件委托处理的

   - 在React17及以后版本，都是委托给`#root`这个容器
   - 在17版本以前，都是委托给`document`容器的，而且**只做了冒泡阶段的委托**
   - 对于没有实现事件传播机制的事件，才是单独做的事件绑定 『例如：onMouseEnter/onMouseLeave』

2. 在组件渲染中，如果发现 JSX 元素属性中有 onXxx / onXxxCapture 这样的属性，不会给当前元素直接做事件绑定，只是把绑定的方法赋值给元素的相关属性

   - 对`#root`这个元素做事件委托

     ```js
     // 冒泡
     root.addEventListener('click', ev => {
         const path = ev.path;
         [...path].forEach(ele => {
             ele.onClick && ele.onClick();
         });
     }, false);
     
     // 捕获
     root.addEventListener('click', ev => {
         const path = ev.path;
         [...path].reverse.forEach(ele => {
             ele.onClickCamputer && ele.onClickCamputer();
         });
     }, true);
     ```
     
   - 对`document`的冒泡阶段做了事件委托
   
     ```js
     // 冒泡
     document.addEventListener('click', ev => {
         const path = ev.path;
         // 捕获阶段事件处理
         [...path].reverse.forEach(ele => {
             ele.onClickCamputer && ele.onClickCamputer();
         });
     	// 冒泡阶段事件处理
         [...path].forEach(ele => {
             ele.onClick && ele.onClick();
         });
     }, false);
     ```

### 通信机制
#### 父子

- 父->子：**props**

  ![父传子](/notes/imgs/react/父传子.jpg)

- 子->父：父组件将一个函数作为props传给子组件，子组件通过this.props.xxx(args)传值，与vue中的$emit类似

  ![子传父](/notes/imgs/react/子传父.jpg)

#### 兄弟

兄弟组件之间的传值，是通过父组件做的中转 ，流程为：**组件A** -- `传值` --> **父组件** -- `传值` --> **组件B**

![兄弟组件传值](/notes/imgs/react/兄弟组件传值.jpg)

#### 跨级

##### props层层传递

​	组件嵌套过深时，不建议使用这种方式

##### Pubsub

```tsx
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

##### context

- 局限性

  - 在组件树中，如果中间某一个组件 ShouldComponentUpdate 中 return false ，会阻碍 context 的正常传值，导致子组件无法获取更新。
  - 组件本身 extends React.PureComponent 也会阻碍 context 的更新。
  
  ```tsx
  // ThemeContext.ts
  import React from 'react';
  epoxrt default React.createContext();
  
  // App.tsx
  import ThemeContext from 'ThemeContext';
  import Child from './components/Child';
  export default const App = () => {
      const globalData = {
          name: 'hh'
      }
      return (
          <ThemeContext.Provider value={globalData}><Child /></ThemeContext.Provider>
      )
  }
  
  // Child.tsx
  import ThemeContext from '@/ThemeContext'
  import { useContext } from 'react';
  
  export default function Context() {
    /* return (
      <ThemeContext.Consumer>
          {value => (
              <div>{value.name}</div>
          )}
      </ThemeContext.Consumer>
    )*/
      const {name} = useContext(ThemeContext);
    	return (
          <div>{name}</div>
    	);
  }
  ```

##### [store](#Redux) 

### 	JSX底层渲染机制

1. 将JSX语法编译为虚拟DOM对象 [virtualDOM]

   - 基于 `babel-preset-react-app` 把 JSX 编译为 `React.createElement()`

   - 执行`createElement`方法转为 virtualDOM

     ![image-20230724175957192](/notes/imgs/react/createElement.png)

     ```js
     // 简单模拟一个createElement
     const createElement = (component, props, ...children) => {
         const virtualDOM = {
             $$typeof: Symbol('react.element'),
             key: null,
             ref: null,
             type: null,
             props: {}
         };
     
         virtualDOM.type = component;
         props && (virtualDOM.props = {
             ...props,
         });
         virtualDOM.props.children = children;
         return virtualDOM;
     }
     ```

     

2. 把构建的virtualDDOM渲染为真实DOM （第一次渲染是直接从vurtualDOM -> 真实DOM，后期视图更新时，通过Diff算法计算出补丁包）

   - v16: `ReactDOM.render(<></>, document.getElementById('root'))`
   - v18: `ReactDOM.createRoot(document.getElementById('root')).render(<></>)`

   ```js
   const each = (obj, cb) => {
       Reflect.ownKeys(obj).forEach(key => cb(obj[key], key));
   }
   
   const toLow = (str) => {
       return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
   }
   
   // 简单模拟一个render
   const render = (virtualDOM, container) => {
       const { type, props } = virtualDOM;
       if (typeof type === 'string') {  // 如果是标签名
           // 创建标签
           const dom = document.createElement(type);
           // 给dom元素加属性
           each(props, (value, key) => {
               if (key === 'className') {
                   dom.className = value;
               } else if (key === 'style') {
                   each(value, (styleValue, styleKey) => {
                       dom.style[toLow(styleKey)] = styleValue;
                   });
               } else if (key === 'children') {
                   // 子节点处理
                   const children = typeof value === 'string' ? [value] : value;
                   children.forEach(child => {
                       if (typeof child === 'string') {
                           dom.appendChild(document.createTextNode(child))
                       } else {
                           render(child, dom);
                       }
                   });
               } else {
                   dom.setAttribute(key, value);
               }
           });
           container.appendChild(dom);
       } else if (/^class\s/.test(Function.prototype.toString.call(type)){
           // 类组件
           render(new type(props).render(), container);
       } else {
           // 函数组件
           render(type(props), container);
       }
   }
   ```



## Hooks

**所有的Hook函数都只能在函数组件中使用，在类组件中会报错**

### 常用Hook

#### `useState` / `useReducer`  状态管理

##### `useState`

返回一个state，以及更新state的函数：`const [state, setState] = useState(initialState);`

**注意：**

1. 如果你的更新函数返回值与当前 state 完全相同，则随后的重渲染会被完全跳过。

2. 与 class 组件中的 `setState` 方法不同，`useState` 不会自动合并更新对象.『官方建议多个值用多个`useState定义`』

```js
// 简单实现一个useState
let _state;
function useState(initialState) {
    if (typeof _state === 'undefined') _state = typeof initialState === 'function' ? initialState() : initialState;
    var setState = function (value) {
        if (Object.is(value)) return;
        _state = value;
        // 通知视图更新
    }
    return [_state, setState];
}
```

##### `useReducer`

`useState`的替代方案。

在某些场景下，`useReducer` 会比 `useState` 更适用，例如 state 逻辑较复杂且**包含多个子值**，或者下一个 state 依赖于之前的 state 等。并且，使用 `useReducer` 还能给那些会触发深更新的组件做性能优化，因为你可以向子组件传递 `dispatch` 而不是回调函数 。

```js
import {useReducer} from 'react';

function App() {
    const reducer = (state, action) => {
        /* switch(action.type){
            case 'add':
                return state + 1;
            case 'sub':
                return state - 1;
        } */
        return {
            ...state,
            ...action
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

#### `useEffect` / `useLayoutEffect`  周期函数

- 第一个参数：函数，
  - 该函数内的逻辑视为『`componentDidMount`』；
  - 如果该函数有函数返回值，视为『`componentWillUnmount`』


```js
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

第二个参数

- 没有第二个参数：组件的初始化和更新都会执行。『componentDidMount`  && `componentDidUpdate`』

- 空数组：初始化调用一次之后不再执行。『componentDidMount`』

- 有一个值：初始化时和该值改变时会执行。『`componentDidMount` && `componentDidUpdate`』

- 有多个值：对比每个值，其中一个有变化时执行。『`componentDidMount` && `componentDidUpdate`』

##### `useEffect` / `useLayoutEffect` 的区别

`useEffect `的函数会在组件渲染到屏幕之后执行。`useLayoutEffect`则是在DOM结构更新后、渲染前执行，相当于有一个防抖效果

```js
// 在点击div的时候将value设为0，但在useEffect中又将其设为一个随机值。这样相当于value这个状态快速连续的变更了两次

import { useState, useEffect, useLayoutEffect } from "react";
import * as ReactDOM from "react-dom";

function App() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (value === 0) {
      setValue(10 + Math.random() * 200);
    }
  }, [value]);
  console.log("render", value);
  return (
    <div onClick={() => setValue(0)}>value: {value}</div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

`useEffect`一共执行了两次渲染，执行顺序：

1. click setState （value）
2. 虚拟 DOM 设置到真实 DOM 上
3. 渲染
4. 执行useEffect回调
5. setState（value）
6. 虚拟 DOM 设置到真实 DOM 上
7. 渲染

`useLayoutEffect`一共执行了**一次**渲染，执行顺序：

1. click setState （value）
2. 虚拟 DOM 设置到真实 DOM 上
3. 执行useLayoutEffect回调
4. setState （value）
5. 虚拟 DOM 设置到真实 DOM 上
6. 渲染

#### `useRef`  使用Ref
`const refContainer = useRef(initialValue);`

##### 和createRef的区别

- createRef会在组件每次渲染的时候重新创建
- useRef只会在组件首次渲染时创建

##### 作用于普通组件时

作用于普通组件时，与createRef的用法是一样的

```tsx
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

```tsx
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

```tsx
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

#### `useContext`
如果需要在组件之间共享状态，可以使用useContext()。

```tsx
// const ThemeContext = React.createContext();

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

// 等价于
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


### 额外的Hook

#### `useMemo`

`useMemo(callback, [依赖项])`

- 当某段逻辑中的数据在本次渲染没有变化时，不执行该逻辑

```js
// 类似于vue中的computed
const data = useMemo(() => {
    return x + y;
}, [x, y])
```

- 避免不必要的渲染

- 缓存和复用组件的子树：在复杂的组件结构中，某些子组件的渲染结果可能是固定的，不依赖于父组件的状态或属性。使用 `useMemo` 可以缓存和复用这些子组件的渲染结果，避免不必要的渲染和协调过程。『`React.memo`』

  ```tsx
  import { memo, useState } from "react";
  
  // 每次点击按钮都会执行渲染
  const Child = () => {
      console.log("=====RENDER Child");
      return (
          <div>Child</div>
      )
  }
  
  // 只有msg变化的时候才会执行渲染
  const MemoChild = memo((props: any) => {
      console.log("=====RENDER MemoChild");
      return (
          <div>MemoChild{props.msg}</div>
      )
  });
  
  export default function Memo() {
      const [count, setCount] = useState(0);
      const [msg, setMsg] = useState('hello');
      const handleClick = (type: string) => {
          type === 'count' && setCount(count+1);
          type === 'msg' && setMsg(msg + 'hh');
      }
    return (
      <>
          <button onClick={() => handleClick('count')}>{count}</button>
          <button onClick={() => handleClick('msg')}>{msg}</button>
          <Child />
          <MemoChild msg={msg} />
      </>
    )
  }
  ```

#### `useCallback`

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

- 组件第一次渲染，useCallback执行，创建一个函数“callback”，赋值给`memoizedCallback`

- 组件后续每一次更新、判断依赖的状态值是否改变，如果改变，则重新创建新的函数堆，赋值给`memoizedCallback`; 但是如果依赖的状态没有更新与或者没有设置依赖，则`memoizedCallback`获取的一直是第一次创建的函数堆，不会创建新的函数出来
- 或者说，基于useCallback，可以始终获取第一次创建函数的堆内存地址(或者说函数的引用)

##### useMemo、useCallback的区别

`useCallback`返回一个函数，当把它返回的这个函数作为子组件使用时，可以避免每次父组件更新时都重新渲染这个子组件；

`useMemo`返回的的是一个值，用于避免在每次渲染时都进行高开销的计算。

### 自定义Hook

使用自定义Hook可以将某些组件逻辑提取到可重用的函数中

```js
// 支持对象部分状态修改的useState
const useHHState = (initiaValue) => {
    const [state, setState] = useState(initiaValue);
    const setHHState = (value) => {
        setState({
            ...state,
            ...value
        })
	}
    return [state, setHHState];
}
```

## 样式私有化

### CSSModules

```tex
// Test.module.scss
.test {} // 最终会显示为 Test_test__hash【唯一编码】

// Test.tsx
const Test = () => (
	<div className={Test.test}></div>
)
```

### ReactJSS

```shell
yarn add react-jss
```

```tsx
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
    list: {
        background: 'lightblue',
        width: '300px'
    },

    item: {
        fontSize: '20px',
        color: 'white',
        '&:hover': {
            color: 'green'
        }
    }
});

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export default function Jss() {
    const {list, item} = useStyles();
    return (
        <div className={list}>
            {arr.map((num: number) => (<div className={item}>{num}</div>))}
        </div>
    )
}

// 编译结果
/*<div class="list-B-2-1'>
    <div class="item-0-2-2">1</div>
    <div class="item--2-2">2</div>
    <div class="item-B-2-2">3</div>
    <div class="item-0-2-2">4</div>
    <div class="item-0-2-2">5</div>
    <div class="item-0-2-2">6</div>
    <div class="item-0-2-2">7</div>
    <div class="item-0-2-2">8</div>
    <div class="item-0-2-2">9</div>
</div>*/
```

基于createUseStyles方法，构建组件需要的样式; 返回结果是一个自定义Hook函数

对象中的每个成员就是创建的样式类名

+ 可以类似于less等预编译语言中的“嵌套语法”，给其后代/伪类等设置样式!!自定义Hook执行，返回一个对象，对象中包含:
+ 我们创建的样式类名，作为属性名
+ 编译后的样式类名唯一，作为属性值{box:'box-0-2-1'，title:'title-0-2-2'，list:list-0-2-3']

### styled-components

```sh
yarn add styled-components
```

```tsx
import styled from 'styled-components';

const TestStyle = styled.div`
	.list {
        background: lightblue;
        width: 300px;
    },

    .item {
        font-size: 20px;
        color: white;
        &:hover {
            color: green;
        }
    }
 `
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export default function Test() {
    return (
        <TestStyle>
            <div className="list">
                {arr.map((num: number) => (<div className="item" key={num}>{num}</div>))}
            </div>
        </TestStyles>
    )
}
// 编译结果
/*<div class="sc-gswPWN gjcGrf">
    <div class="list">
        <div class="item">1</div>
        <div class="item">2</div>
        <div class="item">3</div>
        <div class="item">4</div>
        <div class="item">5</div>
        <div class="item">6</div>
        <div class="item">7</div>
        <div class="item">8</div>
        <div class="item">9</div>
    </div>
</div>*/
```



## DIFF和Fiber算法

当组件更新时

- 会根据最新的数据，重新把**整个jsx**编译为新的虚拟DOM『从头编译到尾，即使有些地方的数据没有发生变化』。
- 但是不会把所有的虚拟DOM全部编译为真实DOM，进行**DIFF算法**的对比后，将差异的部分重新编译后渲染

### DIFF算法

在`React16`及以前，新老虚拟DOM对比

在之后，老的DOM会构建出`Fiber`链表，拿最新的虚拟DOM和链表做对比

优化原则

- 深度优先

- 只能同级比较

- 不同类型的元素，直接销毁老结构，创建新结构：开发中尽量减少层级结构的改变

- 可以通过key标识移动的元素『除非我们非常清楚的知道索引不会变化，否则不要用索引作为 key 值』

  ![image-20230913160350019](/notes/imgs/react/diff.png)

  更新销毁的性能不一定会低，*当用索引`index`作为`key`时，每次都只进入第一轮循环，更新的DOM会更多*

- 处理顺序： 删除 -> 更新 -> 移动 -> 新增
