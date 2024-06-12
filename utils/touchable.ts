interface Navigator {
	msMaxTouchPoints?: number;
}

export const isTouchDevice = computed(() => {
	return ('ontouchstart') || (navigator.maxTouchPoints > 0) || ((navigator as any).msMaxTouchPoints > 0);
})


export const isMobile = ref(false);

const handleResize = () => {
	isMobile.value = window.innerWidth < 1000;
};

onMounted(() => {
	handleResize();
	window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
	window.removeEventListener('resize', handleResize);
});