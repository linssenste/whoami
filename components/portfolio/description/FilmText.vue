<template>
	<LayoutPortfolioDescription logo="/portfolio/film.png" github="instax-link-web">
		<template v-slot:header>
			Das ist ein header

		</template>
		<template v-slot:text>

			<!-- <div class="square-row" ref="logoRef">
				<div v-for="color in ['red', 'orange', 'yellow', 'green', 'blue', 'pink']" class="square"
					 :style="`background-color: var(--${color}-color)!important`"></div>
			</div> -->
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
			tempor invidunt ut labore et
			dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
			clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
			consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
			sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
			sea takimata sanctus est Lorem ipsum dolor sit amet.


		</template>

	</LayoutPortfolioDescription>
</template>

<script setup lang="ts">

const logoRef = ref(null)
onMounted(async () => {
	if (!logoRef.value) return;

	const squares = logoRef.value.querySelectorAll('.square');
	squares.forEach((square, index) => {
		square.style.animation = `scaleUp 500ms ${index * 75}ms forwards`;
	});
})
</script>


<style setup>
.square-row {
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 5px;
	height: 50px;
}

.square {
	width: 25px;
	height: 25px;
	background-color: red;
	border-radius: 4px;
	transition: all 250ms linear;
}

.square:hover {
	width: 45px;
	height: 45px;
}

@keyframes scaleUp {

	0%,
	100% {

		width: 25px;
		height: 25px;
	}

	50% {

		width: 45px;
		height: 45px;
	}
}
</style>