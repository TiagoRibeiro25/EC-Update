<script setup>
const props = defineProps({
	theme: { type: Boolean, required: true },
	side: { type: String, required: true },
	title: { type: String, required: false },
	content: { type: String, required: false },
	pad: { type: Boolean, required: false },
});

const theme = props.theme;
const title = props.title;
const content = props.content;
const side = props.side;
const pad = props.pad;
</script>

<template>
	<div
		v-if="title && content"
		class="content-container mx-0"
		:class="{
			'text-right': side === 'left',
			'text-left': side === 'right',
			'pt-4': pad,
		}"
	>
		<h2 class="title" :class="theme ? 'title-dark-theme' : 'title-light-theme'">
			{{ title }}
		</h2>
		<p class="content" :class="theme ? 'content-dark-theme' : 'content-light-theme'">
			{{ content }}
		</p>
	</div>
	<div v-else class="content-container"></div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #ffffff;
$tertiary-color: #aedcc0;

.content-container {
	height: 150px;
	overflow-y: scroll;
}

.title {
	font-family: "Panton", sans-serif;
	font-size: 1.8rem;
	font-weight: 700;
	color: $primary-color;
}

.content {
	font-family: "Panton", sans-serif;
	font-size: 1.2rem;
	font-weight: 400;
	color: $primary-color;
}

.title-light-theme {
	color: $primary-color;
}

.title-dark-theme {
	color: $tertiary-color;
}

.content-light-theme {
	color: $primary-color;
}

.content-dark-theme {
	color: $secondary-color;
}
</style>
