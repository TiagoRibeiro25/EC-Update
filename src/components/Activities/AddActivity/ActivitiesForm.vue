<script setup>
import ImgSlider from "@/components/CreateItemImgs.vue";
import TextFormInput from "@/components/Activities/AddActivity/TextFormInput.vue";
import ComplexityFormInput from "@/components/Activities/AddActivity/ComplexityFormInput.vue";
import DateFormInput from "@/components/Activities/AddActivity/DateFormInput.vue";
import ThemeInput from "@/components/Activities/AddActivity/ThemeInput.vue";
import { useThemesStore } from "@/stores/themes";
import { useActivitiesStore } from "@/stores/activities";
import { useUsersStore } from "@/stores/users";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({ theme: { type: Boolean, required: true } });
const theme = ref(props.theme);

const router = useRouter();

const images = ref([]);
const themes = useThemesStore().getActiveThemes();

const title = ref("");
const diagnostic = ref("");
const objective = ref("");
const participants = ref("");
const meta = ref("");
const evaluationIndicator = ref("");
const resources = ref("");
const evaluationMethod = ref("");
const complexity = ref(0);
const initialDate = ref("");
const finalDate = ref("");
const themeSelected = ref(null);

const loading = ref(false);

const isFormValid = computed(() => {
	if (images.value.length === 0) return false;
	if (title.value === "") return false;
	if (diagnostic.value === "") return false;
	if (objective.value === "") return false;
	if (participants.value === "") return false;
	if (meta.value === "") return false;
	if (evaluationIndicator.value === "") return false;
	if (resources.value === "") return false;
	if (evaluationMethod.value === "") return false;
	if (complexity.value === 0) return false;
	if (initialDate.value === "") return false;
	if (finalDate.value === "") return false;
	if (themeSelected.value === null) return false;
	return new Date(finalDate.value) >= new Date(initialDate.value);
});

const createActivity = () => {
	loading.value = true;

	const userLogged = useUsersStore().getUserLogged();
	const activity = {
		title: title.value,
		diagnostic: diagnostic.value,
		objective: objective.value,
		participants: participants.value,
		meta: meta.value,
		evaluationIndicator: evaluationIndicator.value,
		resources: resources.value,
		evaluationMethod: evaluationMethod.value,
		complexity: complexity.value,
		initialDate: initialDate.value,
		finalDate: finalDate.value,
		themeId: themeSelected.value,
		images: images.value,
		creatorId: userLogged.id,
		schoolId: userLogged.schoolId,
	};

	useActivitiesStore().addActivity(activity);
	useUsersStore().increaseActivitiesCreated();

	console.log(userLogged.activitiesCreated);

	// unlock "novato das atividades" or "Veterano das atividades" badge
	if (userLogged.activitiesCreated === 1) useUsersStore().unlockBadge("0");
	else if (userLogged.activitiesCreated === 10) useUsersStore().unlockBadge("1");

	setTimeout(() => {
		router.push({ name: "Activities" });
	}, 500);
};
</script>

