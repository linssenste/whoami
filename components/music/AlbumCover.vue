<template>
	<div class="cover-area">
		<!-- mouse tilt area -->
		<div ref="tiltableCoverRef" class="tilt-cover">

			<!-- hover card showing album information of cover -->
			<div v-bind:class="{ 'cover-card-hidden': !isHovering }" class="cover-card">
				<b>{{ src.name }}</b>
				<br />
				<span>{{ src.artists[0].name }}</span>
			</div>

			<!-- album cover image (lazy loaded) -->
			<img draggable="false" class="cover-image" width="150" height="150" alt=""
				 v-on:mouseenter="setHoveringState(true)" v-on:mouseleave="setHoveringState(false)"
				 :src="`https://i.scdn.co/image/ab67616d00001e02${src.cover}`" onerror="this.style.display='none'"
				 v-lazy-load />

			<!-- audio equalizer overlay if song is playing -->
			<div v-if="status.selected" class="equalizer-overlay" v-on:mouseenter="setHoveringState(true)"
				 v-on:mouseleave="setHoveringState(false)">
				<MusicAudioVisualizer :playing="status.playing" class="audio-equalizer" />
			</div>

		</div>
	</div>
</template>

<script lang="ts" setup>
import VanillaTilt from 'vanilla-tilt';

export interface AlbumCover {
	cover: string,
	name: string,
	id: string,
	artists: { name: string, id: string }[]
	tracks: string[]
}

const props = defineProps<{
	src: AlbumCover
	status: {
		playing: boolean,
		selected: boolean
	}

}>();

props.src;
props.status;

const tiltableCoverRef = ref<any>(null)

onMounted(() => {
	VanillaTilt.init(tiltableCoverRef.value, {
		max: 20,
		speed: 500,
		reverse: true,

		glare: true,
		gyroscope: false,
		"max-glare": .25,
	})
})


const isHovering = ref(false)

function setHoveringState(status: boolean): void {
	if (!isTouchDevice.value) isHovering.value = status
	else isHovering.value = false;
}

function hideImage(event: Event): void {
	(event.target as HTMLElement).style.display = 'none';
}

</script>


<style scoped>
.cover-area {
	min-width: 180px;
	background-color: transparent;
	height: 250px;
	padding-top: 5px;
	display: flex;
	padding-top: 60px;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;
}

.tilt-cover {
	position: relative;
	border-radius: 4px;
	width: 150px;
	height: 150px;
	background-color: #f0f0f0;
	box-shadow: 0 0 18px 0px #00000033;
}

.cover-image {
	width: 100%;
	height: 100%;
	border-radius: 4px;
}


img[alt]:after {
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	border-radius: 4px;
	background-color: #f0f0f0aa;

	content: '';
}




.equalizer-overlay {
	width: 100%;
	height: 100%;
	position: absolute;
	background-color: #f0f0f0aa;
	backdrop-filter: blur(5px);
	-webkit-backdrop-filter: blur(5px);
	top: 0px;
	left: 0px;
	border-radius: 4px;
	transition: all 150ms ease-in-out;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.cover-card {
	position: absolute;
	pointer-events: none;
	top: -80px;
	left: 50%;
	transform: translateX(-50%);
	padding: 10px 20px;
	/* Maintain horizontal padding */
	background-color: #f0f0f0aa;
	backdrop-filter: blur(5px);
	-webkit-backdrop-filter: blur(5px);
	border-radius: 10px;
	user-select: none;
	-moz-user-select: none;
	-webkit-user-select: none;

	min-width: 140px;
	max-width: 200px;
	white-space: nowrap;

	overflow: hidden;
	text-overflow: ellipsis;
	text-align: center;
	opacity: 1;
	transition: all 150ms ease-in-out;
	box-shadow: 0 0 18px 0px #00000033;
}

.cover-card-hidden {
	opacity: 0;
}

.audio-equalizer {
	/* position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%); */
	transform: translateZ(10px);
	transition: all 70ms ease-in-out;
}


@media (hover: hover) and (pointer: fine) {

	.tilt-cover:hover .equalizer-overlay {
		opacity: 1;

		backdrop-filter: blur(1px);
		-webkit-backdrop-filter: blur(1px);
	}



	.tilt-cover:hover {

		width: 175px;
		height: 175px;
		cursor: pointer;
		z-index: 100;

		box-shadow: 0 0 18px 0px #00000066;
	}

}
</style>