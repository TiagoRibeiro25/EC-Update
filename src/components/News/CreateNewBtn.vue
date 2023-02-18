<script setup>
const props = defineProps({ theme: { type: Boolean, required: true } });
const theme = props.theme;
</script>

<template>
	<div style="width: 176px">
		<router-link :to="{ name: 'NewsCreate' }" class="text-decoration-none">
			<button
				type="button"
				class="add-new-btn btn btn-sm rounded-pill d-flex align-items-center justify-content-start"
				:class="{ 'btn-light': !theme, 'btn-dark': theme }"
			>
				<img src="@/assets/icons/add.svg" alt="add" width="20" />
				<span class="px-3"> Adicionar Notícia </span>
			</button>
		</router-link>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #3fc380;
$fourth-color: #ffffff;
$fifth-color: #18516f;

.add-new-btn {
	font-family: "Panton", sans-serif;
	font-weight: 600;
	font-size: 14px;
}

.btn-light {
	background-color: $primary-color;
	color: $fourth-color;

	&:hover {
		background-color: $fifth-color;
		color: $fourth-color;
	}
}

.btn-dark {
	background-color: $fourth-color;
	color: $primary-color;

	&:hover {
		background-color: $fifth-color;
		color: $fourth-color;

		& img {
			filter: invert(0);
		}
	}

	& img {
		filter: invert(1);
	}
}
</style>
