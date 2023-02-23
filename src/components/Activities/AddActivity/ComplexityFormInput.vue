<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(["update:model"]);
const props = defineProps({
	theme: { type: Boolean, required: true },
});

const theme = props.theme;
const complexity = ref(0);

watch(complexity, (newVal) => emit("update:model", newVal));
</script>

<template>
	<div>
		<b class="mr-5">Complexidade</b>
		<b-form-rating
			class="complexity-info border-0"
			inline
			v-model="complexity"
		></b-form-rating>
	</div>
</template>

<style lang="scss" scoped></style>
