<script setup>
const props = defineProps({
	theme: { type: Boolean, required: true },
	text: { type: String, required: true },
	type: { type: String, required: true },
	disable: { type: Boolean, required: false, default: false },
});
const theme = props.theme;
const text = props.text;
const type = props.type;
const disable = props.disable;
</script>

<template>
	<div style="width: 220px">
		<router-link
			:to="{ name: disable ? '' : type }"
			class="text-decoration-none add-new-btn btn btn-sm rounded-pill d-flex align-items-center justify-content-start"
			:class="{ 'btn-light': !theme, 'btn-dark': theme, disabled: disable }"
		>
			<img
				v-if="type !== 'AdminMenu'"
				src="@/assets/icons/add.svg"
				alt="add"
				width="20"
			/>
			<span class="px-3 w-100"> {{ text }} </span>
		</router-link>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #ffffff;
$tertiary-color: #18516f;

.add-new-btn {
	font-family: "Panton", sans-serif;
	font-weight: 600;
	font-size: 14px;
}

.disabled {
	pointer-events: none;
	opacity: 0.5;
}

.btn-light {
	background-color: $primary-color;
	color: $secondary-color;

	&:hover {
		background-color: $tertiary-color;
		color: $secondary-color;
	}
}

.btn-dark {
	background-color: $secondary-color;
	color: $primary-color;

	&:hover {
		background-color: $tertiary-color;
		color: $secondary-color;

		& img {
			filter: invert(0);
		}
	}

	& img {
		filter: invert(1);
	}
}
</style>
