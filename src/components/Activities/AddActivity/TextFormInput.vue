<script setup>
import { ref } from "vue";

const emit = defineEmits(["update:model"]);
const props = defineProps({
	theme: { type: Boolean, required: true },
	placeholder: { type: String, required: true },
	model: { type: String, required: true },
});

const theme = props.theme;
const placeholder = props.placeholder;
const model = ref(props.model);

const updateModel = (value) => emit("update:model", value);
</script>

<template>
	<div>
		<textarea
			class="form-control"
			:class="theme ? 'dark-theme-input' : 'light-theme-input'"
			:placeholder="placeholder"
			rows="5"
			v-model="model"
			@input="updateModel(model)"
			maxlength="250"
		></textarea>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #3fc380;
$fourth-color: #ffffff;
$fifth-color: #18516f;

textarea {
	font-family: "Panton", sans-serif;
	font-size: 1.2rem;
	font-weight: 400;
	background-color: transparent;
	border-radius: 0.6rem;
	max-height: 15rem;
}

.light-theme-input {
	border: 2px solid $tertiary-color;
	color: $primary-color;

	&:focus {
		outline: transparent;
		box-shadow: none;
		border-color: $fifth-color;
		background-color: transparent;
	}
}

.dark-theme-input {
	border: 2px solid $tertiary-color;
	color: $secondary-color;

	&:focus {
		background-color: transparent;
		outline: transparent;
		box-shadow: none;
		border-color: $fourth-color;
		color: $fourth-color;
	}
}
</style>
