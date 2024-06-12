import { computed } from 'vue';

interface Navigator {
  maxTouchPoints?: number;
  msMaxTouchPoints?: number;
}

export const isTouchDevice = computed(() => {
  if (typeof process !== 'undefined' && process.server) {
    // If running on the server, return false or handle accordingly
    return false;
  }

  if (typeof navigator !== 'undefined') {
    // Run only on the client-side
    return (
      'ontouchstart' in document.documentElement ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
      (navigator as Navigator).msMaxTouchPoints! > 0
    );
  }

  return false;
});


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