<script setup>
const props = defineProps({
	theme: { type: Boolean, required: true },
	title: { type: String, required: true },
});

const theme = props.theme;
const title = props.title;
</script>

<template>
	<header
		class="mt-4 mb-4 px-5 mx-auto"
		:class="{ 'text-light': theme, 'text-dark': !theme }"
	>
		<h1 class="title text-left mt-3">{{ title }}</h1>
		<div
			class="border border-2 mt-3"
			:class="{ 'border-light': theme, 'border-dark': !theme }"
		></div>
	</header>
</template>

<style lang="scss" scoped>
$primary-color: #000000;
$secondary-color: #aedcc0;

header {
	max-width: 1400px;
}

.title {
	font-family: "Alkes", sans-serif;
	font-weight: bold;
	font-size: 35px;
	text-transform: uppercase;
}

.text-light {
	color: $secondary-color !important;
}

.text-dark {
	color: $primary-color !important;
}

.border-light {
	border-color: $secondary-color !important;
}

.border-dark {
	border-color: $primary-color !important;
}
</style>
