## Redux

### 基础

#### store

![image-20201222150802906](/notes/imgs/react/image-20201222150802906.png)

```js
import { createStore } from "redux";
import { reducer } from "./reducer"

store = createStore(reducer)
```

#### action

- actionType

  ```js
  export const ADD_TYPE = "ADD_TYPE";
  ```

- index

  ```js
  import * as actionType from "./actionType";
  
  export const add = (value) => {
    return {
      type: actionType.ADD_TYPE,
      title: "这是 ADD_TYPE action",
      value,
    };
  };
  ```


#### reducer

```js
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

### 使用

```js
// store可以通过context传递给子组件

import {
  add
} from './actions'

// 打印初始状态
console.log(store.getState())

// 每次 state 更新时，打印日志
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

// 发起action
store.dispatch(add('Learn about actions'))

// 取消监听
unsubscribe();
```

**Redux中的Store修改之后，React不会自动监听，也就是说页面不会重新渲染，需要手动进行监听**

```js
// 一般在最外层父组件中进行监听
componentDidMount(){
	store.subscribe(()=>{
		this.setState({})
	})
}
```

### Demo

**ThemeContext**

```ts
import React from 'react';
const obj:any = null;
export default React.createContext(obj);
```

**Index.tsx**

```tsx
import Context from './Context';
import ThemeContext from '@/ThemeContext';
import store from '@/store';
export default function Index() {
    return (
        <ThemeContext.Provider value={store}><Context /></ThemeContext.Provider>
    )
}
```

**Child.tsx**

```tsx
import ThemeContext from '@/ThemeContext'
import { useContext, useState } from 'react'
import { add } from '@/store/vote/action';
import { prociseAction } from '@/store/person/action';

export default function Context() {
    const store = useContext(ThemeContext);
    const {vote: {count}, person: {info}} = store.getState();
    
    const [, forceUpdate] = useState(0);
    useEffect(() => {
        const unsubscribe = subscribe(() => {
            forceUpdate(+new Date());
        });
        return unsubscribe;
    }, [])
    
  	return (
        <>
            <div>=================redux============</div>
            <div>{count}</div>
            <div>{info ? info.name : 'info为null'}</div>
            <div onClick={() => {
                store.dispatch(add());
                store.dispatch(prociseAction({name: 'hh-hh'}));
            }}>change store state</div>
        </>
  	);
}
```

### 项目中的拆分和合并

![image-20230807143038909](/notes/imgs/react/redux多个reducer.png)

**创建store**

```js
// 合并reducer
import { combineReducers } from 'redux';
import voteReducer from './vote/reducer';
import personReducer from './person/reducer';

export default combineReducers({
    vote: voteReducer,
    person: personReducer
})

