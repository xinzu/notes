<template>
	<!-- <plastic-button :data="plasticData"></plastic-button> -->
	<!-- <router-view></router-view> -->
	<div class="svg-wrap"><div class="svg"></div></div>
	<!-- <yh-button></yh-button>
    <div class="border-test">
        <div class="left col line"></div>
        <div class="bottom row line"></div>
        <div class="right col line"></div>
        <div class="top row line"></div>
    </div> -->
</template>

<script setup>
import { onMounted, onBeforeMount, ref } from "vue";
import { register } from "./components";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();

const addRoutes = () => {
	const routes = {
		name: "addTest",
		path: "/addTest",
		component: () => import("@/views/overview/AddTest.vue"),
	};
	router.addRoute("main", routes);
	// router.addRoute(routes);

	console.log(router.getRoutes());
};

const plasticData = ref(0);

onBeforeMount(() => {
	register();
	addRoutes();
});
onMounted(() => {
	setInterval(() => {
		plasticData.value++;
	}, 5000);
});
</script>

<style lang="scss" scoped>
.svg-wrap {
	position: absolute;
	top: 0;
	left: 0;
}
.svg {
	position: relative;
	width: 100px;
	height: 100px;
	background: #fff;
	-webkit-clip-path: polygon(
		0 5px,
		95px 5px,
		95px 0,
		100px 0,
		100px 20px,
		50px 20px,
		50px 40px,
		70px 40px,
		70px 20px,
		100px 20px,
		100px 100px,
		80px 100px,
		0 5px
	);
	background: transparent;
	cursor: pointer;

	&:hover {
		background-color: red;
	}
}
input {
	border: 1px solid black;
}
.border-test {
	width: 300px;
	height: 200px;
	position: absolute;
	top: 0;
	left: 200px;

	.line {
		position: absolute;
		background-color: red;
	}

	.row {
		height: 2px;
		width: 0;
		animation: row 3s linear;
		animation-fill-mode: forwards;
	}

	.col {
		width: 2px;
		height: 0;
		animation: col 3s linear;
		animation-fill-mode: forwards;
	}

	.left {
		top: 0;
		left: 0;
	}

	.bottom {
		bottom: 0;
		left: 0;
		animation-delay: 3s;
	}

	.right {
		bottom: 0;
		right: 0;
		animation-delay: 6s;
	}

	.top {
		top: 0;
		right: 0;
		animation-delay: 9s;
	}
}

@keyframes col {
	0% {
		height: 0;
	}
	100% {
		height: 100%;
	}
}

@keyframes row {
	0% {
		width: 0;
	}
	100% {
		width: 100%;
	}
}
</style>
