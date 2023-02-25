<script setup>
import { useUsersStore } from "@/stores/users";
import { ref, watch } from "vue";

const emit = defineEmits(["update:destination"]);
const props = defineProps({ theme: { type: Boolean, required: true } });

const theme = props.theme;
const loggedUser = useUsersStore().getUserLogged();
const contacts = useUsersStore().getUsersBySchool(loggedUser.schoolId);
const options = [
	{ value: "all", text: "Todos os Membros" },
	...contacts.map((contact) => {
		return { value: contact.id, text: `${contact.name} - ${contact.email}` };
	}),
];

const selected = ref("all");

watch(selected, (value) => emit("update:destination", value));
</script>

<template>
	<div class="row mt-4 w-100">
		<div class="col-12">
			<b-form-select
				class="mt-3 destination-select"
				:class="theme ? 'destination-dark-mode' : 'destination-light-mode'"
				v-model="selected"
				:options="options"
			></b-form-select>
		</div>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #ffffff;
$tertiary-color: #18516f;
$fourth-color: #aedcc0;

.destination-select {
	font-family: "Panton", sans-serif;
	font-size: 1.1rem;
	font-weight: 400;

	background-color: transparent;
	outline: transparent;
	border: 2px solid $fourth-color;
	border-radius: 0.6rem;
	width: auto;
}

.destination-dark-mode {
	color: $fourth-color;

	&:focus {
		border: 2px solid $secondary-color;
		outline: transparent;
		box-shadow: none;
		color: $tertiary-color;
	}
}

.destination-light-mode {
	color: $primary-color;

	&:focus {
		border: 2px solid $tertiary-color;
		outline: transparent;
		box-shadow: none;
	}
}
</style>
