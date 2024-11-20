<template>

	<div class="image-area">

		<!-- snap scroll gallery -->
		<div ref="scrollContainer" class="polaroid-row" @scroll="onScroll">

			<!-- polaroid gallery -->
			<div v-for="(card, index) in polaroids" :id="`${index}-image`" class="image-element"
				 :class="{ focused: selectedIndex === index }">
				<PolaroidImage :src="card.src" :alt="card.alt" :id="`polaroid-${index}`"
							   v-on:click="nextPolaroidImage(index - selectedIndex)" />
			</div>

		</div>

		<!-- previous image button -->
		<button class="scroll-snap-button left" aria-label="previous image button" v-on:click="nextPolaroidImage(-1)"
				v-if="selectedIndex != 0">
			<div class="chevron-icon">
				<ChevronArrowIcon :size="10" />
			</div>

		</button>


		<!-- next image button -->
		<button class="scroll-snap-button right" aria-label="next image button" v-on:click="nextPolaroidImage(1)"
				v-if="selectedIndex < polaroids.length - 1">
			<div class="chevron-icon">
				<ChevronArrowIcon :size="10" />
			</div>

		</button>

	</div>

</template>



<script setup lang="ts">
import type { PolaroidCard } from '../../components/polaroid/ExpandableStack.vue';

const selectedIndex = ref<number>(0);

const scrollContainer = ref<HTMLElement | null>(null);
const scrollTimeout = ref(false)

const props = defineProps<{
	polaroids: PolaroidCard[];
}>();

props.polaroids;
const emit = defineEmits(['focus'])

watch(selectedIndex, () => {
	emit('focus', props.polaroids[selectedIndex.value])
}, { immediate: true })


function nextPolaroidImage(direction: number) {
	scrollTimeout.value = false
	focusPolaroidImage(selectedIndex.value + direction)
}

let timeoutHandle: any = null
function selectByIndex(imageIndex: number) {
	if (imageIndex == selectedIndex.value) return;
	if (timeoutHandle != null) clearTimeout(timeoutHandle)

	scrollTimeout.value = true

	selectedIndex.value = imageIndex;
	focusPolaroidImage(imageIndex);

	timeoutHandle = setTimeout(() => {
		scrollTimeout.value = false
	}, 850);


}
defineExpose({ selectByIndex })
function focusPolaroidImage(index: number) {
	nextTick(() => {
		const el = document.getElementById(`${index}-image`);
		if (!el || !scrollContainer.value) return;

		const container = scrollContainer.value;

		// Get the container's width and the element's position relative to it
		const containerWidth = container.clientWidth;
		const elLeft = el.offsetLeft;
		const elWidth = el.clientWidth;

		// Scroll to center the selected image
		const scrollLeft = elLeft - (containerWidth / 2) + (elWidth / 2);

		// Scroll only horizontally
		container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
	});
}



function onScroll() {
	if (!scrollContainer.value || scrollTimeout.value) return;

	const container = scrollContainer.value;
	const containerCenter = container.scrollLeft + container.clientWidth / 2;

	let closestElement: HTMLElement | null = null;
	let closestDistance = Infinity;

	container.childNodes.forEach((child) => {
		if (!(child instanceof HTMLElement)) return;

		const childCenter = child.offsetLeft + child.offsetWidth / 2;
		const distance = Math.abs(containerCenter - childCenter);

		if (distance < closestDistance) {
			closestDistance = distance;
			closestElement = child;
		}
	});

	if (closestElement && (closestElement as HTMLElement).id) {
		selectedIndex.value = parseInt((closestElement as HTMLElement).id.replace("-image", ""));
	}
}


</script>



<style scoped>
.image-area {
	position: relative;
	width: 100%;
}




.polaroid-row {
	display: flex;
	width: 100%;
	scroll-snap-type: x mandatory;
	overflow-x: auto;
	white-space: nowrap;
	position: relative;
	-webkit-overflow-scrolling: touch;
	flex-direction: row;
	align-items: center;
	gap: 30px;
	-ms-overflow-style: none;
	/* Internet Explorer 10+ */
	scrollbar-width: none;
	/* Firefox */
}

.polaroid-row::-webkit-scrollbar {
	display: none;
	/* Safari and Chrome */
}


.image-element {
	position: relative;
	user-select: none !important;
	-webkit-user-select: none !important;
	width: 360px;
	scroll-behavior: smooth;
	scroll-snap-align: center;
	transition: all 150ms ease-in-out;
}

.image-element.focused {
	opacity: 1;
	filter: blur(0);
	cursor: default;
	transition: all 300ms ease-in-out;
}

.image-element:not(.focused) {
	opacity: 0.4;
	cursor: pointer;
	filter: blur(5px);
}


.image-element:first-child {
	padding-left: calc(50% - 180px);
}

.image-element:last-child {
	padding-right: calc(50% - 180px);
}


.scroll-snap-button {
	background-color: transparent;
	position: absolute;
	top: 50%;
	height: 100%;
	width: 150px;
	cursor: pointer;
	border: none;
	z-index: 10;
	transform: translateY(-50%);
}

@media screen and (max-width: 600px) {
	.scroll-snap-button {
		width: 100px;
	}

}

.scroll-snap-button.left {
	left: 0;
}

.scroll-snap-button.right {
	right: 0;
	transform: translateY(-50%) rotate(180deg);
}

@media screen and (min-width: 600px) {
	.image-area:after {
		content: '';
		position: absolute;
		left: 0;
		pointer-events: none;

		right: 0;
		top: 0;
		bottom: 0;
		background-image:
			linear-gradient(to right, #fcfcfc, #fcfcfc00 200px),
			linear-gradient(to left, #fcfcfc, #fcfcfc00 200px);
	}

	.scroll-snap-button::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		pointer-events: none;
		background: transparent;
		transition: backdrop-filter 200ms ease-in-out, opacity 200ms ease-in-out;
		mask-image: linear-gradient(90deg, transparent, rgba(0, 0, 0, 1) 50%, transparent);
	}

	.scroll-snap-button.left::before {
		mask-image: linear-gradient(90deg, transparent, black -80%, transparent);
	}

	.scroll-snap-button.right::before {
		mask-image: linear-gradient(90deg, transparent, black -80%, transparent);
	}

	@media (hover: hover) and (pointer: fine) {

		.scroll-snap-button:hover::before {
			backdrop-filter: blur(10px);
		}
	}
}

.scroll-snap-button .chevron-icon {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: rotate(-90deg) translate(6px, -30px)
}
</style>