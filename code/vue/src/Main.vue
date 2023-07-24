<template>
    <div class="bg"></div>
    <Campus count="1" @vue:mounted="campusMounted" v-bind="attrs">
        <v-slot>default</v-slot>
        <template #hello>
            hello world
        </template>
    </Campus>
    <div class="container">
        <div>{{ store.state.count }}</div>
        <div id="notice"></div>
        <div>router.currentRoute.value.name: {{ router.currentRoute.value.name  }}</div> 
        <router-view class="page-container" :msg="123" @init="routerPageInit"></router-view>
        <div class="menu-wrap">
            <router-link :to="{path: page.path, query: {msg: 'hhtest'}}" custom v-slot="{ navigate, isActive }" v-for="page in pages">
                <div class="menu" @click="navigate(), changeMenu(page)" role="link" :class="{active: isActive}">{{ page.name }}</div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { onBeforeUpdate, onBeforeMount, onMounted, onUpdated, provide, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import extendJs from './extendJs';

import Campus from '@/components/Campus.vue';

const attrs = {
    id: 'campusDiv',
    a: 1,
    b: 2
}

const store = useStore();
const router = useRouter();

const pages = [{
    path: '/overview',
    name: '总览'
}, {
    path: '/comprehensive',
    name: '综合'
}];

const changeMenu = (item) => {
    console.log("===changeMenu", item);
}

const campusMounted = () => {
    console.log("===campusMounted");
}


const provideData = reactive({
    msg: '123',
    data: 'hhh'
});

provide('appProvide', provideData);

const routerPageInit = (page) => {
    console.log(`=============${page} loadInit`)
}

onBeforeUpdate(() => {
    console.log("========App.vue onBeforeUpdate")
});

onUpdated(() => {
    console.log("========App.vue onUpdated")
});

onBeforeMount(() => {
    console.log("========App.vue onBeforeMount")
})

onMounted(() => {
    console.log("========App.vue onMounted");
    setTimeout(() => {
        store.commit('setCount', 1)
    }, 200)
    extendJs({
        message: '121231'
    });
})
</script>

<style lang="scss" scoped>
.bg, .container {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: azure;
    user-select: none;
}

.container {
    z-index: 3;
    background-color: transparent;
    .menu-wrap {
        display: flex;
        width: 200px;
        justify-content: space-between;

        .menu {
            cursor: pointer;

            &.active {
                color: red;
            }
        }
    }
}

</style>