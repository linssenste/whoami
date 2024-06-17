<template>
	<div id="app">
		<JumpTopButton />
		<WelcomeSection />
		<!-- <MusicSection /> -->
		<!-- <div style="width: 100%; height: 500px; background-color: grey;"></div> -->
		<!-- <PortfolioTimeline /> -->
	</div>
</template>

<script lang="ts" setup>
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
