<template>
	<div class="art-image-container" :id="`risographic-image-${section}`">
		<img data-not-lazy data-testid="risograph-image" height="100%" fetchpriority="high" preload preconnect
			 alt="colorful rounded forms in risographic style with the letter S and L in the center"
			 src="../assets/images/risograph.svg" class="art-image" />
	</div>
</template>

<script lang="ts" setup>
const props = defineProps<{
	section: string;
	inverse?: boolean;
}>();
props.section;
props.inverse;

useParallaxScroll(`risographic-image-${props.section}`, 0.085, (props.inverse == false));

</script>

<style scoped>
.art-image-container {
	user-select: none;
	-moz-user-select: none;
	-webkit-user-select: none;
	position: relative;
	/* padding-top: 50px; */
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
