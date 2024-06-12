<template>

	<div class="container" ref="welcomeSectionRef">

		<JumpTopButton />

		<PolaroidExpandableStack ref="polaroidStack" stackName="testname" :polaroids="polaroids">
			<template v-slot:text>
				<div class="intro-text">

					<h1>Hi, my name is Steffen!</h1>

					<p>
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
						ut
						labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
						dolores
						et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
						Lorem
						ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
						labore
						et
						dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
						rebum.
						Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
					</p>

					<span id="">This is the <span id="human">human</span> text to be annotated.</span>

					<br>
					<Button v-on:click="toggleGallery" color="black" text="Show Gallery"
							style="margin-top: 20px; margin-bottom: 20px" />
				</div>
			</template>
		</PolaroidExpandableStack>


		<Risographic />
		<MusicAlbumCoverBanner :isPlaying="isPlaying" style="margin-top: -350px; z-index: 2"
							   v-on:track-selected="selectedTrack = $event" />
		<!-- <MusicAlbumCover style="margin-top: -300px" :src="cover" :status="{ selected: false, playing: true }" /> -->

		<AnalysisPlaylistAnalysis v-on:selected="selectedTrack = $event" :selected-track="selectedTrack"
								  v-on:playing="isPlaying = $event" />


		<div class="music-love-images">
			<PolaroidImage src="/polaroids/music/polaroid-1.webp" alt="" />
			<PolaroidImage src="/polaroids/music/polaroid-2.webp" alt="" />
			<PolaroidImage src="/polaroids/music/polaroid-3.webp" alt="" />

		</div>
		<div style="width: 100%; height: 500px; background-color: grey;"></div>

		<!-- 	<LayoutStepScroller :steps="5" id="me" text-side="left">

			<template v-for="index in 5" :key="index" v-slot:[`me-step-${index}`]>
				<div :id="`me-step-${index}`" style="width: 100%; height: 500px; background-color: lightcoral;">{{
			index }}
				</div>
			</template>
		</LayoutStepScroller> -->

	</div>
</template>

<script lang="ts" setup>
import type { POLAROID_CARD } from './components/polaroid/ExpandableStack.vue';


useHead({
	title: "te",
	htmlAttrs: {
		lang: 'en'
	}
});
const welcomeSectionRef = ref(null);

const isPlaying = ref(false)
const selectedTrack = ref("2dLLR6qlu5UJ5gk0dKz0h3")
useAnnotate('human');

const cover = { "cover": "51463247335f7bea5e469f9e", "id": "4Om5A3TGYl8auFZRz0l2Sf", "name": "In Schwarz", "artists": [{ "name": "Kraftklub", "id": "0MZ55DwuMQ1B2TXq9lcrE4" }], "release": "2014-01-01", "tracks": ["7ruRqXvFzjBmXi5Rp3D0XP", "7LpMBXB7DT0nYUGMWsCqux", "2zJVMr37kvgxfXjfULIHvx", "2LjKPTg3ScAGqMhTBDdbD6", "0eLYvViVpIkau96EI76L6z"] }
const polaroidStack = ref<HTMLElement | null>(null);

function toggleGallery() {
	if (polaroidStack.value) {
		(polaroidStack.value as any).toggleExpansion();
		window.scroll({ top: 0, behavior: 'smooth' })
	}
}

const shufflePolaroids = (): POLAROID_CARD[] => {
	let polaroids: POLAROID_CARD[] = [
		{ src: '/polaroids/polaroid-1.webp', alt: 'moin' },
		{ src: '/polaroids/polaroid-2.webp', alt: 'moin' },
		{ src: '/polaroids/polaroid-3.webp', alt: 'moin' },
		{ src: '/polaroids/polaroid-4.webp', alt: 'moin' },
		{ src: '/polaroids/polaroid-5.webp', alt: 'moin' },
		{ src: '/polaroids/polaroid-6.webp', alt: 'moin' },
		{ src: '/polaroids/polaroid-7.webp', alt: 'moin' },
		{ src: '/polaroids/polaroid-8.webp', alt: 'moin' },
		{ src: '/polaroids/polaroid-9.webp', alt: 'moin' },
		{ src: '/polaroids/polaroid-10.webp', alt: 'moin' },
		{ src: '/polaroids/polaroid-11.webp', alt: 'moin' }
	];

	// Shuffle all but the last element
	for (let i = polaroids.length - 2; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[polaroids[i], polaroids[j]] = [polaroids[j], polaroids[i]];
	}

	return polaroids;
};

const polaroids = useState<POLAROID_CARD[]>('polaroids', () => shufflePolaroids());

</script>


<style scoped>
.container {
	background-color: #ffffff;
}

.music-love-images {
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	overflow-x: auto;
	justify-content: center;
}
</style>