<template>
	<transition name="fade">
		<button v-show="showButton" aria-label="Scroll to top button" @click="scrollToTop" class="jump-button">
			<span class="icon"></span>
		</button>
	</transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const showButton = ref(false);

const handleScroll = () => {
	showButton.value = window.scrollY > 100;
};

const scrollToTop = () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
	handleScroll();
	window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.jump-button {
	position: fixed;
	right: 25px;
	bottom: 25px;
	width: 60px;
	height: 60px;
	border: none;
	border-radius: 50%;
	background-color: #ffffffaa;
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
	box-shadow: 0px 0px 30px 0px #00000030;
	cursor: pointer;
	outline: none;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: 150ms box-shadow ease-in-out;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
	{
	opacity: 0;
}

.jump-button:hover {
	box-shadow: 0px 0px 30px 0px #00000050;
}

.icon {
	position: relative;
	width: 12px;
	height: 12px;
	border-left: 3px solid #000;
	border-top: 3px solid #000;
	transform: translateY(2px) rotate(45deg);
	transition: transform 250ms ease-in-out;
}

.jump-button:hover .icon {
	transform: translateY(-4px) rotate(45deg);
}

.jump-button .icon::after {
	content: '';
	position: absolute;
	top: 5px;
	left: -7px;
	width: 3px;
	height: 3px;
	border-right: 24px solid #000;
	transform: rotate(45deg);
	opacity: 0;
	transition-delay: 50ms;
	transition: opacity 250ms ease-in-out;
}

.jump-button:hover .icon::after {
	opacity: 1;
}

@media (max-width: 1000px) {
	.jump-button {
		display: none;
	}
}
</style>