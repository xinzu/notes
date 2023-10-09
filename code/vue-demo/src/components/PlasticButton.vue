<!--
 * @Description  : 自定义元素-组件
 * @Author       : yanhuan
 * @Date         : 2023-10-09 16:42:16
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-10-09 16:42:16
-->
<template>
    <div>自定义元素</div>
    <div>{{ props.data }}</div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Number,
        default: 0
    }
});
</script>
<style lang='scss' scoped>

</style>