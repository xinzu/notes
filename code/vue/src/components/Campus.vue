<!--
 * @Description  : 
 * @Author       : yanhuan
 * @Date         : 2023-06-19 18:22:58
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-06-30 14:40:46
-->
<template>
    <div id="div3d" class="div3d">
        props: {{ props.count }}
        data: {{ state }}
        <br />
        attrs: {{ attrs.a }}----{{ attrs.b }}
        <br />
        slot: <slot></slot>
        <br />
        hello slot: <slot name="hello"></slot>
    </div>
</template>

<script setup>
import { onMounted, onUpdated, useAttrs, useSlots, inject, onBeforeUpdate, onBeforeMount, ref } from 'vue';

const props = defineProps(['count']);
const attrs = useAttrs();
const slots = useSlots();

const injectData = inject('appProvide');

onBeforeUpdate(() => {
    console.log("========Campus.vue onBeforeUpdate")
});

onUpdated(() => {
    console.log("========Campus.vue onUpdated")
});

const state = ref('');
onBeforeMount(() => {
    console.log("========Campus.vue onBeforeMount")
    setTimeout(() => {
        state.value = '123123';
    });
})

onMounted(() => {
    console.log("========Campus.vue onMounted", injectData, slots)
})

</script>
<style lang='scss' scoped>
.div3d {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 80%;
    height: 80%;
    z-index: 2;
    background-color: rgba($color: #87b2d1, $alpha: .5);
    transform: translate(-50%, -50%);
    user-select: none;
}
</style>