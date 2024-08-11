<template>

	<div class="lie-game" ref="lieGameRef">

		<TruthHeader />

		<div class="wrapper">
			<div :style="(mode % 2) ? 'opacity: 0' : ''"
				 style="font-size: 18px; text-transform: uppercase; letter-spacing: 1px; padding-bottom: 25px; color: var(--grey-color)">
				Guess what statement is a lie.</div>
			<div class="cards" :class="{ 'move-left': mode % 2 === 1 }">
				<div class="statement-card" v-for="(element, index) in statements[statementIndex]" :style="{
				'backgroundColor': (mode % 2) ? (element.type != 0 ? 'var(--blue-color)' : 'var(--orange-color)') : '',
				'width': answerOption != null && answerOption.id == index && mode % 2 === 1 ? '450px' : '400px'
			}" v-on:click="setAnswer(index)">
					{{ element.statement }}
				</div>
			</div>
			<Transition>
				<div v-if="(mode % 2)" class="answer">
					{{ answerOption?.type == 0 ? 'TRUTH' : 'LIE' }}
					{{ answerOption?.answer }}
					<button v-on:click="setAnswer()">next</button>
				</div>
			</Transition>
		</div>
	</div>
</template>

<script lang="ts" setup>

const lieGameRef = ref<HTMLElement | null>(null);
onMounted(() => {
	if (!lieGameRef.value) return;

	let lastPosition = 0;

	function handleScroll(event: Event) {
		const rect = lieGameRef.value?.getBoundingClientRect();

		if (!rect || !lieGameRef.value) return;

		lieGameRef.value.style.opacity = (1 - Math.abs(((rect.y + 400) / rect.height)));

		console.log(lieGameRef.value.style.opacity)
		// console.log(rect?.height, rect.y)

		lastPosition = rect.y
		// fade in or fade out background ()
	}
	const observer = new IntersectionObserver(([entry]) => {

		if (entry.isIntersecting) window.addEventListener('scroll', handleScroll)
		else window.removeEventListener('scroll', handleScroll)

		// entry.isIntersecting ? startAutoScroll() : scrollingInterval && clearInterval(scrollingInterval)
	}, { threshold: 0 })
	observer.observe(lieGameRef.value)
})

import JSConfetti from 'js-confetti'



interface TruthLieStatement {
	statement: string,
	type: 0 | 1,
	answer: string,
	id?: number
}
const statements: TruthLieStatement[][] = [
	[{ statement: 'I have a bad taste in music', type: 0, answer: 'answer' }, { statement: 'b', type: 0, answer: 'answer' }, { statement: 'c', type: 1, answer: 'answer' }],
	[{ statement: 'a1', type: 1, answer: 'answer' }, { statement: 'b1', type: 0, answer: 'answer' }, { statement: 'c1', type: 0, answer: 'answer' }],
	[{ statement: 'a2', type: 0, answer: 'answer' }, { statement: 'b2', type: 1, answer: 'answer' }, { statement: 'c2', type: 0, answer: 'answer' }],
	[{ statement: 'a3', type: 0, answer: 'answer' }, { statement: 'b3', type: 0, answer: 'answer' }, { statement: 'c3', type: 1, answer: 'answer' }],
];

const statementIndex = computed(() => {
	return (mode.value + ((mode.value % 2) ? -1 : 0)) / 2
})
const answerOption = ref<TruthLieStatement | null>(null)
const mode = ref(0);

function setAnswer(index?: number) {


	if (index != null) {
		answerOption.value = { id: index, ...statements[statementIndex.value][index] }

		if (answerOption.value.type == 1 && !(mode.value % 2))



			(new JSConfetti()).addConfetti({
				confettiColors: [
					'#FF5A5A', '#4183FF', '#FE9C00', '#F870FF', '#9847FF', '#009C34', '#FEEA00',
				],
			})
	}

	if (!(mode.value % 2) || index == null) {
		if (mode.value >= (statements.length * 2) - 1) {
			mode.value = 0;
		} else {
			mode.value = mode.value + 1;
		}
	}




}


</script>


<style scoped>
.lie-game {
	position: relative;
	width: 100%;
	min-height: calc(100vh + 500px);
	/* background-color: #e0e0e0; */
	padding-top: 400px;
}

/* Gradient for the top */
.lie-game:before {
	content: "";
	position: absolute;
	z-index: 1;
	top: 0;
	left: 0;
	pointer-events: none;
	background-image: linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 100%);
	width: 100%;
	height: 500px;

}

/* Gradient for the bottom */
.lie-game:after {
	content: "";
	position: absolute;
	z-index: 1;
	bottom: 0;
	left: 0;
	pointer-events: none;
	background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 100%);
	width: 100%;
	height: 50px;
}


.wrapper {
	position: relative;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	overflow: hidden;
}

.cards {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	transition: transform .4s ease;
}

.move-left {
	transform: translateX(calc(-250px));
}

.statement-card {
	width: 400px;
	font-family: 'Mukta' !important;
	max-width: 100%;
	/* color: white; */
	letter-spacing: 1px;
	text-transform: uppercase;
	font-size: 20px;
	/* letter-spacing: 1px; */
	background-color: #ffffffaa;
	opacity: 1;
	height: 60px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	border-radius: 12px;
	padding-left: 20px;
	transition: all 250ms ease;
	padding-right: 20px;
	cursor: pointer;
}

.statement-card:hover {
	background-color: #ffffff;
}

.answer {
	opacity: 1;
	position: absolute;
	top: 50%;
	right: 0;
	transform: translateY(-50%);
	width: calc(50% - 100px);
	background-color: white;
	padding: 20px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
	.answer {
		position: static;
		transform: none;
		width: 100%;
		box-shadow: none;
		opacity: 1;
		transition: none;
		margin-top: 20px;
	}

	.cards {
		transform: none !important;
	}
}

.v-enter-active,
.v-leave-active {
	transition: opacity 250ms ease;
}

.v-enter-to {
	transition-delay: 250ms !important;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