<template>
	<div>
		<ImgSlider :images="images" />
		<form
			class="d-flex flex-column justify-content-center align-items-center mt-5 mb-5 mx-5"
			@submit.prevent="createActivity"
		>
			<div class="row w-75">
				<!-- Title -->
				<div class="col-lg-6 pl-lg-0">
					<input
						type="text"
						class="form-control title-input"
						:class="theme ? 'dark-theme-title' : 'light-theme-title'"
						placeholder="Título"
						aria-label="Título"
						v-model="title"
					/>
				</div>

				<!-- Diagnostic -->
				<div class="col-lg-6 pr-lg-0 mt-lg-0 mt-5">
					<TextFormInput
						:theme="theme"
						placeholder="Diagnóstico"
						:model="diagnostic"
						@update:model="diagnostic = $event"
					/>
				</div>
			</div>
			<div class="row w-75">
				<!-- Objective -->
				<div class="col-lg-6 pl-lg-0 mt-5">
					<TextFormInput
						:theme="theme"
						placeholder="Objetivo"
						:model="objective"
						@update:model="objective = $event"
					/>
				</div>

				<!-- Participants -->
				<div class="col-lg-6 pr-lg-0 mt-5">
					<TextFormInput
						:theme="theme"
						placeholder="Participantes"
						:model="participants"
						@update:model="participants = $event"
					/>
				</div>
			</div>
			<div class="row w-75">
				<!-- Meta -->
				<div class="col-lg-6 pl-lg-0 mt-5">
					<TextFormInput
						:theme="theme"
						placeholder="Metas"
						:model="meta"
						@update:model="meta = $event"
					/>
				</div>

				<!-- Evaluation Indicator -->
				<div class="col-lg-6 pr-lg-0 mt-5">
					<TextFormInput
						:theme="theme"
						placeholder="Indicadores de Avaliação"
						:model="evaluationIndicator"
						@update:model="evaluationIndicator = $event"
					/>
				</div>
			</div>
			<div class="row w-75">
				<!-- Resources -->
				<div class="col-lg-6 pl-lg-0 mt-5">
					<TextFormInput
						:theme="theme"
						placeholder="Recursos"
						:model="resources"
						@update:model="resources = $event"
					/>
				</div>

				<!-- Evaluation Method -->
				<div class="col-lg-6 pr-lg-0 mt-5">
					<TextFormInput
						:theme="theme"
						placeholder="Instrumentos de Avaliação"
						:model="evaluationMethod"
						@update:model="evaluationMethod = $event"
					/>
				</div>
			</div>
			<div class="row w-75">
				<div
					class="col-lg-6 pl-lg-0 d-lg-block d-flex flex-column justify-content-center align-items-center mt-5"
				>
					<div class="row form-group px-3">
						<ComplexityFormInput :theme="theme" @update:model="complexity = $event" />
					</div>
					<div class="row form-group px-3">
						<ThemeInput
							:theme="theme"
							:themes="themes"
							@update:model="themeSelected = $event"
						/>
					</div>
				</div>
				<div
					class="col-lg-6 pr-lg-0 d-lg-block d-flex flex-column justify-content-center align-items-center mt-5"
				>
					<div class="row">
						<DateFormInput
							text="Data de Início"
							@update:model="initialDate = $event"
						/>
					</div>
					<div class="row mt-4">
						<DateFormInput text="Data de Término" @update:model="finalDate = $event" />
					</div>
				</div>
			</div>
			<div class="row w-75" :class="loading ? 'mt-4' : 'mt-5'">
				<div
					v-if="loading"
					class="col-12 d-flex justify-content-center align-items-center flex-column mb-4"
				>
					<b-spinner variant="success" label="Carregando..."></b-spinner>
				</div>

				<div class="col-12 d-flex flex-column justify-content-center align-items-center">
					<button
						type="submit"
						class="btn submit-btn px-5"
						:class="theme ? 'submit-btn-dark-theme' : 'submit-btn-light-theme'"
						:disabled="!isFormValid"
					>
						Criar Atividade
					</button>
				</div>
			</div>
		</form>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #3fc380;
$fourth-color: #ffffff;
$fifth-color: #18516f;

.title-input {
	font-family: "Panton", sans-serif;
	font-size: 1.2rem;
	font-weight: 400;
	background-color: transparent;
	border-radius: 0.6rem;
	height: 3.5rem;
}

.light-theme-title {
	color: $primary-color;
	border: 2px solid $tertiary-color;

	&:focus {
		outline: transparent;
		box-shadow: none;
		border-color: $fifth-color;
		background-color: transparent;
	}
}

.dark-theme-title {
	border: 2px solid $tertiary-color;
	color: $secondary-color;

	&:focus {
		background-color: transparent;
		outline: transparent;
		box-shadow: none;
		border-color: $fourth-color;
		color: $fourth-color;
	}
}

.submit-btn {
	border-radius: 0.6rem;
	font-family: "Panton", sans-serif;
	font-size: 1.2rem;
	font-weight: 400;
	transition: all 0.3s ease-in-out;
}

.submit-btn-light-theme {
	background-color: $primary-color;
	color: $fourth-color;

	&:hover {
		background-color: $fifth-color;
	}
}

.submit-btn-dark-theme {
	background-color: $fourth-color;
	color: $primary-color;

	&:hover {
		background-color: $fifth-color;
		color: $fourth-color;
	}
}
</style>
