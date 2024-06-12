<template>
	<div class="music-videos">
		<div class="video-column" v-for="video in videos" :key="video.description">
			<div class="video-border">
				<video v-lazy-load height="534" :id="video.id" controls :poster="video.thumbnail"
					   :alt="video.description" style="border-radius: 12px" fetchpriority="high">
					<source v-for="(url, resolution) in video.src" :key="resolution"
							:src="`https://firebasestorage.googleapis.com/v0/b/linssenweb.appspot.com/o/videos%2F${url}`"
							:type="'video/mp4'" :data-resolution="resolution" />
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
import { onMounted } from 'vue';





const videos = [
	{
		id: 'slovenia-video',
		src: {
			// 360: 'slovenia%2Foutput_360.mp4?alt=media&token=68e03a8a-7afa-4271-9536-81b188287939',
			// 480: 'slovenia%2Foutput_480.mp4?alt=media&token=93a89d69-2391-41eb-aff1-b4807ef30ab7',
			720: 'slovenia%2Foutput_720.mp4?alt=media&token=60ab831e-bd64-4d92-a6b4-01bce4c02177',
			// 1080: 'slovenia%2Foutput_1080.mp4?alt=media&token=986bd5c4-5999-4cf6-9970-c880f38e9834',
			// 2160: 'slovenia%2Foutput_2160.mp4?alt=media&token=0bc38fcd-ef70-4089-999e-3b8f37aa94ce'

		}, description: 'Vacation in Slovenia', thumbnail: '/videos/thumbnail-slovenia.webp', trackId: '4zCVknIsuMpvBSBZA7N1rt'
	},
	{
		id: 'mountain-video',
		src: {
			// 360: 'mountain%2Foutput_360.mp4?alt=media&token=ce767816-876b-418f-81ba-2698d1a2f8f9',
			// 480: 'mountain%2Foutput_480.mp4?alt=media&token=a3fce23f-c1d7-4827-a51b-277405308e58',
			720: 'mountain%2Foutput_720.mp4?alt=media&token=d7292770-9f20-411e-a037-65f16d12707c',
			// 1080: 'mountain%2Foutput_1080.mp4?alt=media&token=bf4abeb6-ba63-4b4f-9552-2f8efbd5fd7c',
			// 2160: 'mountain%2Foutput_2160.mp4?alt=media&token=1e73bc74-568f-4dfb-a170-bad40f122124'
		}, description: 'Morning in the mountain', thumbnail: '/videos/thumbnail-mountain.webp', trackId: '6potEImiklXkwD9qFzpu15'
	}
]

const emit = defineEmits(['play'])

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

	const sloveniaVideo = document.getElementById('slovenia-video');
	const mountainVideo = document.getElementById('mountain-video');

	if (sloveniaVideo) (sloveniaVideo as HTMLVideoElement).pause();
	if (mountainVideo) (mountainVideo as HTMLVideoElement).pause();

})

onMounted(() => {

	const sloveniaVideo = document.getElementById('slovenia-video');
	const mountainVideo = document.getElementById('mountain-video');

	if (sloveniaVideo == null || mountainVideo == null) return

	sloveniaVideo.addEventListener('play', () => {
		(mountainVideo as HTMLVideoElement).pause();
	});

	mountainVideo.addEventListener('play', () => {
		(sloveniaVideo as HTMLVideoElement).pause();
	});
})
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

	/* gap: 10px; */
	justify-content: center
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