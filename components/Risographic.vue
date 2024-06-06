<template>
	<div class="art-image-container" ref="imageContainerRef">
		<img data-testid="risograph-image" fetchpriority="high" preload height="100%"
			 alt="colorful rounded forms in risographic style with the letter S and L in the center"
			 src="../assets/images/risograph.svg" class="art-image" />
	</div>
</template>

<script lang="ts" setup>

const imageContainerRef = ref<HTMLElement | null>(null);

// risographic image parallex effect
const handleScroll = () => {
	if (!imageContainerRef.value) return

	imageContainerRef.value.style.transform = `translateY(-${window.scrollY * 0.075}px)`;
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
.art-image-container {
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 1000px;
	width: 100%;
	min-height: 680px;
	overflow: hidden;
}

.art-image {
	z-index: -1;
	opacity: 1;
	transition: transform 0.2s ease-out;
	width: 100%;
	max-width: none;
}

@media (max-width: 1000px) {
	.art-image-container {
		min-width: 100%;
		overflow: hidden;
	}

	.art-image {
		min-width: 1000px;
		width: 1000px;
		margin-top: 50px;
		object-fit: cover;
	}
}
</style>
