<template>

	<div class="polaroid-image" ref="polaroidRef">
		<img :src="src" width="100%" height="100%" :alt="alt" data-testid="image" draggable="false" />
	</div>

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
	width: 335px;
	margin: 10px;
	height: 401px
}
</style>