// 创建store
import { createStore } from 'redux';
import reducer from '@/store';
const store = createStore(reducer);
```

**派发任务**

**如果派发任务不指定执行哪个reducer，dispatch时会去每个reducer中找一个，执行所有和派发行为标识匹配的逻辑执行一次**

在 `actionType` 文件中定义所有的行为标识，在`action` 和 `reducer`文件中都去该文件中获取

```js
export const ADD_TYPE = "ADD_TYPE";
```

```js
import * as TYPES from './actionType'
export const reducer = (state, action) => {
  switch (action.type) {
    case actionType.ADD_TYPE:
          // ...
          break;
    default:
      return state;
  }
};
```

```js
import * as actionType from "./actionType";
export const add = (value) => {
  return {
    type: actionType.ADD_TYPE,
    value,
  };
};
```

### 底层原理

```ts
export const createStore = (reducer: any) => {
    if (typeof reducer !== 'function') throw new TypeError('createStore param [reducer] must be a function');
    // 公共状态
    let state: any = undefined;
    // 事件池
    const listeners: any[] = [];

    // 获取state，直接返回
    const getState = () => state;
    
    // 向事件池中加入让组件更新的方法
    const subscribe = (listener: any) => {
        if (typeof listener !== 'function') throw new TypeError('Redux function [dispatch] param must be a function');
        // 去重
        if (!listeners.includes(listener)) listeners.push(listener);
        
        // 返回一个从事件池中，移除方法的函数
        return function unsubscribe() {
            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        }
    };
    
    // 派发任务通知 reducer 执行
    const dispatch = (action: any) => {
        // 执行reducer，替换公共状态
        state = reducer(state, action);
        // 执行事件池中的方法
        listeners.forEach(listener => listener());

        return action;
    }

    // 默认进行一次didpatch派发，目的是给公共容器中的状态赋初始值
    dispatch({type: Symbol()});

    return {
        getStatus,
        dispatch,
        subscribe
    };
}
```

```ts
export const combineReducers: (reducers: {[key: string]: any}) => any = (reducers) => {
    const reducerKeys = Object.keys(reducers)

    // dispatch时调用的方法
    return function combine(state: {[key: string]: any} = {}, action: any) {
        let nextState: any = {};
        // 去执行每个reducer中的逻辑
        reducerKeys.forEach(key =>{
            const reducer = reducers[key];
            // state的格式为{a: reducerA中的数据, b:reducerB中的数据, ...}
            if (typeof reducer === 'function') nextState[key] = reducer(state[key], action);
        });
        return nextState;
    }
}
```

### `Redux`中间件

#### 中间件的触发时机

Redux 中间件执行时机：在 dispatching action 和 到达 reducer 之间。

- 没有中间件：dispatch(action) => reducer

![redux中间件](/notes/imgs/react/edux中间件之前.png)

- 使用中间件：dispatch(action) => 执行中间件代码 => reducer


![redux中间件](/notes/imgs/react/edux中间件之后.png)

#### 使用

```ts
export default createStore(reducer, applyMiddleware(reduxLogger))
```

#### 常用的中间件

`redux-logger`：每一次派发，在控制台输出派发日志『内容：之前的状态、派发的行为、派发后的状态』

![image-20230825160228794](/notes/imgs/react/redux-logger.png)

`redux-thunk` / `redux-promise`：实现异步派发 

```ts
const delay = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null)
        }, 1000);
    });
}
// redux-thunk: ！！！需要修改action的写法
export const thunkAction = (info: any) => {
    return async(dispatch: any) => {
        await delay();
        // thunk的第二次派发是手动触发的
        dispatch({
            type: 'login',
            info
        })
    }
}

// redux-promise
export const promiseAction = async (info: any) => {
    await delay();
    // promise的第二次派发是自动触发的
    return {
        type: 'login',
        info
    }
}
```

![image-20230825163604308](/notes/imgs/react/redux-thunk.png)

![image-20230825164053336](/notes/imgs/react/redux-promise.png)

`redus-saga`



## React-Redux

> 简化`redux`的操作

### 使用

#### 入口文件 index.tsx

```tsx
import { Provider } from "react-redux"
import store from '@/store';
import Child from './Child'

export default function ReactRedux() {
  return (
    <Provider store={store}>
        <Child />
    </Provider>
  )
}
```

#### Child.tsx

子组件获取store的方法`connect(mapStateToProps, mapDispatchToProps)(要渲染的组件)`

* mapStateToProps：可以获取到redux中所有模块的公共状态

* mapDispatchToProps：把需要派发的任务当作属性传递给组件

  ```js
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

```tsx
import { connect } from 'react-redux';

import { connect } from 'react-redux';
import { add } from '@/store/vote/action';
import { login } from '@/store/person/action';

/*
	state = {
		vote: {count:0},
		person: {info: null}
	}
*/

import { connect } from 'react-redux';
import { add } from '@/store/vote/action';
import { login } from '@/store/person/action';

const Child = (props: any) => {
    const {add, login, vote: {count}, person: {info}} = props;
    console.log("========RENDER=======")
    return (
        <>
            <div>=================react-redux============</div>
            <div>{count}</div>
            <div>{info ? info.name : 'info为null'}</div>
            <div onClick={() => {
                add();
                login({name: 'hh-hh'});
            }}>change store state</div>
        </>
    )
}

export default connect(
    (state) => state,
    {add, login}
)(Child);
```

### 底层原理

**内置一个全局上下文**

