<script setup>
const props = defineProps({ theme: { type: Boolean, required: true } });
const theme = props.theme;
</script>

<template>
	<div
		class="recent-activities-error py-5 px-4 shadow text-center"
		:class="{ 'bg-light': !theme, 'bg-dark': theme }"
	>
		<h3 class="mt-2 mb-4" :class="{ 'text-light': !theme, 'text-dark': theme }">
			Não foram encontradas atividades recentes.
		</h3>
		<router-link
			class="create-new-activity-link py-2 px-3"
			:class="{ 'btn-light': !theme, 'btn-dark': theme }"
			:to="{ name: 'ActivitiesCreate' }"
		>
			Seja o primeiro a criar uma atividade!
		</router-link>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #e4f0e8;
$tertiary-color: #ffffff;
$fourth-color: #18516f;
$sixth-color: #000000;

.recent-activities-error {
	border-radius: 20px;

	& h3 {
		font-family: "Panton", sans-serif;
		font-size: 1.5rem;
		font-weight: 600;
	}
}

.create-new-activity-link {
	border-radius: 20px;
	font-family: "Panton", sans-serif;
	font-size: 1.2rem;
	font-weight: 600;
	text-decoration: none;
	transition: all 0.3s ease-in-out;

	&:hover {
		background-color: $fourth-color !important;
		color: $tertiary-color !important;
	}
}

.bg-light {
	background-color: rgba(228, 240, 232, 0.8) !important;
	transition: all 0.3s ease-in-out;

	&:hover {
		background-color: $secondary-color !important;
	}
}

.bg-dark {
	background-color: rgba(52, 62, 61, 0.8) !important;
	transition: all 0.3s ease-in-out;

	&:hover {
		background-color: $primary-color !important;
	}
}

.text-light {
	color: $sixth-color !important;
}

.text-dark {
	color: $tertiary-color !important;
}

.btn-light {
	background-color: $primary-color !important;
	color: $tertiary-color !important;
}

.btn-dark {
	background-color: $secondary-color !important;
	color: $primary-color !important;
}
</style>
