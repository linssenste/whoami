<template>
	<div>
		<div id="draggable-container" :class="{ 'border': isDragging }">

			<!-- fixed  art background -->
			<Risographic :fixed="true" class="art-offset" :inverse="true" section="inclusion"
						 :class="{ 'mobile-art-offset': isMobile }" />



			<!-- floating card -->
			<div class="floating-card" id="floating-card" :class="{ 'mobile-card': isMobile }">

				<div class="content">

					<!-- header section + moving thumb  -->
					<div class="header">
						<h1>That's it! </h1>


						<!-- draggable cursor to drag card -->
						<div v-show="!isMobile" id="floating-card-header">
							<img draggable="false" alt="move icon to indicate dragging" src="/assets/icons/move.svg"
								 width="30" height="30" />
						</div>
					</div>


					<p>
						Thank you for taking a look at my application. This demo website was designed to showcase my
						expertise in modern web development, using Nuxt 3 and Vue 3 for an optimised and seamless
						front-end architecture, Pinia for state management, and the Spotify API to integrate dynamic and
						interactive music features. Feel free to explore the <a
						   href="https://github.com/linssenste/whoami" target="_blank" id="end-header">source code on
							GitHub</a> for more
						details.
						<br>
						<br>
						<span class="handwriting">Cheers, Steffen</span>
					</p>


					<!-- music player -->
					<MusicPlaySong class="music-player-badge" :song="sectionSong" />


					<!-- bottom links -->
					<div class="bottom-links">
						<a href="/imprint" target="_blank">IMPRESSUM</a>
						<a href="/centering-div" target="_blank">HOW TO CENTER A DIV</a>
					</div>
				</div>
			</div>
		</div>


	</div>
</template>

<script setup lang="ts">

const sectionSong = { "cover": "2b16992e49be4a199e7dad2c", "id": "2FgwL1GHWKTbuHzAIjEeFa", "trackName": "Grace Kelly", "artist": "MIKA", "trackId": "2TdDRjNiF1HuRvnclprnce" }

const isDragging = ref(false);

const { isMobile } = useDeviceDetection();

useAnnotate('end-header', undefined, 'underline', 0);

interface DraggableElement extends HTMLElement {
	onmousedown: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
}

interface DragEvent extends MouseEvent {
	clientX: number;
	clientY: number;
	preventDefault(): void;
}

onMounted(() => {
	if (isMobile.value) return;
	const floatingDoc = document.getElementById("floating-card");

	if (floatingDoc) dragElement(floatingDoc);
})

function dragElement(elmnt: DraggableElement) {
	if (isMobile.value) return;

	let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	const container = document.getElementById("draggable-container") as HTMLElement;

	const headerDoc = document.getElementById(elmnt.id + "-header") as DraggableElement;
	if (headerDoc != null) {
		headerDoc.onmousedown = dragMouseDown;
	} else {
		elmnt.onmousedown = dragMouseDown;
	}

	const doc = document.getElementById("floating-card") as HTMLElement;
	if (!doc) return;
	// const containerRect = container.getBoundingClientRect();
	// const docRect = doc.getBoundingClientRect();
	// elmnt.style.top = (containerRect.height / 2) - (docRect.height / 2) + "px";
	// elmnt.style.left = (containerRect.width / 2) - (docRect.width / 2) + "px";

	function dragMouseDown(e: DragEvent) {
		e = e || window.event as DragEvent;
		e.preventDefault();
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		document.onmousemove = elementDrag;
	}

	function elementDrag(e: DragEvent) {
		e = e || window.event as DragEvent;
		e.preventDefault();

		isDragging.value = true;
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;

		const containerRect = container.getBoundingClientRect();
		const elmntRect = elmnt.getBoundingClientRect();

		let newTop = elmnt.offsetTop - pos2;
		let newLeft = elmnt.offsetLeft - pos1;

		if (newTop < 0) newTop = 0;
		if (newLeft < 0) newLeft = 0;
		if (newTop + elmntRect.height > containerRect.height) {
			newTop = containerRect.height - elmntRect.height;
		}
		if (newLeft + elmntRect.width > containerRect.width) {
			newLeft = containerRect.width - elmntRect.width;
		}

		elmnt.style.top = newTop + "px";
		elmnt.style.left = newLeft + "px";
	}

	function closeDragElement() {
		document.onmouseup = null;
		document.onmousemove = null;
		isDragging.value = false;
	}
}




</script>


<style scoped>
.art-offset {
	margin-top: 0px;

}

.mobile-art-offset {
	margin-top: 0px !important;
}

.mobile-card {
	position: absolute;
	padding-top: 500px;
	/* top: 50% !important; */
	left: 50% !important;
	margin-top: 300px;
	width: calc(100% - 80px) !important;
	transform: translateX(-50%) !important;

}


#floating-card {
	position: absolute;
	z-index: 9;
	background-color: #f1f1f1;
	text-align: center;
	border: 1px solid #d3d3d3;
	max-width: 750px;

	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);
	background-color: #fafafacc;

	box-shadow: 0px 0px 30px 0px #00000050;

	border-radius: 24px;
	overflow: hidden;
	padding: 30px;

	top: 20%;
	left: 10%
}

#floating-card-header {
	padding: 10px;
	z-index: 10;
	width: 30px;
	height: 30px;

	border-radius: 12px;
	background-color: transparent;
	cursor: move;
	transition: all 250ms ease-in-out;
}

#floating-card-header img {

	user-select: none;
	-moz-user-select: none;
	-webkit-user-select: none;
	opacity: .5;
	transition: all 250ms ease-in-out;


}



#draggable-container {
	z-index: 0 !important;
	position: relative;
	width: 100vw;
	border-top: 2px solid transparent;
	transition: border-top 250ms ease-in-out;
}



.border {
	border-top: 2px solid var(--light-grey-color) !important;
	cursor: move !important;
}


.bottom-links {
	padding-top: 50px;
	display: flex;
	flex-direction: row;
	gap: 20px;
	text-transform: uppercase;
	font-size: 15px;
}

.bottom-links a {
	font-size: 15px;
	color: var(--grey-color) !important;
	text-decoration: none;
	font-weight: 600;
	transition: color 150ms ease-in-out;
}




.header {
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.header h1 {
	margin-top: 0px;
}

.content {
	text-align: start;
}


.content a {
	color: var(--red-color);
	text-decoration: none;
	/* font-weight: 600; */
	transition: color 150ms ease-in-out;
}


@media (hover: hover) and (pointer: fine) {


	#floating-card-header img:hover {
		transform: scale(1.1);
		opacity: 1;
	}

	.bottom-links a:hover {
		color: var(--red-color) !important;
	}

}

.music-player-badge {
	margin-top: 20px;
	max-width: 330px;
}
</style>