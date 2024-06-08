<template>
	<transition name="fade">
		<button v-show="showButton" aria-label="Scroll to top button" @click="scrollToTop" class="jump-button">
			<ChevronArrowIcon :size="10" :rotation="90" color="#505050" />
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
	z-index: 1000;
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
.fade-leave-to {
	opacity: 0;
}

.jump-button:hover {
	box-shadow: 0px 0px 30px 0px #00000050;
}


@media (max-width: 1000px) {
	.jump-button {
		display: none;
	}
}
</style>