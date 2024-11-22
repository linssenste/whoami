<template>
	<div class="inclusion-section">
		<InclusionRainbowHeader />

		<div class="content">
			<div class="text-content">
				<span class="handwriting">"I'm weak & what's wrong with that ?"</span>

				<p>
					I was diagnosed with chronic muscle disease when I was 16. Despite the challenges I faced, I learned
					to
					pursue my dreams and not let my disability hold me back. I continue to enjoy activities like hiking
					and travelling, and my dog Jasper keeps me active.
					<br><br>
					My disability has also shown me the difficulties people with different abilities face in our
					society. I'm committed to making a change, and I've given a TEDx talk and launched a podcast, where
					we explore inclusion from different
					perspectives.

				</p>

				<MusicPlaySong v-show="!isMobile" class="play-badge" :song="sectionSong" />

			</div>

			<div class="embed-content">
				<iframe width="100%" style="aspect-ratio: 1.7; border-radius: 12px;"
						src="https://www.youtube.com/embed/S-S5_oVNvZQ?si=qin9graRTGLmWD7u" title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
				</iframe>

				<iframe style="border-radius:12px"
						src="https://open.spotify.com/embed/episode/37APGyNAhgVwrTJZFxY56s?utm_source=generator&t=95"
						width="100%" height="152" frameBorder="0" allowfullscreen=""
						allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
						loading="lazy"></iframe>
			</div>
		</div>



	</div>
</template>

<script setup lang="ts">
const sectionSong = { "cover": "fb9366711c6cadb7736f36c8", "id": "2nwTJuSqvCygeyI8U7vpeI", "trackName": "Weak", "artist": "AJR", "trackId": "3BuLtAmXKy5uQYl4ED1zBT" }

const { isMobile } = useDeviceDetection();
import { useStore } from '@/store';
const store = useStore();

onMounted(() => {
	window.focus()

	window.addEventListener("blur", () => {
		setTimeout(() => {
			if (document.activeElement.tagName === "IFRAME") {
				store.setPlayStatus(false);
			}
		});
	});
})
</script>
<style scoped>
.inclusion-section {
	position: relative;
	display: flex;
	flex-direction: column;
	padding: 20px;
}

.content {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	gap: 40px;
	z-index: 10 !important;
}


.text-content {
	margin-top: 15px;
	width: 50%
}

.text-content p {
	text-align: justify;
	line-height: 30px;
	padding-bottom: 50px;
}

.play-badge {
	box-shadow: 0px 0px 30px 0px #00000010;
	width: 300px
}


.embed-content {
	max-width: 600px;
	width: 100%;
}

@media (max-width: 1000px) {
	.inclusion-section {
		align-items: center;
		justify-content: center;
	}

	.content {
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.text-content {

		width: 100%
	}

	.text-content span {
		text-align: center;
	}
}
</style>