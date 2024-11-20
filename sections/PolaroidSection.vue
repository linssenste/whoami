<template>
	<div class="polaroid-section-container">
		<div class="polaroid-generator-embed" :class="{ 'embed-mobile': isMobile }">
			<iframe width="100%" height="100%" style="border: none" src="https://instax.linssenste.dev" />
		</div>

		<div class="hint-area">

			<span class="hint-text">* <a href="https://instax.linssenste.dev" target="_blank">This</a> is a side
				project
			</span>

			<github-button href="https://github.com/linssenste/instax-link-web"
						   data-color-scheme="no-preference: light; light: light; dark: dark;" data-size="large"
						   data-show-count="true"
						   aria-label="Star linssenste/instax-link-web on GitHub">Star</github-button>

		</div>
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

.hint-area {

	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding-left: 20px;
	padding-right: 20px;
	padding-bottom: 40px;
}

.hint-area a {
	color: var(--grey-color);
}

@media (max-width: 768px) {
	.hint-area {
		flex-direction: column;
		align-items: center;
	}
}
</style>