<template>
	<div style="position: relative; height: fit-content;">
		<Risographic style="margin-top: -50px;" />
		<MusicAlbumCoverBanner :isPlaying="isPlaying" style="margin-top: -350px; z-index: 2"
							   v-on:track-selected="selectedTrack = $event" />
		<!-- <MusicAlbumCover style="margin-top: -300px" :src="cover" :status="{ selected: false, playing: true }" /> -->

		<AnalysisPlaylistAnalysis v-on:selected="selectedTrack = $event" :selected-track="selectedTrack"
								  v-on:playing="isPlaying = $event" />



	</div>
</template>


<script lang="ts" setup>
const isPlaying = ref(false)
const selectedTrack = ref("2dLLR6qlu5UJ5gk0dKz0h3")

const emit = defineEmits(['playing'])

watch(isPlaying, () => {
	emit('playing', isPlaying.value)
})
</script>

<style scoped></style>