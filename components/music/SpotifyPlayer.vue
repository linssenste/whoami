<template>
	<div class="music-player" :id="playerId">

		<iframe ref="spotifyIframe" sandbox="allow-scripts" :src="iframeSrc" allow="fullscreen; autoplay"
				allowfullscreen title="music player" height="152" frameborder="0" tabindex="-1"></iframe>
	</div>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from '@/store'

const { isMobile } = useDeviceDetection();

const props = defineProps<{
	mobile: boolean;
	playerId: string
}>();
props.mobile;
props.playerId;

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
	destroy: () => void;
}



const store = useStore()

const hasError = ref(false);

const embedController = ref<SpotifyController | null>(null);
const iframeSrc = ref('');

let errorTimeout: ReturnType<typeof setTimeout> | null = null;
let isMusicPlaying = false;

// Watch for track update/skip (changes in the trackId) and update the iframe source
watch(() => store.trackId, async () => {
	if (store.trackId == null || isMobile.value != props.mobile) return;
	iframeSrc.value = `https://open.spotify.com/embed/track/${store.trackId}`;
	if (!embedController.value) {
		initSpotifyApi();
	} else if (store.trackId != null && embedController.value) {
		await embedController.value.loadUri('spotify:track:' + store.trackId);
		embedController.value?.togglePlay();
	}
}, { immediate: true });


watch(() => isMobile.value, () => {
	store.setPlayStatus(false);
}, { immediate: true });

// Initialize the Spotify iframe API
function initSpotifyApi() {

	if (!store.trackId || isMobile.value != props.mobile) return;
	hasError.value = false;

	// set a timeout to handle errors
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
				height: 152,
				uri: 'spotify:track:' + store.trackId
			};


			const callback = (controller: SpotifyController) => {
				embedController.value = controller;
				hasError.value = false;

				// listener for the playback update event
				controller.addListener('playback_update', e => {
					store.setPlayStatus(!e.data.isPaused)
					isMusicPlaying = !e.data.isPaused;
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

watch(() => store.isPlaying, (isPlaying) => {
	if (embedController.value && isMusicPlaying != isPlaying) {
		isMusicPlaying = isPlaying;
		embedController.value.togglePlay();
	}
});
// manually toggle playing (Note: only possible if initial play is done manually)
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
	background-color: var(--light-grey-color);
	width: 100%;
	border-radius: 12px;
	overflow: hidden;
	height: 100%;
	position: relative;
}
</style>