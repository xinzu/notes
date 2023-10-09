<template>
    <plastic-button :data="plasticData"></plastic-button>
    <router-view></router-view>
</template>

<script setup>
import { onMounted, onBeforeMount, ref } from 'vue';
import { register } from './components'

const list = ref([]);
const handleAdd = () => {
    let random = Math.random() * 1000;
    list.value.push({
        id: random,
        name: random
    })
}
const handleDelete = (i) => {
    list.value.splice(i, 1)
}

const plasticData = ref(0);

onBeforeMount(() => {
    register();
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