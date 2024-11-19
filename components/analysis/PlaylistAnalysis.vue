<template>
	<LayoutStepScroller :steps="6" text-side="right" id="music">

		<!-- step 1: overview of the analysis data -->
		<template v-slot:music-step-1>

			<MobileDescriptionText v-if="isMobile" />

			<AnalysisDataOverview style="padding-top: 75px;" :updated="analysisData.update_time"
								  :stats="analysisData.stats" />
		</template>

		<!-- step 2: chart analysis of the decades the songs where published -->
		<template v-slot:music-step-2="{ visible }">
			<h2 v-if="isMobile">DECADES GRAPH</h2>
			<AnalysisDecadesChart :decades="analysisData.decades" :visible="visible" />
		</template>

		<!-- step 3: top 5 artists by (track) occurence  -->
		<template v-slot:music-step-3="{ visible }">
			<AnalysisFavoriteArtists v-on:play="store.shuffleTracks" :artists="analysisData.artists"
									 :visible="visible" />
		</template>

		<!-- step 4: analysized genre (divided in detailed (as chips) and generalized (radar-chart)) -->
		<template v-slot:music-step-4="{ visible }">
			<AnalysisGenreChart :data="analysisData.genres" />
		</template>

		<!-- step 5: audio features as 0 to 1 sliders-->
		<template v-slot:music-step-5="{ visible }">
			<AnalysisMoodChart :data="analysisData.features" :visible="visible" />
		</template>

		<!-- step 6: cloned jupyter cell with link to notebook on github -->
		<template v-slot:music-step-6="{ visible }">

			<AnalysisJupyterCell v-if="!isMobile" style="margin: 10px;" :visible="visible" />
		</template>


		<!-- text slot for the description of the current step -->
		<template v-slot:text="{ focus }">
			<AnalysisDescriptionText :step="focus" :data="analysisData" />

		</template>
	</LayoutStepScroller>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import analysisData from '../../assets/analysis/export-spotify-analysis.json'
import MobileDescriptionText from './MobileDescriptionText.vue';

const { isMobile } = useDeviceDetection();
const store = useStore()

export interface ArtistStatsElement {
	img: string;
	tracks: number;
	albums: number;
	name: string;
	occurrence: string;
}

export interface DataStats {
	albums: number,
	tracks: number,
	artists: number
	duration?: number
}

export interface GenreStats {

	general: Record<string, number>;
	detailed: Record<string, number>
}

export interface AnalysisData {
	stats: DataStats,
	genres: GenreStats,
	features: Record<string, number>,
	artists: Record<string, ArtistStatsElement>
	update_time: number,
	decades: DecadesStats
}

export interface DecadesStats {
	[decade: string]: number;
}

</script>
