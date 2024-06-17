<template>
	<div
		 style="width: 100%; border-radius: 12px; height: 100%; border: none; outline: none; background-color: transparent">
		GEO DALLI DALLI

		<div class="geo-quiz">
			<div
				 style="width: 350px!important; min-width: 350px; height: 350px; background-color: grey; border-radius: 12px;">
			</div>

			<div class="options-column">
				<button v-for="index in 4">
					<b style="margin-right: 10px;">{{ index }}</b> Option nummer 1
				</button>
			</div>
		</div>
	</div>

</template>


<style scoped>
.geo-quiz {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.options-column {
	width: 100%;
	position: relative;
	padding: 20px;
	gap: 20px;
	display: flex;
	flex-direction: column
}

.options-column button {
	background-color: #e0e0e0;
	border: none;
	width: 100%;
	border-radius: 12px;
	height: 50px;
	color: var(--red-color);
	font-size: 17px;
	cursor: pointer;
	transition: all 150ms ease-in-out;
}

.options-column button:hover {

	background-color: var(--red-color);
	color: white;
}
</style>