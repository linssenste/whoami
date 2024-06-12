<template>
	<div class="music-videos">
		<div class="video-column" v-for="video in videos" :key="video.description">
			<div class="video-border">
				<video ref="videoPlayer" :id="video.id" controls :poster="video.thumbnail" :alt="video.description"
					   height="534" width="300" style="border-radius: 12px" fetchpriority="high">
				</video>
			</div>
			<div class="video-description">
				<div>{{ video.description }}</div>
				<button v-on:click="openVideoMusic(video.trackId)" class="music-button" aria-label="">
					<img data-not-lazy src="../../assets/icons/music.svg" alt="show video music on spotify" width="18"
						 height="18" />
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Hls from 'hls.js';

const videos = [
	{
		id: 'slovenia-video',
		src: '/videos/slovenia.m3u8',
		description: 'Vacation in Slovenia',
		thumbnail: '/videos/thumbnail-slovenia.webp',
		trackId: '4zCVknIsuMpvBSBZA7N1rt'
	},
	{
		id: 'mountain-video',
		src: '/videos/mountain.m3u8',
		description: 'Morning in the mountain',
		thumbnail: '/videos/thumbnail-mountain.webp',
		trackId: '6potEImiklXkwD9qFzpu15'
	}
];

const emit = defineEmits(['play']);

function openVideoMusic(trackId: string) {
	emit('play', trackId);
	const musicPlayerElement = document.getElementById('music-player');
	if (!musicPlayerElement) return;

	musicPlayerElement.scrollIntoView({
		behavior: 'smooth'
	});
}

const props = defineProps<{
	focus: boolean;
}>();
props.focus;

watch(() => props.focus, () => {
	const sloveniaVideo = document.getElementById('slovenia-video') as HTMLVideoElement;
	const mountainVideo = document.getElementById('mountain-video') as HTMLVideoElement;

	if (sloveniaVideo) sloveniaVideo.pause();
	if (mountainVideo) mountainVideo.pause();
});

onMounted(() => {
	videos.forEach(video => {
		const videoElement = document.getElementById(video.id) as HTMLVideoElement;
		if (videoElement) {
			if (Hls.isSupported()) {
				const hls = new Hls();
				hls.loadSource(video.src);
				hls.attachMedia(videoElement);
				hls.on(Hls.Events.MANIFEST_PARSED, () => {
					videoElement.play();
				});
				hls.on(Hls.Events.ERROR, (event, data) => {
					if (data.fatal) {
						switch (data.type) {
							case Hls.ErrorTypes.NETWORK_ERROR:
								console.error('Fatal network error encountered, trying to recover.');
								hls.startLoad();
								break;
							case Hls.ErrorTypes.MEDIA_ERROR:
								console.error('Fatal media error encountered, trying to recover.');
								hls.recoverMediaError();
								break;
							default:
								console.error('An unrecoverable error occurred.');
								hls.destroy();
								break;
						}
					}
				});
			} else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
				videoElement.src = video.src;
				videoElement.addEventListener('canplay', () => {
					videoElement.play();
				});
			}
		}
	});

	const sloveniaVideo = document.getElementById('slovenia-video') as HTMLVideoElement;
	const mountainVideo = document.getElementById('mountain-video') as HTMLVideoElement;

	if (sloveniaVideo && mountainVideo) {
		sloveniaVideo.addEventListener('play', () => {
			mountainVideo.pause();
		});

		mountainVideo.addEventListener('play', () => {
			sloveniaVideo.pause();
		});
	}
});
</script>

<style scoped>
.music-videos {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 50px;
}

.video-column {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.video-description {
	position: relative;
	display: flex;
	background-color: var(--light-grey-color);
	border-bottom-right-radius: 20px;
	border-bottom-left-radius: 20px;
	padding-left: 15px;
	padding-right: 10px;
	padding-bottom: 10px;
	padding-top: 10px;
	width: calc(100% - 25px);
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}

.video-description div {
	font-size: 22px;
	font-family: 'biro_script_standardregular';
	color: var(--pen-color)
}

.video-border {
	border: 10px solid var(--light-grey-color);
	background-color: var(--light-grey-color);
	border-top-right-radius: 20px;
	border-top-left-radius: 20px;
	width: 300px !important;
	max-width: 300px;
	min-width: 300px;
	overflow: hidden;
	height: 534px;
	position: relative;
}

.video-border video {
	background-color: var(--light-grey-color)
}

@media (max-width: 1250px) {
	.video-column:last-child {
		display: none;
	}
}

.music-button {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	border: none;
	outline: none;
	background-color: var(--light-grey-color);
	position: relative;
	cursor: pointer;
	opacity: .5;
	transition: opacity 150ms ease-in-out;
}

.music-button:hover {
	opacity: 1;
}

.music-button img {}
</style>
