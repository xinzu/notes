<!--
 * @Description  : 文件预览
 * @Author       : yanhuan
 * @Date         : 2022-08-23 11:17:49
 * @LastEditors  : yanhuan
 * @LastEditTime : 2022-08-23 11:52:37
-->
<template>
    <div id="app">
        <h1>列表展示</h1>
        <xd-file-list-preview :show-close="showClose" :list="list" @remove="handleRemoveClick"></xd-file-list-preview>
        <hr>
        <h1>文件预览模式</h1>
        <a @click="handleClick" style="color: #4285f4">9958ff80d202f91b347b14b5c56f14e811</a>
    </div>
</template>

<script>
  export default {
    name: 'app',
    components: {},
    data() {
      return {
        showClose: true, //是否开启删除功能
        list: [
          {url: 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf'},
          {url: 'https://jfb-public-images.oss-cn-qingdao.aliyuncs.com/admin-upload/202111081034429231.png?x-oss-process=style/common'},
          {url: 'http://basex.uino.com/twinfile/1556474769844023298.docx', name: 'aaaa'},
          {
            url: 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf',
            name: 'aaaa',
            fid: 'aadadads',
            download: false ,//是否展示下载按钮
          },
        ]
      }
    },
    created() {
    },
    methods: {
      /**
       * @description 删除图片事件
       * @param item {Object} 当前被删除的文件对象
       * @param done {function} 删除文件完成回调函数
       */
      handleRemoveClick(item, done) {
        setTimeout(() => {
          console.log('handleRemoveClick', item);
          done()
        }, 2000);
      },

      /**
       * @description 点击查看预览功能
       */
      handleClick() {
        this.$preview({
          url: 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf',
          fid: 'aadadads',
          download: false ,//是否展示下载按钮
        })
      },
    }
  }
</script>

<style>
</style>