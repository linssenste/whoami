<template>
	<div style=" width: 100%; margin-bottom: 150px;">
		<div class="bubbly-header" ref="headerRef">
			2 TRUTH <span style="color: var(--blue-color)">& A LIE</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

const headerRef = ref<HTMLElement | null>(null);

const handleScroll = () => {
	if (!headerRef.value) return;

	// Get the bounding rectangle of the header
	const rect = headerRef.value.getBoundingClientRect();

	// Adjust parallax speed if needed
	const parallaxSpeed = 0.15;

	// Calculate new transform value based on the top position relative to the viewport
	const translateY = -rect.top * parallaxSpeed + 150 // Cap the translation to 100px or any desired value

	// Apply transform
	headerRef.value.style.transform = `translateY(${translateY}px)`;
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
.bubbly-header {
	text-align: center;
	font-family: 'SoulWave' !important;
	font-size: 140px;
	line-height: 150px;
	margin-bottom: 100px;
	color: var(--red-color);
	position: relative;
	/* Ensure it's positioned relative to its container */
	transition: transform 0.1s ease-out;
	/* Smooth out the transform transition */
}
</style>