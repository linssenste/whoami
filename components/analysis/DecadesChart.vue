<template>
	<div class="chart-container">
		<ClientOnly>
			<apexchart width="100%" type="bar" :options="chartOptions" :series="series" />
		</ClientOnly>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { DecadesStats } from './PlaylistAnalysis.vue';

const props = defineProps<{
	decades: DecadesStats,
}>();

const series = ref([
	{
		name: 'Songs',
		data: Object.values(props.decades)
	}
]);

const chartOptions = ref({

	tooltip: {
		enabled: true // Disable hover effects by turning off the tooltip
	},
	chart: {
		fontFamily: 'Hanken Grotesk',
		id: "vuechart-example",
		toolbar: {
			show: true,
			tools: { download: false }
		},
	},
	dataLabels: {
		enabled: false
	},
	xaxis: {
		categories: Object.keys(props.decades).map(decade => `${decade.slice(2)}er`),
		labels: {
			style: {
				fontSize: "15px",
				fontFamily: 'Hanken Grotesk',
			}
		}
	},

	yaxis: {
		labels: {
			style: {
				fontSize: "15px",
				fontFamily: 'Hanken Grotesk',
			}
		}
	},
	plotOptions: {
		bar: {
			horizontal: false,
			columnWidth: '55%',
		}
	},
	fill: {
		colors: ['#F44336']
	},
	stroke: {
		show: true,
		width: 2,
		colors: ['transparent']
	},
});
</script>


<style scoped>
.chart-container {
	pointer-events: none;
	width: 100%;
	aspect-ratio: 1.6;
	position: relative;
}
</style>