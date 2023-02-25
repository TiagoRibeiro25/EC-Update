<script setup>
import Header from "@/components/Manage/Header.vue";
import DestinationInput from "@/components/Manage/ContactMembers/DestinationInput.vue";
import MessageInput from "@/components/Manage/ContactMembers/MessageInput.vue";
import { useUsersStore } from "@/stores/users";
import { ref } from "vue";

const props = defineProps({ theme: { type: Boolean, required: true } });

const theme = props.theme;
const userLogged = useUsersStore().getUserLogged();

const destination = ref("all");
const message = ref("");

const verifyMessage = () => {
	const regex = /[a-zA-Z]/;
	return regex.test(message.value);
};

const contactMembers = () => {
	const data = {
		source: userLogged.email,
		destination: destination.value,
		message: message.value,
	};

	console.table(data);
};
</script>

<template>
	<div class="row mx-5 mt-5">
		<Header
			title="CONTACTAR MEMBROS"
			description="entre em contacto com outros membros do conselho"
			:theme="theme"
		/>

		<DestinationInput :theme="theme" @update:destination="destination = $event" />
		<MessageInput :theme="theme" @update:message="message = $event" />

		<div class="row w-100 mx-auto mt-4 justify-content-end">
			<b-button
				class="send-btn"
				:class="theme ? 'send-btn-dark-mode' : 'send-btn-light-mode'"
				:disabled="!verifyMessage()"
				@click="contactMembers"
			>
				Enviar
			</b-button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #e4f0e8;
$tertiary-color: #ffffff;
$fourth-color: #18516f;
$fifth-color: #aedcc0;

.send-btn {
	font-family: "Panton", sans-serif;
	font-size: 1.1rem;
	font-weight: 400;
	border-radius: 0.6rem;
	padding: 0.2rem 5rem;
	outline: transparent;
}

.send-btn-dark-mode {
	background-color: $tertiary-color;
	color: $primary-color;

	&:hover {
		background-color: $fourth-color;
		color: $tertiary-color;
	}
}

.send-btn-light-mode {
	background-color: $primary-color;
	color: $tertiary-color;

	&:hover {
		background-color: $fifth-color;
		color: $tertiary-color;
	}
}
</style>
