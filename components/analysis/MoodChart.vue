<template>
	<div class="feature-graph">

		<!-- dotted divider line to indicate center of slider -->
		<div class="half-divider-line" />

		<div v-for="(feature, index) in features" :key="index" class="feature">
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


const props = defineProps<{
	data: Record<string, number>;
	visible: boolean;
}>();

const features = [
	{ id: 'danceability', leftLabel: 'Chillout', rightLabel: 'Danceable' },
	{ id: 'valence', leftLabel: 'Depressed/Sad', rightLabel: 'Happy' },
	{ id: 'energy', leftLabel: 'Chill', rightLabel: 'ENERGETIC' },
	{ id: 'acousticness', leftLabel: 'Electronic Vibes', rightLabel: 'Unplugged' },
];

const visible = ref(props.visible);

features.forEach(feature => {
	useAnnotate(`${feature.id}-pos`, visible, 'box', Math.floor(Math.random() * (500 + 1)));
});

watch(() => props.visible, newValue => {
	visible.value = newValue;
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
	font-size: 13px;
	letter-spacing: 1px;
}

.line {
	flex: 2;
	position: relative;
	height: 7px;
	border-radius: 4px;
	background-color: var(--light-grey-color);
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