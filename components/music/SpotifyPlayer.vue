<template>
	<div class="music-player" :id="playerId">
		<iframe ref="spotifyIframe" sandbox="allow-scripts" :src="iframeSrc" allow="fullscreen; autoplay"
				allowfullscreen title="music player" frameborder="0"></iframe>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const hasError = ref(false);

// Interface for the Spotify IFrame API controller
interface SpotifyIFrameAPI {
	createController: (
		element: HTMLElement | null,
		options: { uri: string; },
		callback: (controller: SpotifyController) => void
	) => void;
}

// Interface for the controller that the Spotify API returns
interface SpotifyController {
	addListener: (event: string, callback: (e: any) => void) => void;
	togglePlay: () => void;
	loadUri: (id: string) => void;
}

const props = defineProps<{
	trackId: string | null,
	playerId: string
}>();
props.playerId;

const emit = defineEmits(['playing']);

const embedController = ref<SpotifyController | null>(null);
const iframeSrc = ref('');

let errorTimeout: ReturnType<typeof setTimeout> | null = null;
let isPlaying = false;

watch(() => props.trackId, async () => {
	if (props.trackId == null) return;
	iframeSrc.value = `https://open.spotify.com/embed/track/${props.trackId}`;
	if (!embedController.value) {
		initSpotifyApi();
	} else if (props.trackId != null && embedController.value) {
		await embedController.value.loadUri('spotify:track:' + props.trackId);
		if (isPlaying) embedController.value?.togglePlay();
	}
}, { immediate: true });

function initSpotifyApi() {
	if (!props.trackId) return;
	hasError.value = false;

	errorTimeout = setTimeout(() => {
		if (embedController.value) return;
		console.error("Timeout occurred while setting up Spotify API");
		hasError.value = true;
	}, 2000);

	try {
		(window as any).onSpotifyIframeApiReady = (IFrameAPI: SpotifyIFrameAPI) => {
			if (errorTimeout) clearTimeout(errorTimeout);

			const element = document.getElementById(props.playerId)?.querySelector('iframe');

			if (!element) {
				hasError.value = true;
				return;
			}

			const options = {
				uri: 'spotify:track:' + props.trackId
			};

			const callback = (controller: SpotifyController) => {
				embedController.value = controller;
				hasError.value = false;

				controller.addListener('playback_update', e => {
					isPlaying = !e.data.isPaused;
					emit("playing", !e.data.isPaused && !(e.data.position >= e.data.duration));
				});
			};

			IFrameAPI.createController(element, options, callback);
		};
	} catch (error) {
		hasError.value = true;
	}
}

// Example of tying audio context initialization to a user gesture
function startPlayback() {
	document.getElementById('startButton')?.addEventListener('click', () => {
		togglePlaying();
	});
}

function togglePlaying() {
	try {
		embedController.value?.togglePlay();
	} catch {
		return
	}
}

defineExpose({ togglePlaying });
</script>

<style scoped>
.music-player {
	width: 100%;
	height: 100%;
	position: relative;
}
</style>