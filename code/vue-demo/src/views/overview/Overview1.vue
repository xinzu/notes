<!--
 * @Description  : 
 * @Author       : yanhuan
 * @Date         : 2023-07-20 12:33:10
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-12-06 17:35:49
-->
<template>
	<div class="bg">
        <div
            class="text print-animate-init"
            :style="{ animationDuration: `${allText.length * 200}ms` }"
            ref="textRef"
        >
            {{ allText }}
        </div>
</div>
	<!-- <div class="text2" ref="textRef"></div> -->
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";
const allText = ref("textchangetest");
const textRef = ref(null);
onMounted(() => {
	// nextTick(() => {
	// 	let domHtml = "";
	// 	allText.split("").forEach((char, index) => {
	// 		domHtml += `<span class='str_animate' style="animation-delay:${
	// 			index * 200 + 2000
	// 		}ms">${char}</span>`;
	// 	});
	// 	textRef.value.innerHTML = domHtml;

	// });
	setTimeout(() => {
		textRef.value.classList.remove("print-animate-init");
		nextTick(() => {
			setTimeout(() => {
				allText.value = "Overview1Overview1Overview1Overview1";
				textRef.value.classList.add("print-animate");
			}, 200);
		});
	}, 10 * 1000);
});
</script>
<style lang="scss" scoped>
.bg {
	width: 960px;
	height: 540px;
	position: relative;
	&::before {
		content: "";
		display: block;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		transform-origin: center center;
		background: url("@/assets/1.jpg") no-repeat bottom center;
		background-size: cover;
		animation: bgAnimation 2s linear;
		animation-fill-mode: forwards;
	}
}
.text {
	width: 0;
	color: blue;
	overflow: hidden;
	font-size: 30px;
	&.print-animate {
		animation-name: textReveal;
		animation-fill-mode: forwards;
		&-init {
			animation-name: textReveal;
			animation-fill-mode: forwards;
			animation-delay: 2s;
		}
	}
}
.text2 {
	color: red;
	font-size: 30px;
	:deep(.str_animate) {
		opacity: 0;
		animation: textReveal1 0.5s linear forwards;
		animation-fill-mode: forwards;
	}
}

@keyframes bgAnimation {
	0% {
		width: 0;
		height: 0;
	}
	40% {
		width: 80%;
		height: 10%;
	}
	100% {
		width: 100%;
		height: 100%;
	}
}

@keyframes textReveal {
	0% {
		width: 0;
	}
	100% {
		width: 100%;
	}
}
@keyframes textReveal1 {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
</style>
