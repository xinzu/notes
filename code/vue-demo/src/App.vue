<template>
    <div v-for="(item, index) in list" :key="index">
        {{ index }}
        <input type="text"  />
    </div>
    <!-- <router-view></router-view> -->
</template>

<script setup>
import { ref, onMounted } from 'vue';
const list = ref(['A', 'B', 'C', 'D', 'E', 'F']);
onMounted(() => {
    setTimeout(() => {
        list.value.splice(3, 1);
    }, 10000)
})
</script>
<style lang='scss' scoped>
input {
    border: 1px solid black;
}
</style>