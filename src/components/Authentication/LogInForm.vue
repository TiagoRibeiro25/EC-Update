<script setup>
import { ref, computed } from "vue";
import { useUsersStore } from "@/stores/users";

const props = defineProps({
	theme: { type: Boolean, required: true },
});
const theme = props.theme;

const email = ref("");
const password = ref("");
const passwordValidation = ref(null);
const quitLogin = ref(false);
const emit = defineEmits(["changeToRegister"]);

const emailValidation = computed(() => {
	if (email.value.length === 0) return;
	return useUsersStore().doesEmailExist(email.value);
});

const logIn = () => {
	const result = useUsersStore().logIn(email.value, password.value);
	if (!result) {
		passwordValidation.value = false;
		return;
	}
	passwordValidation.value = true;

	setTimeout(() => {
		window.location.reload();
	}, 1500);
};

const changeToRegister = () => {
	quitLogin.value = true;
	setTimeout(() => {
		emit("changeToRegister");
	}, 300);
};
</script>

<template>
	<b-form
		class="form w-75 p-4"
		@submit.prevent="logIn"
		:class="{ 'quit-login': quitLogin }"
	>
		<h1 class="mb-3 text-center" :class="!theme ? 'title-light' : 'title-dark'">Log In</h1>

		<div class="form-group">
			<b-form-input
				type="email"
				class="form-input"
				:class="!theme ? 'input-light' : 'input-dark'"
				v-model="email"
				:state="emailValidation"
				placeholder="Email"
			></b-form-input>
			<b-form-invalid-feedback :state="emailValidation">
				Não há nenhum utilizador com este email
			</b-form-invalid-feedback>
			<b-form-valid-feedback :state="emailValidation">
				Email válido
			</b-form-valid-feedback>
		</div>
		<div class="form-group">
			<b-form-input
				type="password"
				class="form-input"
				:class="!theme ? 'input-light' : 'input-dark'"
				v-model="password"
				:state="passwordValidation"
				placeholder="Password"
			></b-form-input>
			<b-form-invalid-feedback :state="passwordValidation">
				Password errada
			</b-form-invalid-feedback>
			<b-form-valid-feedback :state="passwordValidation">
				Password válida
			</b-form-valid-feedback>
		</div>
		<div class="form-group text-center">
			<span :class="!theme ? 'title-light' : 'title-dark'" @click="changeToRegister"
				>Não és membro? Crie uma conta aqui</span
			>
		</div>
		<div v-if="passwordValidation" class="text-center my-3">
			<b-spinner variant="success" label="Carregando..."></b-spinner>
		</div>
		<div class="form-group text-center">
			<b-button
				type="submit"
				class="submit-btn"
				:class="!theme ? 'btn-light' : 'btn-dark'"
				:disabled="!emailValidation"
			>
				Entrar
			</b-button>
		</div>
	</b-form>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #e4f0e8;
$tertiary-color: #ffffff;
$fourth-color: #18516f;
$fifth-color: #aedcc0;

.form {
	animation: slide-from-right 0.5s ease-in-out forwards;
}

h1 {
	font-family: "Panton", sans-serif;
	font-weight: 500;
	font-size: 2.2rem;
}

.form-input {
	border: 2px solid $fifth-color;
	border-radius: 10px;
}

span {
	font-family: "Panton", sans-serif;
	font-weight: 500;
	font-size: 1rem;
	color: $primary-color;
	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}
}

.submit-btn {
	border: none;
	border-radius: 10px;
	font-family: "Panton", sans-serif;
	font-weight: 500;
	font-size: 1.2rem;
	padding: 0.2rem 5rem;
	transition: all 0.3s ease-in-out;
}

.title-light {
	color: $primary-color;
}

.title-dark {
	color: $secondary-color;
}

.input-light {
	border-color: $fifth-color;
	color: $primary-color;
	background-color: $tertiary-color;

	&:focus {
		background-color: $tertiary-color;
		border-color: $fifth-color;
	}
}

.input-dark {
	border-color: $fifth-color;
	color: $tertiary-color;
	background-color: $primary-color;

	&:focus {
		background-color: $primary-color;
		border-color: $fifth-color;
		color: $secondary-color;
	}
}

.btn-light {
	background-color: $primary-color;
	color: $tertiary-color;

	&:hover {
		background-color: $fourth-color;
		color: $tertiary-color;
	}
}

.btn-dark {
	background-color: $fifth-color;
	color: $primary-color;

	&:hover {
		background-color: $fourth-color;
		color: $tertiary-color;
	}
}

.quit-login {
	animation: slide-left 0.5s ease-in-out forwards;
}

@keyframes slide-left {
	0% {
		transform: translateX(0);
		opacity: 1;
	}
	100% {
		transform: translateX(-100%);
		opacity: 0;
	}
}

@keyframes slide-from-right {
	0% {
		transform: translateX(100%);
		opacity: 0;
	}

	100% {
		transform: translateX(0);
		opacity: 1;
	}
}
</style>
