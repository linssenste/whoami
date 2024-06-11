<template>
	<div class="notebook">
		<div class="notebook-wrapper">
			<div class="cell">

				<!-- cell number + running animation -->
				<div class="cell-id">In [<span v-if="!visible" class="inactive-cell">*</span>
					<span v-else-if="running">*</span>
					<span v-else>7</span>]:
				</div>


				<!-- code + results content -->
				<div class="cell-content">

					<!-- pseudo python code -->
					<div class="code-area">
						<div class="green"># swim playlist analysis with Spotify API</div>
						<div>analysis_id = analyze(<span class="red">"spotify:playlist:2u6YwYORaQRWptbXc1VsZB"</span>)
						</div>
						<div>report_url =
							<span class="blue">f</span><span class="red">"<span class="green">{</span><span
									  class="black">colab_base_url</span><span class="green">}</span>/drive/<span
									  class="green">{</span><span class="black">analysis_id</span><span
									  class="green">}</span>"</span>
						</div>
						<br>
						<div><span class="yellow">print</span><span class="blue">(f</span><span class="red">"Analysis
								complete. View report at:
								<span class="green">{</span><span class="black">report_url</span><span
									  class="green">}</span>"</span><span class="blue">)</span>
						</div>
						<div>
							openNewTab(report_url)
						</div>
					</div>

					<!-- pseudo results -->
					<div v-if="!running && visible" class="results">
						<!-- Link section -->
						Analysis complete. View report at: <a target="_blank"
						   href="https://github.com/linssenste/hello/blob/main/assets/analysis/spotify.ipynb">https://github.com/linssenste/hello/blob/main/assets/analysis/spotify.ipynb</a>

					</div>
				</div>


			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>

const props = defineProps<{
	visible: boolean
}>();

// pseudo running cell animation
const running = ref(false);

watch(() => props.visible, () => {
	if (props.visible) {
		running.value = true;
		setTimeout(() => {
			running.value = false;
		}, 750);
	}
})

</script>

<style scoped>
.notebook {
	min-height: 300px;
}

.notebook-wrapper {
	border: 1px solid #ABABAB;
	border-radius: 2px;
	border-left: 5px solid #42A5F5;
	padding: 5px;
	font-size: 14px;
	font-family: monospace;
}

.results {
	padding: 6px;
	word-break: break-all;
	overflow-wrap: break-word;
}

.inactive-cell {
	color: transparent
}

.cell {
	display: flex;
	flex-direction: row;
}

.cell-id {
	width: 100px;
	min-width: 100px;
	text-align: end;
	padding-right: 8px;
	color: #303FA0;
}

.cell-content {
	width: 100%;
}

.code-area {
	position: relative;
	width: calc(100% - 18px);
	background-color: #F7F7F7;
	border: 1px solid #CFCFCF;
	border-radius: 2px;
	padding: 10px 8px 10px 8px;
	font-size: 14px;
	line-height: 22px;
	font-family: Consolas, Monaco, "Lucida Console", "Liberation Mono", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New";
	word-break: break-all;
	overflow-wrap: break-word;
}

.yellow {
	color: #795E27
}

.blue {
	color: #0000FF
}

.red {
	color: #A21515
}

.green {
	color: #008001
}

a {
	color: blue;
	text-decoration: underline;
}

.black {
	color: #000
}
</style>
