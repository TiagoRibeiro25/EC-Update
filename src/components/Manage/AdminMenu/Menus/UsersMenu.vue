<script setup>
import ManageRolesModal from "./ManageRolesModal.vue";
import { ref } from "vue";

const props = defineProps({ theme: { type: Boolean, required: true } });
const theme = props.theme;

const filterName = ref("");
const filterEmail = ref("");
const modalId = `modal-${crypto.randomUUID()}`;
</script>

<template>
	<div class="row pl-xl-4 pr-xl-0 px-4">
		<!-- Filter by Name -->
		<div class="col-xl-3 col-md-12">
			<b-input-group class="mt-4">
				<template #prepend>
					<b-input-group-text
						class="filter-input"
						:class="theme ? 'filter-dark-theme' : 'filter-light-theme'"
					>
						<img src="@/assets/icons/search.svg" alt="search" width="20" />
					</b-input-group-text>
				</template>
				<b-form-input
					class="filter-input"
					:class="theme ? 'filter-dark-theme' : 'filter-light-theme'"
					placeholder="Filtrar por Nome"
					type="search"
					v-model="filterName"
				></b-form-input>
			</b-input-group>
		</div>

		<!-- Filter by Email -->
		<div class="col-xl-3 col-md-12">
			<b-input-group class="mt-4">
				<template #prepend>
					<b-input-group-text
						class="filter-input"
						:class="theme ? 'filter-dark-theme' : 'filter-light-theme'"
					>
						<img src="@/assets/icons/search.svg" alt="search" width="20" />
					</b-input-group-text>
				</template>
				<b-form-input
					class="filter-input"
					:class="theme ? 'filter-dark-theme' : 'filter-light-theme'"
					placeholder="Filtrar por Email"
					type="search"
					v-model="filterEmail"
				></b-form-input>
			</b-input-group>
		</div>

		<!-- Manage Roles Button -->
		<div class="col-xl-2 col-md-12 d-flex justify-content-end align-items-center">
			<button class="btn manage-roles-btn" @click="$bvModal.show(modalId)">
				Gerir Cargos
			</button>
		</div>
	</div>

	<ManageRolesModal
		:modalId="modalId"
		@update:show="(show) => (show ? $bvModal.show(modalId) : $bvModal.hide(modalId))"
	/>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #e4f0e8;
$tertiary-color: #ffffff;
$fourth-color: #18516f;
$fifth-color: #aedcc0;

.filter-input {
	border: none;
	border-radius: 0.6rem;
	font-family: "Panton", sans-serif;
	font-weight: 400;
	font-size: 1.05rem;

	&:focus {
		box-shadow: none;
		outline: transparent;
	}
}

.manage-roles-btn {
	background-color: $primary-color;
	color: $tertiary-color;
	border: none;
	font-family: "Panton", sans-serif;
	font-weight: 400;
	font-size: 1.05rem;
	border-radius: 0.6rem;
	margin-top: 25px;

	&:hover {
		background-color: $fourth-color;
	}
}

.filter-light-theme {
	background-color: $tertiary-color;
	color: $primary-color;
}

.filter-dark-theme {
	background-color: $fifth-color;
	color: $primary-color;

	& > img {
		filter: invert(1);
	}
}
</style>
