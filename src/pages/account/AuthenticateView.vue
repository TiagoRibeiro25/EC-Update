<script setup>
import LogInForm from "@/components/Authentication/LogInForm.vue";
import RegisterForm from "@/components/Authentication/RegisterForm.vue";
import { useUsersStore } from "@/stores/users";
import { ref } from "vue";
const theme = useUsersStore().isDarkMode();

const showLogIn = ref(true);
const toggleLogIn = () => (showLogIn.value = !showLogIn.value);
</script>

<template>
	<div class="row">
		<div
			class="column col-6 d-none d-xl-inline-block"
			:class="{ 'auth-background-light': !theme, 'auth-background-dark': theme }"
		>
			<img
				v-if="!theme"
				src="@/assets/images/auth_illustration-light-theme.png"
				alt="Ecoly-Registo"
			/>
			<img
				v-else
				src="@/assets/images/auth_illustration-dark-theme.png"
				alt="Ecoly-Registo"
			/>
		</div>
		<div
			class="column col-xl-6 col-12 d-flex flex-column justify-content-center align-items-center"
			:class="{ 'auth-background-light': !theme, 'auth-background-dark': theme }"
		>
			<LogInForm v-if="showLogIn" :theme="theme" @changeToRegister="toggleLogIn" />
			<RegisterForm v-else :theme="theme" @changeToLogin="toggleLogIn" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #f5f5f5;
$secondary-color: #333333;

.column {
	min-height: 100vh;
	min-height: 100dvh;
	overflow-x: hidden;
}

.column + .column {
	overflow-y: scroll;
}

.column:first-child {
	& img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		margin-left: -1px;
	}
}

.auth-background-light {
	background-color: $primary-color;
}

.auth-background-dark {
	background-color: $secondary-color;
}
</style>
