<template>
	<div
		 style="width: 100%; padding-top: 100px;  position: relative; display: flex; flex-direction: column; align-items: start;">
		<img v-if="logo" :src="logo" height="80" max-width="200" style="margin-bottom: 30px; ;" />

		<h1>
			<slot name="header" />

		</h1>

		<p style="text-align: justify;">

			<slot name="text" />
		</p>

		<Button text="Play a round" />
		<!-- <github-button class="github-button" data-testid="github-link" v-if="github != null"
					   :href="`https://github.com/linssenste/${github}`" data-size="large" data-show-count="true"
					   aria-label="View on GitHub">View on
			Github</github-button> -->




	</div>
</template>

<script lang="ts" setup>
// import GithubButton from 'vue-github-button'

const props = defineProps<{
	logo?: string,
	github?: string
}>()

props.logo;
props.github
</script>

<style scoped>
.github-button {
	margin-top: 40px;
}
</style>