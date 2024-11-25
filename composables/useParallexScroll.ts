export const useParallaxScroll = (docId: string, speed: number, scrollDirection = true) => {
	let initialOffsetTop = 0;
  
	const handleScroll = () => {
	  const refDoc = document.getElementById(docId);
	  if (!refDoc) return;
  
	  const rect = refDoc.getBoundingClientRect();
	  const parallaxSpeed = speed;
  
	  // Compute the translation based on the difference between current scroll position and initial offset
	  const translateY =
		((rect.top - initialOffsetTop) * parallaxSpeed * (scrollDirection ? 1 : -1));
  
	  // Apply the parallax effect
	  refDoc.style.transform = `translateY(${translateY}px)`;
	};
	
  
	const calculateInitialOffset = () => {
	  const doc = document.getElementById(docId);
	  if (!doc) return;
  
	  // Store the top position relative to the document
	  initialOffsetTop = window.scrollY + doc.getBoundingClientRect().top;

	  // Set initial translateY to 0
	  doc.style.transform = `translateY(0px)`;
	};
  
	onMounted(() => {
	  calculateInitialOffset(); // Calculate initial offset on mount
	  window.addEventListener('scroll', handleScroll); // Start listening to scroll events
	});
  
	onUnmounted(() => {
	  window.removeEventListener('scroll', handleScroll); // Clean up the scroll event listener
	});
  
	return { handleScroll };
  };
  