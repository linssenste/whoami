<template>
	<div class="fact-overlay">


		<div style="">

			<h2>
				<!-- <img width="100"
					 src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/European_stars.svg/300px-European_stars.svg.png" /> -->

				Train Traveling with my dog through Europe 2024
			</h2>

			<p>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
				labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
				et
				ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
			</p>
		</div>

		<div class="facts-row">

			<div class="facts-col">
				<div class="fact">
					<div class="fact-value">12026 km</div>
					<div class="fact-description">distance </div>
				</div>

				<div class="fact">
					<div class="fact-value">186 h</div>
					<div class="fact-description">on the Track</div>
				</div>
			</div>
			<div class="facts-col">

				<div class="fact">
					<div class="fact-value">20</div>
					<div class="fact-description">States</div>
				</div>

				<div class="fact">
					<div class="fact-value">31</div>
					<div class="fact-description">Cities</div>
				</div>
			</div>


			<div class="facts-col">
				<div class="fact">
					<div class="fact-value">3</div>
					<div class="fact-description">Gauge Types</div>
				</div>

				<div class="fact">
					<div class="fact-value">2</div>
					<div class="fact-description">Timezones</div>
				</div>
			</div>

		</div>

	</div>
</template>


<script setup lang="ts">

const props = defineProps<{
	visited: string[]
}>()
props.visited;


</script>

<style scoped>
.fact-overlay {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	gap: 20px;

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

.facts-row {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 20px;
}
</style>