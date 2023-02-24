<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(["update:model"]);
const props = defineProps({
	theme: { type: Boolean, required: true },
	themes: { type: Array, required: true },
});

const theme = props.theme;
const themes = props.themes.map((theme) => ({ value: theme.id, text: theme.name }));
themes.unshift({ value: null, text: "Tema" });

const themeSelected = ref(null);

watch(themeSelected, (value) => {
	emit("update:model", value);
});
</script>

<template>
	<div class="w-100">
		<b-form-select
			class="theme-picker"
			:class="theme ? 'dark-theme-theme-picker' : 'light-theme-theme-picker'"
			v-model="themeSelected"
			:options="themes"
		></b-form-select>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #3fc380;
$fourth-color: #ffffff;
$fifth-color: #18516f;

.theme-picker {
	font-family: "Panton", sans-serif;
	font-size: 1.25rem;
	margin-top: 0.55rem;
	border: 2px solid $tertiary-color;
	border-radius: 0.6rem;
	background-color: transparent !important;
	outline: transparent;
}

.dark-theme-theme-picker {
	color: $secondary-color;
	transition: all 0.3s ease-in-out;

	&:focus {
		box-shadow: none;
		border-color: $fourth-color;
		color: $fourth-color;
	}
}

.light-theme-theme-picker {
	color: $primary-color;
	transition: all 0.3s ease-in-out;

	&:focus {
		box-shadow: none;
		border-color: $fifth-color;
		color: $fifth-color;
	}
}
</style>
