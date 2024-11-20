
export const useParrallexScroll = (docId: string, speed: number, scrollDirection = true) => {
	let initalRectOffset = 0;


const handleScroll = () => {
	const refDoc = document.getElementById(docId);

	
	if (!refDoc) return;
	const rect = refDoc.getBoundingClientRect();
	const parallaxSpeed = speed;
	const translateY = ((rect.top - initalRectOffset) * parallaxSpeed * (scrollDirection ? 1 : -1)) // Cap the translation to 100px or any desired value
	refDoc.style.transform = `translateY(${translateY}px)`;
};
  
	onMounted(() => {
		const doc = document.getElementById(docId);
	if (!doc) return;
		initalRectOffset = window.scrollY + doc.getBoundingClientRect().top;
		handleScroll();
	  window.addEventListener('scroll', handleScroll);
	});
  
	onUnmounted(() => {
	  window.removeEventListener('scroll', handleScroll);
	});
  
	return { handleScroll
	};
  };
  