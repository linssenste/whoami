<template>
	<LayoutPortfolioDescription logo="/portfolio/geo.webp" github="dalli-dalli">
		<template v-slot:header>
			Oder ein anderer header dann doch?
		</template>
		<template v-slot:text>
			{{ visiblity }} - das ist ein ganz kurzer Text
		</template>

	</LayoutPortfolioDescription>
</template>

<script setup lang="ts">

const visiblity = ref(0)
onMounted(() => {
	window.addEventListener('message', (msg) => {
		console.log(msg)
		visiblity.value = msg.data
	})
})
</script>