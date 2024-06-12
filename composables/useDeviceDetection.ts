interface Navigator {
  maxTouchPoints?: number;
  msMaxTouchPoints?: number;
}

export const useDeviceDetection = () => {
  const isMobile = ref(false);
  const isTouchDevice = computed(() => {
    if (typeof navigator !== 'undefined') {
      return (
        'ontouchstart' in document.documentElement ||
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
        (navigator as Navigator).msMaxTouchPoints! > 0
      );
    }
    return false;
  });

  const handleResize = () => {
    if (typeof window !== 'undefined') {
      isMobile.value = window.innerWidth < 1000;
    }
  };

  onMounted(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });

  return {
    isMobile,
    isTouchDevice,
  };
};
