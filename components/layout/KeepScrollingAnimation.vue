<template>
	<div class="hint-area" oncontextmenu="return false">
		<div class="scroll-downs">
			<div class="mousey">
				<div class="scroller" v-if="!isClick"></div>
				<div class="clicker" v-else></div>
			</div>
		</div>
		{{ text }}
	</div>
</template>

<script lang="ts" setup>

const props = defineProps<{
	isClick: boolean,
	text: string
}>();

</script>

<style scoped>
.hint-area {
	position: relative;
	display: flex;
	flex-direction: row;
	gap: 15px;
	align-items: center;
	letter-spacing: 1px;
	font-size: 16px;
	text-transform: uppercase;
	color: var(--red-color);
	margin-bottom: 15px;
	user-select: none;
	-moz-user-select: none;
	-webkit-user-select: none;
}

.scroll-downs {
	position: relative;
}

.mousey {
	width: 5px;
	padding: 2px 7px;
	height: 30px;
	border: 3px solid var(--red-color);
	border-radius: 25px;
	box-sizing: content-box;
	position: relative;
}

.scroller {
	width: 5px;
	height: 5px;
	border-radius: 50%;
	top: -5px;
	background-color: var(--red-color);
	animation-name: scroll;
	animation-duration: 1s;
	animation-timing-function: cubic-bezier(.15, .41, .69, .94);
	animation-iteration-count: infinite;
}

.clicker {
	width: 5px;
	height: 5px;
	background-color: var(--red-color);
	border-radius: 50%;
	position: absolute;
	top: 7px;
	left: 7px;
	transform: translate(-50%, -50%);
	animation: click 750ms infinite;
}

@keyframes scroll {

	0% {
		transform: translateY(0);
	}

	50% {
		transform: translateY(7px);
	}

	75% {
		transform: translateY(0);
	}
}

@keyframes click {

	0%,
	100% {
		transform: translate(-50%, -50%) scale(1);
	}

	50% {
		transform: translate(-50%, -50%) scale(0.8);
	}
}

/* .mousey.click {
	padding: 0;
	border-radius: 50%;
	width: 20px;
	height: 20px;
	border: 3px solid var(--red-color);
} */
</style>