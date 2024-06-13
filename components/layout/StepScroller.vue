<template>
	<div :class="['content-wrapper', { 'reverse-layout': isTextSideLeft, 'mobile-view': isMobile }]">
		<div class="scrollable-content" ref="scrollSideRef">
			<div v-for="step in steps" :id="String(step)" class="content" :style="isVisible(step)">
				<slot :name="`${id}-step-${step}`" :visible="currentFocus == step" :index="step" />
			</div>
		</div>
		<div class="fixed-content" :class="{ 'left-bound': isTextSideLeft }" ref="textSideRef">
			<slot name="text" :focus="currentFocus" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const props = defineProps<{
	steps: number;
	textSide: 'left' | 'right';
	id: string;
}>();

const { isMobile } = useDeviceDetection();

const isTextSideLeft = computed(() => props.textSide == 'left');

const textSideRef = ref<HTMLElement | null>(null);
const scrollSideRef = ref<HTMLElement | null>(null);
let currentFocus = ref(1);

function isVisible(id: number): string {
	return currentFocus.value == id ? 'opacity: 1' : 'opacity: .15; pointer-events: none';
}

const handleScroll = () => {
	if (!scrollSideRef.value) return;

	const leftSideBounds = scrollSideRef.value.getBoundingClientRect();
	const viewportCenter = window.innerHeight / 2 + window.scrollY;

	let closestDivId = null;
	let smallestDistance = Infinity;

	const childDivs = scrollSideRef.value.querySelectorAll('.content');
	childDivs.forEach((div) => {
		const divBounds = div.getBoundingClientRect();
		const divCenter = divBounds.top + divBounds.height / 2 + window.scrollY;
		const distanceToCenter = Math.abs(viewportCenter - divCenter);

		if (distanceToCenter < smallestDistance) {
			smallestDistance = distanceToCenter;
			closestDivId = parseInt(div.id);
		}
	});

	if (closestDivId !== currentFocus.value) {
		currentFocus.value = closestDivId ?? 1;
	}

	if (!isMobile.value && textSideRef.value) {
		const bottomPosition = leftSideBounds.bottom - window.innerHeight;
		if (leftSideBounds.top <= 0 && bottomPosition > 0) {
			textSideRef.value.style.position = 'fixed';
			textSideRef.value.style.top = '0px';
		} else if (bottomPosition <= 0) {
			textSideRef.value.style.position = 'absolute';
			textSideRef.value.style.bottom = '0px';
			textSideRef.value.style.top = 'auto';
		} else {
			textSideRef.value.style.position = 'relative';
		}
	} else if (textSideRef.value) {
		textSideRef.value.style.position = 'relative';
	}
};


onMounted(() => {
	window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.content-wrapper {
	display: flex;
	flex-direction: row;
	width: 100%;
	position: relative;
}

.content-wrapper.reverse-layout {
	flex-direction: row-reverse;
}

.content-wrapper.mobile-view {
	flex-direction: column;
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

.content-wrapper.mobile-view .scrollable-content {
	width: 100%;
}

.scrollable-content .content {
	width: calc(100% - 50px);
	padding: 25px;
	transition: opacity 150ms ease-in-out;
}

.scrollable-content .content:last-child {
	padding-bottom: 75px;
}

.fixed-content {
	width: 600px !important;
	min-width: 600px;
	max-width: 600px;
	box-sizing: border-box;
	right: 0px;
	padding: 0px 20px 0px 20px;
}

.left-bound {
	left: 0px !important;
}

.content-wrapper.mobile-view .fixed-content {
	width: 100%;
	min-width: auto;
	max-width: none;
	height: auto;
	position: relative;
}

@media screen and (max-width: 1000px) {

	.scrollable-content .content:last-child {
		padding-bottom: 0px;
	}

	.fixed-content {
		width: 100% !important;
		min-width: 100%;
		max-width: 100%;
	}
}


@media screen and (min-width: 1000px) {

	.fixed-content {

		min-height: 100vh;
		height: 100vh;
	}
}
</style>