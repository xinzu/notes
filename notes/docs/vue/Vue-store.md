## Vuex

### 安装

```sh
yarn add vuex@next
# 或者使用 npm
npm install vuex@next
```

```js
// 在main.js中使用
import { createApp } from 'vue';
import store from '@/store'

const app = createApp();

app.use(store).mount('#app');
```

### 定义一个Store

- **State**: 返回初始状态数据的函数
- **Getters**: 等同于 Store 状态的计算值
  - 可以在getters的方法中使用`this`
  - 可以在使用时执行给该方法传值
- **Mutation**: 更改 Vuex 的 store 中的状态，使用`commit`调用
- **Actions**: 提交一个mutation，可以包含任意异步操作，使用`dispatch`调用
- **Modules**: 将 store 分割成**模块**，每个模块都有自己的 state 、getters、mutation、action，甚至可以嵌套子模块modules

```js
// store/index.js
import { createStore } from 'vuex';
import user from './modules/user';

export default createStore({
    modules: {
        user,
    },
});

//store/user.js
const user = {
    state: {
        counter: 0,
        users: [{
            '1': 'user1',
            '2': 'user2'
        }],
    },
    getters: {
        doubleCount: (state) => state.counter * 2,
        doubleCountPlusOne() {
            return this.doubleCount + 1;
        },
        getUserById: (state) => {
          	return (userId) => state.users.find((user) => user.id === userId);
        }
    },
    mutations: {
        increment() {
            this.counter += 1;
        }
    },
    actions: {
        increment (context) {
          	context.commit('increment')
        }
    },
};

export default user;
```

- **strict**: 严格模式下，store中的数据变更必须通过mutation

### 使用

```js
// 在js文件中使用
import store from '@/store'

// 获取store数据
store.state.user.count
// getters拿到的是空对象？？？？
store.getters

// 派发事件
// 如果创建store时没有将namespace设为true，会执行所有的同名方法
store.commit('increment');
store.dispatch('increment');

// namespace为true的情况
store.commit('user/increment');
store.dispatch('user/increment');
```

### 辅助函数 

- **mapState**
- **mapGetters**
- **mapMutation**
- **mapActions**

```js
// 在vue3 setup语法糖中使用 [非常之麻烦]

// 获取state
const storeStateFns = mapState('user', ['counter']);
const storeState = {};
Object.keys(storeStateFns).forEach(fnnKey=>{
    const fn = storeStateFns[fnnKey].bind({$store:store})
    storeState[fnnKey] = computed(fn)
})
storeState.counter; 

// 派发Mutation事件
const storeMutationFns = mapMutations('user', ['increment']);
const storeMutation = {};
Object.keys(storeMutationFns).forEach(fnnKey=>{
    storeMutation[fnnKey] = storeMutationFns[fnnKey].bind({$store:store});
})
storeMutation.increment();
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

## 