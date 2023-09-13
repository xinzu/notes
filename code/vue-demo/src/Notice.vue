<!--
 * @Description  : 
 * @Author       : yanhuan
 * @Date         : 2023-06-19 12:07:42
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-06-20 17:10:05
-->
<template>
    <div class="notice">{{ props.message }}-{{ router.currentRoute.value.name }}</div>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    props: ['message'],
    setup(props, context) {
        console.log(props, context);
        const store = useStore();
        const router = useRouter();

        onMounted(() => {
            // console.log("=====Notice.vue updated", store.state.count)
            // store.commit('setLoadNotice', true)
        })
        return {
            props,
            router
        }
    }
}
</script>
<style lang='scss' scoped>
.notice {
    color: red;
    font-size: 15px;
}
</style>