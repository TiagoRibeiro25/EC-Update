<script setup>
import CreateNewBtn from "@/components/CreateNewBtn.vue";
import { useUsersStore } from "@/stores/users";

const props = defineProps({ theme: { type: Boolean, required: true } });

const theme = props.theme;
const userLogged = useUsersStore().getUserLogged();
const isUserAdmin = userLogged.role === "admin";
</script>

<template>
	<div
		class="row mx-5 mt-5 d-flex flex-xl-row flex-column justify-content-xl-start justify-content-center"
	>
		<h2
			class="fast-actions-title text-center"
			:class="theme ? 'title-dark-theme' : 'title-light-theme'"
		>
			AÇÕES RÁPIDAS
		</h2>
		<div class="row mx-auto w-75 pl-xl-5">
			<div
				class="col-xl-4 d-flex justify-content-xl-start justify-content-center mt-xl-0 mt-3"
			>
				<CreateNewBtn
					:theme="theme"
					text="Adicionar Atividade"
					type="ActivitiesCreate"
				/>
			</div>
			<div
				class="col-xl-4 d-flex justify-content-xl-start justify-content-center mt-xl-0 mt-3"
			>
				<CreateNewBtn
					:theme="theme"
					text="Adicionar Notícia"
					type="NewsCreate"
					:disable="!isUserAdmin"
				/>
			</div>
			<div
				class="col-xl-4 d-flex justify-content-xl-start justify-content-center mt-xl-0 mt-3"
				:disable="!isUserAdmin"
			>
				<CreateNewBtn
					:theme="theme"
					text="Menu Admin"
					type="AdminMenu"
					:disable="!isUserAdmin"
				/>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;

.fast-actions-title {
	font-family: "Panton", sans-serif;
	font-size: 1.5rem;
	font-weight: 500;
	margin-top: 1px;
}

.title-light-theme {
	color: $primary-color;
}

.title-dark-theme {
	color: $secondary-color;
}
</style>
