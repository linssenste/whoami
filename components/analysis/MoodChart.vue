<template>
	<div class="feature-graph">

		<!-- dotted divider line to indicate center of slider -->
		<div class="half-divider-line" />

		<div v-for="(feature, index) in audioFeatures" :key="index" class="feature">
			<!-- left description label -->
			<div class="description"><span :id="`${feature.id}-${props.data[feature.id] < 0.5 ? 'pos' : 'neg'}`">{{
			feature.leftLabel }}</span></div>


			<div class="line">
				<div class="dot" :style="{ left: `calc(${props.data[feature.id] * 100}% - 20px)` }"></div>
			</div>

			<!-- right description label -->
			<div class="description"><span :id="`${feature.id}-${props.data[feature.id] > 0.5 ? 'pos' : 'neg'}`">{{
			feature.rightLabel }}</span></div>
		</div>
	</div>

</template>

<script lang="ts" setup>
import { audioFeatures } from '~/utils/audioFeatures';

const props = defineProps<{
	data: Record<string, number>;
	visible: boolean;
}>();





audioFeatures.forEach(feature => {
	useAnnotate(`${feature.id}-pos`, () => props.visible, 'box', Math.floor(Math.random() * (500 + 1)), [5, 5]);
});


</script>
<style scoped>
.feature-graph {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 40px;
}

.feature {
	display: flex;
	align-items: center;
}

.description {
	flex: 1;
	text-align: center;
	text-transform: uppercase;
	font-size: 12px;
	letter-spacing: 1px;
}

.line {
	flex: 2;
	position: relative;
	height: 7px;
	border-radius: 4px;
	background-color: var(--light-grey-color);
}

@media screen and (max-width: 400px) {
	.line {
		flex: 1
	}
}

.dot {
	position: absolute;
	z-index: 20;
	top: -7px;
	height: 20px;
	width: 20px;
	background-color: var(--red-color);
	border-radius: 50%;
}

.half-divider-line {
	position: absolute;
	left: 50%;
	height: calc(100% + 50px);
	width: 0px;
	top: -27px;
	border-left: 2px dotted var(--grey-color);
	z-index: 10;
}
</style>