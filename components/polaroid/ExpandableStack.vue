<template>
	<div id="polaroid-stack">

		<!-- stack animation section -->
		<ul class="polaroids-list" ref="listRef">

			<!-- polaroid images stack -->
			<li v-for="(card, index) in polaroids" :key="index" @click="toggleExpansion()" :style="cardStyling(index)"
				class="polaroid " :data-testid="`polaroid-card-${index}`">
				<PolaroidImage :src="card.src" :alt="card.alt" :id="`polaroid-${index}`" fetchpriority="high" preload />
			</li>

			<!-- appended close button -->
			<li class="polaroid append-slot" :style="cardStyling(polaroids.length)"
				:class="!expanded ? 'append-slot-hidden' : ''" data-testid="close-button-card">

				<button v-on:click="toggleExpansion(false)" data-testid="close-button" class="close-button"
						aria-label="Close expanded polaroid stack">
					<!-- <img src="../assets/icons/chevron-left.svg" alt="chevron left" title="Close polaroid stack"
						 width="16" height="16" /> -->
					<div class="chevron-icon">
						<ChevronArrowIcon :size="9" />
					</div>
				</button>
			</li>
		</ul>


		<!-- text section -->
		<div class="welcome-text-area" :style="textTransition">
			<div class="intro-text">
				<slot name="text" />
			</div>
		</div>

	</div>
</template>

<script lang="ts" setup>

export interface PolaroidCard {
	src: string,
	alt: string
}[]

const props = defineProps<{
	polaroids: PolaroidCard[];
}>();

props.polaroids;

// states
const showText = ref(true); // hide text part if expanded
const expanded = ref(false);
const isVisible = ref(true)

// references
const listRef = ref<HTMLElement | null>(null);

const windowWidth = ref(0);
onMounted(() => {

	windowWidth.value = window.innerWidth;

	if (!listRef.value) return;
	const observer = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) {
				isVisible.value = false
				if (expanded.value) toggleExpansion();
			} else {
				isVisible.value = true
			}
		},
		{ threshold: 0 }
	);
	observer.observe(listRef.value);

	setStyling();


	// watching width resize events
	var prevWidth = window.innerWidth;
	var resizeObserve = new ResizeObserver(function (entries) {
		const width = entries[0].borderBoxSize?.[0].inlineSize;
		if (typeof width === 'number' && width !== prevWidth) {
			prevWidth = width;
			windowWidth.value = width;
			if (expanded.value) {
				toggleExpansion();
			}
		}
	})
	resizeObserve.observe(window.document.body);

});

const textTransition = computed(() => {
	return (windowWidth.value >= 1000 && !showText.value ? 'width: 0px!important; transition: all .3s ease-in-out' : 'transition: all .15s ease-in-out')
})

function toggleExpansion(open = false): void {


	if (open == true) expanded.value = true
	else expanded.value = !expanded.value;

	if (window.innerWidth <= 850) showText.value = true;
	else showText.value = !expanded.value

	if (listRef.value) setStyling()
}

defineExpose({ toggleExpansion })

function setStyling() {

	if (!listRef.value) return;

	// editable min and max width of stacked polaroids 
	const minWidth = "380px"
	const maxWidth = "calc(100% - 30px)";

	if (!expanded.value) listRef.value.style.overflowX = 'hidden'
	else listRef.value.style.overflowX = 'scroll'

	// listRef.value.style.maxWidth = expanded.value ? maxWidth : minWidth;
	listRef.value.style.transition = `all ${expanded.value ? '.3' : '.3'}s ease-in-out`;
	listRef.value.style.width = expanded.value || window.innerWidth < 380 ? maxWidth : minWidth;
}


function cardStyling(index: number) {
	return {
		zIndex: 10,
		transform: `rotateZ(${(expanded.value || windowWidth.value == 0 || !isVisible.value ? 0 : Math.floor(Math.random() * 15 - 7))}deg)`,
		left: `${(expanded.value ? index * 345 + 28 : 28)}px`,
	};
}

</script>

<style scoped>
#polaroid-stack {
	position: relative;
	display: flex;

	min-height: 500px;
	flex-direction: row;

	align-items: center;
	justify-content: center;
	margin-bottom: 15px;
}


.welcome-text-area {
	position: relative;
	overflow: hidden;
	width: 700px;
	max-width: calc(100% - 450px);
}

.intro-text {
	position: relative;
	width: 550px;
	max-width: 550px;
	min-width: 550px;
	text-align: justify;
	padding-left: 20px;
}

@media screen and (max-width: 1000px) {
	#polaroid-stack {

		gap: 10px;
		flex-direction: column;

	}

	.welcome-text-area {
		width: 100%;
		max-width: 100%;
	}

	.intro-text {

		position: relative;
		width: calc(100% - 40px) !important;
		max-width: calc(100% - 40px);
		min-width: calc(100% - 40px);
		padding-left: 0px;
		padding: 20px;
		padding-top: 0px;
	}

}

ul.polaroids-list {
	position: relative;

	height: 460px;
	min-width: 380px;
	padding-top: 40px;

	margin: 0px !important;

	list-style-type: none;
	white-space: nowrap;
	cursor: default;

	user-select: none;
	-moz-user-select: none;
	-webkit-user-select: none;

	overflow-y: hidden;
	overflow-x: auto;


}


ul.polaroids-list li.polaroid {

	position: absolute;
	overflow: hidden;
	cursor: pointer;
	transition: all .3s ease-in-out;
	-webkit-transition: all .3s ease-in-out;
	-moz-transition: all .3s ease-in-out;
}



.append-slot {
	transition: all 50ms ease-in-out;
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;

	width: 50px;
	height: 400px;

	opacity: 1;
	padding-right: 40px;
	padding-left: 20px;
	padding-top: 10px
}

.close-button {
	background-color: #e0e0e0;
	border-radius: 10px;

	padding: 0px !important;
	position: relative;
	outline: none;
	border: none;
	height: 100px;
	width: 50px;
	opacity: .65;
	cursor: pointer;
	transition: all 200ms ease-in-out;
}

@media (hover: hover) and (pointer: fine) {

	.close-button:hover {
		height: 400px;
		opacity: 1;
	}

}

.close-button .chevron-icon {
	transform: rotate(-90deg)
}

.append-slot-hidden {
	width: 0px !important;
	opacity: 0;

	padding-right: 0px !important;
	pointer-events: none
}
</style>