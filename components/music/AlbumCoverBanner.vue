<template>
	<div class="virtual-scroller" ref="coverAreaRef">
		<DynamicScroller :items="randomAlbumCovers" :min-item-size="200" direction="horizontal" class="cover-scroller"
						 id="cover-banner-container">
			<template #default="{ item, index, active }">
				<DynamicScrollerItem :item="item" :active="active" :data-index="index" :data-active="active"
									 class="cover-item" @click="selectCover(item)">
					<MusicAlbumCover :src="item" :key="index"
									 :status="{ playing: store.isPlaying, selected: store.selectedAlbum?.id == item.id }" />
				</DynamicScrollerItem>
			</template>
		</DynamicScroller>

		<!-- Scroll arrows -->
		<div v-if="!isTouchDevice" @mouseenter="startManualScroll(false)" @mouseleave="finishManualScroll"
			 class="hover-scroll-pad left">
			<span class="icon"></span>
		</div>

		<div v-if="!isTouchDevice" @mouseenter="startManualScroll(true)" @mouseleave="finishManualScroll"
			 class="hover-scroll-pad right">
			<span class="icon"></span>
		</div>

	</div>
</template>

<script lang="ts" setup>
import covers from '../../assets/analysis/export-spotify-covers.json'
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import type { AlbumCover } from './AlbumCover.vue';

import { useStore } from '@/store'

const store = useStore()

const { isTouchDevice } = useDeviceDetection();

// randomizing the covers; changes the appearance of the banner each time
const randomAlbumCovers = computed(() => {
	return [...covers].sort(() => Math.random() - 0.5)
})
const coverAreaRef = ref<HTMLElement | null>(null)


let hasManualScrolled = false

const selectCover = (item: AlbumCover) => {
	store.changeTrack(item)
}

// (auto) scrolling 
let scrollingInterval: ReturnType<typeof setTimeout> | null = null
let scrollingForward: boolean = true
let isManualScrolling: boolean = false

onMounted(() => {
	if (!coverAreaRef.value) return

	store.setCovers(covers);

	store.shuffleTracks()
	const observer = new IntersectionObserver(([entry]) => {
		entry.isIntersecting ? startAutoScroll() : scrollingInterval && clearInterval(scrollingInterval)
	}, { threshold: 0 })
	observer.observe(coverAreaRef.value)

	const container = document.getElementById('cover-banner-container')
	if (container) container.scrollLeft = 85


})


onUnmounted(() => {
	if (scrollingInterval) clearInterval(scrollingInterval)
})

// scrolling manually with the hovering buttons on the left and right side 
const startManualScroll = (forward: boolean) => {
	scrollingForward = forward
	isManualScrolling = true
	startAutoScroll()
}

// returing to manual scrolling on leaving
const finishManualScroll = () => {
	scrollingForward = true
	isManualScrolling = false
	startAutoScroll()
}

const startAutoScroll = () => {
	if (hasManualScrolled && isTouchDevice.value) return

	const container = document.getElementById('cover-banner-container')
	if (!container) return

	if (scrollingInterval) clearInterval(scrollingInterval)

	scrollingInterval = setInterval(() => {
		let pos = container.scrollLeft
		if (!isManualScrolling) {
			if (pos >= container.scrollWidth - container.clientWidth) scrollingForward = false
			else if (pos === 0) scrollingForward = true
		}
		container.scrollLeft += (isManualScrolling ? 4 : 1) * (scrollingForward ? 1 : -1)
	}, 25)
}
</script>

<style scoped>
.virtual-scroller {
	position: relative;
	overflow: hidden;
	width: 100%;
	display: flex;
	flex-direction: column;
}

.cover-scroller {
	flex: auto;
	display: flex;
	width: 100%;
	height: 300px;
	overflow-x: auto;
	scrollbar-width: none;
	-ms-overflow-style: none;
}

.cover-scroller::-webkit-scrollbar {
	display: none;
}

.cover-item {
	width: 200px;
}

.hover-scroll-pad {
	position: absolute;
	bottom: 25px;
	z-index: 100;
	width: 60px;
	height: 180px;
	background-color: #ffffffaa;
	opacity: 0;
	transition: all 150ms ease-in-out;
	cursor: e-resize;
	display: flex;
	align-items: center;
	justify-content: center;

	backdrop-filter: blur(0px);
	-webkit-backdrop-filter: blur(0px);
}

.icon {
	position: relative;
	width: 12px;
	height: 12px;
	border-left: 3px solid #000;
	border-top: 3px solid #000;
	transition: transform 250ms ease-in-out;
}




.hover-scroll-pad.left {
	left: 0;
	border-top-right-radius: 12px;
	border-bottom-right-radius: 12px;
	cursor: w-resize;
}

.hover-scroll-pad.left::before {
	border-width: 12px 16px 12px 0;
	border-color: transparent #000 transparent transparent;
}

.hover-scroll-pad.left .icon {
	transform: translateX(4px) rotate(-45deg) !important;
}



.hover-scroll-pad.right {
	right: 0;
	border-top-left-radius: 12px;
	border-bottom-left-radius: 12px;
	cursor: e-resize;
}

.hover-scroll-pad.right::before {
	border-width: 12px 0 12px 16px;
	border-color: transparent transparent transparent #000;
}

.hover-scroll-pad.right .icon {
	transform: translateX(-4px) rotate(135deg) !important;
}

.virtual-scroller:hover .hover-scroll-pad {
	opacity: .75;
}

.hover-scroll-pad:hover {
	opacity: 1 !important;
	z-index: 100;
	backdrop-filter: blur(5px);
	-webkit-backdrop-filter: blur(5px);
}

.hover-scroll-pad.left:hover .icon {
	transform: translateX(-2px) rotate(-45deg) !important;

}

.hover-scroll-pad.right:hover .icon {
	transform: translateX(2px) rotate(135deg) !important;

}
</style>