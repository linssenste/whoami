<template>

	<div class="container" ref="welcomeSectionRef">
		<JumpTopButton />


		<WelcomeSection />
		<!-- <MusicSection /> -->


		<!-- <div style="width: 100%; height: 500px; background-color: grey;"></div> -->
		<!-- <PortfolioTimeline /> -->
	</div>
</template>

<script lang="ts" setup>

useHead({
	title: "te",
	htmlAttrs: {
		lang: 'en'
	}
});


</script>


<style scoped>
.container {
	background-color: #fcfcfcfc;
}
</style>