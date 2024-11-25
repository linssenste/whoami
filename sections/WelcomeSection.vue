<template>
	<div>
		<PolaroidExpandableStack ref="polaroidStack" stackName="testname" :polaroids="polaroids">
			<template v-slot:text>

				<!-- introduction text  -->
				<div id="welcome-introduction">

					<!-- greetings (with name if query is defined)  -->
					<span class="handwriting">Hello<span v-if="welcomeName" id="name" class="welcome-name">{{
						welcomeName }}</span>!
					</span>
					<p>

						My name is Steffen and I am a front-end developer with a passion for elegant UI & UX. My work is
						driven by an interest in both technology and design.

					</p>
					<p>
						This website serves as a more personal and engaging way to introduce myself, going beyond
						traditional application documents. It's also a demonstration of my expertise in modern web
						development, showing my skills in action.
					</p>



					<!-- slide-hover button to open gallery with polaroids -->
					<!-- <Button @click="toggleGallery" color="black" text="Show Gallery" class="gallery-button" /> -->
				</div>
			</template>
		</PolaroidExpandableStack>
	</div>
</template>

<script setup lang="ts">
import type { PolaroidCard } from '../components/polaroid/ExpandableStack.vue';

const polaroidStack = ref<HTMLElement | null>(null);


function toggleGallery() {
	if (polaroidStack.value) {
		(polaroidStack.value as any).toggleExpansion(true);
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