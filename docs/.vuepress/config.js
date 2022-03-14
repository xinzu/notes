/*
 * @Description  : 
 * @Author       : yanhuan
 * @Date         : 2022-02-17 15:49:59
 * @LastEditors  : yanhuan
 * @LastEditTime : 2022-03-14 15:40:28
 */
module.exports = {
  title: 'yh的学习文档',
  base: '/notes/',
  dest: 'dist',
  themeConfig: {
    sidebar: [
      {
        title: '基础知识扩展',
        children: [
          {
            title: '对象',
            path: '/基础知识扩展/对象.md',
          },
          {
            title: '正则',
            path: '/基础知识扩展/正则.md',
          },
          {
            title: '存储机制',
            path: '/基础知识扩展/存储机制.md',
          },
          {
            title: '禁用弹出框后退页面',
            path: '/基础知识扩展/禁用弹出框后退页面.md',
          },
          {
            title: '强制360浏览采用哪种内核',
            path: '/基础知识扩展/强制360浏览采用哪种内核.md',
          },
          {
            title: 'setTimeout',
            path: '/基础知识扩展/setTimeout.md',
          },
        ]
      },
      {
        title: 'css',
        children: [
          {
            title: 'css布局',
            path: '/css/布局.md',
          },
          {
            title: 'scss',
            path: '/css/scss、less.md',
          },
        ]
      },
      {
        title: 'http',
        children: [{
          title: 'http状态码',
          path: '/http/http状态码.md',
        }]
      },
      {
        title: 'vue',
        children: [
          {
            title: 'vue2',
            path: '/vue/vue.md'
          }, {
            title: 'vue2的一些高级用法',
            path: '/vue/Vue的一些高级用法.md',
          }, {
            title: 'vue3',
            path: '/vue/Vue3.md',
          }
        ]
      }, {
        title: 'react',
        children: [
          {
            title: 'react',
            path: '/react/react.md',
          }, {
            title: 'react-native',
            path: '/react/react-native.md'
          }
        ]
      }, {
        title: 'typescript',
        path: '/typescript/ts.md',
      }, {
        title: '工具类',
        children: [
          {
            title: 'fiddler',
            path: '/工具类/fiddler/fiddler工具使用.md',
          }
        ]
      },
    ]
  }
}