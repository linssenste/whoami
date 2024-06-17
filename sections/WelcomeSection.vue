<template>
	<PolaroidExpandableStack ref="polaroidStack" stackName="testname" :polaroids="polaroids">
		<template v-slot:text>

			<!-- introduction text  -->
			<div id="welcome-introduction">

				<!-- greetings (with name if query is defined)  -->
				<h1>Hello<span v-if="welcomeName" id="name" class="welcome-name">{{ welcomeName }}</span>!
				</h1>
				<p>
					My name is Steffen, and I am a front-end developer with a passion for sleek UI & UX. My work is
					driven by a deep interest for both technology and design, complemented by my enthusiasm for music. I
					may not be a virtuoso, but the world of melodies deeply influences and inspires my creative process.
				</p>
				<p>This website is more than just a portfolio of my technical skills and creative endeavours. It's a
					window into my personal world. Here you'll find a series of Polaroid images that offer glimpses into
					my daily life, share insights into my journey with disability, and reveal my deep connection to
					music. Together, these elements are a reflection of the many aspects of my life and passions.
				</p>

				<!-- slide-hover button to open gallery with polaroids -->
				<Button @click="toggleGallery" color="black" text="Show Gallery" class="gallery-button" />
			</div>
		</template>
	</PolaroidExpandableStack>
</template>

<script setup lang="ts">
import type { PolaroidCard } from '../components/polaroid/ExpandableStack.vue';

const polaroidStack = ref<HTMLElement | null>(null);


function toggleGallery() {
	if (polaroidStack.value) {
		(polaroidStack.value as any).toggleExpansion();
		window.scroll({ top: 0, behavior: 'smooth' });
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
	];

	// Shuffle all but the last element
	for (let i = polaroids.length - 2; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[polaroids[i], polaroids[j]] = [polaroids[j], polaroids[i]];
	}

	return polaroids;
};

// randomized polaroid images in stack
const polaroids = useState<PolaroidCard[]>('polaroids', () => shufflePolaroids());


const route = useRoute();
const welcomeName = ref<null | string>(route.query.name as string || null);

// underline name if present 
useAnnotate('name', undefined, 'underline', 0, [-15, 0, -15, 0]);

// retrieve name from query parameter 
onBeforeMount(() => {
	welcomeName.value = route.query.name as string || null;
});

</script>


<style scoped>
.welcome-name {
	margin-left: 15px;
}

.gallery-button {
	margin-top: 10px;
	margin-bottom: 10px
}
</style>