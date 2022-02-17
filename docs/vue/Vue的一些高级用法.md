# **兼容性**

Vue 不支持 IE8 及以下版本，因为 Vue 使用了 IE8 无法模拟的 ECMAScript 5 特性。但它支持所有兼容 ECMAScript 5 的浏览器。  
通过使用 **v-once** 指令，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。但请留心这会影响到该节点上的其它数据绑定  
双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，你需要使用 **v-html** 指令  
mustache 语法(双大括号)不能作用在 HTML 特性(属性)上，遇到这种情况应该使用 *v-bind* 指令(v-bind:id)  

# 一些高级应用

## 组件中name的作用

1. 使用keep-alive时通过name进行过滤
2. 递归组件使用

## sync

`<comp :foo.sync="bar"></comp>`

相当于

`<comp :foo="bar" @update:foo="val => bar = val"></comp>`

子组件中需要更新bar值时

`this.$emit('update:foo', newValue)`

## 自定义组件的v-model

`<comp v-modal="val">`

相当于

`<comp :value="val" @input="newVal=> val = newVal">`

## 监听组件生命周期

当子组件某个生命周期完成之后通知父组件，然后在父组件做对应的处理

1. 传统方式

   ```
   // 子组件在对应的钩子中发布事件  
   created(){  
   this.$emit('done')  
   }  
   
   // 父组件订阅 
   <list @done="childDone">
   ```

2. @hook

   `<list @hook:mounted="listMounted" />`

## 路由组件传参

1. 布尔模式

   如果 `props` 被设置为 `true`，`route.params` 将会被设置为组件属性。

2. 对象模式

   如果 `props` 是一个对象，它会被按原样设置为组件属性。当 `props` 是静态的时候有用。

3. 函数模式

   你可以创建一个函数返回 `props`。这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等。

   请尽可能保持 `props` 函数为无状态的，因为它只会在路由发生变化时起作用。如果你需要状态来定义 `props`，请使用包装组件，这样 Vue 才可以对状态变化做出反应

## 定时器优化

一般需要用到定时器的情况，我们会定义一个额外的变量来定义定时器，它的作用仅用于在beforeDestory内取到定时器来清除。除此之外，没有其他作用。

如果可以的话，最好只有生命周期钩子可以访问到它

具体实现如下：

```
mounted() {  
    this.creatInterval('hello')  
    this.creatInterval('world')  
},  
creatInterval(msg) {  
    let timer = setInterval(() => {  
        console.log(msg)  
    }, 1000)  
    this.$once('hook:beforeDestroy', function() {  
        clearInterval(timer)  
    })
}
```

