<template>
	<div>
        <div>$store.state.user.counter: {{ $store.state.user.counter }}</div>
        <div>$store.getters.doubleCount: {{ $store.getters.doubleCount }}</div>
        <div>$store.getters.doubleCountPlusOne: {{ $store.getters.doubleCountPlusOne }}</div>
        <div>$store.getters['web/webDoubleCounter']: {{ $store.getters['web/webDoubleCounter'] }}</div>
        <div>getUserById('1') name: {{ $store.getters.getUserById('1') }}</div>
        <div>getUserById('2') name: {{ $store.getters.getUserById('2') }}</div>
        <span @click="handleAdd()" style="margin-right: 15px;">添加</span>
		<div v-for="(item,index) in list" :key="index" style="background-color: palegoldenrod;margin: 10px;padding: 10px;">
			<div>{{item.name}}</div>
			<input type="input" placeholder="请输入"/>
            <span @click="handleDelete(index)">删除</span>
		</div>
	</div>
</template>
 
<script>
import { mapState, mapGetters } from 'vuex';
export default {
    data() {
        return {
            list: [],
        };
    },
    computed: {
        ...mapState('web', {
            webCounter: 'counter',
        }),
        ...mapGetters('web', ['webDoubleCounter'])
    },
    created() {
        this.handleAdd();
        console.log(this)
    },
    methods: {
        handleAdd() {
            let random = Math.random() * 1000;
            this.list.push({
                id: random,
                name: random
            })
        },
        handleDelete(i) {
            this.list.splice(i, 1)
        },
    }
};
</script>
 
<style lang="scss" scoped>
</style>