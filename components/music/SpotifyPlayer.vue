<template>
	<div class="music-player" :id="playerId">

		<iframe ref="spotifyIframe" sandbox="allow-scripts" :src="iframeSrc" allow="fullscreen; autoplay"
				allowfullscreen title="music player" frameborder="0" tabindex="-1"></iframe>
	</div>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from '@/store'

const store = useStore()

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
	playerId: string
}>();
props.playerId;


const embedController = ref<SpotifyController | null>(null);
const iframeSrc = ref('');

let errorTimeout: ReturnType<typeof setTimeout> | null = null;
let isPlaying = false;

watch(() => store.trackId, async () => {
	if (store.trackId == null) return;
	iframeSrc.value = `https://open.spotify.com/embed/track/${store.trackId}`;
	if (!embedController.value) {
		initSpotifyApi();
	} else if (store.trackId != null && embedController.value) {
		await embedController.value.loadUri('spotify:track:' + store.trackId);

		console.log("CLI", embedController.value)
		if (isPlaying) embedController.value?.togglePlay();
	}
}, { immediate: true });

function initSpotifyApi() {
	if (!store.trackId) return;
	hasError.value = false;

	errorTimeout = setTimeout(() => {
		if (embedController.value) return;
		console.error("Timeout occurred while setting up Spotify API");
		hasError.value = true;
	}, 2000);

	try {

		let finishing = false;
		(window as any).onSpotifyIframeApiReady = (IFrameAPI: SpotifyIFrameAPI) => {
			if (errorTimeout) clearTimeout(errorTimeout);

			const element = document.getElementById(props.playerId)?.querySelector('iframe');

			if (!element) {
				hasError.value = true;
				return;
			}

			const options = {
				height: '152',
				uri: 'spotify:track:' + store.trackId
			};

			const callback = (controller: SpotifyController) => {
				embedController.value = controller;
				hasError.value = false;

				controller.addListener('playback_update', e => {
					isPlaying = !e.data.isPaused;
					store.setPlayStatus(!e.data.isPaused && !(e.data.position > 0 && e.data.position >= e.data.duration))


					if ((e.data.position > 0 && e.data.position >= e.data.duration) && !finishing) {

						finishing = true;
						setTimeout(() => {

							store.shuffleTracks();
							finishing = false;
						}, 10);

					}
				});
			};

			IFrameAPI.createController(element, options, callback);
		};
	} catch (error) {
		hasError.value = true;
	}
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