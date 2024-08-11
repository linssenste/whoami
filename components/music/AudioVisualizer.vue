<template>
	<div class="audio-equalizer">
		<div v-for="i in 4" :key="i" :data-testid="`visualizer-${i}`"
			 :style="{ animationDelay: delays[i - 1], backgroundColor: getColor(i) }" class="audio-visualizer"
			 :class="!playing ? 'pause' : 'play'" />
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Define props
const props = defineProps<{
	playing: boolean
}>();

// Define color array and shuffle it
const colors = ["red", "blue", "pink", "purple", "green", "orange"];
const shuffledColors = useState<string[]>('shuffledColors', () => shuffleArray([...colors]));

// Compute static delays during setup to ensure consistency
const delays = useState<string[]>('delays', () => generateDelays(4));

// Function to shuffle an array
function shuffleArray(array: string[]): string[] {
	return array.sort(() => 0.5 - Math.random());
}

// Function to generate delays
function generateDelays(length: number): string[] {
	return Array.from({ length }, () => {
		const randomDelay = Math.random() * 1000;
		return `${randomDelay}ms`;
	});
}

// Computed property for colors
const getColor = (index: number): string => {
	return `var(--${shuffledColors.value[index % shuffledColors.value.length]}-color)`;
};
</script>

<style scoped>
.pause {
	animation: none !important;
	height: 6px;
}

.play {
	height: 20px !important;
	animation: equalizer .75s infinite;
	-moz-animation: equalizer .75s infinite;
	-webkit-animation: equalizer .75s infinite;
}

.audio-equalizer {
	display: flex;
	flex-direction: row;
	gap: 4px;
}

.audio-visualizer {
	width: 8px;
	height: 8px;
	border-radius: 4px;
	transition: all 150ms ease-in-out;
	overflow: hidden;
	transform-origin: center;
	opacity: .9;
	backdrop-filter: blur(8px);
	-webkit-backdrop-filter: blur(8px);
}

@keyframes equalizer {

	0%,
	100% {
		border-radius: 4px;
		transform: scaleY(1);
		-webkit-transform: scaleY(1);
		-moz-transform: scaleY(1);
	}

	25% {
		border-radius: 3px;
		transform: scaleY(1.5);
		-webkit-transform: scaleY(1.5);
		-moz-transform: scaleY(1.5);
	}

	75% {
		border-radius: 6px;
		transform: scaleY(0.6);
		-webkit-transform: scaleY(.6);
		-moz-transform: scaleY(.6);
	}
}
</style>