```js
import React, { useContext, useState, useEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux';

// 定义一个全局上下文
const Context = React.createContext({});

// Provider组件
export function Provider(props) {
    const { store, children } = props;
    return (<Context.Provider value={{ store }}>
        {children}
    </Context.Provider>)
}

// connect(mapStateToPros, mapDispatchToProps)(Component)
export function connect(mapStateToPros, mapDispatchToProps) {
    if (!mapStateToPros) mapStateToPros = () => ({});
    if (!mapDispatchToProps) mapDispatchToProps = (dispatch) => ({ dispatch });

    // Component 最终要渲染的组件
    return function currying(Component) {
        // HOC connect()(Component)执行后返回的组件
        return function HOC(props) {
            // 获取上下文中的store
            const { store } = useContext(Context);
            const { getState, dispatch, subscribe } = store;
           
            // 组件更新
            const [, forceUpdate] = useState(0);
            useEffect(() => {
                const unsubscribe = subscribe(() => {
                    forceUpdate(+new Date());
                });
                return unsubscribe;
            }, [])

            const state = getState();
            // useMomo做优化，只有state变化时更新stateProps
            const stateProps = useMemo(() => mapStateToPros(state), [state]);
            
            const dispatchProps = 
                  typeof mapDispatchToProps === 'function' ? 
                  	mapDispatchToProps(dispatch) : 
            		bindActionCreators(mapDispatchToProps, dispatch);
            /*
            	bindActionCreators方法将传入的对象 {add, login} 
            	转为
            	{
            		add: (count) => dispatch(add(count)),
            		login: (info) => dispatch(login(info))
            	}
            */

            return <Component
                {...props}
                {...stateProps}
                {...dispatchProps}
            ></Component >
        }
    }
}
```



## Redux-toolkit（RTK）

`Redux`中的 `createStore` 方法已弃用，解决方案：

1.  `import { legacy_createStore as createStore } from 'redux'`
2.  redux-toolkit

### 安装

```shell
npm i @reduxjs/toolkit
```

### 使用

#### 创建切片(reducer)

`createSlice`

```js
import {createSlice} from '@reduxjs/toolkit';

const vote = createSlice({
     // 命名空间，在调用action的时候会默认的设置为action的前缀
    name: 'vote',
    // 初始值
    initialState: {
        count: 1,
    },
    // 这里的属性会自动的导出为actions，在组件中可以直接通过dispatch进行触发
    reducers: {
        // 传递的数据都存在action.payload中
        increment(state, action) {
            const { payload } = action;
            state.count = state.count + payload.step; // 内置了immutable
        },
        decrement(state) {
            state.count -= 1;
        },
    },
})

// 导出actions
export const { increment, decrement } = vote.actions;

// 处理异步请求
export const asyncIncrement: any = (payload: any) => (dispatch: any) => {
    setTimeout(() => {
        dispatch(increment(payload));
    }, 2000);
};

export default vote.reducer; // 导出reducer，在创建store时使用到
```

#### 创建store

`configureStore`

```js
import {configureStore} from '@reduxjs/toolkit';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

import vote from './vote';

const store = configureStore({
    reducer: {
        vote
    },
    // 使用中间件，如果不指定任何中间件，默认集成redux-thunk
    // middleware: [],
    // 但是一旦设置，会整体替换默认值
    middleware: [reduxThunk, reduxLogger]
})

export default store;
```

#### 使用store

`useSelector`：获取公共状态

`useDispatch`：进行任务派发

```tsx
// Index.tsx
import { Provider } from 'react-redux';
import store from '../index';
import Child from './Child';

export default function index() {
  return (
    <Provider store={store}>
        <Child />
    </Provider>
  )
}

// Child.tsx
import { useSelector, useDispatch } from 'react-redux';
import {increment, decrement, asyncIncrement} from '../vote';

export default function Child() {
    const voteState = useSelector((state: any) => state.vote);
    const dispatch = useDispatch();
    return (
        <>
            <div>{voteState.count}</div>
            <button onClick={() => dispatch(increment(2))}>增加2</button>
            <button onClick={() => dispatch(asyncIncrement(1))}>异步增加1</button>
            <button onClick={() => dispatch(decrement())}>减少</button>
        </>
    )
}
```

![image-20230825175550150](/notes/imgs/react/rtk.png)



## Mobx

### 装饰器

#### 启用装饰器语法支持

*装饰器语法目前仍处于提案阶段,现阶段使用的话需要通过 bable 等方式进行编译之后,才能在浏览器正常运行*

1. 在`tsconfig.json`中启用编译器选项 `"experimentalDecorators": true` 和 `"useDefineForClassFields": true`

2. 安装支持装饰器所需要的依赖：`npm i --save-dev @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators`

3. 在`package.json`中配置

   ```json
   {
       // ...
       "babel": {
        "presets": ["react-app"],
        "plugins": [
           ["@babel/plugin-proposal-decorators", { "legacy": true }], // 支持装饰器语法
           ["@babel/plugin-proposal-class-properties", { "loose": true }] // 编译class的插件，转为函数 
       ]
     }
   }
   ```

#### 类的装饰器

