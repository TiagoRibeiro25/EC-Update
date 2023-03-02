<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(["update:message"]);
const props = defineProps({ theme: { type: Boolean, required: true } });

const theme = props.theme;
const message = ref("");

watch(message, (value) => emit("update:message", value));
</script>

<template>
	<div class="row w-100 mx-auto mt-4">
		<b-form-textarea
			class="message-input py-2 px-3"
			:class="theme ? 'message-dark-mode' : 'message-light-mode'"
			v-model="message"
			placeholder="Escreva aqui a sua mensagem..."
			rows="4"
			max-rows="8"
		></b-form-textarea>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #ffffff;
$tertiary-color: #18516f;
$fourth-color: #aedcc0;

.message-input {
	font-family: "Panton", sans-serif;
	font-size: 1.1rem;
	font-weight: 400;

	background-color: transparent;
	outline: transparent;
	border: 2px solid $fourth-color;
	border-radius: 0.6rem;
	overflow-y: auto !important;
}

.message-dark-mode {
	color: $fourth-color;

	&:focus {
		border: 2px solid $secondary-color;
		outline: transparent;
		box-shadow: none;
		color: $secondary-color;
	}
}

.message-light-mode {
	color: $primary-color;

	&:focus {
		border: 2px solid $tertiary-color;
		outline: transparent;
		box-shadow: none;
	}
}
</style>
