<template>
	<LayoutStepScroller :steps="7" text-side="right" id="music">

		<template v-slot:music-step-1>

			<div id="music-player" class="music-player">
				<div class="hint-text">Select an album to play a song</div>


				{{ store.selectedAlbum }}
				<button v-on:click="store.shuffleTracks()" class="shuffle-button">
					<img data-not-lazy width="18" height="18" src="../../assets/icons/shuffle.svg" alt="shuffle icon" />
					SHUFFLE</button>

			</div>
			{{ store.trackId }}
		</template>


		<!-- step 2: overview of the analysis data -->
		<template v-slot:music-step-2>

			<MobileDescriptionText v-if="isMobile" />

			<AnalysisDataOverview class="step-element" :updated="analysisData.update_time"
								  :stats="analysisData.stats" />
		</template>

		<!-- step 3: chart analysis of the decades the songs where published -->
		<template v-slot:music-step-3="{ visible }">
			<h2 v-if="isMobile">DECADES GRAPH</h2>
			<AnalysisDecadesChart :decades="analysisData.decades" :visible="visible" />
		</template>

		<!-- step 4: top 5 artists by (track) occurence  -->
		<template v-slot:music-step-4="{ visible }">
			<AnalysisFavoriteArtists v-on:play="store.shuffleTracks" :artists="analysisData.artists"
									 :visible="visible" />
		</template>

		<!-- step 5: analysized genre (divided in detailed (as chips) and generalized (radar-chart)) -->
		<template v-slot:music-step-5="{ visible }">
			<AnalysisGenreChart :data="analysisData.genres" />
		</template>

		<!-- step 6: audio features as 0 to 1 sliders-->
		<template v-slot:music-step-6="{ visible }">
			<AnalysisMoodChart :data="analysisData.features" :visible="visible" />
		</template>

		<!-- step 7: cloned jupyter cell with link to notebook on github
		<template v-slot:music-step-7="{ visible }">
			<PolaroidSnapSlider :polaroids="polaroids" />
		</template> -->
		<!-- step 8: cloned jupyter cell with link to notebook on github -->
		<template v-slot:music-step-7="{ visible }">

			<AnalysisJupyterCell v-if="!isMobile" style="margin: 10px;" :visible="visible" />
		</template>


		<template v-slot:text="{ focus }">
			<AnalysisDescriptionText :step="focus" :data="analysisData" />

		</template>
	</LayoutStepScroller>
</template>

<script setup lang="ts">
import { useStore } from '@/store'

const store = useStore()
import analysisData from '../../assets/analysis/export-spotify-analysis.json'
import MobileDescriptionText from './MobileDescriptionText.vue';

const { isMobile } = useDeviceDetection();

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

<style scoped>
.shuffle-button {
	padding: 12px;
	border: 12px;

	width: 100%;
	padding-left: 36px;
	padding-right: 36px;
	outline: none;
	font-size: 18px;
	text-transform: uppercase;
	font-weight: 700;
	letter-spacing: 1px;
	border: none;
	border-radius: 12px;
	background-color: var(--light-grey-color);
	cursor: pointer;
	opacity: .75;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 12px;
	flex-direction: row;
	font-family: 'Mukta';

	transition: opacity 150ms ease-in-out;
}

.shuffle-button img {
	height: 18px
}

@media (hover: hover) and (pointer: fine) {

	.shuffle-button:hover {
		opacity: 1;
	}

}

.music-player {
	min-height: 355px;
	width: 100%;
}
</style>