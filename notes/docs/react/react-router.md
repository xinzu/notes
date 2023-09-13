## 安装

```sh
npm install react-router-dom
# yarn add react-router-dom
```



## 标签组件

### `BrowerRouter`

- 基于`<BrowerRouter>`把所有要渲染的内容包起来，开启 History 路由
- 后续用到的`Route`、`Link`等，都需要在该标签内部使用

#### props

- `basename`：有前置斜杠，不能有后置斜杠。

   ```tsx
   <BrowserRouter basename="/calendar">
    	<Link to="/today"/> 
   </BrowserRouter>
   
   // link 渲染为 <a href="/calendar/today">
   ```

- `getUserCOnfirmation`：路由跳转的二次确认函数，用来拦截Prompt组件，默认情况下使用`window.confirm`弹框  **需要配合Prompt一起使用，没有Prompt不会弹出**

- `forceRefresh`：布尔值。为true时, router在进行路由跳转的时候会进行页面刷新。**可能只在浏览器不支持H5 history api的情况下需要使用。**

- `keyLength`：自定义location.key的长度，默认为6  **？？？？？？？**

- `children`：需要渲染的**单个reactNode元素组件**

### `HashRouter`

- 基于`<HashRouter>`把所有要渲染的内容包起来，开启 Hash路由
- 开启后，整个页面地址，默认会设置一个 `#/`哈希值

#### props

- `basename`
- `getUserConfirmation`
- `hashType`：string，
  - `slash`:  创建像#/和的哈希#/sunshine/lollipops，默认
  - `noslash` : 创建像#和的哈希#sunshine/lollipops
- `children`

### `Link`

- 实现路由切换/跳转的组件
- 最后渲染的结果是`<a>`标签
- 可以根据路由模式，自动设定点击的切换方式『Hash模式为 /#/a，History模式为/a』

#### props

- `to`: 跳转的地址

- `replace`： 布尔值- 为true时，将会替换history stack中的当前路径

### `NavLink`

`<Link>` 的特殊版本，当匹配当前URL时，会给当前link添加样式。

- `activeClassName`：选中时添加的类名，默认为`active`
- `activeStyle`：对象，样式
- `exact`
- `strict`：布尔值，为true时，当进行路由匹配时，后置斜杠将会被考虑在内
- `isActive`：func。额外函数来进一步验证当前路由是否匹配

### `Routes`

- v6版本中移除了先前的`<Switch>`，引入了新的替代者：`<Routes>`
- `<Routes>` 和 `<Route>`要配合使用，且必须要用`<Routes>`包裹`<Route>`
- 匹配到一次后停止匹配

### `Route`

- **版本6 外层必须包裹一层`<Routes>`**

- 路由容器，每一次页面加载或者切换路由后，都会根据当前路由，到这里和每一个Route进行匹配，把匹配到的组件放在容器中渲染

#### props

- `path`：与URL匹配的路径模式

  - 动态路径  `path=/a/:id/:name` 保存在`params`属性中
- `element`: 当路由与URL匹配时要呈现的元素

  ```tsx
  <Route path="/a" element={<A />} />
  ```
- `Component`: 当路由与URL匹配时要呈现的组件

  ```tsx
  <Route path="/a" Component={A} />
  ```
- `caseSensitive`： 是否匹配大小写
- `loader`： 路由加载器在路由渲染之前被调用，通过`useLoaderData`为元素提供数据。

  ```tsx
  <Route
    path="/teams/:teamId"
    loader={({ params }) => {
      return fetchTeam(params.teamId);
    }}
  />;
  
  function Team() {
    let team = useLoaderData();
  }
  ```

### `Navigate`

- v6版本中使用 `<Navigate<` 替换原来的 `<Redirect>` 组件
- 在渲染时改变当前位置

#### props

- `to`: 调整到哪个URL
- `replace`: 是否替换URL
- `state`: 传递state参数，存在`location.state`中

### Outlet

- 嵌套路由中使用
- 在父路由元素中来渲染他们的子路由元素

