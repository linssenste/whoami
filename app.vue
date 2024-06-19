<template>
	<div id="app">
		<JumpTopButton />


		<WelcomeSection class="welcome-section" style="width: 100%; overflow-x: hidden;" id="welcome-section" />
		<LayoutToolbar style="margin-bottom: 40px;" :playing="isPlaying" />
		<MusicSection id="analysis-section" v-on:playing="isPlaying = $event" />

		<div id="portfolio-section" style="width: 100%; height: 900px; background-color: purple;"></div>


		<div id="other-section" style="width: 100%; height: 900px; background-color: grey;"></div>
		<!-- <PortfolioTimeline /> -->

	</div>
</template>

<script lang="ts" setup>

const isPlaying = ref(false)
useHead({
	title: "Steffen's Portfolio",
	htmlAttrs: {
		lang: 'en'
	},
	meta: [
		{
			name: 'description',
			content: "I'm Steffen, a front-end developer with a passion for sleek UI & UX. Discover my work, life, and inspirations through this site."
		}
	]
});
</script>

<style scoped>
.welcome-section {
	margin-top: 50px;
}

#app {}
</style>