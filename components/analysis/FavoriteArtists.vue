<template>
	<div class="favs-container">
		<h2><span id="top-header">TOP 5 ARTISTS</span></h2>

		<div v-for="(artist, index) in sortedArtists" class="artist-card">
			<div class="artist-index"><b>{{ index + 1 }}.</b></div>

			<!-- profile picture + hover & click to play -->
			<div class="artist-profile-picture">
				<img draggable="false" height="90" width="90" alt=""
					 :src="`https://i.scdn.co/image/ab6761610000f178${artist.img}`" v-lazy-load />
				<div class="play-song-overlay" v-on:click="playFavorite(artist)">
					<img data-not-lazy src="../../assets/icons/play.svg" alt="Play song of that favortie artists"
						 width="30" height="30" />
				</div>
			</div>

			<!-- name and number of tracks -->
			<div>
				<b class="artist-name">{{ artist.name }}</b>
				<div class="track-count">
					<span>{{ artist.tracks }} TRACKS</span>
				</div>
			</div>

		</div>
	</div>
</template>


<script lang="ts" setup>
import type { ArtistStatsElement } from './PlaylistAnalysis.vue';




const emit = defineEmits(['play'])
const props = defineProps<{
	artists: Record<string, ArtistStatsElement>;
	visible: boolean;
}>();

const visible = ref(props.visible);
useAnnotate('top-header', visible);

interface ArtistElement extends ArtistStatsElement {
	id: string;
}
const sortedArtists = computed(() => {
	// Convert the artists object to an array of entries, each entry is [key, value]
	return Object.entries(props.artists)
		.map(([key, value]) => ({ ...value, id: key })) // Convert each entry into an object and include the original key as 'id'
		.sort((a, b) => parseInt(b.occurrence) - parseInt(a.occurrence)); // Sort based on the 'occurrence' property
});

// Watch for changes in the props.visible
watch(() => props.visible, (newValue) => {
	visible.value = newValue;
});


function playFavorite(artist: ArtistElement) {

	emit('play', artist.id);
	const musicPlayerElement = document.getElementById('music-player');
	if (!musicPlayerElement) return;

	musicPlayerElement.scrollIntoView({
		behavior: 'smooth'
	});

}
</script>


<style scoped>
.artist-card {
	position: relative;
	display: flex;
	padding: 10px;
	flex-direction: row;
	align-items: center;
	gap: 20px;
	border-radius: 6px;
}

.artist-index {
	font-size: 18px;
	padding-right: 20px;
}

.artist-profile-picture {
	border-radius: 12px;
	object-fit: cover;
	width: 90px;
	height: 90px;
	overflow: hidden;
	position: relative;
}

.play-song-overlay {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 10 !important;
	height: 100%;
	width: 100%;
	transition: all 150ms ease-in-out;
}

.play-song-overlay img {
	opacity: 0;
	transition: all 200ms ease-in-out;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 25px;
	height: 25px;
}

.artist-profile-picture:hover .play-song-overlay {
	cursor: pointer;
	background-color: #ffffff77;
	backdrop-filter: blur(5px);
	-webkit-backdrop-filter: blur(5px);

}

.artist-profile-picture:hover .play-song-overlay img {
	opacity: .75;
	width: 35px;
	height: 35px;
}

.favs-container {
	position: relative;
	padding-left: 25px;
}

.track-count {
	font-size: 16px;
	margin-top: 5px;
	letter-spacing: 1px;
	color: var(--grey-color)
}

.artist-name {
	font-size: 18px;
}

img[alt]:after {
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	border-radius: 4px;
	background-color: #f0f0f0aa;

	content: '';
}
</style>