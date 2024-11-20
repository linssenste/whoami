interface Navigator {
  maxTouchPoints?: number;
  msMaxTouchPoints?: number;
}

export const useDeviceDetection = () => {
  
  const isTouchDevice = computed(() => {
	if (import.meta.server) {
	  const headers = useRequestHeaders(['user-agent']);
	  const userAgent = headers['user-agent'] || '';
	  const isMobileSSR = /Mobile|Android|iP(ad|hone)/i.test(userAgent);
	  return isMobileSSR;
	} else if (typeof navigator !== 'undefined') {
	  return (
		'ontouchstart' in document.documentElement ||
		(navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
		(navigator as Navigator).msMaxTouchPoints! > 0
	  );
	}
	return false;
  });

  const isMobile = ref(isTouchDevice.value);

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
