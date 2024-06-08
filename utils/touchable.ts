interface Navigator {
	msMaxTouchPoints?: number;
}

export const isTouchDevice = computed(() => {
	return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || ((navigator as any).msMaxTouchPoints > 0);
})

export const isMobile = computed(() => {
	return window.innerWidth < 600
})