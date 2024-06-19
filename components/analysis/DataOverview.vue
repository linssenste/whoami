<template>
	<div class="stats-column">
		<div class="number-row">
			<div v-for="(value, key) in displayedStats" :key="key" class="number-stat"
				 :class="{ hours: key === 'HOURS' }">
				<div class="number-stat value">{{ value }}</div>
				<div class="number-stat key">{{ key }}</div>
			</div>
		</div>

		<!-- last update time -->
		<div class="last-update-time">{{ updateTime }}</div>

		<!-- Github status badge -->
		<a tabindex="-1" href="https://github.com/linssenste/whoami/actions/workflows/spotify_analysis.yml"
		   aria-label="Link to github workflow of analysis script">
			<img on data-not-lazy onerror="this.style.display='none'"
				 src="https://github.com/linssenste/whoami/actions/workflows/spotify_analysis.yml/badge.svg"
				 alt="Run Jupyter Notebook">
		</a>

	</div>
</template>

<script lang="ts" setup>
import type { DataStats } from './PlaylistAnalysis.vue';

const props = defineProps<{
	stats: DataStats;
	updated: number
}>();

const updateTime = computed(() => {
	const date = new Date(props.updated * 1000);
	const dateFormatter = new Intl.DateTimeFormat('de-DE', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	});
	return dateFormatter.format(date) + ' Uhr';
});

const displayedStats = computed(() => ({
	Songs: props.stats.tracks,
	Albums: props.stats.albums,
	Artists: props.stats.artists,
	HOURS: Math.ceil((props.stats.duration ?? 0) / 60)
}));
</script>
<style scoped>
.stats-column {
	display: flex;
	position: relative;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	gap: 10px;
	padding-top: 30px;
	/* padding-bottom: 50px; */
}

.number-row {
	display: grid;
	width: 100%;
	grid-template-columns: repeat(4, 1fr);
	gap: 15px;
	justify-content: center;
}

.number-stat {
	display: flex;
	height: 100px;
	flex-direction: column;
	align-items: center;
}

.number-stat .value {
	font-size: 50px;
}

.number-stat .key {
	font-size: 20px;
	letter-spacing: 2px;
	text-transform: uppercase;
}

.last-update-time {
	font-size: 15px;
	letter-spacing: 1px;
	color: var(--grey-color);
	margin-top: 15px;
}

@media screen and (max-width: 600px) {
	.number-row {
		grid-template-columns: repeat(2, 1fr);
	}

}
</style>
