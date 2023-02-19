<script setup>
import { ref, computed } from "vue";
import { validateEmail } from "@/hooks/validateEmail.js";
import { useUsersStore } from "@/stores/users";

const loggedUser = useUsersStore().getUserLogged();

const email = ref(loggedUser.email);
const password = ref("");
const confirmPassword = ref("");
const internalNumber = ref(loggedUser.internalId ? loggedUser.internalId : "");
const course = ref(loggedUser.course ? loggedUser.course : "");
const year = ref(loggedUser.year ? loggedUser.year : "");

const loading = ref(false);

const emailValidation = computed(() => {
	if (email.value.length === 0) return;
	if (!validateEmail(email.value)) return false;
	if (useUsersStore().doesEmailExist(email.value)) {
		// If the email is the same as the logged user's email, it's valid
		// Otherwise, it's not valid because another user already has that email
		return email.value === loggedUser.email;
	}
	return true;
});

const passwordValidation = computed(() => {
	if (password.value.length === 0) return;
	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
	return regex.test(password.value);
});

const confirmPasswordValidation = computed(() => {
	if (password.value.length === 0) return;
	return confirmPassword.value === password.value;
});

const validateInternalNumber = computed(() => {
	if (internalNumber.value.length === 0) return false;
	if (isNaN(internalNumber.value)) return false;
	return internalNumber.value >= 0;
});

const validateCourseName = computed(() => {
	if (course.value.length === 0) return false;
	const regex = /^[a-zA-Z]+$/;
	return regex.test(course.value);
});

const validateCourseYear = computed(() => {
	if (year.value.length === 0) return false;
	if (isNaN(year.value)) return false;
	return year.value > 0;
});

const validateForm = computed(() => {
	let isEmailValid = emailValidation.value;
	let isPasswordValid = passwordValidation.value;
	let isConfirmPasswordValid = confirmPasswordValidation.value;

	if (internalNumber.value === "") {
		return isEmailValid && isPasswordValid && isConfirmPasswordValid;
	}

	let isInternalNumberValid = validateInternalNumber.value;
	if (course.value === "") {
		return (
			isEmailValid && isPasswordValid && isConfirmPasswordValid && isInternalNumberValid
		);
	}

	let isCourseNameValid = validateCourseName.value;
	if (year.value === "") {
		return (
			isEmailValid &&
			isPasswordValid &&
			isConfirmPasswordValid &&
			isInternalNumberValid &&
			isCourseNameValid
		);
	}

	let isCourseYearValid = validateCourseYear.value;
	return (
		isEmailValid &&
		isPasswordValid &&
		isConfirmPasswordValid &&
		isInternalNumberValid &&
		isCourseNameValid &&
		isCourseYearValid
	);
});

const changeInfo = () => {
	const newUser = {
		email: email.value,
		password: password.value,
		internalId: internalNumber.value ? internalNumber.value : null,
		course: null,
		year: null,
	};

	if (internalNumber.value !== "" && course.value !== "") {
		newUser.course = course.value;
		if (year.value !== "") newUser.year = year.value;
	}

	useUsersStore().changeUserInfo(
		newUser.email,
		newUser.password,
		newUser.internalId,
		newUser.course,
		newUser.year
	);

	loading.value = true;

	setTimeout(() => {
		location.reload();
	}, 300);
};
</script>

<template>
	<b-modal size="lg" hide-footer>
		<div class="container">
			<h4 class="modal-title text-center mt-1">Alterar dados da conta</h4>

			<form class="form mt-5 px-5" @submit.prevent="changeInfo">
				<!-- Email -->
				<div class="form-group">
					<b-form-input
						type="email"
						class="form-input"
						v-model="email"
						:state="emailValidation"
						placeholder="Email"
					></b-form-input>
					<b-form-invalid-feedback :state="emailValidation">
						Email inválido ou já existe um utilizador com este email
					</b-form-invalid-feedback>
					<b-form-valid-feedback :state="emailValidation">
						Email válido
					</b-form-valid-feedback>
				</div>

				<!-- Password -->
				<div class="form-group mt-5">
					<b-form-input
						class="form-input"
						type="password"
						v-model="password"
						:state="passwordValidation"
						placeholder="Password"
					></b-form-input>
					<b-form-invalid-feedback :state="passwordValidation">
						Password inválida (min. 8 caracteres, 1 letra maiúscula, 1 letra minúscula
						e 1 número. Símbolos não são permitidos)
					</b-form-invalid-feedback>
					<b-form-valid-feedback :state="passwordValidation">
						Password válida
					</b-form-valid-feedback>
				</div>

				<!-- Confirm Password -->
				<div class="form-group">
					<b-form-input
						class="form-input"
						type="password"
						v-model="confirmPassword"
						:state="confirmPasswordValidation"
						placeholder="Confirme Password"
					></b-form-input>
					<b-form-invalid-feedback :state="confirmPasswordValidation">
						Password não corresponde
					</b-form-invalid-feedback>
					<b-form-valid-feedback :state="confirmPasswordValidation">
						Password corresponde
					</b-form-valid-feedback>
				</div>

				<!-- Internal Number -->
				<div class="form-group mt-5">
					<b-form-input
						class="form-input"
						type="number"
						placeholder="Número Interno do Aluno (opcional)"
						v-model="internalNumber"
						min="0"
					></b-form-input>
				</div>

				<!-- Course -->
				<div class="form-group">
					<b-form-input
						class="form-input"
						type="text"
						placeholder="Curso (opcional)"
						v-model="course"
						:disabled="!validateInternalNumber"
					></b-form-input>
				</div>

				<!-- Course Year -->
				<div class="form-group mb-3">
					<b-form-input
						class="form-input"
						type="number"
						min="0"
						placeholder="Ano do Curso (opcional)"
						v-model="year"
						:disabled="!validateCourseName"
					></b-form-input>
				</div>

				<div v-if="loading" class="w-100 text-center mb-3">
					<b-spinner variant="success" label="Carregando..."></b-spinner>
				</div>

				<!-- Submit Button -->
				<div class="form-group" :class="loading ? 'mt-2' : 'mt-5'">
					<b-button
						type="submit"
						class="btn btn-block submit-btn"
						:disabled="!validateForm || loading"
					>
						Alterar
					</b-button>
				</div>
			</form>
		</div>
	</b-modal>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #ffffff;
$tertiary-color: #18516f;

.modal-title {
	font-family: "Panton", sans-serif;
	font-size: 1.5rem;
	font-weight: 600;
	color: #343e3d;
}

.submit-btn {
	font-family: "Panton", sans-serif;
	font-size: 1.2rem;
	font-weight: 600;
	color: $secondary-color;
	background-color: $primary-color;
	border: none;

	&:hover {
		background-color: $tertiary-color;
	}
}
</style>
