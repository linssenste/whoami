<template>
	<h1 id="colorful-head" class="colorful-heading"><span>I</span>
		<span>N</span>
		<span>C</span>
		<span>L</span>
		<span>U</span>
		<span>S</span>
		<span>I</span>
		<span>O</span>
		<span>N</span>
	</h1>

</template>

<script setup lang="ts">



// bubbles in array
let trailArr = [1, 1.5, 0.5, 1.2];


function trailAnimation(e, i, callbackFn) {
	var elem = document.createElement('div');

	elem = styleSparkle(elem, e, i);

	if (typeof callbackFn == 'function') {
		elem = callbackFn(elem);
	}

	elem.classList.add("sparkle");

	document.body.appendChild(elem);

	window.setTimeout(function () {
		document.body.removeChild(elem);

		// 1000 = lifespan of particles
	}, Math.round(Math.random() * i * 250));
}

function styleSparkle(elem, e, i) {
	const headRect = document.getElementById('colorful-head').getBoundingClientRect();

	const relativeX = e.pageX
	const relativeY = e.pageY - 50

	let j = (1 - i) * 150; // Spread factor
	let size = Math.ceil(Math.random() * 4 * i) + 'px'; // Particle size

	elem.style.top = relativeY + Math.round(Math.random() * j - j / 2) + 'px';
	elem.style.left = relativeX + Math.round(Math.random() * j - j / 2) + 'px';
	elem.style.width = size;
	elem.style.height = size;
	elem.style.borderRadius = size;
	elem.style.background = 'var(--yellow-color)';
	elem.style.position = 'absolute';
	elem.style.pointerEvents = 'none';

	return elem;
}

onMounted(() => {
	const doc = document.getElementById('colorful-head');
	if (!doc) return;
	doc.addEventListener('mousemove', function (e) {
		trailArr.forEach((i) => { trailAnimation(e, i) });

		trailArr.forEach((i) => {
			trailAnimation(e, i, (elem) => {
				elem.style.animation = "fallingsparkles 1s";

				return elem;
			})
		});
	}, false);
})


</script>

<style scoped>
.sparkle {
	width: 0;
	height: 0;
	border: 5px solid transparent;
	border-bottom: 7px solid red;
	position: absolute;
	top: -5px;
	opacity: 1;

}

.sparkle:after {
	content: '';
	position: absolute;
	left: -5px;
	top: 7px;
	width: 0;
	height: 0;
	border: 5px solid transparent;
	border-top: 7px solid gold;
}

@keyframes fallingsparkles {
	from {
		transform: translateY(0);
	}

	/* 50 = falling distance */

	to {
		transform: translateY(50px);
	}
}

.colorful-heading {

	cursor: default;
	width: fit-content;
	block-size: fit-content;
	user-select: none;
	-moz-user-select: none;
	-webkit-user-select: none;

	margin-bottom: 20px;
}

/* LGBTQ flag colors */
.colorful-heading span:nth-child(1) {
	color: var(--red-color) !important;
}

.colorful-heading span:nth-child(2) {
	color: var(--orange-color) !important;
}

.colorful-heading span:nth-child(3) {
	color: var(--yellow-color) !important;
}

.colorful-heading span:nth-child(4) {
	color: var(--green-color) !important;
}

.colorful-heading span:nth-child(5) {
	color: var(--blue-color) !important;
}

.colorful-heading span:nth-child(6) {
	color: var(--purple-color) !important;
}

.colorful-heading span:nth-child(7) {
	color: var(--pink-color) !important;
}

.colorful-heading span:nth-child(8) {
	color: var(--red-color) !important;
}

.colorful-heading span:nth-child(9) {
	color: var(--orange-color) !important;
}
</style>