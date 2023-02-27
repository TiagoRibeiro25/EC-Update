<script setup>
import { ref } from "vue";

const props = defineProps({ images: { type: Array, required: true } });
const images = ref(props.images);

const addNewImg = () => {
	const input = document.createElement("input");
	input.type = "file";
	input.accept = "image/jpg, image/jpeg, image/png";
	input.onchange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			if (!/data:image\/(jpeg|png)/.test(reader.result)) return;

			images.value.push(reader.result);
		};
	};
	input.click();
};

const removeImg = (index) => images.value.splice(index, 1);
</script>

<template>
	<div class="row justify-content-center align-items-center">
		<img
			v-for="(image, index) in images"
			:key="index"
			:src="image"
			alt="Imagem adicionada"
			class="addNewImg img-fluid my-3 mx-3 rounded-lg shadow-sm"
			@click="removeImg(index)"
		/>

		<img
			v-if="images.length < 4"
			class="addNewImg addImgBtn my-3 mx-3 rounded-lg shadow"
			src="@/assets/images/addImage.png"
			alt="Adicionar imagem"
			@click="addNewImg"
		/>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #ffffff;
$tertiary-color-color: #18516f;

.addNewBtn {
	background-color: $primary-color;
	color: $secondary-color;
	border-radius: 15px;

	&:hover {
		background-color: $tertiary-color-color;
	}

	&:disabled {
		background-color: $primary-color;
		opacity: 0.5;
	}
}

.addNewImg {
	width: 220px;
	height: 150px;
	transform: scale (1);
	transition: transform 0.3s ease-in-out;

	&:hover {
		border: 1px solid red;
		opacity: 0.6;

		cursor: pointer;
		transform: scale(1.05);
	}
}

.addImgBtn:hover {
	border: none;
	opacity: 1;
}
</style>
