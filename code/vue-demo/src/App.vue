<template>
    <plastic-button :data="plasticData"></plastic-button>
    <router-view></router-view>
</template>

<script setup>
import { onMounted, onBeforeMount, ref } from 'vue';
import { register } from './components'
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();

const addRoutes = () => {
    const routes = {
        name: 'addTest',
        path: '/addTest',
        component: () => import('@/views/overview/AddTest.vue'),
    }
    router.addRoute('main', routes);
    // router.addRoute(routes);

    console.log(router.getRoutes());
}

const plasticData = ref(0);

onBeforeMount(() => {
    register();
    addRoutes();
})
onMounted(() => {
    setInterval(() => {
        plasticData.value++;
    }, 5000)
})

</script>

<style lang='scss' scoped>
input {
    border: 1px solid black;
}
</style>