<script setup>
const props = defineProps({ theme: { type: Boolean, required: true } });
const theme = props.theme;
</script>

<template>
	<div class="w-100">
		<h3
			class="no-activities-msg text-center mx-auto"
			:class="theme ? 'no-activities-msg-dark-theme' : 'no-activities-msg-light-theme'"
		>
			Não foram encontradas atividades finalizadas
		</h3>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;

.no-activities-msg {
	font-family: "Panton", sans-serif;
	font-size: 1.5rem;
	font-weight: 500;
}

.no-activities-msg-light-theme {
	color: $primary-color;
}

.no-activities-msg-dark-theme {
	color: $secondary-color;
}
</style>
