<template>
	<div class="icon" :style="{ width: size + 'px', height: size + 'px' }">
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	size?: number;
}>();

const size = props.size || 16;

</script>

<style scoped>
.icon {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
}

.icon {
	position: relative;
	width: 12px;
	height: 12px;
	border-left: 3px solid var(--icon-color);
	border-top: 3px solid var(--icon-color);
	transform: translateY(2px) rotate(45deg);
	transition: transform 250ms ease-in-out;
}


button:hover .icon {
	transform: translateY(-4px) rotate(45deg);
}

button .icon::after {
	content: '';
	position: absolute;
	top: 5px;
	left: -7px;
	width: 3px;
	height: 3px;
	border-right: 24px solid var(--icon-color);
	transform: rotate(45deg);
	opacity: 0;
	transition-delay: 50ms;
	transition: opacity 250ms ease-in-out;
}

button:hover .icon::after {
	opacity: 1;
}
</style>