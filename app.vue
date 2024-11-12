<template>
	<div id="app">




		<JumpTopButton />


		<WelcomeSection class="welcome-section" style="width: 100%; overflow-x: hidden;" id="welcome-section" />
		<LayoutToolbar :playing="isPlaying" />
		<MusicSection id="analysis-section" v-on:playing="isPlaying = $event" style="z-index: 10;" />
		<TravelingSection id="travel-section" />

		<div id="polaroid-section"
			 style="height: calc(100vh - 40px); width: calc(100% - 40px); margin: 20px; margin-top: 10 0px; border-radius: 20px; overflow: hidden; position: relative;">

			<iframe width="100%" height="100%" style="border: none" src="https://instax.linssenste.dev" />
		</div>


		<h1>* this is a side project of mine</h1>

		<div id="other-section" style="width: 100%; height: 900px; background-color: grey;"></div>







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