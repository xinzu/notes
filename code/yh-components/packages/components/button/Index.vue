<template>
    <button class="yh--button" :class="styleClass" :size="size" @click="clickEvent">
        <slot></slot>
    </button>
</template>

<script lang="ts">
export default {
    name: 'yhButton',
}
</script>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    size: {
        type: Number,
        default: 4
    },
    type: {
        type: String,
        default: 'default',
        validate: (val: string) => {
            console.log(val);
        }
    }
});
const styleClass = ref({
    
})

const $emit = defineEmits(['clickEvent']);

const clickEvent = () => {
    console.log("====yhButton 组件点击事件");
    $emit('clickEvent');
}
</script>
<style lang='scss' scoped>
.yh--button {
    cursor: pointer;
}
</style>