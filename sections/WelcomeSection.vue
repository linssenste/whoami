<template>
	<PolaroidExpandableStack ref="polaroidStack" stackName="testname" :polaroids="polaroids">
		<template v-slot:text>
			<div class="intro-text">

				<h1>Hi, my name is Steffen!</h1>

				<p>
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
					ut
					labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
					dolores
					et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
					Lorem
					ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
					labore
					et
					dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
					rebum.
					Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
				</p>

				<span id="">This is the <span id="human">human</span> text to be annotated.</span>

				<br>
				<Button v-on:click="toggleGallery" color="black" text="Show Gallery"
						style="margin-top: 20px; margin-bottom: 20px" />
			</div>
		</template>
	</PolaroidExpandableStack>
</template>

<script setup lang="ts">
const polaroidStack = ref<HTMLElement | null>(null);
import type { PolaroidCard } from '../components/polaroid/ExpandableStack.vue';


useAnnotate('human');

function toggleGallery() {
	if (polaroidStack.value) {
		(polaroidStack.value as any).toggleExpansion();
		window.scroll({ top: 0, behavior: 'smooth' })
	}
}

const shufflePolaroids = (): PolaroidCard[] => {
	let polaroids: PolaroidCard[] = [
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