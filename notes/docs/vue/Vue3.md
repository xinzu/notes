## 从vue2中迁移

### v-for中的Ref数组

- 在 **vue 2** 中，如果给 v-for 绑定一个 ref ，通过这个 ref 可以获取到全部 v-for 的节点。

```
<p v-for="item in renderData" :key="item.name" ref="nodes">{{item.name}}</p>
// this.$refs.nodes拿到的结果是一个数组，包含所有的p元素，获取某个节点时可以通过index或者过滤方式
```

- 在 **vue 3** 中，对 v-for 的一体化（数组化）处理已经取消，变为函数处理 ref 。如果像vue2一样绑定，只能获取最后一个节点。

```
// html
<p v-for="item in renderData" :key="item.name" :ref="handleNodes">{{item.name}}</p>

// js
handleNodes(el) {
	this.nodesRef.push(el)
}
```

> 注意：
>
> - `nodesRef` 不必是数组：它也可以是一个对象，其 ref 会通过迭代的 key 被设置。
> - 如果需要，`nodesRef` 也可以是响应式的且可以被监听

### 异步组件

1. 异步组件的定义需要通过将其包裹在新的 `defineAsyncComponent` 助手方法中来显式地定义

   `vue2: const asyncModal = () => import('./Modal.vue')`

   `vue3: const asyncModal = defineAsyncComponent(() => import('./Modal.vue'))`

2. **带选项的异步组件中**`component` 选项重命名为 `loader`

   ```
   const asyncModalWithOptions = defineAsyncComponent({
     // vue2中用的是component，vue3中改为了loader
     loader: () => import('./Modal.vue'),
     delay: 200,
     timeout: 3000,
     errorComponent: ErrorComponent,
     loadingComponent: LoadingComponent
   })
   ```

3. Loader 函数本身不再接收 `resolve` 和 `reject` 参数，且必须返回一个 Promise

   ```
   // 2.x 版本
   const oldAsyncComponent = (resolve, reject) => {
     /* ... */
   }
   
   // 3.x 版本
   const asyncComponent = defineAsyncComponent(
     () =>
       new Promise((resolve, reject) => {
         /* ... */
       })
   )
   ```

### $attrs

**vue2**中，$attrs 不包含 class  和  style

导致的问题

```
<my-component id="my-id" class="my-class"></my-component>
// my-component
<template>
  <label>
    <input type="text" v-bind="$attrs" />
  </label>
</template>
<script>
export default {
  inheritAttrs: false
}
</script>

// 生成的html代码
// 由于$attrs不包含class，仍然会应用到组件的根元素
<label class="my-class">
  // $attrs 中的 attribute 不再自动添加到根元素中，而是由开发者决定在哪添加
  <input type="text" id="my-id" />
</label>
```

