<template>
	<div style="padding-bottom: 50px;">
		<div style="text-align: center;">

			<h1>European Adventures</h1>
			<p>I spent a few months {{ yearText }} travelling around Europe with <span id="dog-name">my dog
					Jasper</span>, exploring the continent
				by
				train.</p>

		</div>
		<TravelMapGallery />
	</div>
</template>

<script lang="ts" setup>

useAnnotate('dog-name', undefined, 'underline', 0);

const yearText = computed(() => {

	const currentYear = new Date().getFullYear();
	if (currentYear == 2024) return 'this year';
	if (currentYear - 1 == 2024) return 'last year';
	else return 'in 2024'
})
</script>
