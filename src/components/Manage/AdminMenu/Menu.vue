<script setup>
import Option from "./Option.vue";
import UsersMenu from "./Users/UsersMenu.vue";
import SchoolsMenu from "./Schools/SchoolsMenu.vue";
import ActivitiesMenu from "./Activities/ActivitiesMenu.vue";
import MeetingsMenu from "./Meetings/MeetingsMenu.vue";
import { ref } from "vue";

const props = defineProps({ theme: { type: Boolean, required: true } });

const options = ref([
	{ name: "Utilizadores", active: true },
	{ name: "Escolas", active: false },
	{ name: "Atividades", active: false },
	{ name: "Reuniões", active: false },
]);

const changeOption = (index) => {
	options.value.forEach((option, i) => (option.active = i === index));
};
</script>

<template>
	<div class="row mx-5 mt-5">
		<Option
			v-for="(option, index) in options"
			:key="index"
			:theme="theme"
			:selected="option.active"
			:text="option.name"
			@changeOption="changeOption(index)"
		/>
	</div>
	<div class="row mx-5">
		<div
			class="menu-container w-100 shadow pb-4"
			:class="theme ? 'menu-container-dark-theme' : 'menu-container-light-theme'"
		>
			<UsersMenu v-if="options[0].active" :theme="theme" />
			<SchoolsMenu v-if="options[1].active" :theme="theme" />
			<ActivitiesMenu v-if="options[2].active" :theme="theme" />
			<MeetingsMenu v-if="options[3].active" :theme="theme" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;

.menu-container {
	min-height: 607px;
	border-radius: 1rem;
	margin-top: -3px;
}

.menu-container-light-theme {
	background-color: $secondary-color;
}

.menu-container-dark-theme {
	background-color: $primary-color;
}
</style>
