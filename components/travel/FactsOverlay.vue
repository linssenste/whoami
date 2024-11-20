<template>
	<div class="fact-overlay">

		<div class="facts-grid">
			<div class="fact">
				<div class="fact-value">12026 km</div>
				<div class="fact-description">distance </div>
			</div>

			<div class="fact">
				<div class="fact-value">186 h</div>
				<div class="fact-description">on the Track</div>
			</div>


			<div class="fact">
				<div class="fact-value">20</div>
				<div class="fact-description">States</div>
			</div>

			<div class="fact">
				<div class="fact-value">31</div>
				<div class="fact-description">Cities</div>
			</div>



			<div class="fact">
				<div class="fact-value">3</div>
				<div class="fact-description">Gauge Types</div>
			</div>

			<div class="fact">
				<div class="fact-value">2</div>
				<div class="fact-description">Timezones</div>
			</div>

		</div>


		<div>
			<MusicPlaySong :song="sectionSong" />

			<button v-on:click="startButtonEvent()" class="start-gallery-button">Show Travel map

			</button>
		</div>








	</div>
</template>


<script setup lang="ts">

const sectionSong = {
	"cover": "9dd1a35ada9870dc879dfb9e",
	"id": "5RaDlk1pjOFSfcGDurH62z",
	"name": "Gold Rush Kid",
	"artists": [{ "name": "George Ezra", "id": "2ysnwxxNtSgbb9t1m2Ur4j" }],
	"release": "2022-06-10", "track": "4N5s8lPTsjI9EGP7K4SXzB"
}

const props = defineProps<{
	visited: string[]
}>()
props.visited;

const emit = defineEmits(['start']);

function startButtonEvent() {

	emit('start');
}

</script>

<style scoped>
.fact-overlay {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	padding: 20px;
	padding-top: 0px !important;
	gap: 30px;

}

.countries-grid {
	display: inline-grid;
	grid-template-columns: repeat(7, 85px);
	grid-gap: 5px;
	justify-items: center;
	align-items: center;
}

.countries-grid img {
	opacity: .2;
	-webkit-filter: grayscale(100%);
	filter: grayscale(100%);
	border-radius: 5px !important;
	border-collapse: separate;
}


.visited {
	opacity: 1 !important;
	-ms-filter: "progid:DXImageTransform.Microsoft.gradient(enabled=false)";
	filter: none !important;
	transform: scale(1.2)
		/* IE 7 and the rest of the world */
}



.fact {
	padding: 20px;
	width: 150px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 5px;
	align-items: center;
}

.fact-value {
	font-size: 30px;
	font-weight: 700;
}

.fact-description {

	font-size: 16px;
	font-weight: 300;
	letter-spacing: 1.5px;
	text-transform: uppercase;

}

.facts-col {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.facts-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	width: 100%;
	justify-content: center;
	align-items: center;
}

@media (max-width: 600px) {
	.facts-grid {
		grid-template-columns: repeat(2, 1fr);
	}
}

@media (min-width: 601px) and (max-width: 900px) {
	.facts-grid {
		grid-template-columns: repeat(3, 1fr);
	}
}

@media (min-width: 901px) {
	.facts-grid {
		grid-template-columns: repeat(3, 1fr);
	}
}

.start-gallery-button {
	background-color: white;
	height: 45px;
	/* font-size: 16px; */
	width: 100%;
}

.arrow-icon {
	transform: rotate(90deg);
	margin-left: 10px;
}
</style>