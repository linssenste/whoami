<template>
	<div class="traveling-card">

		<div class="map-gallery">


			<div class="countries-map" ref="mapRef" id="country-map">
				<div class="countries-map map">
					<div v-show="selectedCountry != null && selectedCountry.length == 2" class="hint-overlay">
						<img width="63" height="63" :alt="`flag of ${selectedCountry}`" class="flag"
							 :src="`https://flagsapi.com/${selectedCountry}/flat/64.png`">
						<span v-if="selectedCountry">{{ countriesNames[selectedCountry] }}</span>

					</div>

					<button aria-label="Close country map" title="Close map"
							v-on:click="manuallySelectedCountry(visitedCountries[0])" class="reset-button">
						<img width="19" height="19" alt="close icon" src="/assets/icons/xmark.svg" />
					</button>

					<div class="info-overlay"
						 :class="{ 'info-overlay-inactive': selectedCountry != visitedCountries[0] }">

						<TravelFactsOverlay v-on:start="startRandomCountry()" :visited="visitedCountries" />
					</div>

					<TravelCountryMap ref="travelMapRef" v-on:selected="manuallySelectedCountry"
									  :visited="visitedCountries" />


				</div>
				<!-- <div class="hint-text countries-map hint"
					 :class="{ 'hint-visiblity': selectedCountry != null && selectedCountry.length === 2 }">Select
					Country
					manually</div> -->
			</div>



			<PolaroidSnapSlider id="country-images" class="polaroids-gallery" ref="sliderRef" :polaroids="travelImages"
								v-on:focus="focusedImageEvent" />

		</div>

	</div>
</template>


<script setup lang="ts">

const travelMapRef = ref<HTMLElement | null>(null);
const mapRef = ref<HTMLElement | null>(null);
const sliderRef = ref(null)

const { isMobile } = useDeviceDetection();

// useParrallexScroll('country-map', 0.05);
// useParrallexScroll('country-images', 0.05, false);



const visitedCountries = ["INTRO", "BE", "NL", "DE", "HU", "SK", "AT", "SI", "HR", "IT", "DK", "SE", "NO", "CZ", "PL", "LT", "LV", "EE", "FI"];

const countriesNames: { [key: string]: string } = {
	"BE": "Belgium",
	"NL": "Netherlands",
	"DE": "Germany",
	"HU": "Hungary",
	"AT": "Austria",
	"SI": "Slovenia",
	"HR": "Croatia",
	"IT": "Italy",
	"DK": "Denmark",
	"SE": "Sweden",
	"NO": "Norway",
	"CZ": "Czech Republic",
	"PL": "Poland",
	"LT": "Lithuania",
	"LV": "Latvia",
	"EE": "Estonia",
	"FI": "Finland"
}

const travelImages = visitedCountries.map((countryId) => {

	// Generate the image object with the path and id
	return {
		src: `/polaroids/travel/${countryId}.webp`,
		alt: '',
		id: countryId
	};
});

const selectedCountry = ref<string>("INTRO");


function startRandomCountry() {
	const randomIndex = Math.floor(Math.random() * visitedCountries.length);
	manuallySelectedCountry(visitedCountries[randomIndex]);
}
function focusedImageEvent(event: any) {
	if (!event.id) return

	selectedCountry.value = event.id ?? 'INTRO'
	if (travelMapRef.value) (travelMapRef.value as any).selectCountryByISO(event.id);

}

function manuallySelectedCountry(countryISO: string) {
	if (!sliderRef.value) return
	const imageIndex = travelImages.findIndex(image => image.id == countryISO);
	if (imageIndex !== -1) {
		(sliderRef.value as any).selectByIndex(imageIndex);

		if (isMobile.value) {
			const doc = document.getElementById('country-images');

			doc?.scrollIntoView({
				behavior: 'smooth',
				block: 'end',

			})
		}
	}
}

</script>

<style scoped>
.traveling-card {
	position: relative;
}

.map-gallery {
	position: relative;
	display: flex;
	flex-direction: row;
	z-index: 1;
	height: 100%;
	z-index: 1;

	align-items: center;
}

.countries-map {
	position: relative;
	height: 550px;
	min-width: calc(50% - 20px);
	width: calc(50% - 20px);
	margin-left: 20px;
	position: relative;
	display: flex;
	z-index: 1000;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.countries-map .map {
	position: relative;
	width: 100%;

	overflow: hidden;
	border-radius: 10px;
}

.countries-map .hint {
	position: relative;
	height: 50px;
	opacity: 0;
	transition: all 150ms ease-in-out;
}

.hint-visiblity {
	opacity: 1 !important;
}

.polaroids-gallery {
	position: relative;
	width: 50%;
	min-width: 50%;
	z-index: 0;
}

@media screen and (max-width: 1000px) {
	.map-gallery {

		flex-direction: column;
		gap: 20px
	}

	.polaroids-gallery {
		width: 100%;
	}

	.countries-map {
		width: calc(100% - 40px);
		margin: 20px;

		margin-bottom: 20px
	}
}


.hint-overlay {
	position: absolute;
	bottom: 10px;
	left: 10px;

	overflow: hidden;
	height: 40px;

	background-color: #ffffffcc;
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);

	z-index: 1000 !important;
	box-shadow: 0px 0px 30px 0px #00000020;

	/* border: 2px solid #bbb; */
	/* padding-left: 20px; */
	padding-right: 20px;
	/* padding-top: 5px;
	padding-bottom: 5px; */
	display: flex;
	flex-direction: row;
	align-items: center;
	border-radius: 5px;
	gap: 15px
}

.hint-overlay span {
	text-transform: uppercase;
	font-size: 15px;
	letter-spacing: 1px;

}

.flag {
	margin-left: -2px;

}

.reset-button {
	position: absolute;
	top: 10px;
	right: 10px;

	background-color: #ffffffcc;
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);

	z-index: 1000 !important;
	cursor: pointer;
	background-color: transparent;
	user-select: none !important;
	-webkit-user-select: none;
	height: 35px !important;
	width: 35px !important;
	padding: 0 !important;

	outline: none;
	border: 2px solid #bbb;
	border-radius: 50%;

	transition: all 150ms ease-in-out;
}

.reset-button img {
	opacity: .8;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

@media (hover: hover) and (pointer: fine) {

	.reset-button:hover img {
		opacity: 1;
	}

	.reset-button:hover {

		background-color: #f0f0f0;

		/* box-shadow: 0px 0px 50px 0px #00000050; */
	}

}

.info-overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10000 !important;
	background-color: #e0e0e099;
	backdrop-filter: blur(15px);
	-webkit-backdrop-filter: blur(15px);
	transition: all 250ms ease-in-out;
}

.info-overlay-inactive {
	opacity: 0;
	pointer-events: none;
}


.read-more-button {
	background-color: var(--red-color-transparent);
	padding: 20px;
	padding-top: 15px;
	padding-bottom: 15px;
	outline: none;
	border: none;
	border-radius: 8px;
	color: #ffffff;
}
</style>