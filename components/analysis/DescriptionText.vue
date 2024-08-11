<template>
	<div id="analysis-description">

		<LayoutKeepScrollingAnimation class="scrolling-hint" :is-click="false" text="KEEP SCROLLING" />

		<h1>Get to know me through music!</h1>

		<!-- introduction to analysis -->
		<p>
			Music is an amazing thing! It shapes our lives, reflecting our moods, personalities, and memories. I've
			chosen to introduce myself through the lens of my musical tastes, quantified objectively here. My analysis
			is based on my swimming playlist.
		</p>

		<!-- decades chart + link to resarch paper on music taste -->
		<p>
			According to <a tabindex="-1" href="https://ojs.aaai.org/index.php/ICWSM/article/view/3250/3118"
			   target="_blank">research</a>, people tend to be particularly fond of music from their
			teenage
			years. And I happen to be no exception: My musical taste is largely contemporary,
			<span id="text-2">dominated
				by the sounds of the last two decades</span>.
		</p>

		<!-- favorite artists -->
		<p>
			The incredible
			<span id="text-3">
				{{ firstFavorite.name }} is my absolute favourite artist
			</span>
			with {{ firstFavorite.tracks }} songs, closely followed by {{ secondFavorite.name }}.
			This selection reflects my general
			<span id="text-4">
				favourite genres: {{ favoriteGenres[0] }}
			</span>,
			{{ favoriteGenres[1] }}, {{ favoriteGenres[2] }}
			and {{ favoriteGenres[3] }} - all with a strong german influence.
		</p>

		<!-- playlist mood/audio features -->
		<p>
			The overall
			<span id="text-5">
				mood of my playlist
			</span> tends to be {{ featureLabel('danceability') }} and
			{{ featureLabel('valence') }}, with a preference for
			{{ featureLabel('energy') }} over {{ featureLabel('energy', true) }} and {{ featureLabel('acousticness') }}
			over
			{{ featureLabel('acousticness', true) }} sounds.
		</p>

		<!-- end section -->
		<p>
			Now you know me <span id="text-7" style="padding-top: 10px">a little better?!</span>
		</p>

	</div>
</template>

<script setup lang="ts">
import { audioFeatures } from '~/utils/audioFeatures';
import type { AnalysisData } from './PlaylistAnalysis.vue';
import { computed } from 'vue';

const props = defineProps<{
	data: AnalysisData;
	step: number;
}>();

const firstFavorite = computed(() => Object.values(props.data.artists)[0]);
const secondFavorite = computed(() => Object.values(props.data.artists)[1]);
const favoriteGenres = computed(() => Object.keys(props.data.genres.general));

// Pass a function that returns the value of props.step === 2
useAnnotate('text-2', () => props.step == 3, 'underline', (Math.random() * 250));
useAnnotate('text-3', () => props.step == 4, 'underline', (Math.random() * 250));
useAnnotate('text-4', () => props.step == 5, 'underline', (Math.random() * 250));
useAnnotate('text-5', () => props.step == 6, 'underline', (Math.random() * 250));
useAnnotate('text-7', () => props.step == 8, 'underline', (Math.random() * 250));



const featureLabel = (labelId: string, inverted: boolean = false) => {
	const element = audioFeatures.find(element => element.id == labelId);
	if (!element) {
		return null;  // Or some default value/error handling
	}

	const featureValue = props.data.features[labelId];

	if (inverted) {
		return featureValue <= 0.5 ? element.rightLabel : element.leftLabel;
	} else {
		return featureValue > 0.5 ? element.rightLabel : element.leftLabel;
	}
};

</script>

<style scoped>
#analysis-description {
	position: relative;
}

.scrolling-hint {
	margin-top: 100px;
	margin-bottom: 50px;
}


p {
	text-align: justify;
	padding-right: 20px;
}


@media screen and (max-width: 1000px) {
	.scrolling-hint {
		display: none;
	}

	h1 {
		padding-top: 50px;
		text-align: center;
		line-height: 40px;
	}

}
</style>