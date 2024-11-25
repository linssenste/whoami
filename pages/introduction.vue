<template>
	<div id="introduction">

		<JumpTopButton />


		<WelcomeSection class="welcome-section" style="width: 100%; overflow-x: hidden;" id="welcome-section" />
		<LayoutToolbar />
		<MusicSection id="analysis-section" style="z-index: 10; " />
		<TravelingSection id="travel-section" />

		<PolaroidSection id="polaroid-section" />


		<InclusionSection id="inclusion-section" />

		<EndSection id="end-section" />

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

#introduction {
	position: relative;
}
</style>