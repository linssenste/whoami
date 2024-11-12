<template>
	<div class="toolbar">

		<!-- desktop toolbar (sticky) -->
		<div class="menu-bar" id="toolbar">

			<!-- menu buttons in row -->
			<button v-for="section in sections" :tabindex="0" :key="section.id" :id="`nav-button-${section.id}`"
					@click="scrollSection(section.id)" class="nav-element">
				{{ section.name }}
			</button>

			<!-- qualizier indicating if music is playing  -->
			<div class="equalizer-visual" :tabindex="0" @click="scrollSection('analysis-section')">
				<MusicAudioVisualizer :playing="playing" title="Music player" />
			</div>

			<!-- slider alsways sliding to active section -->
			<div id="slider" class="active-slider" />
		</div>



		<!-- mobile toolbar (fixed) -->
		<div class="mobile-menu-bar" :class="{ 'menu-expanded': expandMobileMenu }">
			<div class="mobile-header">
				<!-- equalizer (indicating if music is playing or not) -->
				<div class="equalizer-visual" @click="scrollSection('analysis-section')">
					<MusicAudioVisualizer :playing="playing" title="Music player" />
				</div>
			</div>
			<div class="mobile-navigation">

				<!-- menu buttons in columns -->
				<div class="mobile-nav-buttons" :class="{ 'hide-navigation': !expandMobileMenu }">
					<button v-for="section in sections" :key="section.id" :id="`mobile-nav-button-${section.id}`"
							@click="scrollSection(section.id)" class="nav-element"
							:class="{ 'mobile-active': inViewSection === section.id }">
						{{ section.name }}
					</button>
				</div>


			</div>

			<!-- toggle mobilemenu button -->
			<div class="open-menu-toggle">
				<input type="checkbox" v-model="expandMobileMenu" id="menu">
				<label for="menu" class="mobile-icon">
					<div class="mobile-menu"></div>
				</label>
			</div>


		</div>
	</div>
</template>

<script lang="ts" setup>
import '../../assets/css/menu-icon.css';

const sections = ref([
	{ name: 'Hallo', id: 'welcome-section', offset: 0 },
	{ name: 'Playlist', id: 'analysis-section', offset: 580 },
	{ name: 'Reisen', id: 'travel-section', offset: -75 },
	{ name: 'Polaroids', id: 'polaroid-section', offset: -20 },
	{ name: 'Contact me', id: 'contact-section', offset: 0 }
]);

const props = defineProps<{
	playing: boolean
}>();
props.playing;

const expandMobileMenu = ref(false);



const inViewSection = ref(sections.value[0].id);
const isScrolling = ref(false);
const { isMobile } = useDeviceDetection();


// scroll to section on page
const scrollTo = (offset: number, callback: () => void) => {
	const fixedOffset = offset.toFixed();
	const onScroll = () => {
		if (window.scrollY.toFixed() === fixedOffset) {
			window.removeEventListener('scroll', onScroll);
			callback();
		}
	};

	window.addEventListener('scroll', onScroll);
	onScroll();
	window.scrollTo({
		top: offset,
		behavior: 'smooth'
	});
};



const scrollSection = async (scrollId: string) => {

	// close menu on mobile
	if (isMobile.value) expandMobileMenu.value = false;

	const sectionElement = document.getElementById(scrollId);
	if (!sectionElement) return;

	const ele = sections.value.find(ele => ele.id === scrollId);

	if (!ele) return;

	const top = sectionElement.getBoundingClientRect().top + window.scrollY + ele.offset - (isMobile.value ? 150 : 0);


	isScrolling.value = true;
	inViewSection.value = ele.id;

	await scrollTo(top, () => {
		isScrolling.value = false;
	});
};

const updateInViewSection = () => {
	if (isScrolling.value) return;

	const scrollTop = window.scrollY;

	for (const { id } of sections.value) {
		const sectionElement = document.getElementById(id);
		if (!sectionElement) continue;

		const sectionTop = sectionElement.offsetTop;
		const sectionBottom = sectionTop + sectionElement.clientHeight - 300;

		if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
			inViewSection.value = id;
			break;
		}
	}
};

onMounted(() => {
	isScrolling.value = false; // reset scrolling flag

	updateInViewSection();
	window.addEventListener('scroll', updateInViewSection);
});

