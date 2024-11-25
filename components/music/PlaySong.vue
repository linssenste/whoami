<template>
	<div class="song-section">

		<div class="cover-title">
			<!-- album cover image -->
			<img :src="`https://i.scdn.co/image/ab67616d00004851${song.cover}`" alt="album cover" width="75"
				 height="75" />

			<!-- track name + singer(s) -->
			<!-- lighthouse contrast issue originates here ?? -->
			<div class="song-info">
				<div>{{ song.trackName }}</div>
				<div>{{ song.artist }}</div>
			</div>

		</div>

		<!-- play/audio visualizer  -->
		<div class="playing-area">
			<button v-if="!(store.trackId == song.trackId)" v-on:click="playSectionSong()"
					aria-label="button to play a dedicted song" title="play song"><img alt="play icon " data-not-lazy
					 src="../../assets/icons/play.svg" width="30" height="30" /></button>
			<MusicAudioVisualizer v-else v-on:click="togglePlayStatus(!store.isPlaying)" class="audio-equalizer"
								  :playing="store.isPlaying" />
		</div>
	</div>
</template>


<script setup lang="ts">

import { useStore } from '@/store';

const props = defineProps<{
	song: {
		cover: string;
		id: string;
		artist: string;
		trackName: string;
		trackId: string;
	}
}>()

const store = useStore();

function togglePlayStatus(play: boolean) {
	store.setPlayStatus(play);
}
function playSectionSong() {
	store.selectTrack(props.song.trackId);

}

</script>

<style scoped>
.song-section {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 10px 0;
	background-color: white !important;
	gap: 15px;
	padding-right: 15px;
	border-radius: 12px;
	overflow: hidden;
}

.song-info {
	color: #333;
	/* A dark color for text */
	background-color: #fff;
	/* Ensure white is a sufficient contrast */
}

.song-info div {
	color: #333;
	/* Ensure all text elements use high-contrast colors */
}

.song-info div:first-child {
	color: #000;
	font-weight: bold;
}

.cover-title {
	display: flex;
	align-items: center;
	gap: 20px;
}

.playing-area {
	width: 50px;
	display: flex;
	height: 100%;

	align-items: center;
	justify-content: center;
}

.playing-area button {
	background-color: transparent;
	border: none;
	padding-top: 12px;

	height: 100%;
	width: 100%;
	cursor: pointer;
	outline: none;
	transition: transform 250ms ease-in-out;
}

.audio-equalizer {
	cursor: pointer;
}


@media (hover: hover) and (pointer: fine) {
	.playing-area button:hover {
		transform: scale(1.2);
	}
}
</style>