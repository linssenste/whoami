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

						My name is Steffen, and I am a software engineer passionate about creating innovative,
						user-friendly applications. I combine elegant design with reliable functionality to deliver
						intuitive and robust solutions.
					</p>
					<p>This website offers a more personal and engaging way to introduce myself, complementing
						traditional application documents. It also serves as a showcase of my skills in designing and
						developing modern, functional applications.
					</p>
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
		{ src: '/polaroids/intro/polaroid-1.webp', alt: 'moin' },
		{ src: '/polaroids/intro/polaroid-5.webp', alt: 'moin' },

		{ src: '/polaroids/intro/polaroid-6.webp', alt: 'moin' },
		{ src: '/polaroids/intro/polaroid-3.webp', alt: 'moin' },
		{ src: '/polaroids/intro/polaroid-4.webp', alt: 'moin' },
		{ src: '/polaroids/intro/polaroid-2.webp', alt: 'moin' },
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