export const useParallaxScroll = (docId: string, speed: number, scrollDirection = true) => {
	let initialOffsetTop = 0;
  
	const handleScroll = () => {
	  const refDoc = document.getElementById(docId);
	  if (!refDoc) return;
  
	  const currentScrollY = window.scrollY;
	  const translateY =
		((currentScrollY - initialOffsetTop) * speed * (scrollDirection ? 1 : -1));
  
	  // Apply the parallax effect
	  refDoc.style.transform = `translateY(${translateY}px)`;
	};
  
	const calculateInitialOffset = () => {
	  const doc = document.getElementById(docId);
	  if (!doc) return;
  
	  // Calculate the element's top position relative to the viewport, plus the current scroll position
	  initialOffsetTop = doc.getBoundingClientRect().top + window.scrollY;
  
	  // Reset the transform so it doesn't start offset
	  doc.style.transform = `translateY(0px)`;
	};
  
	onMounted(() => {
	  // Use requestAnimationFrame to ensure the DOM is fully painted before calculations
	  requestAnimationFrame(() => {
		calculateInitialOffset(); // Calculate initial offset
		handleScroll(); // Apply an initial correction
		window.addEventListener('scroll', handleScroll); // Listen to scroll events
	  });
	});
  
	onUnmounted(() => {
	  window.removeEventListener('scroll', handleScroll); // Clean up
	});
  
	return { handleScroll };
  };
  