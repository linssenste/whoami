<template>
	<div class="content-wrapper" :class="{ 'reverse-layout': isTextSideLeft }">
		<div class="scrollable-content" ref="scrollSideRef">
			<div v-for="step in steps" :id="String(step)" class="content" :style="isVisible(step)">
				<slot :name="`${id}-step-${step}`" :visible="currentFocus == step" :index="step" />
			</div>
		</div>

		<div class="fixed-content" ref="textSideRef">
			{{ currentFocus }}
		</div>
	</div>
</template>

<script lang="ts" setup>

const props = defineProps<{
	steps: number;
	textSide: 'left' | 'right'; // Add the textSide prop
	id: string
}>();

// Use the prop to determine the text side
const isTextSideLeft = computed(() => props.textSide === 'left');


onMounted(() => {
	handleScroll()
	window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll);
});


const textSideRef = ref<HTMLElement | null>(null);
const scrollSideRef = ref(<HTMLElement | null>null);
let currentFocus = ref(null); // This will store the ID of the div in the center


function isVisible(id: number): string {
	return currentFocus.value == id ? 'opacity: 1' : 'opacity: .15; pointer-events: none'
}

const handleScroll = () => {
	if (!scrollSideRef.value || !textSideRef.value) return;

	const leftSideBounds = scrollSideRef.value.getBoundingClientRect();
	const bottomPosition = (leftSideBounds.bottom - window.innerHeight);

	if (leftSideBounds.top <= 0 && bottomPosition > 0) {

		// Top of scrollSideRef is out of view, but bottom is still in view
		textSideRef.value.style.position = 'fixed';
		textSideRef.value.style.top = '0px';
	} else if (bottomPosition <= 0) {

		// Bottom of scrollSideRef is at or above the bottom of the viewport
		textSideRef.value.style.position = 'absolute';
		textSideRef.value.style.bottom = '0px';
		textSideRef.value.style.top = 'auto';

	} else {
		// scrollSideRef is completely in view
		textSideRef.value.style.position = 'relative';
	}

	const childDivs = scrollSideRef.value.querySelectorAll('.content'); // Adjust the selector as needed
	const viewportCenter = window.innerHeight / 2 + window.scrollY;

	let closestDivId = null;
	let smallestDistance = Infinity;

	childDivs.forEach((div) => {
		const divBounds = div.getBoundingClientRect();
		const divCenter = divBounds.top + divBounds.height / 2 + window.scrollY;
		const distanceToCenter = Math.abs(viewportCenter - divCenter);

		if (distanceToCenter < smallestDistance) {
			smallestDistance = distanceToCenter;
			closestDivId = div.id;
		}
	});

	if (closestDivId !== currentFocus.value) {
		currentFocus.value = closestDivId;

	}

}



</script>
<style scoped>
.content-wrapper {
	display: flex;
	flex-direction: row;
	width: 100%;
	position: relative;
}

/* Reverse the layout if the text side is on the left */
.content-wrapper.reverse-layout {
	flex-direction: row-reverse;
}

.scrollable-content {
	width: calc(100% - 600px);
	overflow-x: hidden;
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 35px !important;
	justify-content: center;
	position: relative;
}

.scrollable-content .content {
	width: 100%;
	transition: opacity 150ms ease-in-out;
}

.scrollable-content .content:last-child {
	padding-bottom: 25%;
}

.fixed-content {
	width: 600px !important;
	min-width: 600px;
	max-width: 600px;
	box-sizing: border-box;
	background-color: blue;
	right: 0px !important;
	min-height: 100vh;
	height: 100vh;
}

/* Adjust the position of the fixed-content when in reverse layout */
.content-wrapper.reverse-layout .fixed-content {
	left: 0 !important;
	right: auto !important;
}
</style>
