<template>
	<LMap ref="map" :zoom="zoom" :min-zoom="zoom" :max-zoom="zoom" :center="[52.21322, 8.559482]"
		  :use-global-leaflet="false">
		<LTileLayer url="http://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png" attribution="" layer-type="base"
					name="OpenStreetMap" />
		<LGeoJson v-for="country in visited" :key="country" :options-style="countryBaseStyling"
				  v-on:click="selectedCountryEvent" :geojson="countries[country]" />
	</LMap>

</template>

<script setup lang="ts">
import countriesData from '../../assets/countries/countries.json'

interface Country {
	type: "Polygon";
	properties: {
		ISO_A2: string;
	};
	geometry: {
		type: string;
		coordinates: any[];
	};
}

const countries: { [key: string]: Country } = countriesData as { [key: string]: Country };

const zoom = ref(4)
const map = ref(null);

const emit = defineEmits(['selected'])
const props = defineProps<{
	visited: any
}>()

props.visited;
const selectedCountry = ref(null)

const mapColor = 'orange';
const countryBaseStyling = () => {

	return {
		color: `var(--${mapColor}-color)`,
		fillColor: `var(--${mapColor}-color)`,
		fillOpacity: .15,
		stroke: false,
		weight: .5

	}
}


function selectCountryByISO(isoString: string) {

	if (!map.value || !(map.value as any).leafletObject) return;

	(map.value as any).leafletObject.eachLayer((layer: any) => {
		if ((isoString == null || isoString.length > 2) && layer.feature) layer.setStyle(countryBaseStyling())
		else if (layer.feature && layer.feature.properties.ISO_A2 == isoString) {
			selectedCountryEvent({ layer: layer }, false);
		}
	})
}

defineExpose({ selectCountryByISO })
function selectedCountryEvent(e: any, event = true) {
	const countryISO = e.layer.feature.properties.ISO_A2;
	selectedCountry.value = countryISO

	if (event) {
		emit("selected", selectedCountry.value);
	}


	// Calculate the centroid manually
	const bounds = e.layer.getBounds();

	const centerLat = (bounds.getNorth() + bounds.getSouth()) / 2;
	const centerLng = (bounds.getWest() + bounds.getEast()) / 2;
	const center = [centerLat, centerLng];

	// Center the map on the country's centroid and set the zoom level to 4
	(map.value as any).leafletObject.setView(center, 4, { animate: true });

	// Directly manipulate the clicked layer
	const color = 'orange';

	if (e.layer && typeof e.layer.setStyle === 'function') {
		e.layer.setStyle({
			color: `var(--${color}-color)`,
			fillColor: `var(--${color}-color)`,
			fillOpacity: 1,
			weight: 2,
			stroke: true
		})
	}

	// Reset styles for other countries
	(map.value as any).leafletObject.eachLayer((layer: any) => {
		if (layer.feature && layer.feature.properties.ISO_A2 !== countryISO) {
			layer.setStyle(countryBaseStyling())
		}
	})

}
</script>