**vue3**中，$attrs 包含所有的 attribute，也包括事件 [emit选项](#emit选项)

上面的实例就会生成以下HTML

```
<label>
  <input type="text" id="my-id" class="my-class" />
</label>
```

### $children

在 vue3 中，`$children` property 已移除，不再支持。如果你需要访问子组件实例，我们建议使用 $refs

### 自定义元素

如果我们想在 Vue 外部定义添加自定义元素 (例如使用 Web 组件 API)，我们需要“指示”Vue 将其视为自定义元素。

**vue2**

`Vue.config.ignoredElements = ['plastic-button']`

**vue3**

- webpack配置：通过 `vue-loader` 的 `compilerOptions` 选项传递

  ```
  rules: [
    {
      test: /\.vue$/,
      use: 'vue-loader',
      options: {
        compilerOptions: {
          isCustomElement: tag => tag === 'plastic-button'
        }
      }
    }
    // ...
  ]
  ```

- 动态模版编译：通过 `app.config.isCustomElement` 传递

  ```
  const app = Vue.createApp({})
  app.config.isCustomElement = tag => tag === 'plastic-button'
  ```

### is动态组件

在 3.0 中，我们仅将 Vue 对 `is` 属性的特殊处理限制到 `<component>` tag。

- 在保留的 `<component>` tag 上使用时，它的行为将与 2.x 中完全相同；

  ```
  <component is="bar"></component>
  ```

  - 2.x 行为：渲染 `bar` 组件。
  - 3.x 行为：渲染 `bar` 组件。

- 在**普通组件**上使用时，它的行为将类似于普通 prop

  ```
  <foo is="bar" />
  ```

  - 2.x 行为：渲染 `bar` 组件。
  - 3.x 行为：通过 `is` prop 渲染 `foo` 组件。

- 在**普通元素**上使用时，它将`is` 作为原生 attribute 渲染。

  ```
  <button is="plastic-button">点击我！</button>
  ```

  - 2.x 行为：渲染 `plastic-button` 组件。
  - 3.x 行为：通过回调渲染原生的 button。

- 3.x中实现2.x is 的用法，可以用vue: 前缀

  ```
  <table>
    <tr is="vue:blog-post-row"></tr>
  </table>
  ```

### data选项

1. 在 3.x，`data` 选项已标准化为只接受返回 `object` 的 `function`。
2. 当合并来自 mixin 或 extend 的多个 `data` 返回值时，现在是浅层次合并的而不是深层次合并的(只合并根级属性)。

### emit选项

Vue 3 目前提供一个 `emits` 选项，和现有的 `props` 选项类似。这个选项可以用来定义组件可以向其父组件触发的事件

**强烈建议使用 `emits` 记录每个组件所触发的所有事件。任何未声明 `emits` 的事件监听器都会被算入组件的 `$attrs` 并绑定在组件的根节点上。**

以下代码的点击（同一个）事件将会被触发**两次**

```
// 父组件
<my-button v-on:click="handleClick"></my-button>

// 子组件
<template>
  <button v-on:click="$emit('click', $event)">OK</button>
</template>
<script>
export default {
  emits: [] // 不声明事件
}
</script>
```

### 移除过滤器

从 Vue 3.0 开始，过滤器已删除，不再支持，替换方案如下：

1. 局部过滤器：用方法调用或计算属性替换

2. 全局过滤器：可以通过全局属性在所有组件中使用它

   ```
   // 全局属性设置
   app.config.globalProperties.$filters = {
     currencyUSD(value) {
       return '$' + value
     }
   }
   
   // 使用
   <p>{{ $filters.currencyUSD(accountBalance) }}</p>
   ```

### 支持多个根节点

vue2.x单文本组件中，在`template`内只能有一个根节点

vue3.x支持多节点

### 监听组件生命周期

**vue2**中用的是@hook

`<child-component @hook:updated="onUpdated">`

**vue3**中用的是vue:前缀或者在驼峰命名法的情况下附带前缀 vue

`<child-component @vue:updated="onUpdated">`

`<child-component @vueUpdated="onUpdated">`

### 指令

#### v-bind 合并行为

```
<div id="red" v-bind="{ id: 'blue' }"></div>
// vue2: 单独的总会覆盖v-bind的对象
<div id="red"></div>
// vue3: 谁后定义谁生效
<div id="blue"></div>
```

#### v-if 与 v-for的优先级对比

2.x 版本中在一个元素上同时使用 `v-if` 和 `v-for` 时，`v-for` 会优先作用。

3.x 版本中 `v-if` 总是优先于 `v-for` 生效，也就是说可以在v-for里面写v-if

**以后如果有v-if + v-for 的面试题，可以把vue3的改动也加上**

#### v-model

在 3.x 中，**自定义组件**上的 `v-model` 相当于传递了 `modelValue` prop 并接收抛出的 `update:modelValue` 事件

- 修改model名称，可以通过`v-model:title="pageTitle"`，与vue2中的`v-bind:title.sync="pageTitle"`
- 一个组件可以使用多个v-model

#### 自定义指令

1. 指令的钩子函数已经被重命名，以更好地与组件的生命周期保持一致。

   - created - 新的！在元素的 attribute 或事件侦听器应用之前调用。
   - bind → **beforeMount**
   - inserted → **mounted**
   - **beforeUpdate**：新的！这是在元素本身更新之前调用的，很像组件生命周期钩子。
   - update → 移除！与`updated`钩子太多的相似之处要更新，所以这是多余的，请改用 `updated`。
   - componentUpdated → **updated**
   - **beforeUnmount**：新的！与组件生命周期钩子类似，它将在卸载元素之前调用。
   - unbind -> **unmounted**

2. 访问组件实例

   在vue2中通过vnode访问

   在vue3中通过`binding.instance`

#### 移除了 v-on 的 native 修饰符

### 按键修饰符

- 不再支持使用数字 (即键码) 作为 `v-on` 修饰符

  `<input v-on:keyup.13="submit" />`

- 不再支持 `config.keyCodes`

  ```
  Vue.config.keyCodes = {
    f1: 112
  }
  <!-- 键码版本 -->
  <input v-on:keyup.112="showHelpText" />
  <!-- 自定义别名版本 -->
  <input v-on:keyup.f1="showHelpText" />
  ```

### 移除$listener

现在事件监听器是 `$attrs` 的一部分

### 移除内联模版

vue2内联模版

```
// 定义子组件
var ChildComponent = Vue.component({
	template: '<div></div>' 
})
// 父组件中使用：
var FatherComponent = Vue.component({
	template: `<div>
                  <child-component   inline-template>
                    <p>这是inline-template</p>
                 </child-component>
              </div>`
})

// 最终结果: p标签的内容不需要子组件中放置插槽就可以渲染出来。
<div>
    <p>这是inline-template</p>
</div>
```

### propsData

`propsData` 选项之前用于在创建 Vue 实例的过程中传入 prop，现在它被移除了。如果想为 Vue 3 应用的根组件传入 prop，请使用 [createApp](#createApp) 的第二个参数。

### 插槽统一

定义插槽名称

```js
// 2.x 语法
h(LayoutComponent, [
  h('div', { slot: 'header' }, this.header),
  h('div', { slot: 'content' }, this.content)
])
// 3.x Syntax
h(LayoutComponent, {}, {
  header: () => h('div', this.header),
  content: () => h('div', this.content)
})
```

当你需要以编程方式引用作用域插槽时，它们现在被统一到 `$slots` 选项中了。

```
// 2.x 语法
this.$scopedSlots.header

// 3.x 语法
this.$slots.header()
```

### 过渡的class名更改

过渡类名 `v-enter` 修改为 `v-enter-from`、过渡类名 `v-leave` 修改为 `v-leave-from`。

### API改动

#### 全局API

##### createApp

vue3引入了`createApp`，Vue上的所有全局API在创建的app实例上同样存在

```
import { createApp } from 'vue'
const app = createApp({})
```

###### `config.productionTip`移除

###### `config.ignoredElements` 替换为 `app.config.isCustomElement`

​	[自定义元素](#自定义元素)

###### `Vue.prototype` 替换为 `app.config.globalProperties`

```
Vue.prototype.$http
// 使用
this.$http
```

###### 移除`Vue.extend` 

> 在 Vue 3 中，我们强烈建议使用 [组合式 API](https://v3.cn.vuejs.org/api/composition-api.html) 来替代继承与 mixin。如果因为某种原因仍然需要使用组件继承，你可以使用 [`extends` 选项](https://v3.cn.vuejs.org/api/options-composition.html#extends) 来代替 `Vue.extend`。

```
// vue2
// 用Vue.extend
const Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data() {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
new Profile().$mount('#mount-point')

// vue 3
const Profile = {
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data() {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
}
// 用createApp
Vue.createApp(Profile).mount('#mount-point')
```

###### 引入插件方法修改

```
const app = createApp(MyApp)
app.use(VueRouter)
```

##### 挂载APP实例

```	
import { createApp } from 'vue'
import MyApp from './MyApp.vue'
// vue2
new Vue({
	render: (h) => h(App),
}).$mount("#app");

// vue3
const app = createApp(MyApp)
app.mount('#app')
```

##### Provide / Inject

```
// 在入口
app.provide('guide', 'Vue 3 Guide')

// 在子组件
export default {
  inject: {
    book: {
      from: 'guide'
    }
  },
  template: `<div>{{ book }}</div>`
}
```

##### 在应用之间共享配置

```
import { createApp } from 'vue'
import Foo from './Foo.vue'
import Bar from './Bar.vue'
// 创建工厂函数
const createMyApp = options => {
  const app = createApp(options)
  app.directive('focus' /* ... */)
  return app
}
// Foo 和 Bar 实例及其后代中都可以使用 focus 指令。
createMyApp(Foo).mount('#foo')
createMyApp(Bar).mount('#bar')
```

##### Treeshaking

vue2中，全局 API 如 `Vue.nextTick()` 是不支持 tree-shake 的，不管它们实际是否被使用，都会被包含在最终的打包产物中。

- Vue.nextTick
- Vue.observable
- Vue.version
- Vue.compile
- Vue.set
- Vue.delete

`import { nextTick } from 'vue'`

在 Vue 3 中，全局和内部 API 都经过了重构，并考虑到了 tree-shaking 的支持。因此，全局 API 现在只能作为 ES 模块构建的命名导出进行访问（使用时要引入，否则会**报错**）。

#### 挂载API变化

在 Vue 2.x 中，当挂载一个具有 `template` 的应用时，被渲染的内容会**替换**我们要挂载的目标元素。

在 Vue 3.x 中，被渲染的应用会作为**子元素**插入。

#### 事件API

`$on`，`$off` 和 `$once` 实例方法已被移除，组件实例不再实现事件触发接口

**就是EventBus 不存在了，不能用这种方法进行传值了**

Event bus 模式可以被替换为实现了事件触发器接口的外部库，例如 [mitt](https://github.com/developit/mitt) 或 [tiny-emitter](https://github.com/scottcorgan/tiny-emitter)。

#### 渲染函数API

##### 参数

在vue2中，`render` 函数会自动接收 `h` 函数 (它是 `createElement` 的惯用别名) 作为参数

在 vue3 中，`h` 函数现在是全局导入的，而不是作为参数自动传递。

​	`import { h } from 'vue'`

##### 注册组件

```
Vue.component('button-counter', {
  data() {
    return {
      count: 0
    }
  }
  template: `
    <button @click="count++">
      Clicked {{ count }} times.
    </button>
  `
})
```

在 vue2 中，注册一个组件后，把组件名作为字符串传给渲染函数的第一个参数，渲染函数可以正常的工作

```
export default {
  render(h) {
    return h('button-counter')
  }
}
```

在 vue3中，不能再用字符串 ID 隐式查找已注册组件，需要使用一个导入的 `resolveComponent` 方法

```
import { h, resolveComponent } from 'vue'

export default {
  setup() {
    const ButtonCounter = resolveComponent('button-counter')
    return () => h(ButtonCounter)
  }
}
```

## Vue3快速上手

<img src="https://user-images.githubusercontent.com/499550/93624428-53932780-f9ae-11ea-8d16-af949e16a09f.png" style="width:200px" />



### 1.Vue3简介

- 2020年9月18日，Vue.js发布3.0版本，代号：One Piece（海贼王）
- 耗时2年多、[2600+次提交](https://github.com/vuejs/vue-next/graphs/commit-activity)、[30+个RFC](https://github.com/vuejs/rfcs/tree/master/active-rfcs)、[600+次PR](https://github.com/vuejs/vue-next/pulls?q=is%3Apr+is%3Amerged+-author%3Aapp%2Fdependabot-preview+)、[99位贡献者](https://github.com/vuejs/vue-next/graphs/contributors) 
- github上的tags地址：https://github.com/vuejs/vue-next/releases/tag/v3.0.0

### 2.Vue3带来了什么

#### 1.性能的提升

- 打包大小减少41%

- 初次渲染快55%, 更新渲染快133%

- 内存减少54%

  ......

#### 2.源码的升级

- 使用Proxy代替defineProperty实现响应式

- 重写虚拟DOM的实现和Tree-Shaking

  ......

#### 3.拥抱TypeScript

- Vue3可以更好的支持TypeScript

#### 4.新的特性

1. Composition API（组合API）

   - setup配置
   - ref与reactive
   - watch与watchEffect
   - provide与inject
   - ......
2. 新的内置组件
   - Fragment 
   - Teleport
   - Suspense
3. 其他改变

   - 新的生命周期钩子
   - data 选项应始终被声明为一个函数
   - 移除keyCode支持作为 v-on 的修饰符
   - ......

## 一、创建Vue3.0工程

### 1.使用 vue-cli 创建

官方文档：https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create

```bash
## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
vue --version
## 安装或者升级你的@vue/cli
npm install -g @vue/cli
## 创建
vue create vue_test
## 启动
cd vue_test
npm run serve
```

### 2.使用 vite 创建

官方文档：https://v3.cn.vuejs.org/guide/installation.html#vite

vite官网：https://vitejs.cn

- 什么是vite？—— 新一代前端构建工具。
- 优势如下：
  - 开发环境中，无需打包操作，可快速的冷启动。
  - 轻量快速的热重载（HMR）。
  - 真正的按需编译，不再等待整个应用编译完成。
- 传统构建 与 vite构建对比图

<img src="https://cn.vitejs.dev/assets/bundler.37740380.png" style="width:500px;height:280px;float:left" /><img src="https://cn.vitejs.dev/assets/esm.3070012d.png" style="width:480px;height:280px" />

```bash
## 创建工程
npm init vite-app <project-name>
## 进入工程目录
cd <project-name>
## 安装依赖
npm install
## 运行
npm run dev
```

## 二、常用 Composition API

官方文档: https://v3.cn.vuejs.org/guide/composition-api-introduction.html

### 1.拉开序幕的setup

1. 理解：Vue3.0中一个新的配置项，值为一个函数。
2. setup是所有<strong style="color:#DD5145">Composition API（组合API）</strong><i style="color:gray;font-weight:bold">“ 表演的舞台 ”</i>。
3. 组件中所用到的：数据、方法等等，均要配置在setup中。
4. setup函数的两种返回值：
   1. 若返回一个对象，则对象中的属性、方法, 在模板中均可以直接使用。（重点关注！）
   2. <span style="color:#aad">若返回一个渲染函数：则可以自定义渲染内容。（了解）</span>
5. 注意点：
   1. 尽量不要与Vue2.x配置混用
      - Vue2.x配置（data、methos、computed...）中<strong style="color:#DD5145">可以访问到</strong>setup中的属性、方法。
      - 但在setup中<strong style="color:#DD5145">不能访问到</strong>Vue2.x配置（data、methos、computed...）。
      - 如果有重名, setup优先。
   2. setup不能是一个async函数，因为返回值不再是return的对象, 而是promise, 模板看不到return对象中的属性。（后期也可以返回一个Promise实例，但需要Suspense和异步组件的配合）

[vue3的setup语法糖]: https://blog.csdn.net/qq_34093387/article/details/126005287
[ setu语法糖2]:https://blog.csdn.net/bsegebr/article/details/126080409



###  2.ref函数

- 作用: 定义一个响应式的数据
- 语法: `const xxx = ref(initValue)`
  - 创建一个包含响应式数据的<strong style="color:#DD5145">引用对象（reference对象，简称ref对象）</strong>。
  - JS中操作数据： `xxx.value`
  - 模板中读取数据: 不需要.value，直接：`<div>{{xxx}}</div>`
- 备注：
  - 接收的数据可以是：基本类型、也可以是对象类型。
  - 基本类型的数据：响应式依然是靠``Object.defineProperty()``的```get```与```set```完成的。
  - 对象类型的数据：内部 <i style="color:gray;font-weight:bold">“ 求助 ”</i> 了Vue3.0中的一个新函数—— ```reactive```函数。

### 3.reactive函数

- 作用: 定义一个<strong style="color:#DD5145">对象类型</strong>的响应式数据（基本类型不要用它，要用```ref```函数）
- 语法：```const 代理对象= reactive(源对象)```接收一个对象（或数组），返回一个<strong style="color:#DD5145">代理对象（Proxy的实例对象，简称proxy对象）</strong>
- reactive定义的响应式数据是“深层次的”。
- 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据进行操作。

### 4.Vue3.0中的响应式原理

#### vue2.x的响应式

- 实现原理：

  - 对象类型：通过```Object.defineProperty()```对属性的读取、修改进行拦截（数据劫持）。

  - 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。

    ```js
    Object.defineProperty(data, 'count', {
        get () {}, 
        set () {}
    })
    ```

- 存在问题：

  - 新增属性、删除属性, 界面不会更新。
  - 直接通过下标修改数组, 界面不会自动更新。

#### Vue3.0的响应式

- 实现原理: 

  - 通过Proxy（代理）:  拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等。

  - 通过Reflect（反射）:  对源对象的属性进行操作。

  - MDN文档中描述的Proxy与Reflect：

    - Proxy：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy

    - Reflect：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect

      ```js
      new Proxy(data, {
      	// 拦截读取属性值
          get (target, prop) {
          	return Reflect.get(target, prop)
          },
          // 拦截设置属性值或添加新属性
          set (target, prop, value) {
          	return Reflect.set(target, prop, value)
          },
          // 拦截删除属性
          deleteProperty (target, prop) {
          	return Reflect.deleteProperty(target, prop)
          }
      })
      
      proxy.name = 'tom'   
      ```

- 关于Proxy为什么要配合Reflect一起用

  https://blog.csdn.net/qq_45828551/article/details/126251545

  **Proxy 中接受的 receiver 形参，表示代理对象本身 或者 继承了代理对象的对象。**

  **Reflect 中传入的 receiver实参，表示修改执行原始操作时的 this 指向。**
  
  ```js
  let parent = {
    name: "Tom",
    get value() {
      return this.name;
    },
  };
   
  let proxy = new Proxy(parent, {
    get(target, key, receiver) {
      return target[key]; // 等同于没有传入receiver的Reflect: return Reflect.get(target, key) 
    },
  });
   
  let child = { name: "小Tom" };
  // 设置 child 继承 代理对象 proxy
  Object.setPrototypeOf(child, proxy);
   
  console.log(child.value);
  
  // 因为child没有value属性，但是它继承的 proxy 对象中存在 value 属性的访问方法
  // 所以触发proxy上的get value()，由于访问的是proxy上的value属性，所以this指向了proxy
  ```
  
  ```js
  // Reflect传入receiver参数时，把属性访问中的this指向了receiver对象
  let proxy = new Proxy(parent, {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver);
    },
  });
  ```
  
  

### 5.reactive对比ref

-  从定义数据角度对比：
   -  ref用来定义：<strong style="color:#DD5145">基本类型数据</strong>。
   -  reactive用来定义：<strong style="color:#DD5145">对象（或数组）类型数据</strong>。
   -  备注：ref也可以用来定义<strong style="color:#DD5145">对象（或数组）类型数据</strong>, 它内部会自动通过```reactive```转为<strong style="color:#DD5145">代理对象</strong>。
-  从原理角度对比：
   -  ref通过``Object.defineProperty()``的```get```与```set```来实现响应式（数据劫持）。
   -  reactive通过使用<strong style="color:#DD5145">Proxy</strong>来实现响应式（数据劫持）, 并通过<strong style="color:#DD5145">Reflect</strong>操作<strong style="color:orange">源对象</strong>内部的数据。
-  从使用角度对比：
   -  ref定义的数据：操作数据<strong style="color:#DD5145">需要</strong>```.value```，读取数据时模板中直接读取<strong style="color:#DD5145">不需要</strong>```.value```。
   -  reactive定义的数据：操作数据与读取数据：<strong style="color:#DD5145">均不需要</strong>```.value```。

### 6.setup的两个注意点

- setup执行的时机
  - 在beforeCreate之前执行一次，this是undefined。

- setup的参数
  - props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
  
    ```
    export default {
    	props: ['message'],
    	setup(props, context) {
    		console.log(props.text);
    	}
    }
    
    // setup语法糖
    const props = defineProps(['message']);
    console.log(props.text);
    ```
  
    
  
  - context：上下文对象
    - attrs: 值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性, 相当于 ```this.$attrs```。
  
    - slots: 收到的插槽内容, 相当于 ```this.$slots```。
  
    - emit: 分发自定义事件的函数, 相当于 ```this.$emit```。
  
      ```
      // App.vue
      <template>
      	<Child v-bind="attrs" @btnClick="btnClick">
      		<v-slot>default</v-slot>
              <template #hello>
                  hello world
              </template>
          </Child>
      </template>
      <script setup>
      const attrs = {
      	id: 'child',
      	a: 1,
      	b: 2
      }
      const btnClick = (params) => {
      	console.log("===btnClick", params);
      }
      </script>
      
      // Child.vue
      <template>
      	<div id="test">
              props: {{ props.count }}
              <br />
              attrs: {{ attrs.a }}----{{ attrs.b }}
              <br />
              slot: <slot></slot>
              <br />
              hello slot: <slot name="hello"></slot>
              <button @click="btnClick">点我!</button>
          </div>
      </template>
      <script setup>
      import { useAttrs, useSlots } from 'vue';
      const attrs = useAttrs();
      const slots = useSlots();
      const emits = defineEmits(['btnClick']);
      
      const btnClick = () => {
      	emits('btnClick', 'this is btnClick params');
      }
      </script>
      
      // 非setup语法糖
      <script>
      export default {
      	emits: ['btnClick'], // 这里定义了ctx里面才会有该方法
      	setup(props, ctx) {
      		const btnClick = () => {
      			ctx.emit('btnClick', 'this is btnClick params');
      		}
      		
      		return { btnClick }
      	}
      }
      </script>
      ```
      
      


### 7.计算属性与监视

#### 1.computed函数

- 与Vue2.x中computed配置功能一致

- 写法

  ```js
  import {computed} from 'vue'
  
  setup(){
      ...
  	//计算属性——简写
      let fullName = computed(()=>{
          return person.firstName + '-' + person.lastName
      })
      //计算属性——完整
      let fullName = computed({
          get(){
              return person.firstName + '-' + person.lastName
          },
          set(value){
              const nameArr = value.split('-')
              person.firstName = nameArr[0]
              person.lastName = nameArr[1]
          }
      })
  }
  ```

#### 2.watch函数

- 与Vue2.x中watch配置功能一致

- 两个小“坑”：

  - 监视reactive定义的响应式数据时：oldValue无法正确获取、强制开启了深度监视（deep配置失效）。
  - 监视reactive定义的响应式数据中某个属性时：deep配置有效。

  ```js
  //情况一：监视ref定义的响应式数据
  watch(sum,(newValue,oldValue)=>{
  	console.log('sum变化了',newValue,oldValue)
  },{immediate:true})
  
  //情况二：监视多个ref定义的响应式数据
  watch([sum,msg],(newValue,oldValue)=>{
  	console.log('sum或msg变化了',newValue,oldValue)
  }) 
  
  /* 情况三：监视reactive定义的响应式数据
  			若watch监视的是reactive定义的响应式数据，则无法正确获得oldValue！！
  			若watch监视的是reactive定义的响应式数据，则强制开启了深度监视 
  */
  watch(person,(newValue,oldValue)=>{
  	console.log('person变化了',newValue,oldValue)
  },{immediate:true,deep:false}) //此处的deep配置不再奏效
  
  //情况四：监视reactive定义的响应式数据中的某个属性
  watch(()=>person.job,(newValue,oldValue)=>{
  	console.log('person的job变化了',newValue,oldValue)
  },{immediate:true,deep:true}) 
  
  //情况五：监视reactive定义的响应式数据中的某些属性
  watch([()=>person.job,()=>person.name],(newValue,oldValue)=>{
  	console.log('person的job变化了',newValue,oldValue)
  },{immediate:true,deep:true})
  
  //特殊情况
  watch(()=>person.job,(newValue,oldValue)=>{
      console.log('person的job变化了',newValue,oldValue)
  },{deep:true}) //此处由于监视的是reactive素定义的对象中的某个属性，所以deep配置有效
  ```

#### 3.watchEffect函数

- watch的套路是：既要指明监视的属性，也要指明监视的回调。

- watchEffect的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。

- watchEffect有点像computed：

  - 但computed注重的计算出来的值（回调函数的返回值），所以必须要写返回值。
  - 而watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值。

  ```js
  //watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
  watchEffect(()=>{
      const x1 = sum.value
      const x2 = person.age
      console.log('watchEffect配置的回调执行了')
  })
  ```

### 8.生命周期
![vue3生命周期](/notes/img/vue3lifecycle.png)

- Vue3.0中可以继续使用Vue2.x中的生命周期钩子，但有有两个被更名：
  - ```beforeDestroy```改名为 ```beforeUnmount```
  - ```destroyed```改名为 ```unmounted```

- Vue3.0也提供了 Composition API 形式的生命周期钩子，与Vue2.x中钩子对应关系如下：
  - `beforeCreate`===>`setup()`
  - `created`=======>`setup()`
  - `beforeMount` ===>`onBeforeMount`
  - `mounted`=======>`onMounted`
  - `beforeUpdate`===>`onBeforeUpdate`
  - `updated` =======>`onUpdated`
  - `beforeUnmount` ==>`onBeforeUnmount`
  - `unmounted` =====>`onUnmounted`

- 父子组件生命周期触发顺序

  - 组件加载时

    父组件onBeforeMount -> 子组件onBeforeMount -> 子组件onMounted -> 父组件onMounted

  - 子组件更新时

    子组件onBeforeUpdate -> 子组件onUpdated- > 父组件onBeforeUpdate -> 父组件onUpdated

  - 父组件更新时，如果不涉及到传给子组件的值变更，子组件不会触发钩子函数，如果有的话

    父组件onBeforeUpdate -> 子组件onBeforeUpdate -> 子组件onUpdated- > 父组件onUpdated

### 9.自定义hook函数

- 什么是hook？—— 本质是一个函数，把setup函数中使用的Composition API进行了封装。
- 类似于vue2.x中的mixin。
- 自定义hook的优势: 复用代码, 让setup中的逻辑更清楚易懂。

```vue
// hook.js
import {onBeforeMount, onBeforeUnmount, reactive} from 'vue'
export default function () {
    const point = reactive({
        x:0,
        y:0
    })
    function savePoint (event) {
        point.y = event.pageY
        point.x = event.pageX
        console.log('x,y', point.y, point.x)
    }
    onBeforeMount(() => {
        // 监听click事件
        window.addEventListener('click',savePoint)
    })
    onBeforeUnmount(() => {
        window.removeEventListener('click',savePoint)
    })
    return point
};

// com.js
<template>
    <h2>当前求和为：{{ sum }}</h2>
    <button @click="sum++">点我+1</button>
    <h2>{{point}}</h2>
</template>
<script>
    import usePoint from './hook.js';
    import {ref} from 'vue';
    export default {
        name: 'Demo',
        setup(){
            //数据
            let sum = ref(0)
            // 引用公共hook函数
            let point = usePoint()
            return {
                sum,
                point
            }
        }
    }
</script>
```

### 10.toRef/toRefs

- 作用：创建一个 ref 对象，其value值指向另一个对象中的某个属性。
- 语法：```const name = toRef(person,'name')```
- 应用:   要将响应式对象中的某个属性单独提供给外部使用时。


- 扩展：```toRefs``` 与```toRef```功能一致，但可以批量创建多个 ref 对象，语法：```toRefs(person)```


## 三、其它 Composition API

### 1.shallowReactive 与 shallowRef

- shallowReactive：只处理对象最外层属性的响应式（浅响应式）。
- shallowRef：只处理基本数据类型的响应式, 不进行对象的响应式处理。

- 什么时候使用?
  -  如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。
  -  如果有一个对象数据，后续功能不会修改该对象中的属性，而是生成新的对象来替换 ===> shallowRef。

### 2.readonly 与 shallowReadonly

- readonly: 让一个响应式数据变为只读的（深只读）。
- shallowReadonly：让一个响应式数据变为只读的（浅只读）。
- 应用场景: 不希望数据被修改时。

### 3.toRaw 与 markRaw

- toRaw：
  - 作用：将一个由```reactive```生成的<strong style="color:orange">响应式对象</strong>转为<strong style="color:orange">普通对象</strong>。是把响应式对象复制一份数据，让这个数据变成普通对象, 就是不改变原对象, 返回值就是普通对象。
  - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。
- markRaw：
  - 作用：标记一个对象，使其永远不会再成为响应式对象。
  - 应用场景:
    1. 有些值不应被设置为响应式的，例如复杂的第三方类库等。
    2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。

### 4.customRef

- 作用：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。

- 实现防抖效果：

  ```vue
  <template>
  	<input type="text" v-model="keyword">
  	<h3>{{keyword}}</h3>
  </template>
  
  <script>
  	import {ref,customRef} from 'vue'
  	export default {
  		name:'Demo',
  		setup(){
  			// let keyword = ref('hello') //使用Vue准备好的内置ref
  			//自定义一个myRef
  			function myRef(value,delay){
  				let timer
  				//通过customRef去实现自定义
  				return customRef((track,trigger)=>{
  					return {
  						get(){
  							track() //告诉Vue这个value值是需要被“追踪”的
                                  return value
                              },
                              set(newValue){
                                  // 防抖
                                  clearTimeout(timer)
                                  timer = setTimeout(()=>{
                                      value = newValue
                                      trigger() //告诉Vue去更新界面
                                  },delay)
                              }
  						}
  				})
  			}
  			let keyword = myRef('hello',500) //使用程序员自定义的ref
  			return {
  				keyword
  			}
  		}
  	}
  </script>
  ```
  

### 5. provide 与 inject

- 作用：实现<strong style="color:#DD5145">祖与后代组件间</strong>通信

- 套路：父组件有一个 `provide` 选项来提供数据，后代组件有一个 `inject` 选项来开始使用这些数据

- 具体写法：

  1. 祖组件中：

     ```js
     setup(){
     	......
         let car = reactive({name:'奔驰',price:'40万'})
         provide('car',car)
         ......
     }
     ```

  2. 后代组件中：

     ```js
     setup(props,context){
     	......
         const car = inject('car')
         return {car}
     	......
     }
     ```

### 6.响应式数据的判断

- isRef: 检查一个值是否为一个 ref 对象
- isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理
- isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理
- isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理

## 四、Composition API 的优势

### 1.Options API 存在的问题

使用传统OptionsAPI中，新增或者修改一个需求，就需要分别在data，methods，computed里修改 。

<div style="width:600px;height:370px;overflow:hidden;float:left">
    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f84e4e2c02424d9a99862ade0a2e4114~tplv-k3u1fbpfcp-watermark.image" style="width:600px;float:left" />
</div>
<div style="width:300px;height:370px;overflow:hidden;float:left">
    <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5ac7e20d1784887a826f6360768a368~tplv-k3u1fbpfcp-watermark.image" style="zoom:50%;width:560px;left" /> 
</div>


















### 2.Composition API 的优势

我们可以更加优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起。

<div style="width:500px;height:340px;overflow:hidden;float:left">
    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc0be8211fc54b6c941c036791ba4efe~tplv-k3u1fbpfcp-watermark.image"style="height:360px"/>
</div>
<div style="width:430px;height:340px;overflow:hidden;float:left">
    <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cc55165c0e34069a75fe36f8712eb80~tplv-k3u1fbpfcp-watermark.image"style="height:360px"/>
</div>


















## 五、新的组件

### 1.Fragment

- 在Vue2中: 组件必须有一个根标签
- 在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中
- 好处: 减少标签层级, 减小内存占用

### 2.Teleport

- 什么是Teleport？—— `Teleport` 是一种能够将我们的<strong style="color:#DD5145">组件html结构</strong>移动到指定位置的技术。

  ```vue
  <teleport to="移动位置（可以是#id或者直接用标签html、body）">
  	<div v-if="isShow" class="mask">
  		<div class="dialog">
  			<h3>我是一个弹窗</h3>
  			<button @click="isShow = false">关闭弹窗</button>
  		</div>
  	</div>
  </teleport>
  ```

### 3.Suspense

- 等待异步组件时渲染一些额外内容，让应用有更好的用户体验

  - 同步组件：A组件中包含一个B组件，B组件未渲染完成时整个A都不显示
  - 异步组件：A组件中包含一个异步组件B，B组件未渲染完成时A中B不占位

  解决异步组件的问题可以使用Suspense，常见的使用场景：B组件未渲染时显示loading提示

- 使用步骤：

  - 异步引入组件

    ```js
    import {defineAsyncComponent} from 'vue'
    const Child = defineAsyncComponent(()=>import('./components/Child.vue'))
    ```

  - 使用```Suspense```包裹组件，并配置好```default``` 与 ```fallback```

    ```vue
    <template>
    	<div class="app">
    		<h3>我是App组件</h3>
    		<Suspense>
                // 这里的default不允许修改
    			<template v-slot:default>
    				<Child/>
    			</template>
    			<template v-slot:fallback>
    				<h3>加载中.....</h3>
    			</template>
    		</Suspense>
    	</div>
    </template>
    ```

## 六、其他

### 1.全局API的转移

- Vue 2.x 有许多全局 API 和配置。

  - 例如：注册全局组件、注册全局指令等。

    ```js
    //注册全局组件
    Vue.component('MyButton', {
      data: () => ({
        count: 0
      }),
      template: '<button @click="count++">Clicked {{ count }} times.</button>'
    })
    
    //注册全局指令
    Vue.directive('focus', {
      inserted: el => el.focus()
    }
    ```

- Vue3.0中对这些API做出了调整：

  - 将全局的API，即：```Vue.xxx```调整到应用实例（```app```）上

    | 2.x 全局 API（```Vue```） | 3.x 实例 API (`app`)                        |
    | ------------------------- | ------------------------------------------- |
    | Vue.config.xxxx           | app.config.xxxx                             |
    | Vue.config.productionTip  | <strong style="color:#DD5145">移除</strong> |
    | Vue.component             | app.component                               |
    | Vue.directive             | app.directive                               |
    | Vue.mixin                 | app.mixin                                   |
    | Vue.use                   | app.use                                     |
    | Vue.prototype             | app.config.globalProperties                 |

### 2.其他改变

- data选项应始终被声明为一个函数。

- 过度类名的更改：

  - Vue2.x写法

    ```css
    .v-enter,
    .v-leave-to {
      opacity: 0;
    }
    .v-leave,
    .v-enter-to {
      opacity: 1;
    }
    ```

  - Vue3.x写法

    ```css
    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }
    
    .v-leave-from,
    .v-enter-to {
      opacity: 1;
    }
    ```

- <strong style="color:#DD5145">移除</strong>keyCode作为 v-on 的修饰符，同时也不再支持```config.keyCodes```

- <strong style="color:#DD5145">移除</strong>```v-on.native```修饰符

  - 父组件中绑定事件

    ```vue
    <my-component
      v-on:close="handleComponentEvent"
      v-on:click="handleNativeClickEvent"
    />
    ```

  - 子组件中声明自定义事件

    ```vue
    <script>
      export default {
        emits: ['close']
      }
    </script>
    ```

- <strong style="color:#DD5145">移除</strong>过滤器（filter）

  > 过滤器虽然这看起来很方便，但它需要一个自定义语法，打破大括号内表达式是 “只是 JavaScript” 的假设，这不仅有学习成本，而且有实现成本！建议用方法调用或计算属性去替换过滤器。

- ......

## vue3 setup语法糖

### 基础用法

```vue
<script setup>
    console.log("=============")
</script>
```

### data和methods

```vue
<template>
    <h1>{{ msg }}</h1>
    <p>{{obj.key}}</p>
    <input v-model="num" type="text" />
    <button @click="log">打印日志</button>
</template>

<script setup>
    import { ref, reactive } from 'vue';
    const msg = ref('');
    const obj = reactive({
        key: ''
    });
    const num = ref('');
    
    const log = () => {
        console.log("======log")
    }
</script>
```

### 计算属性

```vue
<template>
    <h1>计数：{{ countPlus }}</h1>
</template>

<script setup>
import { ref, computed } from 'vue'

let count = ref(0)；
const countPlus = computed(()=>{
    return count.value + 1;
})；
</script>

```

### watch/watchEffect

```vue
<template>
    <button @click="onChange">改变count</button>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
// 监听ref
let count = ref(0)
watch(count, (newVal, oldVal)=> {
    console.log('修改后', newVal)
    console.log('修改前', oldVal)
})

// 监听reactive属性
const obj = reactive({
    count: 0
})
watch(
    ()=> obj.count,     // 一个函数，返回监听属性
    (newVal, oldVal)=> {
        console.log('修改后', newVal);
        console.log('修改前', oldVal)
    },
    {
        immediate: true,     // 立即执行，默认为false
        deep: true     // 深度监听，默认为false
    }
)
    
// watchEffect
watchEffect(() => {
     console.log('修改后', count.value);
     console.log('修改后', obj.count);
})

const onChange = function(){
    count.value++
    obj.count++
}
</script>
```

### 声明props和emits

```vue
// Child.vue
<template>
    <h1>信息：{{ info }}</h1>
    <button @click="onChange">点击我</button>
</template>

<script setup>
// 声明props
const props = defineProps({
    info: {
        type: String,
        default: ''
    }
})
// 声明emits
const $emit = defineEmits(['change'])

const onChange = function() {
    $emit('change', 'child返回值')
}
</script>

// Parent.vue
<template>
    <child :info="msg" @change="onAction"></child>
</template>

<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const msg = ref('hello setup !')    // 响应式变量

const onAction = function(event) {
    console.log(event)    // child返回值
}
</script>
```

### 父组件获取子组件的数据

父组件要想通过ref获取子组件的变量或函数，子组件须使用**defineExpose**暴露出去

```vue
// Child.vue
<template>
    <h1>信息：{{ info }}</h1>
    <button @click="onChange">点击我</button>
</template>

<script setup>
import { ref, defineExpose } from 'vue'

const info = ref('I am child')
const onChange = function() {
    console.log('Function of child')
}
// 暴露属性
defineExpose({
    info,
    onChange
})
</script>

// Parent.vue
<template>
    <child ref="childRef"></child>
    <button @click="onAction">获取子值</button>
</template>

<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const childRef = ref()
const onAction = function() {
    console.log(childRef.value.info)    // I am child
    console.log(childRef.value.onChange())    // Function of child
}
</script>
```

### 动态css

```vue
<template>
  <p>hello</p>
</template>

<script setup>
const theme = {
  color: 'red'
}
</script>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>

```

## Pinia

一个vue的store存储库。

### 与vuex的比较

- 去掉了*mutations* 
- 不再有 *modules* 的嵌套结构
- 没有 *命名空间模块*

### 安装

```sh
yarn add pinia
# 或者使用 npm
npm install pinia
```

```js
// 在main.js中使用
import { createApp } from 'vue';
import { createPinia } from 'pinia';

const pinia = createPinia();
const app = createApp();

app.use(pinia).mount('#app');
```

### 定义一个Store

- **State**: 返回初始状态数据的函数
- **Getters**: 等同于 Store 状态的计算值
  - 可以在getters的方法中使用`this`
  - 可以在使用时执行给该方法传值
- **Actions**: 方法，用于操作`State`中的数据

**可以使用其他store中的数据**

```js
// store/user.js
import { defineStore } from 'pinia';

import { usePointStore } from './auth-store';
const pointStore = usePointStore();

export const useUserStore = defineStore('user', {
    state: () => ({
        counter: 0,
        users: [],
    }),
    getters: {
        doubleCount: (state) => state.counter * 2,
        doubleCountPlusOne() {
            return this.doubleCount + 1;
        },
        getUserById: (state) => {
          	return (userId) => state.users.find((user) => user.id === userId);
        },
        getOtherStore: () => {
            return pointStore.pointId;
        },
    },
    actions: {
        increment() {
            this.counter += 1;
        }
    }
})
```

### 使用

```vue
<script setup>
    import { useUserStore } from '@/store/user.js'
    const userStore = useUserStore();

    // 获取state
    console.log(userStore.counter);
    
    // 获取getter
    console.log(userStore.doubleCount);
    console.log(userStore.doubleCountPlusOne);
    
    // getter传值
    console.log(userStore.getUserById('123'));
    
    // 执行actions
    userStore.increment();
    
</script>
```

```vue
<script>
    import { mapState } from 'pinia'
    import { useUserStore } from '@/store/user.js'

    export default {
          computed: {
            ...mapState(useUserStore, ['counter', 'doubleCount']),
          },
        methods: {
            ...mapActions(useUserStore, ['increment'])
        }
    }

</script>
```

### 改变状态

```js
// 直接修改
store.counter = 1;
// $patch
store.$patch({
    counter: 1,
});
store.$patch((state) => {
    state.counter = 1;
})
// 整个替换state
store.$state = { name: 'hello' }
```

## 面试题
