<script setup>
import Option from "./Option.vue";
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
			class="menu-container w-100 shadow"
			:class="theme ? 'menu-container-dark-theme' : 'menu-container-light-theme'"
		></div>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #e4f0e8;
$tertiary-color: #ffffff;
$fourth-color: #18516f;
$fifth-color: #aedcc0;

.menu-container {
	height: 600px;
	border-radius: 0.6rem;
	margin-top: -3px;
}

.menu-container-light-theme {
	background-color: $fifth-color;
}

.menu-container-dark-theme {
	background-color: $primary-color;
}
</style>
