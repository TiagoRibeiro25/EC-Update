<script setup>
import { ref, computed } from "vue";
import { useUsersStore } from "@/stores/users";
import { useSchoolsStore } from "@/stores/schools";
import { validateEmail } from "@/hooks/validateEmail";

const props = defineProps({
	theme: { type: Boolean, required: true },
});
const theme = props.theme;

const schools = ref(useSchoolsStore().getSchools());
schools.value = schools.value.map((school) => {
	return { value: school.id, text: school.name };
});
schools.value.unshift({ value: null, text: "Escola" });

const userName = ref("");
const email = ref("");
const password = ref("");
const school = ref(schools.value[0].value);
const internalNumber = ref("");
const course = ref("");
const year = ref("");

const loading = ref(false);
const quitRegister = ref(false);
const emit = defineEmits(["changeToLogin"]);

const emailValidation = computed(() => {
	if (email.value.length === 0) return;
	if (!validateEmail(email.value)) return false;
	return !useUsersStore().doesEmailExist(email.value);
});

const passwordValidation = computed(() => {
	if (password.value.length === 0) return;
	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
	return regex.test(password.value);
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
	let isUserNameValid = userName.value.length > 0;
	let isEmailValid = emailValidation.value;
	let isPasswordValid = passwordValidation.value;
	let isSchoolValid = school.value !== schools.value[0].value;

	if (internalNumber.value === "") {
		return isUserNameValid && isEmailValid && isPasswordValid && isSchoolValid;
	}
	// check if internal number is valid
	let isInternalNumberValid = validateInternalNumber.value;
	if (course.value === "") {
		return (
			isUserNameValid &&
			isEmailValid &&
			isPasswordValid &&
			isSchoolValid &&
			isInternalNumberValid
		);
	}
	// check if course name is valid
	let isCourseNameValid = validateCourseName.value;
	if (year.value === "") {
		return (
			isUserNameValid &&
			isEmailValid &&
			isPasswordValid &&
			isSchoolValid &&
			isInternalNumberValid &&
			isCourseNameValid
		);
	}
	// check if course year is valid
	let isCourseYearValid = validateCourseYear.value;
	return (
		isUserNameValid &&
		isEmailValid &&
		isPasswordValid &&
		isSchoolValid &&
		isInternalNumberValid &&
		isCourseNameValid &&
		isCourseYearValid
	);
});

const resetForm = () => {
	userName.value = "";
	email.value = "";
	password.value = "";
	school.value = schools.value[0].value;
	internalNumber.value = "";
	course.value = "";
	year.value = "";
};

const createNewAccount = () => {
	if (!validateForm.value) return;
	loading.value = true;

	let newUser = {
		name: userName.value,
		email: email.value,
		password: password.value,
		schoolId: school.value,
		internalId: null,
		course: null,
		year: null,
	};

	if (internalNumber.value !== "") {
		newUser.internalId = internalNumber.value;
		if (course.value !== "") {
			newUser.course = course.value;
			if (year.value !== "") {
				newUser.year = year.value;
			}
		}
	}

	useUsersStore().createNewUser(newUser);
	useUsersStore().logIn(email.value, password.value);
	resetForm();
	setTimeout(() => {
		window.location.reload();
	}, 500);
};

const changeToLogin = () => {
	quitRegister.value = true;
	setTimeout(() => {
		emit("changeToLogin");
	}, 500);
};
</script>

<template>
	<b-form
		class="form w-75 p-4"
		:class="{ 'quit-register': quitRegister }"
		@submit.prevent="createNewAccount"
	>
		<h1 class="mb-3 text-center" :class="!theme ? 'title-light' : 'title-dark'">
			Crie a sua conta e torne-se num membro
		</h1>
		<!-- Name -->
		<div class="form-group">
			<b-form-input
				class="form-input"
				:class="
					(email.length === 0 ? 'form-input' : '',
					!theme ? 'input-light' : 'input-dark')
				"
				type="text"
				placeholder="Nome"
				v-model="userName"
			></b-form-input>
		</div>
		<!-- Email -->
		<div class="form-group">
			<b-form-input
				type="email"
				class="form-input"
				:class="
					(email.length === 0 ? 'form-input' : '',
					(email.length === 0 ? 'form-input' : '',
					!theme ? 'input-light' : 'input-dark'))
				"
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
		<div class="form-group">
			<b-form-input
				class="form-input"
				:class="
					(email.length === 0 ? 'form-input' : '',
					!theme ? 'input-light' : 'input-dark')
				"
				type="password"
				v-model="password"
				:state="passwordValidation"
				placeholder="Password"
			></b-form-input>
			<b-form-invalid-feedback :state="passwordValidation">
				Password inválida (min. 8 caracteres, 1 letra maiúscula, 1 letra minúscula e 1
				número. Símbolos não são permitidos)
			</b-form-invalid-feedback>
			<b-form-valid-feedback :state="passwordValidation">
				Password válida
			</b-form-valid-feedback>
		</div>
		<!-- School -->
		<div class="form-group">
			<b-form-select
				class="form-input"
				:class="!theme ? 'input-light' : 'input-dark'"
				v-model="school"
				:options="schools"
			></b-form-select>
		</div>
		<!-- Internal Id -->
		<div class="form-group">
			<b-form-input
				class="form-input"
				:class="!theme ? 'input-light' : 'input-dark'"
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
				:class="!theme ? 'input-light' : 'input-dark'"
				type="text"
				placeholder="Curso (opcional)"
				v-model="course"
				:disabled="!validateInternalNumber"
			></b-form-input>
		</div>
		<!-- Course Year -->
		<div class="form-group">
			<b-form-input
				class="form-input"
				:class="!theme ? 'input-light' : 'input-dark'"
				type="number"
				min="0"
				placeholder="Ano do Curso (opcional)"
				v-model="year"
				:disabled="!validateCourseName"
			></b-form-input>
		</div>
		<!-- Switch to LogIn View -->
		<div class="form-group text-center">
			<span :class="!theme ? 'title-light' : 'title-dark'" @click="changeToLogin">
				Já tens conta? Entre aqui!
			</span>
		</div>
		<!-- Loading Icon -->
		<div v-if="loading" class="text-center my-3">
			<b-spinner variant="success" label="Carregando..."></b-spinner>
		</div>
		<!-- Create Account Button -->
		<div class="form-group text-center">
			<b-button
				type="submit"
				class="submit-btn"
				:class="!theme ? 'btn-light' : 'btn-dark'"
				:disabled="!validateForm"
			>
				Criar Conta
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
$sixth-color: #272e2d;

.form {
	animation: slide-from-right 0.5s ease-in-out forwards;
}

h1 {
	font-family: "Panton", sans-serif;
	font-weight: 600;
	font-size: 1.1rem;
	text-transform: uppercase;
}

span {
	font-family: "Panton", sans-serif;
	font-weight: 500;
	font-size: 1rem;
	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}
}

.form-input {
	border: 2px solid $fifth-color;
	border-radius: 10px;
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

	&:disabled {
		background-color: $secondary-color;
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

	&:disabled {
		background-color: $sixth-color;
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

.quit-register {
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