onUnmounted(() => {
	window.removeEventListener('scroll', updateInViewSection);
	isScrolling.value = false; // reset scrolling flag
});

// slider active element (desktop)
watch(inViewSection, () => {
	const ele = document.getElementById(`nav-button-${inViewSection.value}`);
	const toolbar = document.getElementById('toolbar');
	const slider = document.getElementById('slider');

	if (!ele || !toolbar || !slider) return;

	const rect = ele.getBoundingClientRect();
	const toolbarRect = toolbar.getBoundingClientRect();

	slider.style.width = `${rect.width}px`;
	slider.style.left = `${rect.left - toolbarRect.left + ((sections.value.length - 2) * 15) - 45}px`;
});

</script>

<style scoped>
.toolbar {
	position: sticky;
	top: 10px;
	display: flex;
	z-index: 100;
	justify-content: center;
	width: 100%;
	pointer-events: none;
	transition: all 0.2s ease-in-out;
}

.mobile-menu-bar {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 60px;
	background-color: #f0f0f0cc;
	backdrop-filter: blur(24px);
	-webkit-backdrop-filter: blur(24px);
	transition: all 300ms ease-in-out;
}

@media screen and (max-width: 1000px) {

	.menu-bar {
		display: none !important;
	}

	.toolbar {
		position: relative;
	}

}

@media screen and (min-width: 1000px) {

	.mobile-menu-bar {
		display: none !important;
	}
}

.mobile-navigation {
	width: 100%;
	height: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 75px;

}

.mobile-nav-buttons {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 10px;
	transition: opacity 700ms ease-in-out;
}

.mobile-navigation .nav-element {

	font-size: 20px;
	padding: 8px 24px;

}

.hide-navigation {
	opacity: 0;

	overflow: hidden !important;

	transition: opacity 300ms ease-in-out !important;
}

.mobile-nav-button {
	background-color: transparent;
	text-align: center;
	letter-spacing: 1.5px;
	text-transform: uppercase;
	z-index: 20;
	outline: none;
	font-family: 'Mukta';
	font-weight: 400;
	/* border: none; */
	font-size: 16px;
	cursor: pointer;
	opacity: 0.75;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: 40px;
	color: #000000cc;
	padding: 0 20px;
	border-radius: 20px;
	transition: all 150ms ease-in-out;
}


.mobile-header {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: 60px;

	font-family: 'Mukta';
	font-weight: 400;
	color: #000000;
	opacity: .8;
	font-size: 20px;
	text-transform: uppercase;
	letter-spacing: 1px;

}

.mobile-active {
	background-color: #ffffffcc !important;
}

.menu-expanded {
	background-color: #eaeaeacc;
	height: 100% !important;
}

.menu-bar {
	width: fit-content;
	position: relative;
	pointer-events: all !important;
	background-color: #e0e0e0aa;
	backdrop-filter: blur(8px);
	-webkit-backdrop-filter: blur(8px);
	z-index: 100;
	border-radius: 30px;
	overflow: hidden;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 10px;
	padding: 0 15px;
	transition: all 0.2s ease-in-out;
}

.nav-element {
	background-color: transparent;
	text-align: center;
	letter-spacing: 1.5px;
	text-transform: uppercase;
	z-index: 20;
	margin: 10px 0px 10px 0px;
	/* outline: none; */
	font-family: 'Mukta';
	font-weight: 400;
	border: none;
	font-size: 16px;
	cursor: pointer;
	opacity: 0.75;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: 40px;
	color: #000000cc;
	padding: 0 20px;
	border-radius: 20px;
	transition: all 150ms ease-in-out;
}

.menu-bar .nav-element:hover {
	opacity: 1;
	background-color: #ffffff55;
}

.active-slider {
	position: absolute;
	z-index: 15;
	transition: all 450ms ease-in-out;
	border-radius: 20px;
	left: 12px;
	height: 40px;
	width: 100px;
	background-color: #ffffffcc;
}

.open-menu-toggle {
	position: absolute;
	width: 55px;
	height: 55px;
	right: 10px;
	top: 2px;
}

.equalizer-visual {
	margin: 0 15px;
	cursor: pointer;
	height: 30px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 5px 15px;
	border-radius: 6px;
	transition: all 150ms ease-in-out;
}

.equalizer-visual:hover {
	background-color: #ffffff55;
}
</style>
