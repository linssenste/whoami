<template>


	<div>
		<LayoutStepScroller :steps="3" id="me" text-side="left">
			<template v-slot:me-step-1>
				<iframe src="https://instax.linssenste.dev/?embed=red"
						style="width: 100%; border-radius: 12px; height: 650px; border: none; outline: none; background-color: var(--light-grey-color);" />

			</template>


			<template v-slot:me-step-2="{ visible }">
				<PortfolioGeoDalliDalliProject :visible="visible" />

			</template>

			<template v-slot:me-step-3>
				<div
					 style="width: 100%; border-radius: 12px; height: 650px; border: none; outline: none; background-color: var(--light-grey-color);">

					MAP WITH BIKE RIDER ANIMATION
				</div>

			</template>

			<!-- <template v-for="index in 2" :key="index" v-slot:[`me-step-${index + 1}`]>
			<div :id="`me-step-${index}`" style="width: 100%; height: 500px; background-color: lightcoral;">{{
		index }}
			</div>
		</template> -->

			<template v-slot:text="{ focus }">

				<div class="project-description">
					jdkd {{ focus }}


					<div v-if="focus == 1">
						INSTAX
					</div>

					<div v-else-if="focus == 2">
						hallo <span>test</span>
					</div>

					<div v-else-if="focus == 3">
						Letzte Card
					</div>
				</div>
			</template>
		</LayoutStepScroller>
	</div>

</template>


<style scoped>
.project-description {
	text-align: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>