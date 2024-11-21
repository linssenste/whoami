<template>
	<div id="app">

		<JumpTopButton />


		<WelcomeSection class="welcome-section" style="width: 100%; overflow-x: hidden;" id="welcome-section" />
		<LayoutToolbar />
		<MusicSection id="analysis-section" style="z-index: 10; " />
		<TravelingSection id="travel-section" />

		<PolaroidSection id="polaroid-section" />


		<InclusionSection id="inclusion-section" />

		<!-- <Risographic style="margin-top: -550px;" id="riso-section" /> -->
		<h2>Thats it!</h2>

		<!-- <div id="facts-section" style="width: 100%; height: 900px; background-color: grey;">

			<iframe width="560" height="315" src="https://www.youtube.com/embed/S-S5_oVNvZQ?si=qin9graRTGLmWD7u"
					title="YouTube video player" frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
		</div> -->

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

<style scoped>
.welcome-section {
	margin-top: 50px;
}

#app {}
</style>