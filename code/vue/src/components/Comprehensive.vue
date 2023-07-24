<!--
 * @Description  : 
 * @Author       : yanhuan
 * @Date         : 2023-06-19 17:54:45
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-07-20 11:57:51
-->
<template>
    <div>ComprehensiveComprehensiveComprehensiveComprehensive</div>
</template>

<script>
export default {
    props: ['msg'],
    emits: ['init'],
    setup(props, ctx) {
        console.log(props, ctx);
        ctx.emit('init');
    }
}
</script>
<style lang='scss' scoped>

</style>