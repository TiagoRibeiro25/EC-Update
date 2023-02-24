<script setup>
import { convertDateToNumber, convertDateToString } from "@/hooks/convertDate.js";
import { ref, watch } from "vue";

const emit = defineEmits(["update:model"]);
const props = defineProps({ text: { type: String, required: true } });

const text = props.text;
const date = ref("");
const id = crypto.randomUUID();

// Current Date
const minDate = new Date().toISOString().split("T")[0];
// Current Date + 1 year
const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
	.toISOString()
	.split("T")[0];

watch(date, (newVal) => {
	emit("update:model", convertDateToNumber(new Date(newVal)));
});
</script>

<template>
	<div class="d-flex flex-row justify-content-between align-items-center w-100 px-3">
		<b-form-datepicker
			:id="id"
			v-model="date"
			class="date-picker w-100"
			:placeholder="text"
			:min="minDate"
			:max="maxDate"
		></b-form-datepicker>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #3fc380;

.date-picker {
	font-family: "Panton", sans-serif;
	font-size: 1.2rem;
	font-weight: 400;
	border-radius: 0.6rem;
	border: 2px solid $primary-color;
	background-color: transparent;
	outline: transparent;
}
</style>
