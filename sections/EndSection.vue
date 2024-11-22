<template>
	<div style="z-index: 0!important; position: relative; margin-top: -320px;">
		<Risographic class="art-offset" :inverse="true" section="inclusion"
					 :class="{ 'mobile-art-offset': isMobile }" />

		<div class="floating-card">

			<div class="inclusion-section">
				<div class="content">
					<div class="text-content">
						<span class="handwriting">THAT'S IT!</span>
						<p>
							This demo website was also intended to showcase my expertise in modern web development.
							Below is an overview of the core technologies I used to build it. Feel free to explore the
							source code on GitHub for more details.
						</p>


						<ul>
							<li>Nuxt 3</li>
							<li>Vue 3</li>
							<li>Pinia</li>
							<li>Spotify API</li>
						</ul>
					</div>

				</div>

				<MusicPlaySong :song="sectionSong" />


				<div style="padding-top: 50px;"><span>IMPRINT</span></div>
			</div>
		</div>


	</div>
</template>

<script setup lang="ts">
const { isMobile } = useDeviceDetection();
const sectionSong = { "cover": "2b16992e49be4a199e7dad2c", "id": "2FgwL1GHWKTbuHzAIjEeFa", "trackName": "Grace Kelly", "artist": "MIKA", "trackId": "2TdDRjNiF1HuRvnclprnce" }


</script>


<style scoped>
.art-offset {
	margin-top: 300px;

}

.mobile-art-offset {
	margin-top: 150px !important;
}


.floating-card {
	position: absolute;
	bottom: 200px;
	left: 50%;
	transform: translateX(-50%);

	max-width: 750px;
	width: 100%;

	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);
	background-color: #fafafacc;

	box-shadow: 0px 0px 30px 0px #00000050;

	border-radius: 24px;
	overflow: hidden;
	padding: 20px
}
</style>