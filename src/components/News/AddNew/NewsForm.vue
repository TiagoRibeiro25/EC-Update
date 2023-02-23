<script setup>
import ImgSlider from "@/components/CreateItemImgs.vue";
import { useNewsStore } from "@/stores/news";
import { useUsersStore } from "@/stores/users";
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({ theme: { type: Boolean, required: true } });
const theme = ref(props.theme);

const router = useRouter();
const images = ref([]);
const title = ref("");
const content = ref("");
const loading = ref(false);

const createNew = () => {
	loading.value = true;
	const newItem = {
		title: title.value,
		body: content.value,
		images: images.value,
		authorId: useUsersStore().getUserLogged().id,
	};

	useNewsStore().addNew(newItem);
	setTimeout(() => {
		router.push({ name: "News" });
	}, 500);
};
</script>

<template>
	<div>
		<ImgSlider :images="images" />

		<form
			@submit.prevent="createNew"
			class="d-flex flex-column justify-content-center align-items-center mt-5 mb-5"
		>
			<input
				type="text"
				class="form-control w-75 py-4 px-4 mt-5 mb-2"
				:class="theme ? 'input-dark-theme' : 'input-light-theme'"
				placeholder="Título da notícia"
				aria-label="Título da notícia"
				v-model="title"
			/>

			<textarea
				cols="30"
				rows="10"
				class="form-control w-75 py-4 px-4 mt-5 mb-5"
				:class="theme ? 'input-dark-theme' : 'input-light-theme'"
				placeholder="Conteúdo da notícia"
				aria-label="Conteúdo da notícia"
				v-model="content"
			></textarea>

			<div v-if="loading">
				<b-spinner class="mb-5" variant="success" label="Carregando..."></b-spinner>
			</div>

			<button
				type="submit"
				class="btn px-4 addNewBtn"
				:class="theme ? 'addNewBtn-dark-theme' : 'addNewBtn-light-theme'"
				aria-label="Adicionar notícia"
				:disabled="!title || !content || images.length === 0"
			>
				Adicionar notícia
			</button>
		</form>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #3fc380;
$fourth-color: #ffffff;
$fifth-color: #18516f;

form {
	input,
	textarea {
		background-color: transparent;
		border: 2px solid $tertiary-color;
		border-radius: 15px;
		font-family: "Panton", sans-serif;
		font-size: 1.2rem;
		font-weight: 600;

		&:focus,
		&:active {
			outline: none;
			background-color: transparent;
			border: 2px solid $tertiary-color;
			box-shadow: 0 0 0 5px rgba(174, 220, 192, 0.25);
		}
	}
}

.addNewBtn {
	border: none;
	outline: transparent;
	border-radius: 15px;
	font-family: "Panton", sans-serif;
	font-size: 1.1rem;
	font-weight: 600;
}

.input-dark-theme {
	color: $secondary-color;
}

.input-light-theme {
	color: $primary-color;
}

.addNewBtn-dark-theme {
	background-color: $fourth-color;
	color: $primary-color;

	&:hover {
		color: $fourth-color;
		background-color: $fifth-color;
	}
}

.addNewBtn-light-theme {
	background-color: $primary-color;
	color: $fourth-color;

	&:hover {
		background-color: $fifth-color;
	}
}
</style>
