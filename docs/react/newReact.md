## React

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

  ​	子`componentWillReceiveProps` -->子`shouldComponentUpdate` --> 子`componentWillUpdate` --> 子`render` --> 子`componentDidUpdate` --> 

  父`componentDidUpdate`

- 父组件销毁

  父`componentWillUnmount` --> 

  ​	子`omponentWillUnmount` --> 子销毁 --> 

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

   **react18之前**：在异步函数中是同步的，在同步函数中是异步的

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
           // new type(props);
       } else {
           // 函数组件
           render(type(props), container);
       }
   }
   ```

## Hooks

## React-Router

## Redux