### demo

 ```tsx
 import { HashRouter, BrowserRouter, Link, NavLink, Routes, Route } from "react-router-dom";
 import styled from "styled-components";
 
 import A from "./A";
 import B from "./B";
 import C from "./C";
 
 const NavBox = styled.nav`
     a {
         font-size: 16px;
         color: black;
         margin: 0 10px;
     }
 `
 
 export default function RouterApp() {
   return (
     <HashRouter>
         <NavBox>
             <Link to="/a">A</Link>
             <Link to="/b">B</Link>
             <Link to="/c">C</Link>
         </NavBox>
         <div className="content">
             <Routes>
                 <Route path="/a" element={<A />} />
                 <Route path="/b" Component={B} />
                 <Route path="/c" Component={C} />
                 <Route path="*" element={<div>404</div>} />
             </Routes>
         </div>
     </HashRouter>
   )
 }
 
 ```

## 嵌套路由

```tsx
// 这是个三级嵌套的路由
// v6版本要求所有路由统一写在一起
<Route path="/a" element={<A />}>
    <Route path='/a/b' element={<div>A/B内容: <B/></div>}>
        <Route path='/a/b/c' element={<div>A/B/C内容: <c/></div>}></Route>
    </Route>
</Route>

// Link写在对应组件中
// Outlet是子路由的出口组件，子组件在Outlet的位置渲染
import { Link, Outlet } from 'react-router-dom';
export default function A() {
  return (
    <div>
        A组件内容
        <Link to="/a/b">A/B</Link>
        <Outlet />
    </div>
  )
}
```



## 路由表

对多级路由进行统一管理

### 配置

```tsx
import { Navigate, useRoutes } from 'react-router-dom';
import { lazy } from 'react';

import Home from '@/views/campus';

// 路由懒加载
const handleLazy = (name: string) => {
    const Comp = lazy(() => import(`@/views/${name}`));
    //element需要传入<Element />这种形式，与component不同
    return <Suspense fallback={<h2>Loading..</h2>}><Comp /></Suspense>; 
};

const routes = [
    {
        path: '/',
        element: <Home />,
        children: [
            {
                path: '',
                element: handleLazy('overview')
            },
            {
                path: 'overview',
                element: handleLazy('overview')
            },
            {
                path: 'comprehensive',
                element: handleLazy('comprehensive')
            }
        ]
    },
    {
        path: '/login',
        element: handleLazy('login')
    },
    {
        path: '/404',
        element: handleLazy('404')
    },
    {
        path: '*',
        element: <Navigate to='/404' />
    }
];

export default function () {
    return useRoutes(routes)
}
```

### 使用

```tsx
import RouteView from '@/router'; 

function App() {
    return <RouteView />
}

export default observer(App);
```

### 路由懒加载

- `lazy`: `lazy(() => import(组件路径))`

- `Suspense`：组件未加载完成时的过渡样式

  ```tsx
  <Suspense fallback={<h2>Loading..</h2>}><Component /></Suspense>
  ```



## Hooks

路由相关的hook方法

### `useParams`

- 返回一个由当前URL的动态参数的键/值对组成的对象

### useSearchParams

- 获取search参数

  ```tsx
  const [search, setsearch] = useSearchParams()
  console.log(search.get('name'))
  console.log(search.get('id'))
  ```

### `useLocation`

- 返回当前的`location`对象
- 常用于监听URL变化

### `useNavigate`

- 返回一个函数，让你以编程方式进行导航

  ```tsx
  import { useNavigate } from "react-router-dom";
  
  export default function PageA() {
      const navigate = useNavigate();
      const changeMenu = (path) => {
          navigate(path, {replace: true, state: {id: '123'}});
      }
      
      return (
          <div className={menuStyle['menu-wrap']}>
              菜单：
              {
                  menuStore.menuData.map((menuItem: MenuItem) => (
                      <div
                          className={`menu-item${curretMenu === menuItem.path ? ' active' : ''}`}
                          key={menuItem.id}
                          onClick={() => changeMenu(menuItem)}
                      >
                          {menuItem.title}
                      </div>
                  ))
              }
          </div>
      )
  }
  ```

### `useMatch`

- 返回相对于当前URL的给定路径上的路由的匹配数据

  ```tsx
  useMatch('/login')
  ```

  ![image-20230912175018195](/notes/imgs/react/react-router-dom hooks数据返回.png)