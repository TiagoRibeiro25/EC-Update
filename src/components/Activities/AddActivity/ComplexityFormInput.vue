<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(["update:model"]);
const props = defineProps({ theme: { type: Boolean, required: true } });

const theme = props.theme;
const complexity = ref(0);

watch(complexity, (newVal) => emit("update:model", newVal));
</script>

<template>
	<div>
		<b class="mr-1 info-label" :class="theme ? 'info-dark-theme' : 'info-light-theme'">
			Complexidade
		</b>
		<b-form-rating
			class="complexity-info border-0"
			:class="theme ? 'complexity-dark-theme' : 'complexity-light-theme'"
			inline
			v-model="complexity"
		></b-form-rating>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #3fc380;
$fourth-color: #ffffff;

.info-label {
	font-family: "Panton", sans-serif;
	font-size: 1.5rem;
	font-weight: 600;
}

.complexity-info {
	font-size: 1.3rem;
	transform: translateY(2px);
	background-color: transparent;
}

.info-light-theme,
.complexity-light-theme {
	color: $primary-color;
}

.info-dark-theme {
	color: $tertiary-color;
}

.complexity-dark-theme {
	color: $secondary-color;

	&:hover {
		color: $fourth-color;
	}
}
</style>
