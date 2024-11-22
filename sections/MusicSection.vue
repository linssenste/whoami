<template>
	<div class="music-section-container">
		<Risographic class="art" section="music" :class="{ 'mobile-art-offset': isMobile }" />

		<!-- album covers are offsetted into the riso-art  -->
		<MusicAlbumCoverBanner class="album-banner" />
		<AnalysisPlaylistAnalysis />
	</div>
</template>


<script lang="ts" setup>
const { isMobile } = useDeviceDetection();

</script>

<style scoped>
.music-section-container {
	position: relative;
	height: fit-content;
}

.art {
	margin-top: 75px;
}

.mobile-art-offset {
	margin-top: 0px;
}


.album-banner {
	margin-top: -200px !important;
	z-index: 2
}
</style>
