<script setup>
import { useUsersStore } from "@/stores/users";
import { ref } from "vue";

const emit = defineEmits(["update:show"]);
const props = defineProps({ modalId: { type: String, required: true } });

const modalId = props.modalId;
const newRole = ref("");
const adding = ref(false);

const addNewRole = () => {
	adding.value = true;

	const role = newRole.value.toLowerCase().replace(/\s+/g, "");
	useUsersStore().addRole(role);

	setTimeout(() => {
		adding.value = false;
		newRole.value = "";
		emit("update:show", false);
	}, 300);
};
</script>

<template>
	<b-modal :id="modalId" hide-footer centered>
		<template #modal-title>
			<span class="modal-title"> Adicionar Cargo </span>
		</template>
		<div class="d-block text-center">
			<form @submit.prevent="addNewRole">
				<input
					type="text"
					class="form-control new-role-input w-100 h-100"
					placeholder="Novo Cargo"
					aria-label="Novo Cargo"
					v-model="newRole"
					required
				/>

				<div v-if="adding" class="w-100 text-center mt-3">
					<b-spinner variant="success" label="Carregando..."></b-spinner>
				</div>

				<b-button
					class="add-role-modal-btn mt-3"
					block
					type="submit"
					:disabled="newRole === ''"
				>
					Adicionar
				</b-button>
			</form>
		</div>
	</b-modal>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #ffffff;
$tertiary-color: #18516f;
$fourth-color: #57b894;

.modal-title {
	font-family: "Panton", sans-serif;
	font-weight: 600;
	font-size: 1.4rem;
	color: $primary-color;
}

.new-role-input {
	background-color: $secondary-color;
	color: $primary-color;
	border: 1px solid $fourth-color;
	border-radius: 0.6rem;
	font-family: "Panton", sans-serif;
	font-weight: 400;
	font-size: 1.1rem;
	padding: 0.5rem 1rem;

	&:focus {
		box-shadow: none;
		outline: transparent;
	}
}

.add-role-modal-btn {
	background-color: $primary-color;
	color: $secondary-color;
	border: none;
	font-family: "Panton", sans-serif;
	font-weight: 400;
	font-size: 1.1rem;
	border-radius: 0.6rem;

	&:hover {
		background-color: $tertiary-color;
	}
}
</style>
