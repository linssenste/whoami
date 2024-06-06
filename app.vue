<template>
	<div class="container">
		<ExpandablePolaroidStack ref="polaroidStack" stackName="testname" :polaroids="polaroids">
			<template v-slot:text>
				<div class="intro-text">
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
					labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
					et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
					Lorem
					ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
					et
					dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
					rebum.
					Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.


					<Button v-on:click="toggleGallery" color="orange" text="Show Gallery"
							style="margin-top: 20px; margin-bottom: 20px" />
				</div>
			</template>
		</ExpandablePolaroidStack>


		<Risographic />
	</div>
</template>

<script lang="ts" setup>
import type { POLAROID_CARD } from './components/ExpandablePolaroidStack.vue';
import { useState } from '#app';

useHead({
	title: "te",
	htmlAttrs: {
		lang: 'en'
	}
});

const polaroidStack = ref<HTMLElement | null>(null);

function toggleGallery() {
	if (polaroidStack.value) {
		(polaroidStack.value as any).toggleExpansion();
		window.scroll({ top: 0, behavior: 'smooth' })
	}
}

const shufflePolaroids = (): POLAROID_CARD[] => {
	let polaroids: POLAROID_CARD[] = [
		{ src: '/polaroids/polaroid-1.webp', alt: 'moin' },
		{ src: '/polaroids/polaroid-2.webp', alt: 'moin' },
		{ src: '/polaroids/polaroid-3.webp', alt: 'moin' },
		{ src: '/polaroids/polaroid-4.webp', alt: 'moin' },
		{ src: '/polaroids/polaroid-5.webp', alt: 'moin' },
		{ src: '/polaroids/polaroid-6.webp', alt: 'moin' },
		{ src: '/polaroids/polaroid-7.webp', alt: 'moin' },
		{ src: '/polaroids/polaroid-8.webp', alt: 'moin' },
		{ src: '/polaroids/polaroid-9.webp', alt: 'moin' },
		{ src: '/polaroids/polaroid-10.webp', alt: 'moin' },
		{ src: '/polaroids/polaroid-11.webp', alt: 'moin' }
	];

	// Shuffle all but the last element
	for (let i = polaroids.length - 2; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[polaroids[i], polaroids[j]] = [polaroids[j], polaroids[i]];
	}

	return polaroids;
};

const polaroids = useState<POLAROID_CARD[]>('polaroids', () => shufflePolaroids());

</script>


<style scoped>
.container {
	background-color: #ffffff;
}
</style>