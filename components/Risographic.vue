<template>
	<div class="art-image-container" ref="imageContainerRef">
		<img data-not-lazy data-testid="risograph-image" height="100%" fetchpriority="high" preload preconnect
			 alt="colorful rounded forms in risographic style with the letter S and L in the center"
			 src="../assets/images/risograph.svg" class="art-image" />
	</div>
</template>

<script lang="ts" setup>

const imageContainerRef = ref<HTMLElement | null>(null);
let initalRectOffset = 0;

const handleScroll = () => {
	if (!imageContainerRef.value) return;

	// Get the bounding rectangle of the header
	const rect = imageContainerRef.value.getBoundingClientRect();

	// Adjust parallax speed if needed
	const parallaxSpeed = 0.1;

	// Calculate new transform value based on the top position relative to the viewport
	const translateY = (rect.top - initalRectOffset) * parallaxSpeed // Cap the translation to 100px or any desired value

	// Apply transform
	imageContainerRef.value.style.transform = `translateY(${translateY}px)`;
};

onMounted(() => {
	if (!imageContainerRef.value) return;

	initalRectOffset = imageContainerRef.value.getBoundingClientRect().top;

	handleScroll();
	window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.art-image-container {

	padding-top: 50px;
	z-index: 0;
	display: flex;
	background-color: transparent;
	justify-content: center;
	align-items: center;
	min-width: 1000px;
	width: 100%;
	min-height: 680px;
	overflow: hidden;
}

.art-image {
	z-index: 0;
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
