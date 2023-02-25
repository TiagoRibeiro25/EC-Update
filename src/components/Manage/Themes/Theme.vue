<script setup>
import { useThemesStore } from "@/stores/themes";
import { ref } from "vue";

const props = defineProps({
	theme: { type: Boolean, required: true },
	themeItem: { type: Object, required: true },
});

const theme = props.theme;
const themeItem = props.themeItem;
const isHovered = ref(false);
const modalId = `modal-${crypto.randomUUID()}`;
const removing = ref(false);

const disableTheme = () => {
	removing.value = true;
	setTimeout(() => {
		useThemesStore().disableTheme(themeItem.id);
		removing.value = false;
	}, 300);
};
</script>

<template>
	<div>
		<button
			type="button"
			class="btn theme-btn py-1 mx-2 mb-4"
			:class="theme ? 'theme-btn-dark-theme' : 'theme-btn-light-theme'"
			@mouseover="isHovered = true"
			@mouseleave="isHovered = false"
			@click="$bvModal.show(modalId)"
		>
			{{ isHovered ? "Remover Tema" : themeItem.name }}
		</button>
	</div>

	<b-modal :id="modalId" size="lg" hide-footer>
		<div class="container">
			<h4 class="modal-title text-center mt-1">
				Tens a certeza que queres remover {{ themeItem.name }}?
			</h4>

			<p class="modal-description text-center mt-3 mb-4">
				(Atividades criadas anteriormente com este tema <b>não serão</b> afetadas)
			</p>

			<div v-if="removing" class="w-100 text-center mt-3">
				<b-spinner variant="danger" label="Carregando..."></b-spinner>
			</div>

			<div class="mt-4 mb-3">
				<b-button
					type="submit"
					class="btn btn-block modal-remove-btn w-50 mx-auto"
					:disabled="removing"
					@click="disableTheme"
				>
					Remover {{ themeItem.name }}
				</b-button>
			</div>
		</div>
	</b-modal>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #ffffff;
$fourth-color: #8e0101;
$fifth-color: #b30000;

.theme-btn {
	outline: hidden;
	border-radius: 0.6rem;
	width: 190px;
	font-family: "Panton", sans-serif;
	font-size: 1rem;
	font-weight: 500;
	transition: all 0.3s ease-in-out;

	&:hover {
		background-color: $fourth-color;
		color: $tertiary-color;
	}
}

.theme-btn-dark-theme {
	background-color: $secondary-color;
	color: $primary-color;
}

.theme-btn-light-theme {
	background-color: $primary-color;
	color: $tertiary-color;
}

.modal-title,
.modal-description {
	font-family: "Panton", sans-serif;
	font-size: 1.5rem;
	font-weight: 600;
	color: $primary-color;
}

.modal-description {
	font-size: 1.2rem;
	font-weight: 500;
}

.modal-remove-btn {
	font-family: "Panton", sans-serif;
	font-size: 1.2rem;
	font-weight: 600;
	color: $tertiary-color;
	background-color: $fourth-color;
	border: none;

	&:hover {
		background-color: $fifth-color;
	}
}
</style>
