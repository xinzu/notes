![image-20230720094653023](/notes/imgs/vue/vue版本对应关系.png)

## vue-router 4.x与3.x的区别

### 创建路由

**4.x**

```js
import { createRouter } from "vue-router"
const router = createRouter({
    // opyions
    .....
})
```

**3.x**

```js
import VueRouter from "vue-router"'
const router = new VueRouter({
    // options
    // ......
})
```

### 路由模式

- hash: `createWebHashHistory `
- history: `createWebHistory`

​	**4.x**

```js
import { 
    createRouter,
    createWebHashHistory,
    createWebHistory
} from 'vue-router'
const router = createRouter({
    history:createWebHashHistory() / createWebHistory()
})
```

​	**3.x**

```js
 const router = new VueRouter({
    mode: 'hash' / 'history'
 })
```

## vue-router 4.x

### 创建路由

```js
import {
    createRouter, createWebHashHistory
} from 'vue-router';

export default createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [{
        path: '/',
        alias: '/home', // 别名，访问/home时相当于访问/
        name: 'main',
        component: () => import('@/Main.vue'),
        children: [{
            path: '/overview/:id?', // params, ?表示可以可选参数，能匹配/overview
            name: 'overview',
            component: () => import('@/components/Overview.vue'),
            children: [{
                path: '/overview1', // 子路由的地址带 /，访问时直接IP/#/overview1即可
                name: 'overview1',
                component: () => import('@/views/overview/Overview1.vue'),
            }, {
                path: 'overview2', // 子路由的地址不带 /，访问时path需要拼接父路由 IP/#/overview/overview2
                name: 'overview2',
                component: () => import('@/views/overview/Overview2.vue'),
            }]
        }, {
            path: '/comprehensive',
            name: 'comprehensive',
            component: () => import('@/components/Comprehensive.vue'),
            sensitive: true, // 应用在单个路由
        }]
    }]，
    strict: true, // 应用在全局路由
})
```

**默认情况下，所有路由是不区分大小写的，并且能匹配带有或不带有尾部斜线的路由**

​	例如，路由 `/users` 将匹配 `/users`、`/users/`、甚至 `/Users/`

这种行为可以通过 `strict` 和 `sensitive` 选项来修改，它们可以既可以应用在整个全局路由上，又可以应用于当前路由上

- `strict` 为true：**不区分**大小写，**不能**匹配带或不带尾部斜线的路由
- `sensitive` 为true: **区分**大小写，并**能**匹配带或不带尾部斜线的路由
- 两者皆为true： **区分**大小写，**不能**匹配带或不带尾部斜线的路由
- 两者皆为false： 默认情况。**不区分**大小写，**能**匹配带或不带尾部斜线的路由

### router-link

```vue
<router-link :to="page.path" custom v-slot="{ navigate, isExactActive }" v-for="page in pages">
    <div class="menu" @click="navigate(), changeMenu(page)" role="link" :class="{active: isExactActive}">{{ page.name }}</div>
</router-link>
```

![image-20230720115146872](/notes/imgs/vue/router-link.png)

> router-link通过一个作用于插槽暴露底层的定制能力：

- `href`：解析后的 URL。将会作为一个 `a` 元素的 href 属性。如果什么都没提供，则它会包含 base。
- `route`：解析后的规范化的地址。
- `navigate`：触发导航的函数。 
- `isActive`：如果需要应用 active class，则为 true。允许应用一个任意的 class。**（会在当前路由匹配到的路由及其子路由上添加）**
- `isExactActive`：如果需要应用 exact active class，则为 true。允许应用一个任意的 class。**（仅在当前路由完全匹配时添加）**



- 渲染出来是一个`a`标签，**加上custom属性就可以把a标签去掉，但是没办法完成跳转，需要自己加点击事件**

- 自定义标签实现高亮：**isExactActive **和 **isActive**
- 自定义标签实现跳转：**navigate**



### router-view

```vue
<router-view class="page-container" :msg="123" @init="routerPageInit"></router-view>
```

![image-20230720115259929](/notes/imgs/vue/router-view.png)



### 编程式导航

```js
const router = useRouter();

const changeOverview2 = () => {
    router.push({
        name: 'overview2',
    });
}
```

### 命名视图

> 有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 `sidebar` (侧导航) 和 `main` (主内容) 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 `router-view` 没有设置名字，那么默认为 `default`。

```vue
<router-view class="view left-sidebar" name="LeftSidebar"></router-view>
<router-view class="view main-content"></router-view>
<router-view class="view right-sidebar" name="RightSidebar"></router-view>
```

对应的路由配置

```js
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      components: {
        default: Home,
        LeftSidebar,
        RightSidebar,
      },
    },
  ],
})
```

### 将props传递给路由组件

- 当 `props` 设置为 `true` 时，`route.params` 将被设置为组件的 props。

- 对于有命名视图的路由，你必须为每个命名视图定义 `props` 配置

  ```js
  const routes = [
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
  ```

- 当 `props` 是一个对象时，它将原样设置为组件 props。

  ```js
  const routes = [
    {
      path: '/promotion/from-newsletter',
      component: Promotion,
      props: { newsletterPopup: false }
    }
  ]
  ```

- 函数模式，参数是route

  ```js
  const routes = [
    {
      path: '/search',
      component: SearchUser,
      props: route => route.query
    }
  ]
  ```

### 调试

如果你需要探究你的路由是如何转化为正则的，以了解为什么一个路由没有被匹配，或者，报告一个 bug，你可以使用[路径排名工具](https://paths.esm.dev/?p=AAMeJSyAwR4UbFDAFxAcAGAIJXMAAA..#)。它支持通过 URL 分享你的路由。

### 导航守卫

> 当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于**等待中**。

#### 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫(2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫(2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。

#### 全局前置守卫`beforeEach`

```js
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
```

### 过渡动效

想要在你的路径组件上使用转场，并对导航进行动画处理

```vue
<router-view v-slot="{ Component }">
  <transition name="fade">
    <component :is="Component" />
  </transition>
</router-view>
```

### 滚动行为

使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 vue-router 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。

**注意: 这个功能只在支持 history.pushState 的浏览器中可用。**

当创建一个 Router 实例，你可以提供一个 `scrollBehavior` 方法

```js
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...],
  scrollBehavior: (to, from, savedPosition) => {
    // 始终滚动到顶部
    return { top: 0 };
                            
    // 始终在元素 #main 上方滚动 10px
    return {
      // 也可以这么写
      // el: document.getElementById('main'),
      el: '#main',
      top: -10,
    }

    // 如果你的浏览器支持滚动行为，你可以让它变得更流畅
    return { top: 0, behavior: 'smooth' };

    // 延迟滚动
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 })
      }, 500)
    })
  }
})
```

### 路由懒加载

```js
// 将
// import UserDetails from './views/UserDetails.vue'
// 替换成
const UserDetails = () => import('./views/UserDetails.vue')

const router = createRouter({
  // ...
  routes: [{ path: '/users/:id', component: UserDetails }],
})
```

### 动态路由

菜单存储在后台时，进入系统获取到菜单数据后自动生成路由

- `router.addRoute(parentRouteName, route)`，添加一个新的路由记录，将其作为一个已有路由的子路由。
- `router.addRoute(route)`，添加到最外层路由

```js
const menuData = [{
    name: 'addTest',
    path: '/addTest',
    component: 'views/overview/AddTest',
}];

const addRoutes = () => {
    menuData.forEach(({ name, path, component }) => {
        const routes = {
            name,
            path,
            component: () => import(`@/views/${component}.vue`),
        }
        router.addRoute(routes);
	})
}
```
