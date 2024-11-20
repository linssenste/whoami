<template>
	<div class="polaroid-section-container">
		<div class="polaroid-generator-embed" :class="{ 'embed-mobile': isMobile }">
			<iframe width="100%" height="100%" style="border: none" src="https://instax.linssenste.dev" />
		</div>

		<!-- Place this tag where you want the button to render. -->
		<github-button href="https://github.com/linssenste/instax-link-web"
					   data-color-scheme="no-preference: light; light: light; dark: dark;" data-size="large"
					   data-show-count="true"
					   aria-label="Star linssenste/instax-link-web on GitHub">Star</github-button>
		<h1>* this is a side project of mine</h1>
	</div>
</template>



<script lang="ts" setup>
import GithubButton from 'vue-github-button'

const { isMobile } = useDeviceDetection();
</script>
<style scoped>
.polaroid-section-container {
	position: relative;
	height: fit-content;
}

.polaroid-generator-embed {
	height: calc(100vh - 40px);
	width: calc(100% - 40px);
	margin: 20px;
	margin-top: 10 0px;
	border-radius: 20px;
	overflow: hidden;
	position: relative;
}

.embed-mobile {
	height: calc(100vh - 20px);
	width: 100%;
	border-radius: 0px;
	margin: 0px !important;
	margin-top: 10px;
}
</style>