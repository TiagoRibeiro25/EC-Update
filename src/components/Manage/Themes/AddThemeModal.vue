<script setup>
import { useThemesStore } from "@/stores/themes";
import { ref } from "vue";

const emit = defineEmits(["close:modal"]);

const adding = ref(false);
const newTheme = ref("");

const verifyThemeName = () => !newTheme.value.match(/[a-z]/i);
const addTheme = () => {
	adding.value = true;
	setTimeout(() => {
		useThemesStore().addTheme(newTheme.value);
		adding.value = false;
		emit("close:modal");
	}, 300);
};
</script>

<template>
	<div>
		<b-modal id="add-theme-modal" size="lg" hide-footer>
			<div class="container">
				<h4 class="modal-title text-center mt-1 pb-2">Adicionar novo Tema</h4>

				<input
					type="text"
					class="form-control new-theme-input mt-4 mb-4 text-center w-75 mx-auto"
					placeholder="Nome do Tema"
					v-model="newTheme"
				/>

				<div v-if="adding" class="w-100 text-center">
					<b-spinner variant="success" label="Carregando..."></b-spinner>
				</div>

				<div class="mb-3" :class="adding ? 'mt-4' : 'mt-5'">
					<b-button
						type="submit"
						class="btn btn-block modal-add-btn w-50 mx-auto"
						:disabled="adding || verifyThemeName()"
						@click="addTheme"
					>
						Adicionar
					</b-button>
				</div>
			</div>
		</b-modal>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #ffffff;
$tertiary-color: #18516f;
$fourth-color: #aedcc0;

.modal-title {
	font-family: "Panton", sans-serif;
	font-size: 1.5rem;
	font-weight: 600;
	color: $primary-color;
}

.new-theme-input {
	font-family: "Panton", sans-serif;
	font-size: 1.2rem;
	font-weight: 600;
	color: $primary-color;
	background-color: transparent;
	border: 2px solid $fourth-color;

	&:focus {
		outline: none;
		box-shadow: none;
		border: 2px solid $tertiary-color;
	}
}

.modal-add-btn {
	font-family: "Panton", sans-serif;
	font-size: 1.2rem;
	font-weight: 600;
	color: $secondary-color;
	background-color: $primary-color;
	border: none;

	&:hover {
		background-color: $tertiary-color;
	}
}
</style>
