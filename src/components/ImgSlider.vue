<script setup>
import { ref } from "vue";

const props = defineProps({ images: { type: Array, required: true } });
const images = props.images;
const delayedImages = ref([]);

let i = 0;
const interval = setInterval(() => {
	if (i < images.length) {
		delayedImages.value.push(images[i]);
		i++;
	} else clearInterval(interval);
}, 200);
</script>

<template>
	<div
		v-if="delayedImages.length !== 0"
		class="row h-100 d-xl-block d-flex justify-content-center align-items-center"
	>
		<img
			v-for="(image, index) in delayedImages"
			:key="index"
			:src="image.includes('./data/images') ? '../' + image : image"
			alt="Imagem do artigo"
			loading="lazy"
			class="newDetailsImg img-fluid my-3 mx-3 rounded-lg shadow"
		/>
	</div>
	<div v-else class="row" style="height: 190px">
		<div class="col-12 d-flex justify-content-center align-items-center">
			<b-spinner variant="success" label="Carregando..."></b-spinner>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.newDetailsImg {
	width: 268px;
	height: 170px;
	animation: slideIn 1s ease-in-out;
}

@keyframes slideIn {
	0% {
		transform: translateX(200%) scale(0.5);
		opacity: 0;
	}
	100% {
		transform: translateX(0) scale(1);
		opacity: 1;
	}
}
</style>