- 在类声明前被声明，可以用来监视、修改或替换类的定义
- 创建类的时候，会把装饰器函数执行，传参为当前的类
- 可以在装饰器函数中，给类设置一些私有的属性方法、或者设置原型上的属性方法等
- 一个装饰器可以同时装饰多个类；一个类可以同时被多个装饰器装饰（从下到上执行）

```js
const target = (target) => {
    target.num = 100;
    target.getNum = () => {}
}

@target
class Demo {
    constructor() {
        
    }
}
console.log(Demo.num); // 100
```

- 装饰器工厂模式

  多个装饰器的情况下，先从上到下执行外层函数，再从下到上执行装饰器函数

```js
const sum = (x: number, y: number): (target: any) => void => {
    console.log(1)
    // 返回的是装饰器函数
    return (target) => {
    	console.log(2)
        target.num = x + y;
    }
}

const handle = (): (target: any) => void => {
    console.log(3)
    return (target) => {
    	console.log(4)
        target.handle = 'xxx';
    }
}

@sum(10, 20)
@handle()
class Demo {
    constructor() {}
}

// 执行顺序是1 3 4 2
```

#### 类属性/方法的装饰器

```ts
const test = (target: any, key: string, desciptor?: PropertyDecorator): any => {
    console.log(target, key, desciptor);
    // 修改的是原型上的值
    target[key] = 100;
}

const funcTest = (target: any, key: string, desciptor: PropertyDescriptor): void => {
    console.log(target, key, desciptor);
    desciptor.value = function (){
        return 0;
    }
}

class Demo {
    x: number = 0;
    y: number = 0;
    @test
    z: number = 0;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    @funcTest
    getSum() {
        return this.x + this.y + this.z;
    }

    noDecoratorSum() {
        return this.x + this.y + this.z;
    }
}

const obj = new Demo(10, 10);

console.log(obj.z); // 0
console.log(obj.__proto__.z); // 100
console.log(obj.getSum()); // 0
console.log(obj.noDecoratorSum()); // 20
```

![image-20230830173440824](/notes/imgs/react/类属性、方法装饰器.png)

**常用的使用场景：将属性/方法设为只读**

```ts
const readonly = (target, key, desciptor): void => {
    desciptor.writable = false;
}
```

### mobx5

#### 安装

*`mobx-react`类似于`react-redux`*

```sh
yarn add mobx@5.15.4 mobx-react@6.1.4
```

#### 创建可观察状态

1. #### **mobx**

   - `observable` :  使数据state变成可观测的数据
   - `action` :  将一个方法标记为可修改state的action **『异步批处理』**
   - `computed`:  标记一个可以由 state 派生出新的值并且缓存其输出的 getter。

2. **mobx-react**

   - `observer`:  监测`store`中`observable`数据的变化

   - `Provider`:  与`redux`中的作用一样，传递`store`数据

#### 使用

- **定义Store类**

```ts
import { observable, action } from 'mobx';
export default class MobxStore {
    @observable num: number = 0;
    @computed get computedNum() {
        return this.num * 10
    }
    @action increment() {
        this.num++;
    }
    @action decrement() {
        this.num--;
    }
}
```

- **创建 Store 对象，通过 Provider 组件将 Store 对象放置在全局**

```tsx
import MobxStore from "./store"
import { Provider } from 'mobx-react';
import Child from './Child';

const store = new MobxStore();

/*
 	多个store时
 	const store = {
 		store1: new Store1(),
 		store2: new Store2()
 	}
 	
 	<Provider {...store}>
        <Child />
    </Provider>
    
    @inject('store1', 'store2')
*/

export default function MobxTest() {
    return (
        <Provider store={store}>
            <Child />
        </Provider>
    )
}
```

- **通过 inject 将 Store 注入组件，将组件变成响应式组件**

```tsx
import { Component } from 'react'
import { inject, observer } from "mobx-react";

// 类组件
@inject('store')
@observer
export default class Child extends Component {
    render() {
        const { store } = this.props as any;
        return (
            <div>
                <span>{store.num}</span>
                <br />
                <button onClick={() => {
                    store.increment();
                }}>+1</button>
                <button onClick={() => {
                    store.decrement();
                }}>-1</button>
            </div>
        )
    }
}

// 函数组件
const Child = (props) => {
    return (
            <div>
                <span>{props.store.num}</span>
                <br />
                <button onClick={() => {
                    props.store.increment();
                }}>+1</button>
                <button onClick={() => {
                    props.store.decrement();
                }}>-1</button>
            </div>
        )
}
export default inject('store')(observer(Child));
```

- **`@action.bound` 保证函数无论如何执行，函数中的this都是 Store 的实例**

