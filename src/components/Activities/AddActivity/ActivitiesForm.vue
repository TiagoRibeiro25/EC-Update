<script setup>
import ImgSlider from "@/components/CreateItemImgs.vue";
import TextFormInput from "@/components/Activities/AddActivity/TextFormInput.vue";
import ComplexityFormInput from "@/components/Activities/AddActivity/ComplexityFormInput.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({ theme: { type: Boolean, required: true } });
const theme = ref(props.theme);

const router = useRouter();
const images = ref([]);

const title = ref("");
const diagnostic = ref("");
const objective = ref("");
const participants = ref("");
const meta = ref("");
const evaluationIndicator = ref("");
const resources = ref("");
const evaluationMethod = ref("");
const complexity = ref(0);

const loading = ref(false);
</script>

<template>
	<div>
		<ImgSlider :images="images" />
		<form
			class="d-flex flex-column justify-content-center align-items-center mt-5 mb-5 mx-5"
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
					<div class="form-group">
						<ComplexityFormInput :theme="theme" @update:model="complexity = $event" />
					</div>
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
</style>
