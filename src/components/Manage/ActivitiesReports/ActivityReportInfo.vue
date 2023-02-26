<script setup>
const props = defineProps({
	theme: { type: Boolean, required: true },
	activity: { type: Object, required: true },
});

const theme = props.theme;
const activity = props.activity;
</script>

<template>
	<div
		class="row mx-auto px-4"
		:class="theme ? 'activity-report-info-dark-theme' : 'activity-report-info-light-theme'"
	>
		<div class="group w-100">
			<h3>Participantes</h3>
			<p>{{ activity.participants }}</p>
		</div>
		<div class="group w-100">
			<h3>Diagnóstico</h3>
			<p>{{ activity.diagnostic }}</p>
		</div>
		<div class="group w-100">
			<h3>Objetivos</h3>
			<p>{{ activity.objective }}</p>
		</div>
		<div class="group w-100">
			<h3>Metas</h3>
			<p>{{ activity.meta }}</p>
		</div>
		<div class="group w-100">
			<h3>Recursos</h3>
			<p>{{ activity.resources }}</p>
		</div>
		<div class="group w-100 mt-2">
			<h3 class="text-center">AVALIAÇÃO</h3>
			<div class="row mt-3">
				<div class="col-6 pr-4">
					<h3 class="text-left">Indicadores</h3>
					<p class="text-left">
						{{ activity.evaluationIndicator }}
					</p>
				</div>
				<div class="col-6 pl-4">
					<h3 class="text-right">Instrumentos</h3>
					<p class="text-right">
						{{ activity.evaluationMethod }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #e4f0e8;
$tertiary-color: #aedcc0;

.group {
	& h3 {
		font-family: "Panton", sans-serif;
		font-size: 1.5rem;
		font-weight: 700;
		text-align: left;
	}

	& p {
		font-family: "Panton", sans-serif;
		font-size: 1.2rem;
		font-weight: 400;
		text-align: justify;
	}
}

.activity-report-info-dark-theme {
	color: $tertiary-color;

	& p {
		color: $secondary-color;
	}
}

.activity-report-info-light-theme {
	color: $primary-color;
}
</style>
