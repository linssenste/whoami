<template>

	<div
		 style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 15px">
		<div class="game-container">


			<iframe width="100%" height="100%" class="game-embed"
					src="http://localhost:5173/viewer?embed=10&image=https%3A%2F%2Fsalva-hundehilfe.de%2Fwp-content%2Fuploads%2F2024%2F04%2Fjasper-cj-2404-1.jpg&interval=0&shapes=50&type=hexagon"></iframe>

		</div>
		<LayoutKeepScrollingAnimation :isClick="true" text="Click tiles to reveal image" />
	</div>
</template>

<script lang="ts" setup>


</script>

<style scoped>
.game-container {
	position: relative;
	border: 8px solid #c0c0c0 !important;
	width: 100%;
	height: 500px;
	max-height: 100%;

	border-radius: 12px;
	outline: none;
	background-color: transparent;
	overflow: hidden;
}

.game-embed {
	border-radius: 4px !important;
	border: none;
	outline: none
}
</style>