<template>
	<div>
        <span @click="handleAdd()" style="margin-right: 15px;">添加</span>
		<div v-for="(item,index) in list" :key="index" style="background-color: palegoldenrod;margin: 10px;padding: 10px;">
			<div>{{item.name}}</div>
			<input type="input" placeholder="请输入"/>
            <span @click="handleDelete(index)">删除</span>
		</div>
	</div>
</template>
 
<script>
	export default {
		data() {
			return {
				list: [],
			};
		},
		created() {
			this.handleAdd();
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