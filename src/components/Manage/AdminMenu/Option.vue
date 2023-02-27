<script setup>
import { ref, watchEffect } from "vue";

const emit = defineEmits(["changeOption"]);
const props = defineProps({
	theme: { type: Boolean, required: true },
	selected: { type: Boolean, required: true },
	text: { type: String, required: true },
});

const theme = props.theme;
const selected = ref();
const text = props.text;

const changeOption = () => emit("changeOption");

watchEffect(() => {
	selected.value = props.selected;
}, [props.selected]);
</script>

<template>
	<div class="ml-3">
		<span
			class="option"
			:class="{
				selected: selected,
				'option-dark-theme': theme,
				'option-light-theme': !theme,
			}"
			@click="changeOption()"
		>
			{{ text }}
		</span>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #18516f;
$tertiary-color: #aedcc0;

.option {
	font-family: "Panton", sans-serif;
	font-size: 1.5rem;
	font-weight: 600;
	cursor: pointer;
	opacity: 0.5;
}

.selected {
	opacity: 1;
	text-decoration: underline;
	text-underline-offset: 0.2rem;
	text-decoration-thickness: 0.2rem;
}

.option-light-theme {
	color: $primary-color;
}

.option-dark-theme {
	color: $tertiary-color;
}
</style>
