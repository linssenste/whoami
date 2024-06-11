<template>
	<div class="genre-container">
		<div class="chart-container">
			<!-- radar chart of generalized genres -->
			<ClientOnly>
				<apexchart width="100%" type="radar" :options="chartOptions" :series="series" />
			</ClientOnly>
		</div>

		<!-- detailed genre chips -->
		<h3 class="detail-text">More detailed genres:</h3>
		<div class="detailed-genre-chips">
			<span v-for="other in Object.keys(data.detailed)" :key="other">
				{{ other }}
			</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { GenreStats } from './PlaylistAnalysis.vue';

// Define types for chartOptions and series
type ChartOptions = {
	markers: { size: number },
	chart: {
		fontFamily: string,
		fontSize: string,
		id: string,
		toolbar: { show: boolean, tools: { download: boolean } }
	},
	dataLabels: {
		enabled: boolean,
		background: { enabled: boolean, borderRadius: number }
	},
	xaxis: {
		categories: string[],
		labels: {
			show: boolean,
			style: {
				colors: string[],
				fontSize: string,
				fontFamily: string,
			}
		}
	},
	plotOptions: {
		radar: {
			polygons: {
				strokeColors: string,
				fill: { colors: string[] }
			}
		}
	},
	fill: {
		type: string,
		colors: string[]
	},
	stroke: {
		show: boolean,
		colors: string[],
		width: number
	}
};

type Series = { name: string, data: number[] }[];

const props = defineProps<{
	data: GenreStats,
}>();

const processData = () => {
	if (!props.data) return;

	// Extract and process the top 8 genres
	const topGenres = Object.entries(props.data.general)
		.sort((a, b) => b[1] - a[1])  // Sort genres by count, descending
		.slice(0, 8)
		.reduce((acc, [key, value]) => {
			acc.genres.push(key.toUpperCase());
			acc.counts.push(value);
			return acc;
		}, { genres: [] as string[], counts: [] as number[] });

	// Update chart options
	chartOptions.value.xaxis.categories = topGenres.genres;
	series.value[0].data = topGenres.counts;
};

const chartOptions = ref<ChartOptions>({
	markers: { size: 0 },
	chart: {
		fontFamily: 'Hanken Grotesk',
		fontSize: "140px",
		id: "vuechart-example",
		toolbar: {
			show: true,
			tools: { download: false }
		},
	},
	dataLabels: {
		enabled: false,
		background: { enabled: true, borderRadius: 2, }
	},
	xaxis: {
		categories: [],
		labels: {
			show: true,
			style: {
				colors: ["#a8a8a8"],
				fontSize: "14px",
				fontFamily: 'Hanken Grotesk',
			}
		}
	},
	plotOptions: {
		radar: {
			polygons: {
				strokeColors: 'var(--light-grey-color)', // Adjust the grey tone for the radar net here
				fill: {
					colors: ['transparent']
				}
			}
		}
	},
	fill: {
		type: 'solid',
		colors: ['var(--red-color-transparent)']
	},
	stroke: {
		show: true,
		colors: ['var(--red-color)'],
		width: 4
	},
});

const series = ref<Series>([
	{ name: "series-1", data: [] }, // to be populated
]);

onMounted(() => {
	processData();
});
</script>

<style scoped>
.detailed-genre-chips {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	align-items: center;
	justify-content: center;
	width: 100%;
}

.detailed-genre-chips span {
	background-color: #F0F0F0;
	color: black;
	height: 20px;
	width: fit-content;
	padding: 10px 20px;
	border-radius: 6px;
	text-transform: uppercase;
	font-size: 15px;
	letter-spacing: 1px;
}

.chart-container {
	position: relative;
	width: 100%;
	aspect-ratio: 1.545;
}

.detail-text {
	text-align: center;
}
</style>