<template>


	<div style="padding-top: 100px;">
		<LayoutStepScroller :steps="5" id="me" text-side="left" :inline="true">

			<template v-slot:me-step-1>
				<iframe src="https://instax.linssenste.dev/?embed=red"
						style="width: 100%; margin-top: 150px; border-radius: 12px; height: 650px; border: none; outline: none; background-color: var(--light-grey-color);" />
			</template>


			<template v-slot:me-step-2="{ visible }">
				<div style="max-width: 500px; width: calc(100% - 20px); aspect-ratio: 1/1; margin: 0 auto">
					<PortfolioGeoDalliDalliProject :visible="visible" />
				</div>
			</template>

			<template v-slot:me-step-3>

				<div
					 style="position: relative; width: 100%; border-radius: 12px; height: 650px; border: none; outline: none; background-color: var(--light-grey-color);">

				</div>

			</template>


			<template v-slot:me-step-4>

				<div
					 style="width: 100%; border-radius: 12px; height: 650px; border: none; outline: none; background-color: ">
					ALinoplan
				</div>

			</template>


			<template v-slot:me-step-5>

				<div
					 style="width: 100%; border-radius: 12px; height: 650px; border: none; outline: none; background-color: var(--light-grey-color)">
					ALinoplan
				</div>

			</template>

			<template v-slot:me-text-1>
				<PortfolioDescriptionFilmText />
			</template>
			<template v-slot:me-text-2>
				<PortfolioDescriptionGeoText />
			</template>



			<template v-slot:me-text-3>
				<PortfolioDescriptionBikeText />
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
	width: 100%;
	transform: translate(-50%, -50%);
}
</style>