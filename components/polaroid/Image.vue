<template>


	<img :src="src" class="polaroid-image" ref="polaroidRef" width="335" height="401" :alt="alt" data-testid="image"
		 draggable="false" onerror="this.src='/polaroids/polaroid-error.webp'" />


</template>

<script lang="ts" setup>
import VanillaTilt from 'vanilla-tilt'

const polaroidRef = ref<HTMLElement | null>(null);

const props = defineProps<{
	src: string;
	alt: string
}>();

props.src;
props.alt;


onMounted(() => {
	if (!polaroidRef.value) return;

	// initalizing tilt functionality (only on non-touch devices)
	VanillaTilt.init(polaroidRef.value, {
		max: 5,
		speed: 1000,
		reverse: true,

		glare: true,
		gyroscope: false,
		"max-glare": .15,
	})
})

</script>


<style scoped>
.polaroid-image {
	position: relative;
	width: 335px !important;
	min-width: 335px !important;
	margin: 10px;
	height: 401px !important;
	min-height: 401px !important;
}
</style>
