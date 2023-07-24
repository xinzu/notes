<!--
 * @Description  : 
 * @Author       : yanhuan
 * @Date         : 2023-06-19 17:54:32
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-07-20 13:12:07
-->
<template>
    <div>OverviewOverviewOverviewOverview</div>
    <div @click="changeOverview2">点击跳到overview2----编程式导航</div>
    <router-view class="overview-page" v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" />
        </transition>
    </router-view>
    <router-link :to="page.path" v-for="page in pages" :key="page.path">{{ page.name }}</router-link>
</template>

<script setup>
import { onBeforeUpdate, onUpdated, onBeforeMount, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const pages = [{
    path: '/overview1',
    name: 'overview1'
}, {
    path: '/overview/overview2',
    name: 'overview2'
}]

const router = useRouter();
const route = useRoute();

const changeOverview2 = () => {
    router.push({
        name: 'overview2',
    });
}

onBeforeUpdate(() => {
    console.log("========Overview.vue onBeforeUpdate")
});

onUpdated(() => {
    console.log("========Overview.vue onUpdated")
});

onBeforeMount(() => {
    console.log("========Overview.vue onBeforeMount")
})

onMounted(() => {
    console.log("=====useRoute", route.query, route.params)
    console.log("=====useRouter", router);
    console.log("========Overview.vue onMounted")
})
</script>
<style lang='scss' scoped>

</style>