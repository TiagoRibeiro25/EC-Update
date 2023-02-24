<script setup>
import Header from "@/components/Header.vue";
import SearchBar from "@/components/SearchBar.vue";
import CreateNewBtn from "@/components/CreateNewBtn.vue";
import ActivitiesList from "@/components/Activities/ActivitiesList.vue";
import { useUsersStore } from "@/stores/users";
import { useSchoolsStore } from "@/stores/schools";
import { ref } from "vue";

const theme = useUsersStore().isDarkMode();
const isUserLogged = useUsersStore().isUserLogged();
const isVerifiedUser = isUserLogged
	? useUsersStore().getUserLogged().role !== "unsigned"
	: false;

const userSchool = isUserLogged
	? useSchoolsStore().getSchoolById(useUsersStore().getUserLogged().schoolId)
	: null;

const options = isUserLogged
	? [
			{ value: "all", text: "Todas as atividades" },
			{ value: userSchool.id, text: `Atividades da ${userSchool.name}` },
	  ]
	: null;

const selected = ref(options[0].value);
</script>

<template>
	<div
		class="wrapper pt-3"
		style="overflow: hidden"
		:class="{ 'background-light': !theme, 'background-dark': theme }"
	>
		<div class="row">
			<div class="col-9 d-flex align-items-center mt-4 pt-2">
				<SearchBar :theme="theme" page="News" />
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<Header title="ATIVIDADES" :theme="theme" />
			</div>
		</div>
		<div class="row content mx-auto px-5 mt-3">
			<div class="col-9 px-0 mb-2" :class="{ 'd-none': !isVerifiedUser }">
				<CreateNewBtn
					:theme="theme"
					type="ActivitiesCreate"
					text="Adicionar Atividade"
				/>
			</div>
			<!-- if !isVerifiedUser align to the left -->
			<div
				v-if="isUserLogged"
				class="col-3 px-0 mb-2 d-flex justify-content-end align-items-center"
				:class="{ 'col-12': !isVerifiedUser }"
			>
				<b-form-select
					class="filter-select"
					:class="theme ? 'filter-select-dark' : 'filter-select-light'"
					v-model="selected"
					:options="options"
					size="sm"
				></b-form-select>
			</div>
			<div class="col-12 px-0 mt-4">
				<ActivitiesList
					:theme="theme"
					:isVerifiedUser="isVerifiedUser"
					:schoolFilter="selected"
				/>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
$primary-color: #f8f9fa;
$secondary-color: #333333;

.background-light {
	background-color: $primary-color;
}

.background-dark {
	background-color: $secondary-color;
}

.content {
	max-width: 1400px;
}

.filter-select {
	max-width: 200px;
	background-color: transparent;
}

.filter-select-light {
	border: 1px solid $secondary-color;
	color: $secondary-color;
}

.filter-select-dark {
	border: 1px solid $primary-color;
	color: $primary-color;

	& option {
		background-color: $secondary-color;
		color: $primary-color;
	}
}
</style>
