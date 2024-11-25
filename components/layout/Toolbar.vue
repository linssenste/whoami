<template>

	<div class="toolbar" v-show="!isMobile">

		<div class="toolbar-selection">

			<!-- desktop toolbar (sticky) -->
			<div class="menu-bar" id="toolbar">

				<!-- menu buttons in row -->
				<button v-for="section in sections" :tabindex="0" :key="section.id" :id="`nav-button-${section.id}`"
						@click="scrollSection(section.id)" class="nav-element">
					{{ section.name }}
				</button>

				<!-- qualizier indicating if music is playing  -->
				<div class="equalizer-visual" title="Click to shuffle songs" v-on:mousemove="showMusicPlayer(true)"
					 v-on:mouseleave="showMusicPlayer(false)" :tabindex="0" @click="store.shuffleTracks()">
					<MusicAudioVisualizer :playing="store.isPlaying" title="Music player" />
				</div>

				<!-- slider alsways sliding to active section -->
				<div id="slider" class="active-slider" />


			</div>

			<!-- music player hover menu - only appears on hover on equalizer -->
			<div class="music-player-menu" v-on:mouseenter="showMusicPlayer(true)"
				 v-on:mousemove="showMusicPlayer(true)" v-on:mouseleave="showMusicPlayer(false)"
				 :class="{ 'hide-menu': !showMenu }">
				<ClientOnly>
					<MusicSpotifyPlayer v-if="store.trackId != null && store.trackId.length > 0" playerId="music-player"
										:mobile="false" />
				</ClientOnly>
			</div>
		</div>
	</div>



	<!-- mobile toolbar (fixed) -->
	<div v-show="isMobile" class="mobile-menu-bar" :class="{ 'menu-expanded': expandMobileMenu }">
		<div class="mobile-header">
			<!-- equalizer (indicating if music is playing or not) -->
			<div class="equalizer-visual" @click="scrollSection('analysis-section')">
				<MusicAudioVisualizer :playing="store.isPlaying" title="Music player" />
			</div>
		</div>

		<div class="mobile-navigation" :class="{ 'hide-navigation': !expandMobileMenu }">


			<!-- menu buttons in columns -->
			<div class="mobile-nav-buttons">

				<button v-for="section in sections" :key="section.id" :id="`mobile-nav-button-${section.id}`"
						@click="scrollSection(section.id)" class="nav-element"
						:class="{ 'mobile-active': inViewSection === section.id }">
					{{ section.name }}
				</button>


			</div>

			<div class="mobile-music-player">
				<ClientOnly>
					<MusicSpotifyPlayer v-show="store.trackId != null && store.trackId.length > 0 && isMobile"
										:mobile="true" playerId="music-player-mobile" />
				</ClientOnly>
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

</template>

<script lang="ts" setup>
import '../../assets/css/menu-icon.css';
import { useStore } from '@/store'

const showMenu = ref(false);
const sections = ref([
	{ name: 'Hello', id: 'welcome-section', offset: 0 },
	{ name: 'Playlist', id: 'analysis-section', offset: 580 },
	{ name: 'Adventure', id: 'travel-section', offset: -75 },
	{ name: 'Polaroids', id: 'polaroid-section', offset: -20 },
	{ name: 'Inclusion', id: 'inclusion-section', offset: 0 }
]);


const expandMobileMenu = ref(false);

const inViewSection = ref(sections.value[0].id);
const isScrolling = ref(false);
const { isMobile } = useDeviceDetection();

const store = useStore();

let hasManuallyPlayed = false;

watch(() => store.isPlaying, (isPlaying) => {
	if (isPlaying) {
		hasManuallyPlayed = true;
	}
});
watch(() => store.trackId, (newTrackId, prevTrackId) => {
	if (prevTrackId.length > 0 && newTrackId.length > 0) {
		if (!isMobile.value) {
			showMusicPlayer(true);
			setTimeout(() => {
				showMusicPlayer(false);
			}, hasManuallyPlayed ? 1000 : 2500);
		} else if (!hasManuallyPlayed) {
			expandMobileMenu.value = true; // open mobile menu if autoplay is not possible (inital play)
		}

	}
});


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

let timeout: ReturnType<typeof setTimeout> | null = null;

function showMusicPlayer(show: boolean) {

	if (timeout) clearTimeout(timeout);
	timeout = setTimeout(() => {
		showMenu.value = show;
	}, show ? 0 : 250);

}

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
	pointer-events: none;
	display: flex;
	z-index: 1000000 !important;
	justify-content: center;
}


.toolbar-selection {
	position: relative;

	pointer-events: all;
	z-index: 1000000 !important;
}

.mobile-menu-bar {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 60px;
	z-index: 10000 !important;
	background-color: #f0f0f0cc;
	backdrop-filter: blur(24px);
	-webkit-backdrop-filter: blur(24px);
	transition: all 250ms ease-in-out;
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
	gap: 50px;

	opacity: 1;
	transition: opacity 700ms ease-in-out;

}


.mobile-nav-buttons {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 10px;
}

.mobile-navigation .nav-element {

	font-size: 20px;
	padding: 8px 24px;

}

.hide-navigation {
	opacity: 0;
	z-index: -1;
	pointer-events: none;
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
	z-index: 20;
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

@media (hover: hover) and (pointer: fine) {

	.equalizer-visual:hover {
		background-color: #ffffff55;
	}


}

.music-player-menu {
	opacity: 1;
	position: absolute;
	top: 70px;
	right: 0px;
	/* width: 350px; */
	height: 152px;
	z-index: 1000;
	overflow: hidden;
	box-shadow: 0px 0px 30px 0px #00000030;

	border-radius: 12px;
	/* transition-delay: 50ms; */
	transition: all 250ms ease-in-out;
}


.hide-menu {
	opacity: 0;
	pointer-events: none;
}


.mobile-music-player {
	height: 152px;
	z-index: 10000 !important;
}
</style>