```ts
import MobxStore from "./store"

const store = new MobxStore();

let func = store.increment;
func(); // 如果没有使用@action,bound，该方法调用时的this指向undefined
```

- **监听数据变化的回调**
  - `autorun` 监测的数据变化时，执行回调『**默认会执行一次，只有用到的数据变化时才会执行』『类似于vue3中的 `watchEffect`』**
  - `reaction` 监测数据，默认不会执行**『类似于vue3中的 `watch`』**

```tsx
import { autorun, reaction } from 'mobx';
// ... 其余部分同上
componentDidMount() {
    const { store } = this.props as any;
    // 监听回调中用到的数据
    autorun(() => {
        console.log(store.testNum);
    });
    // 监听单个
    reaction(() => store.num, (val) => {
        console.log(val); // 0
    });
    // 监听多个
    reaction(() => [store.num, store.x], (val) => {
        console.log(val); // [0, 0]，按照监听的顺序返回
    });
}
```

- **强制程序使用action函数更改应用程序中的状态**

```ts
import { configure } from 'mobx';
configure({
    enforceActions: 'observed'
});
```

- **`runInAction` **

  - 在store外部使用非action函数修改状态

  ```tsx
  import { runInAction } from 'mobx';
  
  @inject('store')
  @observer
  export default class Child extends Component {
      increment() {
          runInAction(() => {
              const { store } = this.props as any;
              store.num++;
          });
      }
      render() {
          const { store } = this.props as any;
          return (
              <div>
                  <span>{store.num}</span>
                  <br />
                  <button onClick={() => {
                      this.increment();
                  }}>+1</button>
                  <button onClick={() => {
                      store.decrement();
                  }}>-1</button>
              </div>
          )
      }
  }
  ```

  - 在异步操作之后，执行该方法去修改状态

  ```ts
  import { observable, action, runInAction } from 'mobx';
  const query = () => {
      return new Promise((resolve) => {
          setTimeout(() => {
              resolve(100);
          }, 1000);
      })
  }
  export default class MobxStore {
      @observable num: number = 0;
      @action.bound async increment() {
          const res = await query();
          runInAction(() => {
              this.num = res;
          })
      }
  }
  ```

- **异步更新 `flow`**

​		除了`runInAction`外另一种异步更新方法

```tsx
import { flow} from 'mobx';

export default class MobxStore {
    @action flowFunc = flow(function* () {
        this.num = yield query();
     }).bind(this);
}
```

### mobx6

*最新版本mobx6移除了装饰器的操作『因为装饰器不是JS标准规范』*

1. 去掉`mobx5`定义 `store` 中所有的装饰器

2. 使用`makeObservable` `makeAutoObservable`给状态和方法设置装饰效果

   - `makeObservable`
   - `makeAutoObservable`：自动推断所有属性

   ```ts
   export default class Store {
       makeAutoObservable(this);
       // 等同于
       /*
           makeObservable(this, {
               num: observable,
               increment: action.bound,
               decrement: action.bound
           });
       */
   }
   ```

   

## Mobx-React-lite

- `mobx`：MobX 核心库
- `mobx-react-lite`：仅支持函数组件
- `mobx-react`：既支持函数组件也支持类组件

*只使用一个`observer`即可，所有视图展示用到 store 数据的组件，都需要用observer包裹*

### 安装

```shell
npm install mobx mobx-react-lite
```

### 用法

```js
// store/menu.ts
// 创建一个store
import {
    makeAutoObservable,
    runInAction
} from 'mobx';
import { MenuItem } from './types'

class MenuStore {
    menuData: MenuItem[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setMenuData(data: MenuItem[]) {
        runInAction(() => {
            this.menuData = data;
        })
    }
}
const menuStore = new MenuStore();
export default menuStore;

// App.vue
// 使用observer监听store
import DefaultRouter from '@/router'; 
import {
    useRoutes, useNavigate, useLocation  
} from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import PubSub from 'pubsub-js';
import { useEffect } from 'react';

function App() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const whiteList = ['/', '/overview']
        if (!whiteList.includes(location.pathname)) navigate('/')
    }, [])

    // 监听当前 location改变
    // topic: string, route: string
    PubSub.subscribe('changeRoute',(topic: string, route: string) => {
        navigate(route, { replace: true })
    });

    return useRoutes(DefaultRouter);
}
// 将 store 对象传递给组件
export default observer(App);


// 使用store
import menuStore from '@/store/menu';
menuStore.setMenuData(res);
```
