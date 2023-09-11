## Vuex

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