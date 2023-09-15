<template>
    <span @click="handleAdd()" style="margin-right: 15px;">添加</span>
    <div v-for="(item,index) in list" :key="index" style="background-color: palegoldenrod;margin: 10px;padding: 10px;">
        <div>{{item.name}}</div>
        <input type="input" placeholder="请输入"/>
        <span @click="handleDelete(index)">删除</span>
    </div>
    <!-- <router-view></router-view> -->
</template>

<script setup>
import { onMounted, ref } from 'vue';

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
</script>

<style lang='scss' scoped>
input {
    border: 1px solid black;
}
</style>